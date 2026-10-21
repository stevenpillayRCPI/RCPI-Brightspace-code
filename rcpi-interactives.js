/* -------------------------------------------------------------------------- */
/* rcpi-interactives.js - v1.2 (2026-10-21)                                   */
/* -------------------------------------------------------------------------- */
/* Purpose                                                                    */
/* Data-driven runtime for RCPI interactive items (H5P replacement).          */
/* Each item is a <div class="rcpi-ix" data-spec="{json}"> that is hydrated   */
/* in the learner view. Self-contained: injects its own CSS, no dependencies. */
/*                                                                            */
/* Types: presentation, mcq, questionset, hotspots, media, text, image        */
/* Presentation options: title, titleLevel (2-6), heightMode (tallest|auto),  */
/* gate, summary, summaryTitle, startSlide                                    */
/* (blanks, matching, dragdrop, agamotto, branching follow in later versions) */
/*                                                                            */
/* Public API (window.RCPIInteractives)                                       */
/* - init(), initWithin(root)   hydrate any unhydrated .rcpi-ix[data-spec]    */
/* - render(host, spec)         render a spec object into a host element      */
/* - markup(spec)               build the paste-ready HTML for a spec         */
/* - validate(spec)             list of authoring warnings                    */
/* - obfuscate(spec)            hide mcq correct flags and feedback (encoded) */
/* - deobfuscate(spec)          reverse of obfuscate (builder Load uses it)   */
/*                                                                            */
/* Obscured answers: markup(spec, {obfuscate:true}) replaces each mcq answer's */
/* correct flag and feedback with an encoded string. The runtime decodes them */
/* on render. This only hides answers from casual viewing of the page code;   */
/* it is not security, because the decoder ships with the page.               */
/* -------------------------------------------------------------------------- */
(function () {
  'use strict';
  if (window.RCPIInteractives && window.RCPIInteractives.__loaded) return;

  var VERSION = '1.2';
  var HS_COLOR = '#002d72';
  var DIRECT_RE = /\.(mp3|m4a|wav|ogg|oga|mp4|m4v|webm|mov)(\?|#|$)/i;
  var counter = 0;

  /* ------------------------------ helpers --------------------------------- */

  function qsa(root, sel) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function uid(prefix) { counter += 1; return (prefix || 'ix') + '-' + counter; }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
  function paragraphs(text) {
    var box = el('div');
    String(text || '').split(/\n\s*\n/).forEach(function (p) {
      if (p.trim()) box.appendChild(el('p', null, p.trim()));
    });
    return box;
  }

  /* -------------------------------- CSS ----------------------------------- */

  var CSS = [
    '.rcpi-ix{margin:1rem 0;font-size:1rem;line-height:1.5}',
    '.rcpi-ix *,.rcpi-ix *::before,.rcpi-ix *::after{box-sizing:border-box}',
    '.rcpi-ix input,.rcpi-ix button,.rcpi-ix select,.rcpi-ix textarea{margin-bottom:0}',
    '.rcpi-ix-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
    '.rcpi-ix-placeholder{padding:.75rem 1rem;border:2px dashed #8a97ab;border-radius:.5rem;background:#f4f6fa;margin:0}',
    '.rcpi-ix-error{padding:.75rem 1rem;border-left:4px solid #b02a37;background:#fbeaec;margin:0}',
    '.rcpi-ix-card{border:1px solid #c8d0dc;border-radius:.5rem;padding:1rem;background:#fff}',
    '.rcpi-ix-btn{font:inherit;font-size:1rem;font-weight:600;padding:.5rem 1rem;border-radius:.375rem;border:2px solid var(--bs-primary,#002d72);background:var(--bs-primary,#002d72);color:#fff;cursor:pointer;min-height:2.75rem}',
    '.rcpi-ix-btn.is-secondary{background:#fff;color:var(--bs-primary,#002d72)}',
    '.rcpi-ix-btn:disabled,.rcpi-ix-btn[aria-disabled=true]{opacity:.5;cursor:not-allowed}',
    '.rcpi-ix button:focus-visible,.rcpi-ix summary:focus-visible,.rcpi-ix-slide-title:focus-visible,.rcpi-ix-hs-panel:focus-visible{outline:3px solid #0b5ed7;outline-offset:2px}',
    /* mcq */
    '.rcpi-ix-mcq fieldset{border:0;margin:0;padding:0;min-width:0}',
    '.rcpi-ix-mcq legend{font-size:1.125rem;font-weight:600;margin:0 0 .25rem;padding:0;float:none;width:auto}',
    '.rcpi-ix-hint{margin:0 0 .75rem;color:#4a5568}',
    '.rcpi-ix-opt{display:flex;gap:.75rem;align-items:flex-start;border:2px solid #c8d0dc;border-radius:.5rem;padding:.65rem .85rem;cursor:pointer;background:#fff;margin:0}',
    '.rcpi-ix-opt:focus-within{outline:3px solid #0b5ed7;outline-offset:2px}',
    '.rcpi-ix-opt input{margin-top:.3rem;width:1.1rem;height:1.1rem;flex:0 0 auto}',
    '.rcpi-ix-opt.is-selected{border-color:var(--bs-primary,#002d72);background:#eef3fb}',
    '.rcpi-ix-opt.is-correct{border-color:#146c43;background:#e8f5ee}',
    '.rcpi-ix-opt.is-incorrect{border-color:#b02a37;background:#fbeaec}',
    '.rcpi-ix-optwrap{margin-bottom:.5rem}',
    '.rcpi-ix-mark{font-weight:700;margin-left:auto;padding-left:.5rem}',
    '.rcpi-ix-fb{margin:.25rem 0 0;padding:.5rem .75rem;border-left:4px solid #b02a37;background:#fbeaec;border-radius:.25rem}',
    '.rcpi-ix-fb.is-ok{border-color:#146c43;background:#e8f5ee}',
    '.rcpi-ix-status{margin:.75rem 0 0;font-weight:600;min-height:1.5rem}',
    '.rcpi-ix-qs-title{margin:0 0 .5rem;font-size:1.15rem}',
    '.rcpi-ix-qs-results:focus{outline:none}',
    '.rcpi-ix-qs .rcpi-ix-card{border:0;padding:0;box-shadow:none;background:none}',
    '.rcpi-ix-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem}',
    /* hotspots */
    '.rcpi-ix-hs-stage{position:relative;display:block;max-width:100%}',
    '.rcpi-ix-hs-stage img{display:block;width:100%;height:auto}',
    '.rcpi-ix-hs-marker{position:absolute;transform:translate(-50%,-50%);width:2.75rem;height:2.75rem;border-radius:50%;border:3px solid #fff;background:' + HS_COLOR + ';color:#fff;display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.45)}',
    '.rcpi-ix-hs-marker svg{width:1.4rem;height:1.4rem;fill:currentColor}',
    '.rcpi-ix-hs-marker[aria-expanded=true]{background:#fff;color:' + HS_COLOR + ';border-color:' + HS_COLOR + '}',
    '.rcpi-ix-hs-panel{margin-top:.75rem;padding:1rem;border:2px solid ' + HS_COLOR + ';border-radius:.5rem;background:#fff}',
    '.rcpi-ix-hs-panel[hidden]{display:none}',
    '.rcpi-ix-title{font-weight:700;font-size:1.125rem;margin:0 0 .5rem}',
    /* media */
    '.rcpi-ix-media{margin:0}',
    '.rcpi-ix-native{display:block;width:100%;max-width:100%}',
    '.rcpi-ix-embed{position:relative;width:100%}',
    '.rcpi-ix-ratio{aspect-ratio:16/9}',
    '.rcpi-ix-embed-audio{height:8rem}',
    '.rcpi-ix-embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0}',
    '.rcpi-ix-transcript{margin-top:.5rem}',
    '.rcpi-ix-transcript summary{cursor:pointer;font-weight:600}',
    '.rcpi-ix-figure{margin:0}',
    '.rcpi-ix-figure img{max-width:100%;height:auto}',
    /* presentation */
    '.rcpi-ix-pres-top{display:flex;flex-wrap:wrap;gap:.5rem 1rem;align-items:center;margin-bottom:.5rem}',
    '.rcpi-ix-pres-count{font-weight:600}',
    '.rcpi-ix-bar{height:.5rem;background:#dfe5ee;border-radius:.25rem;overflow:hidden;flex:1 1 8rem;min-width:6rem}',
    '.rcpi-ix-bar-fill{height:100%;background:var(--bs-primary,#002d72);transition:width .2s}',
    '.rcpi-ix-menu summary{cursor:pointer;font-weight:600}',
    '.rcpi-ix-menu ol,.rcpi-ix-summary-list{list-style:none;padding:0;margin:.5rem 0;display:grid;gap:.25rem}',
    '.rcpi-ix-menu ol>li,.rcpi-ix-summary-list>li{margin:0;padding:0;opacity:1!important;animation:none!important;counter-increment:none}',
    '.rcpi-ix-menu ol>li::before,.rcpi-ix-menu ol>li::after,.rcpi-ix-summary-list>li::before,.rcpi-ix-summary-list>li::after{content:none!important}',
    '.rcpi-ix-menu button{width:100%;text-align:left}',
    '.rcpi-ix-viewport.is-tallest{display:grid}',
    '.rcpi-ix-viewport.is-tallest>.rcpi-ix-slide{grid-area:1/1}',
    '.rcpi-ix-slide:not(.is-active){visibility:hidden}',
    '.rcpi-ix-slide-title{margin:.5rem 0 1rem;font-size:1.35rem}',
    '.rcpi-ix-el{margin:0 0 1rem}',
    '.rcpi-ix-pres-nav{display:flex;justify-content:space-between;gap:.5rem;align-items:center;margin-top:1rem;flex-wrap:wrap}',
    '.rcpi-ix-gate{margin:0;font-weight:600}',
    '.rcpi-ix-summary-list>li{padding:.5rem 0;border-bottom:1px solid #dfe5ee}'
  ].join('\n');

  function injectStyle() {
    if (document.getElementById('rcpi-ix-style')) return;
    var s = document.createElement('style');
    s.id = 'rcpi-ix-style';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ----------------------------- simple types ----------------------------- */

  function renderText(spec) {
    var d = el('div', 'rcpi-ix-text');
    d.innerHTML = spec.html || '';
    return { node: d };
  }

  function renderImage(spec) {
    var f = el('figure', 'rcpi-ix-figure');
    var img = document.createElement('img');
    img.src = spec.src || '';
    img.alt = spec.decorative ? '' : (spec.alt || '');
    f.appendChild(img);
    if (spec.caption) f.appendChild(el('figcaption', null, spec.caption));
    return { node: f };
  }

  /* -------------------------------- media --------------------------------- */

  function parseYouTube(s) {
    s = String(s || '').trim();
    var m = s.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(s) ? s : '';
  }
  function parseVimeo(s) {
    s = String(s || '').trim();
    if (/^\d+$/.test(s)) return { id: s, h: '' };
    var m = s.match(/vimeo\.com\/(?:video\/|.*\/)?(\d+)(?:\/([0-9a-f]+))?/i);
    if (!m) return null;
    var q = s.match(/[?&]h=([0-9a-f]+)/i);
    return { id: m[1], h: m[2] || (q ? q[1] : '') };
  }

  function renderMedia(spec, ctx) {
    var kind = spec.kind === 'audio' ? 'audio' : 'video';
    var source = spec.source || 'brightspace';
    var title = spec.title || (kind === 'audio' ? 'Audio' : 'Video');
    var src = String(spec.src || '').trim();
    var wrap = el('div', 'rcpi-ix-media');
    var handle = { node: wrap };
    var embedUrl = '';
    var direct = false;

    if (source === 'youtube') {
      var y = parseYouTube(src);
      if (y) embedUrl = 'https://www.youtube-nocookie.com/embed/' + y + '?rel=0';
    } else if (source === 'vimeo') {
      var v = parseVimeo(src);
      if (v) embedUrl = 'https://player.vimeo.com/video/' + v.id + (v.h ? '?h=' + v.h : '');
    } else if (src) {
      if (DIRECT_RE.test(src)) direct = true; else embedUrl = src;
    }

    if (!direct && !embedUrl) {
      wrap.appendChild(el('p', 'rcpi-ix-error', 'Media source is missing or not recognised.'));
      return handle;
    }

    if (direct) {
      var m = document.createElement(kind);
      m.controls = true;
      m.preload = 'metadata';
      m.className = 'rcpi-ix-native';
      m.setAttribute('title', title);
      m.src = src;
      if (kind === 'video' && spec.poster) m.poster = spec.poster;
      if (spec.captions) {
        var t = document.createElement('track');
        t.kind = 'captions';
        t.src = spec.captions;
        t.srclang = spec.captionsLang || 'en';
        t.label = 'Captions';
        m.appendChild(t);
      }
      wrap.appendChild(m);
      handle.hide = function () { try { m.pause(); } catch (e) { /* ignore */ } };
    } else {
      var box = el('div', 'rcpi-ix-embed ' + (kind === 'audio' ? 'rcpi-ix-embed-audio' : 'rcpi-ix-ratio'));
      var f = document.createElement('iframe');
      f.title = title;
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('allow', 'fullscreen; picture-in-picture; encrypted-media');
      f.setAttribute('loading', 'lazy');
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      if (ctx.deferMedia) f.setAttribute('data-src', embedUrl); else f.src = embedUrl;
      box.appendChild(f);
      wrap.appendChild(box);
      handle.show = function () {
        var d = f.getAttribute('data-src');
        if (d && f.getAttribute('src') !== d) f.src = d;
      };
      handle.hide = function () { if (f.getAttribute('data-src')) f.src = 'about:blank'; };
    }

    if (spec.transcript) {
      var det = el('details', 'rcpi-ix-transcript');
      det.appendChild(el('summary', null, 'Transcript'));
      det.appendChild(paragraphs(spec.transcript));
      wrap.appendChild(det);
    } else if (kind === 'audio' && window.console) {
      console.warn('rcpi-interactives: audio item has no transcript', spec.id || '');
    }
    return handle;
  }

  /* ---------------------- answer obfuscation (not security) --------------- */

  function randomSalt() {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var out = '';
    var buf = null;
    if (window.crypto && window.crypto.getRandomValues) { buf = new Uint8Array(10); window.crypto.getRandomValues(buf); }
    for (var i = 0; i < 10; i++) {
      var r = buf ? buf[i] : Math.floor(Math.random() * 256);
      out += chars.charAt(r % chars.length);
    }
    return out;
  }
  function utf8Bytes(str) { return new TextEncoder().encode(str); }
  function xorBytes(bytes, salt, i) {
    var key = utf8Bytes(String(salt) + ':' + i);
    var out = new Uint8Array(bytes.length);
    for (var j = 0; j < bytes.length; j++) out[j] = bytes[j] ^ key[j % key.length] ^ ((j * 31 + 7) & 255);
    return out;
  }
  function toB64(bytes) {
    var bin = '';
    for (var j = 0; j < bytes.length; j++) bin += String.fromCharCode(bytes[j]);
    return btoa(bin);
  }
  function fromB64(str) {
    var bin = atob(str);
    var out = new Uint8Array(bin.length);
    for (var j = 0; j < bin.length; j++) out[j] = bin.charCodeAt(j);
    return out;
  }
  function encodeAnswer(salt, i, correct, feedback) {
    return toB64(xorBytes(utf8Bytes(JSON.stringify([correct ? 1 : 0, feedback || ''])), salt, i));
  }
  function decodeAnswer(salt, i, enc) {
    try {
      var arr = JSON.parse(new TextDecoder().decode(xorBytes(fromB64(enc), salt, i)));
      return { correct: arr[0] === 1, feedback: arr[1] || '' };
    } catch (e) {
      if (window.console) console.warn('rcpi-interactives: could not decode an answer');
      return { correct: false, feedback: '' };
    }
  }
  function resolveAnswers(spec) {
    return (spec.answers || []).map(function (a, i) {
      if (a && a.enc !== undefined) {
        var d = decodeAnswer(spec.salt, i, a.enc);
        return { text: a.text, correct: d.correct, feedback: d.feedback };
      }
      return a;
    });
  }
  function eachMcq(spec, fn) {
    if (!spec) return;
    if (spec.type === 'mcq') fn(spec);
    else if (spec.type === 'questionset') (spec.questions || []).forEach(function (q) { eachMcq(q, fn); });
    else if (spec.type === 'presentation') {
      (spec.slides || []).forEach(function (sl) { (sl.elements || []).forEach(function (e) { eachMcq(e, fn); }); });
    }
  }
  function obfuscate(spec) {
    var c = JSON.parse(JSON.stringify(spec));
    eachMcq(c, function (q) {
      if (!q.answers || q.answers.some(function (a) { return a.enc !== undefined; })) return;
      var salt = randomSalt();
      q.salt = salt;
      q.answers = q.answers.map(function (a, i) {
        return { text: a.text, enc: encodeAnswer(salt, i, !!a.correct, a.feedback) };
      });
    });
    return c;
  }
  function deobfuscate(spec) {
    var c = JSON.parse(JSON.stringify(spec));
    eachMcq(c, function (q) {
      if (!q.answers || !q.answers.some(function (a) { return a.enc !== undefined; })) return;
      q.answers = resolveAnswers(q);
      delete q.salt;
    });
    return c;
  }

  /* --------------------------------- mcq ---------------------------------- */

  function shuffled(arr) {
    var a = arr.map(function (v, i) { return { v: v, i: i }; });
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function renderMcq(spec, ctx) {
    var id = ctx.id || spec.id || uid('mcq');
    var answers = resolveAnswers(spec);
    var correctCount = answers.filter(function (a) { return a.correct; }).length;
    var multi = correctCount > 1 || spec.multi === true;
    var checkLabel = spec.checkLabel || 'Check';
    var attempts = 0;

    var wrap = el('div', 'rcpi-ix-card rcpi-ix-mcq');
    var fs = document.createElement('fieldset');
    var lg = el('legend', null, spec.question || '');
    fs.appendChild(lg);
    fs.appendChild(el('p', 'rcpi-ix-hint', multi ? 'Select all that apply.' : 'Select one answer.'));

    var order = answers.map(function (a, i) { return { v: a, i: i }; });
    if (spec.randomAnswers) order = shuffled(answers);

    var rows = [];
    order.forEach(function (o, k) {
      var a = o.v;
      var row = el('div', 'rcpi-ix-optwrap');
      var lab = el('label', 'rcpi-ix-opt');
      var inp = document.createElement('input');
      inp.type = multi ? 'checkbox' : 'radio';
      inp.name = id + '-opts';
      inp.id = id + '-o' + (k + 1);
      lab.appendChild(inp);
      lab.appendChild(el('span', null, a.text || ''));
      var mark = el('span', 'rcpi-ix-mark');
      mark.setAttribute('aria-hidden', 'true');
      lab.appendChild(mark);
      var sr = el('span', 'rcpi-ix-sr');
      lab.appendChild(sr);
      row.appendChild(lab);
      fs.appendChild(row);
      rows.push({ a: a, row: row, lab: lab, inp: inp, mark: mark, sr: sr, fb: null });
    });
    wrap.appendChild(fs);

    var status = el('p', 'rcpi-ix-status');
    status.setAttribute('aria-live', 'polite');
    wrap.appendChild(status);

    var actions = el('div', 'rcpi-ix-actions');
    var checkBtn = el('button', 'rcpi-ix-btn', checkLabel);
    checkBtn.type = 'button';
    checkBtn.disabled = true;
    var retryBtn = el('button', 'rcpi-ix-btn is-secondary', 'Try again');
    retryBtn.type = 'button';
    retryBtn.hidden = true;
    actions.appendChild(checkBtn);
    actions.appendChild(retryBtn);
    wrap.appendChild(actions);

    function chosenCount() { return rows.filter(function (r) { return r.inp.checked; }).length; }
    function clearFeedback() {
      rows.forEach(function (r) {
        r.lab.classList.remove('is-correct', 'is-incorrect');
        r.mark.textContent = '';
        r.sr.textContent = '';
        if (r.fb && r.fb.parentNode) r.fb.parentNode.removeChild(r.fb);
        r.fb = null;
      });
      status.textContent = '';
    }
    function syncSelected() {
      rows.forEach(function (r) { r.lab.classList.toggle('is-selected', r.inp.checked); });
      checkBtn.disabled = chosenCount() === 0;
    }
    rows.forEach(function (r) { r.inp.addEventListener('change', syncSelected); });

    checkBtn.addEventListener('click', function () {
      clearFeedback();
      attempts += 1;
      var allRight = true;
      var anyWrongChosen = false;
      rows.forEach(function (r) {
        var chosen = r.inp.checked;
        if (!!r.a.correct !== chosen) allRight = false;
        if (!chosen) return;
        var ok = !!r.a.correct;
        if (!ok) anyWrongChosen = true;
        r.lab.classList.add(ok ? 'is-correct' : 'is-incorrect');
        r.mark.textContent = ok ? '✓' : '✗';
        r.sr.textContent = ok ? 'Correct. ' : 'Incorrect. ';
        var text = r.a.feedback || (ok ? '' : 'Incorrect. Please try again.');
        if (text) {
          r.fb = el('p', 'rcpi-ix-fb' + (ok ? ' is-ok' : ''), text);
          r.row.appendChild(r.fb);
        }
      });
      if (allRight) {
        status.textContent = 'Correct.';
        rows.forEach(function (r) { r.inp.disabled = true; });
        checkBtn.hidden = true;
        wrap.setAttribute('data-complete', '1');
        wrap.dispatchEvent(new CustomEvent('rcpi-ix-complete', { bubbles: true, detail: { id: id, type: 'mcq', attempts: attempts } }));
      } else {
        status.textContent = (multi && !anyWrongChosen)
          ? 'Not quite. You have not selected all of the correct answers.'
          : 'Not quite. Try again.';
        rows.forEach(function (r) { r.inp.disabled = true; });
        checkBtn.hidden = true;
        retryBtn.hidden = false;
        retryBtn.focus();
      }
    });

    retryBtn.addEventListener('click', function () {
      clearFeedback();
      rows.forEach(function (r) { r.inp.checked = false; r.inp.disabled = false; });
      syncSelected();
      retryBtn.hidden = true;
      checkBtn.hidden = false;
      if (rows[0]) rows[0].inp.focus();
    });

    return { node: wrap };
  }

  /* ------------------------------ question set ---------------------------- */

  function renderQuestionSet(spec, ctx) {
    var id = ctx.id || spec.id || uid('qs');
    var qs = (spec.questions || []).filter(function (q) { return q && q.type === 'mcq'; });
    var wrap = el('div', 'rcpi-ix-card rcpi-ix-qs');
    var level = clamp(parseInt(spec.titleLevel, 10) || 4, 2, 6);

    function title() {
      if (!spec.title) return;
      var t = document.createElement('h' + level);
      t.className = 'rcpi-ix-qs-title';
      t.textContent = spec.title;
      wrap.appendChild(t);
    }

    function build() {
      wrap.innerHTML = '';
      wrap.removeAttribute('data-complete');
      var firstTry = 0;
      var cur = 0;
      if (!qs.length) { wrap.appendChild(el('p', 'rcpi-ix-error', 'This question set has no questions.')); return; }
      title();
      var count = el('p', 'rcpi-ix-hint rcpi-ix-qs-count');
      count.setAttribute('aria-live', 'polite');
      var stage = el('div', 'rcpi-ix-qs-stage');
      var actions = el('div', 'rcpi-ix-actions');
      var nextBtn = el('button', 'rcpi-ix-btn', 'Next question');
      nextBtn.type = 'button';
      nextBtn.hidden = true;
      actions.appendChild(nextBtn);
      wrap.appendChild(count);
      wrap.appendChild(stage);
      wrap.appendChild(actions);

      function show() {
        stage.innerHTML = '';
        count.textContent = 'Question ' + (cur + 1) + ' of ' + qs.length;
        nextBtn.hidden = true;
        nextBtn.textContent = cur === qs.length - 1 ? 'Finish' : 'Next question';
        stage.appendChild(renderMcq(qs[cur], { id: id + '-q' + (cur + 1) }).node);
      }
      function results() {
        wrap.innerHTML = '';
        title();
        var box = el('div', 'rcpi-ix-qs-results');
        box.setAttribute('tabindex', '-1');
        box.appendChild(el('p', 'rcpi-ix-status', 'Results'));
        box.appendChild(el('p', null, 'You answered ' + firstTry + ' of ' + qs.length + ' questions correctly on the first try.'));
        var again = el('button', 'rcpi-ix-btn is-secondary', 'Start again');
        again.type = 'button';
        again.addEventListener('click', function () {
          build();
          var f = wrap.querySelector('input');
          if (f) f.focus();
        });
        box.appendChild(again);
        wrap.appendChild(box);
        box.focus();
        wrap.setAttribute('data-complete', '1');
        wrap.dispatchEvent(new CustomEvent('rcpi-ix-complete', { bubbles: true, detail: { id: id, type: 'questionset', correctFirstTry: firstTry, total: qs.length } }));
      }

      stage.addEventListener('rcpi-ix-complete', function (ev) {
        ev.stopPropagation();
        if (ev.detail && ev.detail.attempts === 1) firstTry += 1;
        nextBtn.hidden = false;
        nextBtn.focus();
      });
      nextBtn.addEventListener('click', function () {
        if (cur >= qs.length - 1) { results(); return; }
        cur += 1;
        show();
        var f = stage.querySelector('input');
        if (f) f.focus();
      });
      show();
    }
    build();
    return { node: wrap };
  }

  /* ------------------------------- hotspots ------------------------------- */

  var INFO_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';

  function renderHotspots(spec, ctx) {
    var id = ctx.id || spec.id || uid('hs');
    var points = spec.points || [];
    var root = el('div', 'rcpi-ix-hs');
    var intro = el('p', null, 'Select the icons to reveal.');
    root.appendChild(intro);

    if (!spec.image) {
      root.appendChild(el('p', 'rcpi-ix-error', 'Hotspot image is missing.'));
      return { node: root };
    }

    var stage = el('div', 'rcpi-ix-hs-stage');
    var img = document.createElement('img');
    img.src = spec.image;
    img.alt = spec.alt || '';
    stage.appendChild(img);

    var panel = el('div', 'rcpi-ix-hs-panel');
    panel.id = id + '-panel';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-live', 'polite');
    panel.setAttribute('aria-label', 'Hotspot content');
    panel.tabIndex = -1;
    panel.hidden = true;
    var pTitle = el('p', 'rcpi-ix-title');
    var pBody = el('div', 'rcpi-ix-hs-body');
    var pNav = el('div', 'rcpi-ix-actions');
    var prev = el('button', 'rcpi-ix-btn is-secondary', 'Previous');
    var next = el('button', 'rcpi-ix-btn is-secondary', 'Next');
    var close = el('button', 'rcpi-ix-btn', 'Close');
    [prev, next, close].forEach(function (b) { b.type = 'button'; pNav.appendChild(b); });
    panel.appendChild(pTitle);
    panel.appendChild(pBody);
    panel.appendChild(pNav);

    var markers = [];
    var current = -1;

    points.forEach(function (p, i) {
      var b = el('button', 'rcpi-ix-hs-marker');
      b.type = 'button';
      b.innerHTML = INFO_SVG;
      b.style.left = (typeof p.x === 'number' ? p.x : 50) + '%';
      b.style.top = (typeof p.y === 'number' ? p.y : 50) + '%';
      b.setAttribute('aria-label', (i + 1) + ' of ' + points.length + ': ' + (p.header || 'Hotspot'));
      b.setAttribute('aria-expanded', 'false');
      b.setAttribute('aria-controls', panel.id);
      b.addEventListener('click', function () {
        if (current === i) hide(true); else show(i);
      });
      stage.appendChild(b);
      markers.push(b);
    });

    function show(i) {
      current = i;
      var p = points[i];
      markers.forEach(function (m, k) { m.setAttribute('aria-expanded', k === i ? 'true' : 'false'); });
      pTitle.textContent = p.header || '';
      pTitle.hidden = !p.header;
      pBody.innerHTML = p.html || '';
      panel.hidden = false;
      prev.disabled = points.length < 2;
      next.disabled = points.length < 2;
      panel.focus();
    }
    function hide(refocus) {
      var was = current;
      current = -1;
      markers.forEach(function (m) { m.setAttribute('aria-expanded', 'false'); });
      panel.hidden = true;
      if (refocus && markers[was]) markers[was].focus();
    }
    function step(d) {
      if (current < 0) return;
      show((current + d + points.length) % points.length);
    }
    prev.addEventListener('click', function () { step(-1); });
    next.addEventListener('click', function () { step(1); });
    close.addEventListener('click', function () { hide(true); });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); hide(true); }
      else if (e.key === 'ArrowLeft') { e.stopPropagation(); step(-1); }
      else if (e.key === 'ArrowRight') { e.stopPropagation(); step(1); }
    });

    root.appendChild(stage);
    root.appendChild(panel);
    return { node: root, hide: function () { if (current >= 0) hide(false); } };
  }

  /* ----------------------------- presentation ----------------------------- */

  function renderPresentation(spec, ctx) {
    var pid = ctx.id || spec.id || uid('pres');
    var slidesSpec = (spec.slides || []).slice();
    var gate = !!spec.gate;
    var level = clamp(parseInt(spec.titleLevel, 10) || 3, 2, 6);
    var tallest = spec.heightMode !== 'auto';

    var root = el('div', 'rcpi-ix-card rcpi-ix-pres');
    root.setAttribute('role', 'region');
    root.setAttribute('aria-roledescription', 'presentation');
    root.setAttribute('aria-label', spec.title || 'Presentation');
    root.tabIndex = -1;

    var slides = [];
    var current = 0;

    var top = el('div', 'rcpi-ix-pres-top');
    var countEl = el('span', 'rcpi-ix-pres-count');
    var bar = el('div', 'rcpi-ix-bar');
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Presentation progress');
    bar.setAttribute('aria-valuemin', '1');
    var fill = el('div', 'rcpi-ix-bar-fill');
    bar.appendChild(fill);
    top.appendChild(countEl);
    top.appendChild(bar);
    root.appendChild(top);

    var menu = el('details', 'rcpi-ix-menu');
    menu.appendChild(el('summary', null, 'Slides'));
    var menuList = document.createElement('ol');
    menu.appendChild(menuList);
    root.appendChild(menu);

    var viewport = el('div', 'rcpi-ix-viewport' + (tallest ? ' is-tallest' : ''));
    root.appendChild(viewport);

    function buildSlide(s, i, isSummary) {
      var sec = el('section', 'rcpi-ix-slide');
      sec.id = pid + '-slide-' + (i + 1);
      var h = document.createElement('h' + level);
      h.className = 'rcpi-ix-slide-title';
      h.tabIndex = -1;
      var title = isSummary ? (spec.summaryTitle || 'Summary') : (s.title || ('Slide ' + (i + 1)));
      h.appendChild(el('span', 'rcpi-ix-sr', 'Slide ' + (i + 1) + ' of ' + '%N%' + ': '));
      h.appendChild(document.createTextNode(title));
      sec.appendChild(h);
      var entry = { node: sec, title: h, titleText: title, handles: [], mcqs: 0, done: 0, summary: isSummary, srEl: h.firstChild };
      if (!isSummary) {
        (s.elements || []).forEach(function (e, j) {
          if (!e || e.type === 'presentation') return;
          var r = renderElement(e, { id: pid + '-s' + (i + 1) + '-e' + (j + 1), deferMedia: true });
          var w = el('div', 'rcpi-ix-el');
          w.appendChild(r.node);
          sec.appendChild(w);
          entry.handles.push(r);
          if (e.type === 'mcq' || e.type === 'questionset') entry.mcqs += 1;
        });
      }
      return entry;
    }

    slidesSpec.forEach(function (s, i) { slides.push(buildSlide(s, i, false)); });
    if (spec.summary) slides.push(buildSlide(null, slidesSpec.length, true));
    var n = slides.length;

    slides.forEach(function (s, i) {
      s.srEl.textContent = 'Slide ' + (i + 1) + ' of ' + n + ': ';
      s.node.setAttribute('aria-label', 'Slide ' + (i + 1) + ' of ' + n + ': ' + s.titleText);
      viewport.appendChild(s.node);
      var li = document.createElement('li');
      var b = el('button', 'rcpi-ix-btn is-secondary', (i + 1) + '. ' + s.titleText);
      b.type = 'button';
      b.addEventListener('click', function () { goTo(i, true); });
      li.appendChild(b);
      menuList.appendChild(li);
      s.menuBtn = b;
    });

    function buildSummaryList(entry) {
      var old = entry.node.querySelector('.rcpi-ix-summary-list, .rcpi-ix-summary-empty');
      if (old) old.parentNode.removeChild(old);
      var items = slides.filter(function (s) { return !s.summary && s.mcqs > 0; });
      if (!items.length) {
        entry.node.appendChild(el('p', 'rcpi-ix-summary-empty', 'This presentation has no activities.'));
        return;
      }
      var ul = el('ul', 'rcpi-ix-summary-list');
      items.forEach(function (s) {
        var done = s.done >= s.mcqs;
        ul.appendChild(el('li', null, s.titleText + ': ' + (done ? 'Completed' : 'Not completed')));
      });
      entry.node.appendChild(ul);
    }

    var nav = el('div', 'rcpi-ix-pres-nav');
    var prevBtn = el('button', 'rcpi-ix-btn is-secondary', 'Previous');
    var nextBtn = el('button', 'rcpi-ix-btn', 'Next');
    var gateMsg = el('p', 'rcpi-ix-gate', 'Answer the question correctly to continue.');
    gateMsg.setAttribute('aria-live', 'polite');
    gateMsg.hidden = true;
    prevBtn.type = 'button';
    nextBtn.type = 'button';
    nav.appendChild(prevBtn);
    nav.appendChild(gateMsg);
    nav.appendChild(nextBtn);
    if (n > 1) root.appendChild(nav); else menu.hidden = true;

    function isDone(i) { return slides[i].done >= slides[i].mcqs; }
    function reach() {
      if (!gate) return n - 1;
      for (var i = 0; i < n; i++) { if (!isDone(i)) return i; }
      return n - 1;
    }

    function update() {
      countEl.textContent = 'Slide ' + (current + 1) + ' of ' + n;
      bar.setAttribute('aria-valuemax', String(n));
      bar.setAttribute('aria-valuenow', String(current + 1));
      fill.style.width = (n ? ((current + 1) / n * 100) : 0) + '%';
      var blocked = gate && !isDone(current);
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current >= n - 1 || blocked;
      gateMsg.hidden = !blocked;
      var r = reach();
      slides.forEach(function (s, i) {
        s.menuBtn.disabled = i > r;
        if (i === current) s.menuBtn.setAttribute('aria-current', 'true'); else s.menuBtn.removeAttribute('aria-current');
      });
    }

    function goTo(i, focus) {
      i = clamp(i, 0, n - 1);
      if (i > reach()) return;
      slides.forEach(function (s, k) {
        var on = k === i;
        s.node.classList.toggle('is-active', on);
        s.node.setAttribute('aria-hidden', on ? 'false' : 'true');
        if (!tallest) s.node.hidden = !on;
        if (on && s.summary) buildSummaryList(s);
        s.handles.forEach(function (h) {
          if (on) { if (h.show) h.show(); } else if (h.hide) { h.hide(); }
        });
      });
      current = i;
      update();
      if (focus) slides[i].title.focus();
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1, true); });
    nextBtn.addEventListener('click', function () { goTo(current + 1, true); });

    root.addEventListener('rcpi-ix-complete', function (ev) {
      var sec = ev.target && ev.target.closest ? ev.target.closest('.rcpi-ix-slide') : null;
      for (var k = 0; k < n; k++) {
        if (slides[k].node === sec) { slides[k].done += 1; break; }
      }
      update();
    });

    root.addEventListener('keydown', function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var t = e.target;
      var ok = t === root || (t.closest && t.closest('.rcpi-ix-pres-nav, .rcpi-ix-slide-title'));
      if (!ok) return;
      e.preventDefault();
      goTo(current + (e.key === 'ArrowRight' ? 1 : -1), true);
    });

    if (n) {
      var start = clamp(parseInt(spec.startSlide, 10) || 0, 0, n - 1);
      goTo(Math.min(start, reach()), false);
    }
    return { node: root };
  }

  /* ------------------------------- dispatch ------------------------------- */

  var RENDERERS = {
    text: renderText,
    image: renderImage,
    media: renderMedia,
    mcq: renderMcq,
    questionset: renderQuestionSet,
    hotspots: renderHotspots,
    presentation: renderPresentation
  };

  function renderElement(spec, ctx) {
    var fn = spec && RENDERERS[spec.type];
    if (!fn) return { node: el('p', 'rcpi-ix-error', 'Unknown interactive type: ' + (spec && spec.type)) };
    return fn(spec, ctx || {});
  }

  function render(host, spec) {
    injectStyle();
    host.classList.add('rcpi-ix');
    host.setAttribute('data-ix-ready', '1');
    host.innerHTML = '';
    var r = renderElement(spec, { id: spec.id || host.id || uid('ix') });
    host.appendChild(r.node);
    if (r.show) r.show();
    return r;
  }

  function hydrate(host) {
    if (host.getAttribute('data-ix-ready')) return;
    var spec;
    try {
      spec = JSON.parse(host.getAttribute('data-spec'));
    } catch (e) {
      host.setAttribute('data-ix-ready', 'error');
      host.innerHTML = '<p class="rcpi-ix-error" role="alert">This interactive could not be loaded.</p>';
      return;
    }
    render(host, spec);
  }

  function initWithin(root) {
    qsa(root || document, '.rcpi-ix[data-spec]').forEach(hydrate);
  }
  function init() { initWithin(document); }

  /* ------------------------- authoring helpers ---------------------------- */

  var TYPE_LABEL = { presentation: 'Presentation', mcq: 'Multiple choice', questionset: 'Question set', hotspots: 'Image hotspots', media: 'Media' };

  function markup(spec, opts) {
    if (opts && opts.obfuscate) spec = obfuscate(spec);
    var label = TYPE_LABEL[spec.type] || 'Interactive';
    return '<div class="rcpi-ix" contenteditable="false"' + (spec.id ? ' id="' + esc(spec.id) + '"' : '') +
      ' data-spec="' + esc(JSON.stringify(spec)) + '">' +
      '<p class="rcpi-ix-placeholder">Interactive item (' + esc(label) + '). It displays in the learner view.</p></div>';
  }

  function validate(spec) {
    var w = [];
    function check(e, where) {
      if (!e) return;
      if (e.type === 'mcq') {
        if (!e.question) w.push(where + 'Question text is empty.');
        var a = e.answers || [];
        if (a.length < 2) w.push(where + 'Needs at least 2 answers.');
        if (!a.some(function (x) { return x.correct; })) w.push(where + 'No correct answer ticked.');
        if (a.some(function (x) { return !x.text; })) w.push(where + 'An answer has no text.');
        if (a.length > 2) {
          a.forEach(function (x, i) {
            if (!x.correct && !x.feedback) w.push(where + 'Answer ' + (i + 1) + ' has no feedback (will show "Incorrect. Please try again.").');
          });
        }
      } else if (e.type === 'questionset') {
        var qq = e.questions || [];
        if (qq.length < 2) w.push(where + 'A question set needs 2 or more questions (use a single multiple choice item otherwise).');
        qq.forEach(function (q, i) { check(q, where + 'Question ' + (i + 1) + ': '); });
      } else if (e.type === 'hotspots') {
        if (!e.image) w.push(where + 'Image URL is missing.');
        if (!e.alt) w.push(where + 'Image alt text is missing.');
        if (!(e.points || []).length) w.push(where + 'No hotspots placed.');
        (e.points || []).forEach(function (p, i) { if (!p.header) w.push(where + 'Hotspot ' + (i + 1) + ' has no heading.'); });
      } else if (e.type === 'media') {
        if (!e.src) w.push(where + 'Media source is missing.');
        if (!e.title) w.push(where + 'Media title is missing (used as the accessible name).');
        if (e.kind === 'audio' && !e.transcript) w.push(where + 'Audio needs a transcript.');
      } else if (e.type === 'image') {
        if (!e.src) w.push(where + 'Image URL is missing.');
        if (!e.decorative && !e.alt) w.push(where + 'Image alt text is missing.');
      }
    }
    if (spec && spec.type === 'presentation') {
      if (!(spec.slides || []).length) w.push('Presentation has no slides.');
      (spec.slides || []).forEach(function (s, i) {
        if (!s.title) w.push('Slide ' + (i + 1) + ': no title.');
        (s.elements || []).forEach(function (e, j) { check(e, 'Slide ' + (i + 1) + ', item ' + (j + 1) + ': '); });
      });
    } else {
      check(spec, '');
    }
    return w;
  }

  /* --------------------------------- boot --------------------------------- */

  document.addEventListener('play', function (ev) {
    var t = ev.target;
    if (!t || !t.closest || !t.closest('.rcpi-ix')) return;
    qsa(document, '.rcpi-ix audio, .rcpi-ix video').forEach(function (m) {
      if (m !== t && !m.paused) m.pause();
    });
  }, true);

  window.RCPIInteractives = {
    __loaded: true,
    version: VERSION,
    init: init,
    initWithin: initWithin,
    render: render,
    markup: markup,
    validate: validate,
    obfuscate: obfuscate,
    deobfuscate: deobfuscate,
    esc: esc
  };

  function boot() {
    injectStyle();
    init();
    if (window.MutationObserver) {
      var timer;
      new MutationObserver(function () {
        clearTimeout(timer);
        timer = setTimeout(init, 100);
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();