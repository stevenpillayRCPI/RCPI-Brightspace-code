/* -------------------------------------------------------------------------- */
/* bootstrap-custom-cleanup.js — v1.6 (2026-10-13)                           */
/* -------------------------------------------------------------------------- */
/* Purpose                                                                    */
/* Shared runtime for RCPI / Brightspace template enhancements.               */
/* Loaded after bootstrap.bundle.js and exposed as window.BBCustomEnhancements.*/
/*                                                                            */
/* Public entry points                                                        */
/* - window.BBCustomEnhancements.init()                                       */
/* - window.BBCustomEnhancements.initWithin(root)                             */
/*                                                                            */
/* Notes                                                                      */
/* - This file is written for learner view.                                   */
/* - Many interactive blocks disable editing affordances because D2L edit     */
/*   view does not execute learner-side behavior in the same way.             */
/* - Initialisers are intended to be idempotent via data-* guards.            */
/* -------------------------------------------------------------------------- */

(function (window, document) {
  'use strict';

  if (window.BBCustomEnhancements && window.BBCustomEnhancements.__loaded) {
    return;
  }

  /* ------------------------------------------------------------------------ */
  /* Runtime state and shared selectors — start                               */
  /* ------------------------------------------------------------------------ */

  var state = {
    rowObserver: null,
    listObserver: null,
    clarityLoaded: false,
    referencesReady: false,
    carouselFullscreenBound: false,
    imageOverlayOpen: false
  };

  var SELECTORS = {
    nonDecorativeImages: 'img:not(.decorative):not(figure.decorative img):not(.decorative img)',
    standaloneImages: 'img:not(.decorative):not(figure.decorative img):not(.decorative img):not(.carousel-image img)',
    skipAnimatedLiWithin: '.collapse, .carousel, .modal, .tab-content, .tab-pane, .table, .flip-card, .offcanvas, .toast'
  };

  /* ------------------------------------------------------------------------ */
  /* Core helpers — start                                                     */
  /* ------------------------------------------------------------------------ */

  function qsa(root, selector) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function ensureOnce(el, key) {
    if (!el || !el.dataset) return false;
    if (el.dataset[key] === '1') return false;
    el.dataset[key] = '1';
    return true;
  }

  function safeClosest(el, selector) {
    return el && typeof el.closest === 'function' ? el.closest(selector) : null;
  }

  /* Detect Brightspace / Creator+ containers so image enhancements can skip them. */
  function isInsideCreatorPlus(el) {
    var node = el;
    while (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        var tag = node.tagName ? node.tagName.toLowerCase() : '';
        if ((tag && tag.indexOf('d2l-cplus') === 0) || (node.classList && node.classList.contains('d2l-element'))) {
          return true;
        }
      }
      if (node.parentElement) {
        node = node.parentElement;
        continue;
      }
      var root = node.getRootNode ? node.getRootNode() : null;
      if (root && root.host) {
        node = root.host;
        continue;
      }
      node = null;
    }
    return false;
  }

  /* ------------------------------------------------------------------------ */
  /* Structural cleanup and content normalization — start                     */
  /* ------------------------------------------------------------------------ */

  function initStructuralCleanup(root) {
    qsa(root, '.wysiwyg-mode').forEach(function (el) {
      el.classList.remove('wysiwyg-mode');
    });

    qsa(root, '.flip-card.show').forEach(function (el) {
      el.classList.remove('show');
    });

    qsa(root, '.editable-row-content').forEach(function (row) {
      var hasCols = !!row.querySelector('[class*="col-"]');

      if (!hasCols) {
        var children = Array.prototype.slice.call(row.childNodes);
        var hasText = children.some(function (node) {
          return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
        });
        var hasBlock = children.some(function (node) {
          return node.nodeType === Node.ELEMENT_NODE && /^(div|p|h1|h2|h3|h4|h5|h6|ul|ol|table|figure|section|article|blockquote)$/i.test(node.tagName);
        });

        if (!hasBlock && hasText) {
          var p = document.createElement('p');
          while (row.firstChild) {
            p.appendChild(row.firstChild);
          }
          row.appendChild(p);
        }
      }

      if (!row.querySelector('[class*="col-"]')) {
        var col = document.createElement('div');
        var frag = document.createDocumentFragment();
        col.className = 'col-12';
        while (row.firstChild) {
          frag.appendChild(row.firstChild);
        }
        col.appendChild(frag);
        row.appendChild(col);
      }
    });

    qsa(root, '.new-row-break, .deletion-guard').forEach(function (el) {
      el.remove();
    });

    qsa(root, '[contenteditable="true"]').forEach(function (el) {
      el.contentEditable = 'false';
      el.setAttribute('contenteditable', 'false');
    });

    qsa(root, '.row').forEach(function (row) {
      var children = Array.prototype.slice.call(row.children);
      var removePattern1 =
        children.length === 3 &&
        children[0].classList.contains('deletion-guard') &&
        children[1].classList.contains('editable-row-content') &&
        (children[1].children.length === 0 ||
          (children[1].children.length === 1 &&
            children[1].children[0].classList.contains('col-12') &&
            children[1].children[0].innerHTML.trim() === '')) &&
        children[2].classList.contains('deletion-guard');

      var removePattern2 =
        children.length === 1 &&
        children[0].classList.contains('editable-row-content') &&
        children[0].children.length === 1 &&
        children[0].children[0].classList.contains('col-12') &&
        children[0].children[0].innerHTML.trim() === '';

      if (removePattern1 || removePattern2) {
        row.remove();
      }
    });
  }

  /* Ensure every image has an alt attribute, even if empty. */
  function initImagesAlt(root) {
    qsa(root, 'img').forEach(function (img) {
      if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
    });
  }

  /* Add a visually-hidden "(opens in a new tab)" note to links that open in a
     new tab, so screen reader users are warned. Added at runtime rather than
     stored in the page HTML, to keep authored markup clean to edit. Skips
     links that already say so in their text or aria-label, and Creator+ /
     non-editable widget content. */
  function initNewTabNotes(root) {
    qsa(root, 'a[target="_blank"]').forEach(function (a) {
      if (!ensureOnce(a, 'bbNewTabNoteReady')) return;
      if (isInsideCreatorPlus(a)) return;
      if (safeClosest(a, '.mceNonEditable')) return;
      var ctx = a.textContent + ' ' + (a.getAttribute('aria-label') || '');
      if (/new (window|tab)|opens in (a )?new/i.test(ctx)) return;
      var span = document.createElement('span');
      span.className = 'visually-hidden';
      span.textContent = ' (opens in a new tab)';
      a.appendChild(span);
    });
  }

  /* Normalize reveal/collapse widgets for learner runtime without breaking
     edit-mode authoring where `.collapse.show` may be intentionally visible. */
  function initRevealBaseline(root) {
    function setCollapsed(trigger, expanded) {
      if (!trigger) return;
      trigger.classList.toggle('collapsed', !expanded);
      trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    function setPanel(panel, expanded) {
      if (!panel) return;
      panel.classList.add('collapse');
      panel.classList.toggle('show', expanded);
      /* No aria-hidden here: .collapse:not(.show) is display:none, which
         already hides a closed panel from assistive tech. Bootstrap never
         clears aria-hidden when it expands a panel, so setting it left
         expanded content invisible to screen readers. Also strips the stale
         value from existing markup. */
      panel.removeAttribute('aria-hidden');
    }

    qsa(root, '.accordion .accordion-item').forEach(function (item) {
      if (!ensureOnce(item, 'bbAccordionBaselineReady')) return;
      var trigger = item.querySelector('.accordion-button');
      var panel = item.querySelector('.accordion-collapse');
      if (!trigger || !panel) return;
      setCollapsed(trigger, false);
      setPanel(panel, false);
    });

    qsa(root, '.accordion').forEach(function (accordion) {
      if (!ensureOnce(accordion, 'bbAccordionLabelReady')) return;
      if (!accordion.id) return;
      var toggleButton = document.querySelector('.accordion-toggle-button[data-accordion-id="' + accordion.id + '"]');
      if (!toggleButton) return;
      toggleButton.innerText = 'Open All';
      toggleButton.setAttribute('aria-expanded', 'false');
    });

    qsa(root, '.reveal-table').forEach(function (wrapper) {
      if (!ensureOnce(wrapper, 'bbRevealBaselineReady')) return;
      qsa(wrapper, '.collapse').forEach(function (panel) {
        setPanel(panel, false);
      });
      qsa(wrapper, '[data-bs-toggle="collapse"]').forEach(function (trigger) {
        setCollapsed(trigger, false);
      });
    });

    /* Standalone reveal buttons: the target `.collapse` panel is a sibling of
       the button (inside the shared `.reveal-container`), not a descendant of
       it, so it must be looked up rather than queried within the trigger. */
    qsa(root, '.reveal-button').forEach(function (trigger) {
      if (!ensureOnce(trigger, 'bbRevealBaselineReady')) return;
      setCollapsed(trigger, false);
      var container = safeClosest(trigger, '.reveal-container');
      var panel = container ? container.querySelector('.collapse') : null;
      if (!panel) {
        var targetSelector = trigger.getAttribute('data-bs-target');
        panel = targetSelector ? document.querySelector(targetSelector) : null;
      }
      setPanel(panel, false);
    });
  }

  /* Unconditional safety net, run exactly once at true page load (see init()
     below) — never guarded by data-bb-* attributes, because those can
     themselves be stale (baked into pasted/exported markup from an already-
     initialized source), which is precisely what let broken accordion/reveal
     states slip through initRevealBaseline's normal ensureOnce guard. This
     forces every accordion item and reveal panel closed regardless of
     whatever guard state the markup arrived with. Only called for the
     initial full-document init — never from initWithin(partialRoot), so it
     can't undo a learner's in-progress interaction on a D2L content re-render. */
  function enforceCollapsedBaseline(root) {
    function forceCollapsed(trigger, panel) {
      if (!trigger || !panel) return;
      /* Read before writing: skip entirely if already correctly collapsed
         (the common case, since initRevealBaseline just did this). Two full
         passes of classList/attribute writes on every item back to back at
         page load is unnecessary churn; this only ever writes for the
         stale/broken case this function exists to catch. */
      var alreadyCollapsed =
        trigger.classList.contains('collapsed') &&
        trigger.getAttribute('aria-expanded') === 'false' &&
        !panel.classList.contains('show') &&
        !panel.hasAttribute('aria-hidden');
      if (alreadyCollapsed) return;
      trigger.classList.add('collapsed');
      trigger.setAttribute('aria-expanded', 'false');
      panel.classList.add('collapse');
      panel.classList.remove('show');
      panel.removeAttribute('aria-hidden');
    }

    qsa(root, '.accordion .accordion-item').forEach(function (item) {
      forceCollapsed(item.querySelector('.accordion-button'), item.querySelector('.accordion-collapse'));
    });

    qsa(root, '.reveal-table').forEach(function (wrapper) {
      qsa(wrapper, '[data-bs-toggle="collapse"]').forEach(function (trigger) {
        var target = trigger.getAttribute('data-bs-target');
        var panel = target ? wrapper.querySelector(target) : null;
        forceCollapsed(trigger, panel);
      });
    });

    qsa(root, '.reveal-button').forEach(function (trigger) {
      var container = safeClosest(trigger, '.reveal-container');
      var panel = container ? container.querySelector('.collapse') : null;
      if (!panel) {
        var targetSelector = trigger.getAttribute('data-bs-target');
        panel = targetSelector ? document.querySelector(targetSelector) : null;
      }
      forceCollapsed(trigger, panel);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Progressive animation helpers — start                                    */
  /* ------------------------------------------------------------------------ */

  function initListAnimations(root) {
    if (!('IntersectionObserver' in window)) return;
    if (!state.listObserver) {
      state.listObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            state.listObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
    }

    qsa(root, 'li').forEach(function (li) {
      if (!ensureOnce(li, 'bbLiAnimated')) return;
      if (safeClosest(li, SELECTORS.skipAnimatedLiWithin)) {
        li.style.animation = 'none';
        li.style.opacity = '1';
      } else {
        li.style.animationPlayState = 'paused';
        state.listObserver.observe(li);
      }
    });
  }

  function initRowFadeIns(root) {
    if (!('IntersectionObserver' in window)) return;
    if (!state.rowObserver) {
      state.rowObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            state.rowObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
    }

    qsa(root, '.row').forEach(function (row) {
      if (!ensureOnce(row, 'bbRowObserved')) return;
      state.rowObserver.observe(row);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Tables and overflow affordances — start                                  */
  /* ------------------------------------------------------------------------ */

    function ensureScrollWrap(tableContainer) {
    var parent = tableContainer.parentElement;
    if (parent && parent.classList.contains('table-scroll-wrap')) return parent;
    var wrap = document.createElement('div');
    wrap.className = 'table-scroll-wrap';
    parent.insertBefore(wrap, tableContainer);
    wrap.appendChild(tableContainer);
    return wrap;
  }

  function refreshScrollHint(tableContainer) {
    var wrap = tableContainer.parentElement;
    if (!wrap || !wrap.classList.contains('table-scroll-wrap')) return;
    var arrow = wrap.querySelector(':scope > .scroll-arrow');
    var maxScroll = tableContainer.scrollWidth - tableContainer.clientWidth;
    var more = maxScroll > 1 && tableContainer.scrollLeft < maxScroll - 1;
    wrap.classList.toggle('has-more', more);
    if (arrow) arrow.classList.toggle('show', more);

    var table = tableContainer.querySelector('table');
    if (!table) return;
    var caption = table.querySelector('caption');
    var onTop = !!caption && window.getComputedStyle(caption).captionSide !== 'bottom';
    var target = onTop ? caption : table.querySelector('tr');
    if (!target) return;
    var base = tableContainer.getBoundingClientRect().top;
    var rect = target.getBoundingClientRect();
    wrap.style.setProperty('--bb-hint-top', (rect.top - base) + 'px');
    wrap.style.setProperty('--bb-hint-h', rect.height + 'px');
    wrap.classList.toggle('hint-on-caption', onTop);
  }

  function createScrollArrow(tableContainer, wrap) {
    var button = document.createElement('button');
    button.className = 'scroll-arrow';
    button.type = 'button';
    button.setAttribute('aria-label', 'Scroll table to the right');
    button.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5 2l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    wrap.appendChild(button);
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      var remaining = tableContainer.scrollWidth - tableContainer.clientWidth - tableContainer.scrollLeft;
      var step = Math.min(tableContainer.clientWidth * 0.8, remaining);
      if (step > 0) tableContainer.scrollBy({ left: step, behavior: 'smooth' });
    });
    return button;
  }

  function initResponsiveTables(root) {
    qsa(root, '.table-responsive').forEach(function (tableContainer) {
      var ready = tableContainer.dataset.bbTableReady === '1' &&
        tableContainer.parentElement.classList.contains('table-scroll-wrap');
      if (ready) return;
      tableContainer.dataset.bbTableReady = '1';

      qsa(tableContainer, '.scroll-arrow').forEach(function (stale) { stale.remove(); });
      var wrap = ensureScrollWrap(tableContainer);
      createScrollArrow(tableContainer, wrap);

      var queued = false;
      function refresh() {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(function () {
          queued = false;
          refreshScrollHint(tableContainer);
        });
      }
      tableContainer.addEventListener('scroll', refresh, { passive: true });
      if ('ResizeObserver' in window) {
        var ro = new ResizeObserver(refresh);
        ro.observe(tableContainer);
        var table = tableContainer.querySelector('table');
        if (table) ro.observe(table);
      } else {
        window.addEventListener('resize', refresh);
      }
      refreshScrollHint(tableContainer);
    });

    qsa(root, '.collapse').forEach(function (collapsible) {
      if (!ensureOnce(collapsible, 'bbCollapseTableBound')) return;
      collapsible.addEventListener('shown.bs.collapse', function () {
        qsa(collapsible, '.table-responsive').forEach(refreshScrollHint);
        if (qsa(collapsible, 'iframe[src*="h5p"]').length) {
          window.dispatchEvent(new Event('resize'));
        }
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Inline guidance and accordion helpers — start                            */
  /* ------------------------------------------------------------------------ */

  // Belt-and-braces for hand-edited or pre-fix markup: the builder now omits
  // the Open All button for single-item accordions at generation time, but
  // this catches any accordion that lost items down to one after the fact
  // (or was authored before that fix) and still has an orphaned button.
  function cleanupSingleItemAccordionButtons(root) {
    qsa(root, '.accordion').forEach(function (accordion) {
      if (qsa(accordion, '.accordion-item').length !== 1) return;
      if (!accordion.id) return;
      var toggleButton = document.querySelector('.accordion-toggle-button[data-accordion-id="' + accordion.id + '"]');
      if (!toggleButton) return;
      var wrapper = toggleButton.closest('.d-flex.justify-content-end') || toggleButton;
      wrapper.remove();
    });
  }

  function initInstructionText(root) {
    var instructions = {
      '.carousel.image-carousel': 'Use the arrows to change slides. Use the fullscreen icon to view in full screen.',
      '.carousel.text-carousel': 'Use the arrows to change slides.',
      '.flip-cards': 'Select each card to flip it and view the back.',
      '.reveal-button': 'Select button to reveal content.',
      '.reveal-table': 'Select buttons to reveal content.',
      '.modal-button': 'Select button to open a popup window.',
      '.horizontal-tabs': 'Select each tab to switch between content panels. You may also use your keyboard arrow keys.',
      '.vertical-tabs-wrapper': 'Select each tab to switch between content panels. You may also use your keyboard arrow keys.',
      '.offcanvas-button': 'Select button to open a side panel.',
      '.popover-button': 'Select button for additional information.',
      '.toast-button': 'Select button to show a notification.'
    };

    Object.keys(instructions).forEach(function (selector) {
      qsa(root, selector).forEach(function (element) {
        if (element.dataset.bbInstructionAdded === '1') return;
        var p = document.createElement('p');
        p.textContent = instructions[selector];
        p.style.fontSize = '1rem';
        element.parentNode.insertBefore(p, element);
        element.dataset.bbInstructionAdded = '1';
      });
    });

    // Accordion instruction text depends on whether Open All applies, so it's
    // handled separately from the static selector map above.
    qsa(root, '.accordion:not(.transcript)').forEach(function (accordion) {
      if (accordion.dataset.bbInstructionAdded === '1') return;
      var isSingleItem = qsa(accordion, '.accordion-item').length === 1;
      var p = document.createElement('p');
      p.textContent = isSingleItem
        ? 'Select the heading to expand the section.'
        : 'Select each heading or use the Open All button to expand sections.';
      p.style.fontSize = '1rem';
      accordion.parentNode.insertBefore(p, accordion);
      accordion.dataset.bbInstructionAdded = '1';
    });
  }

  function updateLiveRegion(message) {
    var liveRegion = document.getElementById('accordion-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'accordion-live-region';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('aria-live', 'polite');
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = message;
  }

  function initAccordions(root) {
    qsa(root, '.accordion-toggle-button').forEach(function (toggleButton) {
      if (!ensureOnce(toggleButton, 'bbAccordionToggleReady')) return;
      toggleButton.addEventListener('click', function () {
        var accordionId = this.getAttribute('data-accordion-id');
        if (!accordionId) return;
        var accordion = document.getElementById(accordionId);
        if (!accordion) return;

        var accordionButtons = qsa(accordion, '.accordion-button').filter(function (btn) {
          return safeClosest(btn, '.accordion') === accordion;
        });
        var collapseDivs = qsa(accordion, '.accordion-collapse').filter(function (div) {
          return safeClosest(div, '.accordion') === accordion;
        });
        var allExpanded = accordionButtons.every(function (btn) {
          return !btn.classList.contains('collapsed');
        });

        if (allExpanded) {
          accordionButtons.forEach(function (btn) {
            btn.classList.add('collapsed');
            btn.setAttribute('aria-expanded', 'false');
          });
          collapseDivs.forEach(function (div) { div.classList.remove('show'); });
          toggleButton.innerText = 'Open All';
          updateLiveRegion('All accordion items collapsed');
        } else {
          accordionButtons.forEach(function (btn) {
            btn.classList.remove('collapsed');
            btn.setAttribute('aria-expanded', 'true');
          });
          collapseDivs.forEach(function (div) { div.classList.add('show'); });
          toggleButton.innerText = 'Collapse All';
          updateLiveRegion('All accordion items expanded');
        }
      });
    });

    qsa(root, '.accordion-button').forEach(function (button) {
      if (!ensureOnce(button, 'bbAccordionButtonReady')) return;
      button.addEventListener('click', function () {
        setTimeout(function () {
          var accordion = safeClosest(button, '.accordion');
          if (!accordion) return;
          var toggleButton = document.querySelector('.accordion-toggle-button[data-accordion-id="' + accordion.id + '"]');
          if (!toggleButton) return;
          var accordionButtons = qsa(accordion, '.accordion-button').filter(function (b) {
            return safeClosest(b, '.accordion') === accordion;
          });
          var allExpanded = accordionButtons.every(function (btn) {
            return !btn.classList.contains('collapsed');
          });
          toggleButton.innerText = allExpanded ? 'Collapse All' : 'Open All';
        }, 10);
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Generic interaction helpers — start                                      */
  /* ------------------------------------------------------------------------ */

  var flipCardUid = 0;

  function setFlipFaceHidden(face, hidden) {
    if (!face) return;
    if (hidden) {
      face.setAttribute('aria-hidden', 'true');
      face.setAttribute('inert', '');
    } else {
      face.removeAttribute('aria-hidden');
      face.removeAttribute('inert');
    }
  }

  // Single source of truth for a card's flipped state: class, toggle button
  // state, and which face is exposed to assistive tech and keyboard focus.
  function setFlipState(card, flipped) {
    card.classList.toggle('flipped', flipped);
    if (card.dataset.bbFlipA11y !== '1') return;
    var btn = card.querySelector(':scope > .flip-card-toggle');
    if (btn) btn.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    setFlipFaceHidden(card.querySelector('.flip-card-front'), flipped);
    setFlipFaceHidden(card.querySelector('.flip-card-back'), !flipped);
  }

  // Applies to every card in the DOM, new or historical: no markup changes
  // are needed in saved pages. Skips cards still in the editor "show" layout.
  function enhanceFlipCards(root) {
    if (!document.getElementById('bb-flip-card-a11y-css')) {
      var css = document.createElement('style');
      css.id = 'bb-flip-card-a11y-css';
      css.textContent =
        '.flip-card{position:relative}' +
        '.flip-card-toggle{position:absolute;bottom:.25rem;right:.25rem;z-index:2;width:2.75rem;height:2.75rem;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer}' +
        '.flip-card.flipped>.flip-card-toggle{right:auto;left:.25rem}' +
        '.flip-card-toggle:focus,.flip-card-toggle:focus-visible{outline:none;box-shadow:none}' +
        '.flip-card:has(>.flip-card-toggle:focus-visible){outline:3px solid #000;outline-offset:2px;border-radius:var(--bs-border-radius)}';
      document.head.appendChild(css);
    }

    qsa(root, '.flip-card').forEach(function (card) {
      if (card.dataset.bbFlipA11y === '1' || card.classList.contains('show')) return;
      card.dataset.bbFlipA11y = '1';

      // Name the group from the front title; make that id unique on the page
      // (builders number cards from 0, so separate sets can collide).
      var title = card.querySelector('.flip-card-front h3');
      if (title) {
        var id = title.id;
        if (!id || document.querySelectorAll('[id="' + id.replace(/"/g, '\\"') + '"]').length > 1) {
          id = 'flip-card-title-bb' + (++flipCardUid);
          title.id = id;
        }
        card.setAttribute('aria-labelledby', id);
        card.setAttribute('role', 'group');
      }

      // aria-label and tabindex on a plain div exposed no role or state.
      var inner = card.querySelector('.flip-card-inner');
      if (inner) {
        inner.removeAttribute('aria-label');
        inner.removeAttribute('tabindex');
      }

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'flip-card-toggle';
      btn.setAttribute('aria-label', 'Flip card');
      card.insertBefore(btn, card.firstChild);

      setFlipState(card, card.classList.contains('flipped'));
    });
  }

  function initFlipCards(root) {
    enhanceFlipCards(root || document);

    if (document.documentElement.dataset.bbFlipCardsReady === '1') return;
    document.documentElement.dataset.bbFlipCardsReady = '1';

    // Mouse and keyboard activation of the toggle button both arrive here as
    // click events, so no separate keydown handling is needed for it.
    document.addEventListener('click', function (event) {
      var card = event.target.closest('.flip-card');
      if (!card) return;
      setFlipState(card, !card.classList.contains('flipped'));
    });

    // Fallback for any card that was not enhanced (still has the old
    // focusable inner div).
    document.addEventListener('keydown', function (event) {
      if (!event.target.matches || !event.target.matches('.flip-card-inner[tabindex]')) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        var card = event.target.closest('.flip-card');
        if (card) setFlipState(card, !card.classList.contains('flipped'));
      }
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Images, media and fullscreen behavior — start                            */
  /* ------------------------------------------------------------------------ */

  function requestFs(el) {
    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    if (el.msRequestFullscreen) return el.msRequestFullscreen();
    if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
    return Promise.reject();
  }

  function exitFs() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    if (document.msExitFullscreen) return document.msExitFullscreen();
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
  }

  function initCarouselFullscreen(root) {
    qsa(root, '.carousel:not(.text-carousel)').forEach(function (carousel) {
      if (!ensureOnce(carousel, 'bbCarouselFsReady')) return;

      var fullscreenIcon = carousel.querySelector('.fullscreen-icon');
      if (!fullscreenIcon) {
        fullscreenIcon = document.createElement('div');
        fullscreenIcon.className = 'fullscreen-icon';
        fullscreenIcon.style.right = '3rem';
        fullscreenIcon.setAttribute('role', 'button');
        fullscreenIcon.setAttribute('aria-label', 'View image in fullscreen');
        fullscreenIcon.setAttribute('tabindex', '0');
        var icon = document.createElement('i');
        icon.className = 'bi bi-arrows-fullscreen';
        icon.setAttribute('aria-hidden', 'true');
        fullscreenIcon.appendChild(icon);
        carousel.appendChild(fullscreenIcon);
      }

      var parent = carousel.parentElement;
      if (parent) {
        parent.addEventListener('mouseenter', function () { fullscreenIcon.style.opacity = '1'; });
        parent.addEventListener('mouseleave', function () { fullscreenIcon.style.opacity = '0.2'; });
      }

      function toggle() {
        if (document.fullscreenElement === carousel) exitFs();
        else requestFs(carousel);
      }

      fullscreenIcon.addEventListener('click', toggle);
      fullscreenIcon.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });

    if (!state.carouselFullscreenBound) {
      state.carouselFullscreenBound = true;
      document.addEventListener('fullscreenchange', function () {
        qsa(document, '.carousel:not(.text-carousel)').forEach(function (carousel) {
          if (document.fullscreenElement === carousel) {
            carousel.style.overflow = 'auto';
            qsa(carousel, '.carousel-image img').forEach(function (img) {
              img.style.maxHeight = '80vh';
              img.style.height = 'auto';
              img.style.width = '100%';
              img.style.objectFit = 'contain';
              if (img.classList.contains('decorative')) return;
              img.dataset.bbZoomArmed = '1';
              img.style.cursor = 'zoom-in';
              img.setAttribute('role', 'button');
              img.setAttribute('tabindex', '0');
              var existingLabel = img.getAttribute('aria-label');
              img.setAttribute('aria-label', (existingLabel || img.alt || 'Image') + ' — view alone in full screen');
            });
            qsa(carousel, '.carousel-caption').forEach(function (caption) {
              caption.style.maxWidth = '80%';
              caption.style.margin = '0 auto';
            });
          } else {
            /* Clear, don't force 'hidden': the indicators sit at top:-1rem,
               partly outside the carousel box, so overflow:hidden clipped
               them. This branch also runs for every carousel whenever any
               one enters or leaves fullscreen. */
            carousel.style.overflow = '';
            qsa(carousel, '.carousel-image img').forEach(function (img) {
              img.style.maxHeight = '';
              img.style.height = '';
              img.style.width = '';
              img.style.objectFit = '';
              delete img.dataset.bbZoomArmed;
              img.style.cursor = '';
              img.removeAttribute('role');
              img.removeAttribute('tabindex');
              img.removeAttribute('aria-label');
            });
            qsa(carousel, '.carousel-caption').forEach(function (caption) {
              caption.style.maxWidth = '';
              caption.style.left = '';
              caption.style.right = '';
              caption.style.transform = '';
              caption.style.margin = '';
            });
          }
        });
      });
    }
  }

  /* Lets a carousel image be viewed alone (no caption) via the same lightbox
     used for standalone images, distinct from the fullscreen-icon path above
     which intentionally fullscreens the whole carousel including its caption.
     Only active once the carousel itself is in fullscreen — see the
     fullscreenchange handler in initCarouselFullscreen, which arms/disarms
     this via the image's data-bb-zoom-armed flag. Outside fullscreen the
     image has no zoom cursor and clicking it does nothing. */
  function initCarouselImageZoom(root) {
    qsa(root, '.carousel:not(.text-carousel) .carousel-image img:not(.decorative)').forEach(function (image) {
      if (!ensureOnce(image, 'bbCarouselImageZoomReady')) return;

      var open = function (event) {
        if (image.dataset.bbZoomArmed !== '1') return;
        event.stopPropagation();
        buildImageOverlay(image, image);
      };
      image.addEventListener('click', open);
      image.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (image.dataset.bbZoomArmed !== '1') return;
          e.preventDefault();
          open(e);
        }
      });
    });
  }

  /* Build a fullscreen iframe overlay for standalone images. */
  function buildImageOverlay(image, trigger) {
    if (state.imageOverlayClose) {
      state.imageOverlayClose();
      return;
    }

    document.body.style.overflow = 'hidden';
    var iframe = document.createElement('iframe');
    iframe.id = 'img-overlay';
    iframe.setAttribute('role', 'dialog');
    iframe.setAttribute('aria-modal', 'true');
    iframe.setAttribute('allow', 'fullscreen');
    iframe.srcdoc = [
      '<!DOCTYPE html>',
      '<html style="height:100%;margin:0;background:black">',
      '<head><meta name="viewport" content="width=device-width,initial-scale=1">',
      '<style>',
      'html,body{height:100%;}',
      'body{margin:0;padding:0;display:flex;align-items:center;justify-content:center;overflow:auto;background:black;}',
      '#fs-img{display:block;margin:auto;max-width:100vw;max-height:100vh;width:auto;height:auto;cursor:zoom-in;transition:all 0.3s ease;}',
      '#fs-img.unconstrained{max-width:none;max-height:none;cursor:zoom-out;transition:none;}',
      '#fs-close{position:fixed;top:1rem;right:1rem;width:2.5rem;height:2.5rem;border:none;border-radius:50%;background:rgba(255,255,255,0.15);color:#fff;font-size:1.5rem;line-height:1;cursor:pointer;}',
      '#fs-close:hover{background:rgba(255,255,255,0.3);}',
      '</style></head><body>',
      '<button id="fs-close" type="button" aria-label="Close full screen image">&times;</button>',
      '<img id="fs-img" src="' + image.src.replace(/"/g, '&quot;') + '" alt="' + (image.alt || 'Fullscreen image').replace(/"/g, '&quot;') + '">',
      '<script>',
      'let escPressed=false;',
      'const img=document.getElementById("fs-img");',
      'const closeBtn=document.getElementById("fs-close");',
      'img.addEventListener("click",function(e){',
      '  e.stopPropagation();',
      '  if(img.classList.contains("unconstrained")){',
      '    img.classList.remove("unconstrained");',
      '    return;',
      '  }',
      '  const rect=img.getBoundingClientRect();',
      '  const xRatio=(e.clientX-rect.left)/rect.width;',
      '  const yRatio=(e.clientY-rect.top)/rect.height;',
      '  img.classList.add("unconstrained");',
      '  requestAnimationFrame(function(){',
      '    const newRect=img.getBoundingClientRect();',
      '    const targetX=newRect.left+xRatio*newRect.width-window.innerWidth/2;',
      '    const targetY=newRect.top+yRatio*newRect.height-window.innerHeight/2;',
      '    document.scrollingElement.scrollLeft+=targetX;',
      '    document.scrollingElement.scrollTop+=targetY;',
      '  });',
      '});',
      // Click on the black backdrop (not the image itself) closes, same as Escape.
      'document.body.addEventListener("click",function(e){if(e.target===document.body){escPressed=true;parent.postMessage("close","*");}});',
      'closeBtn.addEventListener("click",function(){escPressed=true;parent.postMessage("close","*");});',
      'document.addEventListener("fullscreenchange",function(){if(!document.fullscreenElement&&!escPressed)parent.postMessage("close","*");});',
      'document.addEventListener("keydown",function(e){if(e.key==="Escape"){escPressed=true;parent.postMessage("close","*");}});',
      '<' + '/script>',
      '</body></html>'
    ].join('');

    iframe.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;z-index:2147483647;background:black;';
    document.body.appendChild(iframe);

    var iframeRef = iframe;

    // Shared close path for every trigger: Escape/backdrop/close-button inside
    // the iframe (via postMessage), the browser exiting fullscreen on its own,
    // and re-clicking whatever opened this overlay (see the guard at the top
    // of this function). document.exitFullscreen() covers the case where the
    // fallback fullscreen target was the parent document itself; removing the
    // iframe covers the (usual) case where the iframe's own document was the
    // fullscreen target, since detaching the fullscreen element forces the
    // browser to exit fullscreen automatically.
    var cleanup = function () {
      if (document.exitFullscreen) document.exitFullscreen().catch(function () {});
      document.body.style.overflow = '';
      if (iframeRef.parentNode) iframeRef.parentNode.removeChild(iframeRef);
      window.removeEventListener('message', messageHandler);
      window.removeEventListener('fullscreenchange', fsHandler);
      state.imageOverlayClose = null;
      trigger.focus();
    };

    var messageHandler = function (e) {
      if (e.data === 'close') cleanup();
    };

    var fsHandler = function () {
      if (!document.fullscreenElement) cleanup();
    };

    state.imageOverlayClose = cleanup;
    window.addEventListener('message', messageHandler);
    window.addEventListener('fullscreenchange', fsHandler);

    iframe.addEventListener('load', function () {
      try {
        requestFs(iframe.contentDocument.documentElement).catch(function () {
          requestFs(document.documentElement);
        });
      } catch (e) {
        requestFs(document.documentElement);
      }
    }, { once: true });
  }

  function initStandaloneImageFullscreen(root) {
    qsa(root, SELECTORS.standaloneImages).forEach(function (image) {
      if (isInsideCreatorPlus(image)) return;
      if (image.dataset.bbStandaloneFsReady === '1') return;

      var container = image.parentElement;
      if (!container.classList.contains('image-container')) {
        var wrapper = document.createElement('div');
        wrapper.className = 'image-container';
        image.parentNode.insertBefore(wrapper, image);
        wrapper.appendChild(image);
        container = wrapper;
      }

      if (window.getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
      }

      if (container.querySelector('.fullscreen-icon')) {
        image.dataset.bbStandaloneFsReady = '1';
        return;
      }

      var fullscreenIcon = document.createElement('div');
      fullscreenIcon.className = 'fullscreen-icon';
      fullscreenIcon.style.right = '1rem';
      fullscreenIcon.setAttribute('role', 'button');
      fullscreenIcon.setAttribute('aria-label', 'View image in fullscreen');
      fullscreenIcon.setAttribute('tabindex', '0');

      var icon = document.createElement('i');
      icon.className = 'bi bi-arrows-fullscreen';
      icon.setAttribute('aria-hidden', 'true');
      fullscreenIcon.appendChild(icon);
      container.appendChild(fullscreenIcon);

      var toggle = function () { buildImageOverlay(image, fullscreenIcon); };
      fullscreenIcon.addEventListener('click', toggle);
      fullscreenIcon.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });

      image.dataset.bbStandaloneFsReady = '1';
    });
  }

  function initAltBadges(root) {
    qsa(root, SELECTORS.nonDecorativeImages).forEach(function (image) {
      if (isInsideCreatorPlus(image)) return;
      if (image.dataset.bbAltReady === '1') return;

      var container = image.parentElement;
      if (!container) return;
      if (window.getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
      }
      if (container.querySelector('.alt-button')) {
        image.dataset.bbAltReady = '1';
        return;
      }

      var altButton = document.createElement('div');
      altButton.className = 'alt-button';
      altButton.style.left = '1rem';
      altButton.setAttribute('role', 'presentation');
      altButton.setAttribute('aria-hidden', 'true');
      altButton.setAttribute('tabindex', '-1');
      altButton.textContent = 'ALT';
      container.appendChild(altButton);

      altButton.addEventListener('click', function () {
        var existing = container.querySelector('.alt-popover');
        if (existing) existing.remove();
        var popOver = document.createElement('div');
        popOver.className = 'alt-popover';
        popOver.textContent = image.getAttribute('alt') || 'NONE';
        container.appendChild(popOver);

        var handleMouseLeave = function () {
          if (popOver.parentNode) popOver.parentNode.removeChild(popOver);
          altButton.removeEventListener('mouseleave', handleMouseLeave);
        };
        altButton.addEventListener('mouseleave', handleMouseLeave);
      });

      image.dataset.bbAltReady = '1';
    });
  }

  function initMediaPlayers(root) {
    qsa(root, 'iframe').forEach(function (iframe) {
      var src = iframe.getAttribute('src') || '';
      if (!(src.indexOf('d2l') !== -1 && src.indexOf('mediaplayer') !== -1)) return;
      if (iframe.parentElement && iframe.parentElement.classList.contains('iframe-center-wrapper')) return;

      var wrapper = document.createElement('div');
      wrapper.className = 'iframe-center-wrapper';
      wrapper.style.display = 'flex';
      wrapper.style.justifyContent = 'center';
      wrapper.style.width = '100%';
      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* H5P iframe auto-resize — start                                           */
  /* Content sometimes embeds H5P's own resizer script inline, sometimes not. */
  /* Ported here so it works regardless, guarded by window.h5pResizerInitialized */
  /* so only one copy (content's or ours, whichever runs first) is ever active. */
  /* ------------------------------------------------------------------------ */

  function initH5PResizer() {
    if (!window.postMessage || !window.addEventListener || window.h5pResizerInitialized) return;
    window.h5pResizerInitialized = true;

    var actionHandlers = {};

    actionHandlers.hello = function (iframe, data, respond) {
      iframe.style.width = '100%';
      iframe.getBoundingClientRect();
      var resize = function () {
        if (iframe.contentWindow) {
          respond('resize');
        } else {
          window.removeEventListener('resize', resize);
        }
      };
      window.addEventListener('resize', resize, false);
      respond('hello');
    };

    actionHandlers.prepareResize = function (iframe, data, respond) {
      if (iframe.clientHeight !== data.scrollHeight || data.scrollHeight !== data.clientHeight) {
        iframe.style.height = data.clientHeight + 'px';
        respond('resizePrepared');
      }
    };

    actionHandlers.resize = function (iframe, data) {
      iframe.style.height = data.scrollHeight + 'px';
    };

    window.addEventListener('message', function (event) {
      if (!event.data || event.data.context !== 'h5p') return;
      var iframe, iframes = document.getElementsByTagName('iframe');
      for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow === event.source) { iframe = iframes[i]; break; }
      }
      if (!iframe) return;
      if (actionHandlers[event.data.action]) {
        actionHandlers[event.data.action](iframe, event.data, function respond(action, data) {
          data = data || {};
          data.action = action;
          data.context = 'h5p';
          event.source.postMessage(data, event.origin);
        });
      }
    }, false);
  }

  /* Ping newly-present H5P iframes (lazy-loaded included) with "ready", so    */
  /* content that waits for the parent before sending "hello" still connects. */
  /* Content that sends "hello" unprompted works either way. */
  function initH5PIframes(root) {
    qsa(root, 'iframe[src*="h5p"]').forEach(function (iframe) {
      if (!ensureOnce(iframe, 'bbH5pReady')) return;
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({ context: 'h5p', action: 'ready' }, '*');
      }
    });
  }
  /* H5P iframe auto-resize — end                                             */

  /* ------------------------------------------------------------------------ */
  /* DataTables and Bootstrap component wiring — start                        */
  /* ------------------------------------------------------------------------ */

  function initDataTables(root) {
    if (typeof window.DataTable === 'undefined') return;

    qsa(root, '.datatable table').forEach(function (tableElement) {
      if (!ensureOnce(tableElement, 'bbDatatableReady')) return;

      var dt = new window.DataTable(tableElement, {
        perPage: 10,
        perPageSelect: [5, 10, 15, 20, 25],
        searchable: true,
        sortable: true,
        fixedHeight: false,
        layout: { top: '{search}{select}', bottom: '{info}{pager}' },
        classes: {
          container: 'dataTable-container',
          wrapper: 'dataTable-wrapper',
          input: 'dataTable-input',
          selector: 'dataTable-selector',
          table: 'table',
          thead: '',
          footer: 'dataTable-footer'
        }
      });

            var tableWrapper = tableElement.closest('.table-responsive');
      if (!tableWrapper) return;
      var refresh = function () { refreshScrollHint(tableWrapper); };
      refresh();
      if (typeof dt.on === 'function') {
        dt.on('datatable.sort', refresh);
        dt.on('datatable.page', refresh);
      }
    });
  }

  function initBootstrapComponents(root) {
    if (!window.bootstrap) return;

    qsa(root, '[data-bs-toggle="tooltip"]').forEach(function (el) {
      if (!ensureOnce(el, 'bbTooltipReady')) return;
      new window.bootstrap.Tooltip(el);
    });

    qsa(root, '[data-bs-toggle="popover"]').forEach(function (el) {
      if (!ensureOnce(el, 'bbPopoverReady')) return;
      new window.bootstrap.Popover(el);
    });

    var toastTrigger = document.getElementById('liveToastBtn');
    var toastLiveExample = document.getElementById('liveToast');
    if (toastTrigger && toastLiveExample && ensureOnce(toastTrigger, 'bbToastReady')) {
      toastTrigger.addEventListener('click', function () {
        var toast = new window.bootstrap.Toast(toastLiveExample);
        toast.show();
      });
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Miscellaneous learner-view enhancements — start                          */
  /* ------------------------------------------------------------------------ */

  function initGifRestart(root) {
    qsa(root, 'img[src$=".gif"], img[src*=".gif?"]').forEach(function (gif) {
      if (!ensureOnce(gif, 'bbGifReady')) return;
      gif.style.cursor = 'pointer';
      gif.addEventListener('click', function () {
        var src = gif.src.split('?')[0];
        gif.src = src + '?reload=' + Math.random();
      });
    });
  }

  function initPdfOverlays(root) {
    qsa(root, '.pdf-container').forEach(function (container) {
      if (container.querySelector('.pdf-overlay')) return;
      var overlay = document.createElement('div');
      overlay.className = 'pdf-overlay';
      overlay.addEventListener('click', function () {
        overlay.classList.add('hidden');
      });
      container.appendChild(overlay);
    });
  }

  function initClarity() {
    if (state.clarityLoaded) return;
    state.clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 't4ez073cf1');
  }

  /* ------------------------------------------------------------------------ */
  /* References and reflections — start                                       */
  /* ------------------------------------------------------------------------ */

  /* Build the references offcanvas and convert [[1]] style markers into triggers. */
  function initReferencesOffcanvas() {
    if (state.referencesReady) return;
    var accordion = document.querySelector('#references-accordion');
    if (!accordion) return;
    var ol = accordion.querySelector('ol');
    if (!ol || !window.bootstrap) return;
    var refItems = qsa(ol, 'li');
    if (!refItems.length) return;

    var existing = document.getElementById('refOffcanvas');
    if (existing) {
      state.referencesReady = true;
      return;
    }

    var offcanvas = document.createElement('div');
    offcanvas.className = 'offcanvas offcanvas-end';
    offcanvas.id = 'refOffcanvas';
    offcanvas.tabIndex = -1;
    offcanvas.setAttribute('aria-labelledby', 'refOffcanvasLabel');
    offcanvas.innerHTML = [
      '<div class="offcanvas-header">',
      '<h5 class="offcanvas-title" id="refOffcanvasLabel">References</h5>',
      '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>',
      '</div>',
      '<div class="offcanvas-body"><ol id="refOffcanvasList" class="mb-0"></ol></div>'
    ].join('');
    document.body.appendChild(offcanvas);

    var offcanvasList = document.getElementById('refOffcanvasList');
    refItems.forEach(function (li, index) {
      var clone = li.cloneNode(true);
      clone.id = 'ref-' + (index + 1);
      offcanvasList.appendChild(clone);
    });

    var bsOffcanvas = new window.bootstrap.Offcanvas(offcanvas);

    function openOffcanvasAndScroll(targetId) {
      var offcanvasBody = offcanvas.querySelector('.offcanvas-body');
      var target = document.getElementById(targetId);
      if (!offcanvasBody || !target) {
        bsOffcanvas.show();
        return;
      }
      var handler = function () {
        var bodyRect = offcanvasBody.getBoundingClientRect();
        var targetRect = target.getBoundingClientRect();
        var offset = targetRect.top - bodyRect.top;
        offcanvasBody.scrollTo({ top: offcanvasBody.scrollTop + offset, behavior: 'smooth' });
        target.setAttribute('tabindex', '-1');
        setTimeout(function () { target.focus(); }, 200);
        offcanvas.removeEventListener('shown.bs.offcanvas', handler);
      };
      offcanvas.addEventListener('shown.bs.offcanvas', handler);
      bsOffcanvas.show();
    }

    function replaceInTextNodes(root) {
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
      var textNodes = [];
      var cur;
      while ((cur = walker.nextNode())) {
        if (cur.nodeValue && cur.nodeValue.indexOf('[[') !== -1) textNodes.push(cur);
      }
      textNodes.forEach(function (textNode) {
        var parent = textNode.parentNode;
        var parts = textNode.nodeValue.split(/(\[\[[^\]]+\]\])/g);
        var frag = document.createDocumentFragment();

        parts.forEach(function (part) {
          if (/^\[\[[^\]]+\]\]$/.test(part)) {
            var inner = part.slice(2, -2).trim();
            var tokens = inner.split(/[\s,;]+/).map(function (t) { return t.trim(); }).filter(Boolean);
            if (!tokens.length) return;
            var sup = document.createElement('sup');

            tokens.forEach(function (token, idx) {
              var rangeMatch = token.match(/^(\d+)\s*-\s*(\d+)$/);
              var singleMatch = token.match(/^\d+$/);
              var btn;
              if (rangeMatch) {
                var start = parseInt(rangeMatch[1], 10);
                btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = token;
                btn.className = 'btn p-0 m-0 align-baseline ref-trigger';
                btn.setAttribute('data-ref-target', 'ref-' + start);
                btn.setAttribute('aria-label', 'View reference ' + start + ' in a side panel');
                btn.addEventListener('click', function (e) {
                  e.preventDefault();
                  openOffcanvasAndScroll('ref-' + start);
                });
              } else if (singleMatch) {
                var n = parseInt(token, 10);
                btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = token;
                btn.className = 'btn p-0 m-0 align-baseline ref-trigger';
                btn.setAttribute('data-ref-target', 'ref-' + n);
                btn.setAttribute('aria-label', 'View reference ' + n + ' in a side panel');
                btn.addEventListener('click', function (e) {
                  e.preventDefault();
                  openOffcanvasAndScroll('ref-' + n);
                });
              }
              if (idx > 0) sup.appendChild(document.createTextNode(' '));
              sup.appendChild(btn || document.createTextNode(token));
            });
            frag.appendChild(sup);
          } else {
            frag.appendChild(document.createTextNode(part));
          }
        });
        parent.replaceChild(frag, textNode);
      });
    }

    replaceInTextNodes(document.body);
    state.referencesReady = true;
  }

  /* Tab keyboard access. Panels get tabindex=0 so Tab from the tab list lands
     in the content (ARIA Authoring Practices pattern). Bootstrap also treats
     Up/Down as tab switching on every tab list, which traps a screen reader
     user in focus mode on horizontal tabs, so there Down moves into the active
     panel instead. Vertical tab lists keep Up/Down for switching. */
  function initTabAccess(root) {
    qsa(root, '.tab-pane[role="tabpanel"]').forEach(function (pane) {
      if (!pane.hasAttribute('tabindex')) pane.setAttribute('tabindex', '0');
    });

    if (document.documentElement.dataset.bbTabAccessReady === '1') return;
    document.documentElement.dataset.bbTabAccessReady = '1';

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowDown' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      var tab = event.target && event.target.closest ? event.target.closest('[role="tab"]') : null;
      if (!tab) return;
      var list = tab.closest('[role="tablist"]');
      if (!list) return;
      if (list.getAttribute('aria-orientation') === 'vertical' ||
          list.classList.contains('flex-column') ||
          list.closest('.vertical-tabs-wrapper')) return;

      var sel = tab.getAttribute('data-bs-target') || tab.getAttribute('href');
      var pane = null;
      if (sel && sel.charAt(0) === '#') pane = document.getElementById(sel.slice(1));
      if (!pane && tab.getAttribute('aria-controls')) pane = document.getElementById(tab.getAttribute('aria-controls'));
      if (!pane || !pane.classList.contains('active')) return;

      if (!pane.hasAttribute('tabindex')) pane.setAttribute('tabindex', '0');
      event.preventDefault();
      event.stopPropagation();
      pane.focus();
    }, true);
  }

  function initCarouselNextLabels(root) {
    qsa(root, '.carousel').forEach(function (carouselEl) {
      if (!ensureOnce(carouselEl, 'bbCarouselLabelReady')) return;
      var items = qsa(carouselEl, '.carousel-item');
      if (!items.length) return;
      /* Slides sit before the Next button in the DOM, so a screen reader user
         had to arrow back up after every press. After a slide change that the
         user started from a control (Next, Previous, indicator), focus moves
         to the new slide so reading continues from its content. Auto-rotation
         never steals focus: it only fires when focus is already on a control
         inside this carousel. */
      if (!document.getElementById('bb-carousel-a11y-css')) {
        var cs = document.createElement('style');
        cs.id = 'bb-carousel-a11y-css';
        cs.textContent = '.carousel-item[tabindex="-1"]:focus{outline:none}' +
          '.carousel-item[tabindex="-1"]:focus-visible{outline:3px solid #000;outline-offset:-3px}';
        document.head.appendChild(cs);
      }
      carouselEl.addEventListener('slid.bs.carousel', function (e) {
        var focused = document.activeElement;
        if (!focused || !carouselEl.contains(focused)) return;
        if (focused.closest('.carousel-inner')) return;
        var slide = e.relatedTarget || carouselEl.querySelector('.carousel-item.active');
        if (!slide) return;
        if (!slide.hasAttribute('tabindex')) slide.setAttribute('tabindex', '-1');
        slide.focus({ preventScroll: true });
      });
      var nextBtn = carouselEl.querySelector('.carousel-control-next, .text-carousel-control-next');
      var nextHidden = nextBtn ? nextBtn.querySelector('.visually-hidden') : null;

      function activeIndex() {
        return items.findIndex(function (item) { return item.classList.contains('active'); });
      }

      function updateState(index) {
        var isLast = index === items.length - 1;
        carouselEl.classList.toggle('is-last-slide', isLast);
        if (nextBtn) nextBtn.setAttribute('aria-label', isLast ? 'Next slide, back to first slide' : 'Next slide');
        if (nextHidden) nextHidden.textContent = isLast ? 'Next, back to first slide' : 'Next';
      }

      updateState(Math.max(0, activeIndex()));
      carouselEl.addEventListener('slid.bs.carousel', function (e) {
        updateState(typeof e.to === 'number' ? e.to : Math.max(0, activeIndex()));
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Tab panel footer navigation — start                                      */
  /* Adds Previous / Next buttons at the bottom of every tab panel (works for  */
  /* both .horizontal-tabs and .vertical-tabs-wrapper — they share the same   */
  /* .tab-content/.tab-pane DOM shape), so a learner scrolled down a long      */
  /* panel doesn't have to scroll back up to move on. Switching tabs scrolls  */
  /* the tab list back into view and moves focus to the newly active tab.     */
  /* Opt out per tab set with data-tab-nav="false" on the .horizontal-tabs or  */
  /* .vertical-tabs-wrapper element (or any ancestor).                        */
  /* ------------------------------------------------------------------------ */

  function initTabPanelNav(root) {
    qsa(root, '.tab-content').forEach(function (tabContent) {
      if (safeClosest(tabContent, '[data-tab-nav="false"]')) return;
      if (!ensureOnce(tabContent, 'bbTabNavReady')) return;

      /* Direct child panes only, so a tab set nested inside another tab's
         panel is handled separately by its own .tab-content. */
      var entries = [];
      Array.prototype.slice.call(tabContent.children).forEach(function (pane) {
        if (!pane.classList || !pane.classList.contains('tab-pane') || !pane.id) return;
        var trigger = qsa(document, '[data-bs-toggle="tab"][data-bs-target="#' + pane.id + '"], [data-bs-toggle="pill"][data-bs-target="#' + pane.id + '"]')[0];
        if (!trigger || trigger.classList.contains('disabled') || trigger.disabled) return;
        entries.push({ pane: pane, trigger: trigger });
      });
      if (entries.length < 2) return;

      var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* Native scrollIntoView's "smooth" duration isn't adjustable and reads
         as an abrupt jump, so this animates the scroll itself over a longer,
         fixed duration with easing, giving the learner time to register that
         the page moved. Takes an optional onDone callback, fired once the
         animation finishes (or immediately, for the reduced-motion jump). */
      function smoothScrollTo(targetY, duration, onDone) {
        if (reduceMotion) {
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
          if (onDone) onDone();
          return;
        }

        var startY = window.pageYOffset;
        var delta = targetY - startY;
        var startTime = null;

        function easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        function step(timestamp) {
          if (startTime === null) startTime = timestamp;
          var elapsed = timestamp - startTime;
          var progress = Math.min(elapsed / duration, 1);
          window.scrollTo({ top: startY + delta * easeInOutQuad(progress), left: 0, behavior: 'instant' });
          if (progress < 1) window.requestAnimationFrame(step);
          else if (onDone) onDone();
        }

        window.requestAnimationFrame(step);
      }

      /* Scrolls to the tabs BEFORE switching panes, not after. Switching
         first (as bs.tab's own events would encourage) reflows the page the
         instant the pane changes — since panes are usually different
         lengths, whatever was below jumps into or out of view immediately,
         and then the scroll animation runs on top of that, reading as two
         separate jumps. Scrolling first, against the still-visible old pane,
         then swapping panes only once anchored at the tabs, keeps it to one
         motion; any reflow from the new pane's length then happens below the
         anchor point, off screen or at the very bottom of the viewport. */
      function goTo(target) {
        var tabsWrapper = safeClosest(target.trigger, '.horizontal-tabs, .vertical-tabs-wrapper')
          || safeClosest(target.trigger, '[role="tablist"], .nav')
          || target.trigger;

        var targetY = Math.max(tabsWrapper.getBoundingClientRect().top + window.pageYOffset - 16, 0);

        function switchPane() {
          if (window.bootstrap && window.bootstrap.Tab) {
            window.bootstrap.Tab.getOrCreateInstance(target.trigger).show();
          } else {
            target.trigger.click();
          }
          target.trigger.focus({ preventScroll: true });
        }

        var wrapRect = tabsWrapper.getBoundingClientRect();
        var trigRect = target.trigger.getBoundingClientRect();
        var inView = wrapRect.top >= 0 && trigRect.bottom <= window.innerHeight;
        if (inView) switchPane();
        else smoothScrollTo(targetY, 700, switchPane);
      }

      entries.forEach(function (entry, i) {
        var footer = document.createElement('div');
        footer.className = 'bb-tab-nav d-flex flex-wrap justify-content-between gap-2 mt-4 pt-4';
        footer.style.borderTop = '1px solid lightgrey';
        footer.setAttribute('role', 'group');
        footer.setAttribute('aria-label', 'Tab navigation');

        function makeBtn(target, isNext) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'btn ' + (isNext ? 'btn-primary' : 'btn-outline-primary') + ' bb-tab-nav-btn';
          btn.style.flexShrink = '0';
          /* .col-12 *:last-child / .editable-row-content *:last-child (see
             bootstrap.css) zero out margin-bottom on whichever button ends up
             DOM-last — only Next when a Previous button is present — leaving
             it out of step with the base <button> reset's default 2rem
             bottom margin on the other. Pin both explicitly so neither
             depends on last-child position. */
          btn.style.marginBottom = '0';
          btn.textContent = isNext ? 'Next tab →' : '← Previous tab';
          btn.addEventListener('click', function () { goTo(target); });
          return btn;
        }

        if (i > 0) {
          footer.appendChild(makeBtn(entries[i - 1], false));
        } else {
          footer.appendChild(document.createElement('span'));
        }

        if (i < entries.length - 1) {
          footer.appendChild(makeBtn(entries[i + 1], true));
        }

        entry.pane.appendChild(footer);
      });
    });
  }
  /* Tab panel footer navigation — end                                        */

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------------------------ */
  /* Learner input blocks (reflection, prompt box, worksheet) — start         */
  /* One engine for all three. Every textarea inside a block autosaves to     */
  /* localStorage, and each block gets Copy, Save to Word and Reset buttons.  */
  /* Buttons already in the markup are reused; missing ones are created. All  */
  /* three sit in one row that fills the available width.                     */
  /*                                                                          */
  /* Markup contract                                                          */
  /* - .reflection    [data-reflection] [data-title]   textarea(s)            */
  /* - .prompt-box    [data-prompt]     [data-title]   textarea (pre-filled)  */
  /* - .worksheet     [data-worksheet]                 table with textareas   */
  /* The data-* id is part of the storage key. A missing id falls back to the */
  /* block's position on the page; a repeated id gets a numeric suffix.       */
  /* ------------------------------------------------------------------------ */

  var INPUT_TYPES = [
    { sel: '.reflection', attr: 'data-reflection', base: 'reflection', kind: 'text', title: 'Reflection', reset: 'Reset', confirm: 'Clear what you have written in this box?' },
    { sel: '.prompt-box', attr: 'data-prompt', base: 'prompt', kind: 'text', title: 'Prompt', reset: 'Reset to original', confirm: 'Reset the prompt to the original text? Your edits will be lost.' },
    { sel: '.worksheet', attr: 'data-worksheet', base: 'worksheet', kind: 'table', title: 'Worksheet', reset: 'Reset table', confirm: 'Clear everything you have entered in this table?' }
  ];

  var INPUT_BUTTONS = {
    copy: { sel: '[data-bb-action="copy"], .bb-copy, .prompt-copy', label: 'Copy to clipboard', cls: ['btn', 'btn-primary'] },
    exportDoc: { sel: '[data-bb-action="export"], .bb-export, .save-reflection, .prompt-export, .worksheet-export', label: 'Save to Word Document', cls: ['btn', 'btn-primary'] },
    reset: { sel: '[data-bb-action="reset"], .bb-reset, .prompt-reset, .worksheet-reset', label: '', cls: ['btn', 'btn-outline-primary'] }
  };

  function pageTitleText(fallback) {
    var h1 = document.querySelector('h1');
    return (h1 && h1.textContent.trim()) || fallback;
  }

  /* Stable id for a block: its data attribute, else base-position, with a
     numeric suffix if an earlier block on the page resolves to the same id. */
  function resolveInputId(block, type) {
    var all = qsa(document, type.sel);
    function raw(el) {
      return (el.getAttribute(type.attr) || '').trim() || (type.base + '-' + (all.indexOf(el) + 1));
    }
    var want = raw(block);
    var earlier = all.slice(0, all.indexOf(block)).filter(function (o) { return raw(o) === want; }).length;
    return earlier ? want + '-' + (earlier + 1) : want;
  }

  function copyTextToClipboard(text, done) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    } else {
      fallback();
    }
  }

  function downloadWordDoc(html, fileName) {
    var blob = new Blob([html], { type: 'application/msword' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function flashButton(btn, text) {
    if (!btn.dataset.bbLabel) btn.dataset.bbLabel = btn.textContent;
    btn.textContent = text;
    clearTimeout(btn._bbTimer);
    btn._bbTimer = setTimeout(function () { btn.textContent = btn.dataset.bbLabel; }, 1500);
  }

  function initInputBlocks(root) {
    INPUT_TYPES.forEach(function (type) {
      qsa(root, type.sel).forEach(function (block) {
        if (!ensureOnce(block, 'bbInputReady')) return;
        var fields = qsa(block, 'textarea');
        if (!fields.length) return;

        var id = resolveInputId(block, type);
        var number = String(qsa(document, type.sel).indexOf(block) + 1).padStart(2, '0');
        var key = 'bb-input:' + location.pathname + ':' + type.base + ':' + id;
        var originals = fields.map(function (f) { return f.defaultValue; });

        /* Restore and autosave. */
        try {
          var saved = JSON.parse(localStorage.getItem(key) || 'null');
          if (Array.isArray(saved)) {
            fields.forEach(function (f, i) { if (typeof saved[i] === 'string') f.value = saved[i]; });
          }
        } catch (e) {}
        function save() {
          try { localStorage.setItem(key, JSON.stringify(fields.map(function (f) { return f.value; }))); } catch (e) {}
        }
        fields.forEach(function (f) { f.addEventListener('input', save); });

        /* Content builders. */
        function hasContent() {
          return fields.some(function (f) { return f.value.trim(); });
        }

        function plainText() {
          var table = type.kind === 'table' ? block.querySelector('table') : null;
          if (!table) {
            return fields.map(function (f) { return f.value; }).join('\n\n').trim();
          }
          var heads = qsa(table, 'thead th').map(function (th) { return th.textContent.trim(); });
          return qsa(table, 'tbody tr').map(function (tr) {
            var cells = qsa(tr, 'th, td');
            var lines = [cells[0] ? cells[0].textContent.trim() : ''];
            cells.slice(1).forEach(function (c, i) {
              var f = c.querySelector('textarea');
              lines.push((heads[i + 1] || '') + ': ' + (f ? f.value.trim() : c.textContent.trim()));
            });
            return lines.join('\n');
          }).join('\n\n');
        }

        function docTitle() {
          var explicit = (block.getAttribute('data-title') || '').trim();
          if (explicit) return explicit;
          if (type.kind === 'table') {
            var cap = block.querySelector('caption');
            if (cap && cap.textContent.trim()) return cap.textContent.trim();
          } else {
            var heading = block.querySelector('.reflection-title, h2, h3');
            if (heading && heading.textContent.trim()) return heading.textContent.trim();
          }
          return type.title;
        }

        function docHtml() {
          var title = docTitle();
          var table = type.kind === 'table' ? block.querySelector('table') : null;
          var body;
          if (table) {
            var cellStyle = 'border:1px solid #000;padding:6pt;vertical-align:top;';
            var head = qsa(table, 'thead th').map(function (th) {
              return '<th style="' + cellStyle + 'background:#e6e6e6;text-align:left;">' + escHtml(th.textContent.trim()) + '</th>';
            }).join('');
            var rows = qsa(table, 'tbody tr').map(function (tr) {
              return '<tr>' + qsa(tr, 'th, td').map(function (c) {
                var f = c.querySelector('textarea');
                var text = f ? f.value : c.textContent.trim();
                return '<td style="' + cellStyle + '">' + escHtml(text).replace(/\r?\n/g, '<br>') + '</td>';
              }).join('') + '</tr>';
            }).join('');
            body = '<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:11pt;"><tr>' + head + '</tr>' + rows + '</table>';
          } else {
            body = '<div style="font-family:Arial,sans-serif;font-size:12pt;line-height:1.5;">' + escHtml(plainText()).replace(/\r?\n/g, '<br>') + '</div>';
          }
          return '<html><head><meta charset="utf-8"><title>' + escHtml(title) + '</title></head><body><h2>' + escHtml(title) + '</h2>' + body + '</body></html>';
        }

        function docFileName() {
          var page = pageTitleText(type.title).replace(/\s+/g, '-');
          if (type.base === 'reflection') return page + '-reflection-' + number + '.doc';
          if (type.base === 'prompt') return id + '.doc';
          return page + '-' + id + '.doc';
        }

        /* Buttons: reuse what is there, create what is missing, then gather
           all three into one full-width row. */
        var actions = block.querySelector('.bb-input-actions');
        var btns = {};
        var oldParents = [];
        Object.keys(INPUT_BUTTONS).forEach(function (role) {
          var spec = INPUT_BUTTONS[role];
          var btn = block.querySelector(spec.sel);
          if (btn) {
            if (btn.parentNode && oldParents.indexOf(btn.parentNode) < 0) oldParents.push(btn.parentNode);
          } else {
            btn = document.createElement('button');
            btn.textContent = role === 'reset' ? type.reset : spec.label;
          }
          btn.type = 'button';
          spec.cls.forEach(function (c) { btn.classList.add(c); });
          btn.classList.add('bb-' + role);
          btn.style.flex = '1 1 9rem';
          btn.style.width = 'auto';
          btn.style.margin = '0';
          btn.style.padding = '0.625rem 1rem';
          btn.style.fontSize = '1rem';
          btns[role] = btn;
        });

        if (!actions) {
          actions = document.createElement('div');
          actions.className = 'bb-input-actions';
          var anchor = type.kind === 'table'
            ? (block.querySelector('.table-responsive') || block.querySelector('table'))
            : fields[fields.length - 1];
          if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(actions, anchor.nextSibling);
          else block.appendChild(actions);
        }
        actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:0.5rem;width:100%;margin-top:' + (type.kind === 'table' ? '1rem' : '0') + ';';
        ['copy', 'exportDoc', 'reset'].forEach(function (role) { actions.appendChild(btns[role]); });

        oldParents.forEach(function (p) {
          if (p !== block && p !== actions && p.parentNode && !p.children.length && !p.textContent.trim()) {
            p.parentNode.removeChild(p);
          }
        });

        /* Behaviour. */
        btns.copy.addEventListener('click', function (e) {
          e.preventDefault();
          copyTextToClipboard(plainText(), function (ok) {
            flashButton(btns.copy, ok ? 'Copied' : 'Copy failed');
          });
        });

        btns.exportDoc.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (!hasContent()) {
            window.alert('Please enter some text before saving.');
            fields[0].focus();
            return;
          }
          downloadWordDoc(docHtml(), docFileName());
          flashButton(btns.exportDoc, 'Saved');
        });

        btns.reset.addEventListener('click', function (e) {
          e.preventDefault();
          if (!window.confirm(type.confirm)) return;
          fields.forEach(function (f, i) { f.value = originals[i]; });
          try { localStorage.removeItem(key); } catch (err) {}
        });
      });
    });
  }
  /* Learner input blocks — end                                               */

  /* Enforce a 1rem minimum text size across dynamically inserted content. */
  function initMinFontGuard() {
    if (document.documentElement.dataset.bbMinFontGuardReady === '1') return;
    document.documentElement.dataset.bbMinFontGuardReady = '1';

    var MIN_REM = 1;
    var TEXT_TAGS = new Set([
      'P', 'SPAN', 'A', 'LI', 'DT', 'DD', 'TD', 'TH', 'LABEL', 'BUTTON', 'INPUT', 'TEXTAREA',
      'SELECT', 'OPTION', 'LEGEND', 'SUMMARY', 'CAPTION', 'FIGCAPTION', 'BLOCKQUOTE',
      'CODE', 'PRE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SMALL', 'STRONG', 'EM', 'B', 'I', 'U', 'TIME'
    ]);
    var seen = new WeakSet();
    var observedRoots = new WeakSet();

    function remPx(doc) {
      return parseFloat(window.getComputedStyle(doc.documentElement).fontSize);
    }

    function hasDirectText(el) {
      return Array.prototype.slice.call(el.childNodes).some(function (n) {
        return n.nodeType === Node.TEXT_NODE && n.textContent.trim();
      });
    }

    function shouldCheck(el) {
      return el instanceof Element && (TEXT_TAGS.has(el.tagName) || hasDirectText(el));
    }

    function fixElement(el, doc) {
      if (!(el instanceof Element)) return;
      if (seen.has(el)) return;
      seen.add(el);
      if (!shouldCheck(el)) return;
      var fontPx = parseFloat(window.getComputedStyle(el).fontSize);
      var minPx = MIN_REM * remPx(doc);
      if (!Number.isNaN(fontPx) && fontPx < minPx) {
        el.style.setProperty('font-size', '1rem', 'important');
      }
    }

    function walkNode(node, doc) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.parentElement) fixElement(node.parentElement, doc);
        return;
      }
      if (!(node instanceof Element)) return;
      fixElement(node, doc);
      if (node.shadowRoot) {
        observeRoot(node.shadowRoot, doc);
        walkRoot(node.shadowRoot, doc);
      }
      if (node.tagName === 'SLOT') {
        try {
          node.assignedNodes({ flatten: true }).forEach(function (assigned) { walkNode(assigned, doc); });
          node.addEventListener('slotchange', function () {
            node.assignedNodes({ flatten: true }).forEach(function (assigned) { walkNode(assigned, doc); });
          });
        } catch (e) {}
      }
      Array.prototype.slice.call(node.childNodes).forEach(function (child) { walkNode(child, doc); });
    }

    function walkRoot(root, doc) {
      if (root.childNodes) Array.prototype.slice.call(root.childNodes).forEach(function (node) { walkNode(node, doc); });
    }

    function observeRoot(root, doc) {
      if (!root || observedRoots.has(root)) return;
      observedRoots.add(root);
      var mo = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.type === 'childList') {
            Array.prototype.slice.call(m.addedNodes).forEach(function (node) {
              if (node.nodeType === Node.ELEMENT_NODE) walkNode(node, doc);
            });
          }
          if (m.type === 'characterData' && m.target.parentElement) {
            fixElement(m.target.parentElement, doc);
          }
        });
      });
      mo.observe(root, { childList: true, subtree: true, characterData: true });
    }

    function start() {
      observeRoot(document.documentElement, document);
      walkRoot(document, document);
    }

    onReady(start);
  }

  /* ------------------------------------------------------------------------ */
  /* RCPI knowledge checks (match / categorise) — runtime; learner view — start */
  /* ------------------------------------------------------------------------ */

  function initMatchWidgets(root) {
    qsa(root, '.match').forEach(function (widget) {
      if (widget.dataset.matchReady) return;
      widget.dataset.matchReady = '1';

      var ACTIVE = 'is-active';
      var ASSIGNED = 'is-assigned';
      var CORRECT = 'is-correct';
      var INCORRECT = 'is-incorrect';
      var CHECKED = 'is-checked';
      var mode = widget.dataset.mode === 'match' ? 'match' : 'categorise';
      var pool = widget.querySelector('.match-pool');
      var bins = qsa(widget, '.match-bin');
      var options = qsa(widget, '.match-option');
      var status = widget.querySelector('.match-status');
      var checkBtn = widget.querySelector('.match-check');
      var resetBtn = widget.querySelector('.match-reset');
      var picked = null;
      var frozen = false;

      widget.setAttribute('contenteditable', 'false');
      qsa(widget, '[contenteditable="true"]').forEach(function (n) { n.setAttribute('contenteditable', 'false'); });

      function el(tag, cls) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        return n;
      }

      function label(node) {
        var l = node.querySelector('.match-bin-label, span');
        return (l ? l.textContent : '').trim();
      }

      function shuffle(nodes) {
        for (var i = nodes.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var a = nodes[i];
          var b = nodes[j];
          a.parentNode.insertBefore(b, a);
          if (b.nextSibling !== a) a.parentNode.insertBefore(a, b);
        }
      }

      bins.forEach(function (bin) {
        bin.removeAttribute('data-bin-pos');
        if (!bin.querySelector('.match-bin-items')) bin.appendChild(el('div', 'match-bin-items'));
        bin.setAttribute('tabindex', '0');
        bin.setAttribute('role', 'button');
        bin.setAttribute('aria-label', 'Place selected item under ' + label(bin));
      });

      options.forEach(function (opt) {
        opt.removeAttribute('data-bin-pos');
        opt.setAttribute('aria-pressed', 'false');
        if (!opt.querySelector('.match-mark')) {
          var mark = el('span', 'match-mark');
          mark.setAttribute('aria-hidden', 'true');
          var sr = el('span', 'match-mark-sr visually-hidden');
          opt.appendChild(mark);
          opt.appendChild(sr);
        }
      });

      if (pool) shuffle(qsa(pool, '.match-option'));
      if (!widget.querySelector('.match-instructions')) {
        var tip = el('p', 'match-instructions');
        tip.textContent = 'Select an item, then select a bin to place it. Select a placed item to return it.';
        widget.insertBefore(tip, widget.firstChild);
      }

      function release() {
        if (!picked) return;
        picked.classList.remove(ACTIVE);
        picked.setAttribute('aria-pressed', 'false');
        picked = null;
      }

      function pick(opt) {
        if (frozen) return;
        if (picked === opt) {
          release();
          return;
        }
        release();
        picked = opt;
        opt.classList.add(ACTIVE);
        opt.setAttribute('aria-pressed', 'true');
      }

      function placeInPool(opt) {
        opt.classList.remove(ASSIGNED);
        pool.appendChild(opt);
      }

      function assign(bin) {
        if (frozen || !picked) return;
        var slot = bin.querySelector('.match-bin-items');
        if (mode === 'match') {
          var current = slot.querySelector('.match-option');
          if (current && current !== picked) placeInPool(current);
        }
        picked.classList.add(ASSIGNED);
        slot.appendChild(picked);
        release();
      }

      function check() {
        var total = options.length;
        var correct = 0;
        frozen = true;
        widget.classList.add(CHECKED);
        options.forEach(function (opt) {
          var binEl = opt.closest('.match-bin');
          var ok = !!binEl && binEl.dataset.binId === opt.dataset.bin;
          opt.classList.remove(CORRECT, INCORRECT);
          opt.classList.add(ok ? CORRECT : INCORRECT);
          opt.querySelector('.match-mark').textContent = ok ? '✓' : '✗';
          opt.querySelector('.match-mark-sr').textContent = ok ? ' Correct.' : ' Incorrect.';
          if (ok) correct++;
        });
        if (status) status.textContent = correct + ' of ' + total + ' correct.';
      }

      function reset() {
        frozen = false;
        widget.classList.remove(CHECKED);
        release();
        options.forEach(function (opt) {
          opt.classList.remove(CORRECT, INCORRECT, ASSIGNED);
          opt.querySelector('.match-mark').textContent = '';
          opt.querySelector('.match-mark-sr').textContent = '';
          pool.appendChild(opt);
        });
        shuffle(qsa(pool, '.match-option'));
        if (status) status.textContent = '';
      }

      options.forEach(function (opt) {
        opt.addEventListener('click', function (e) {
          if (frozen) return;
          if (opt.classList.contains('is-assigned')) {
            e.stopPropagation();
            release();
            placeInPool(opt);
            return;
          }
          pick(opt);
        });
      });

      bins.forEach(function (bin) {
        bin.addEventListener('click', function () { assign(bin); });
        bin.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            assign(bin);
          }
        });
      });

      if (checkBtn) checkBtn.addEventListener('click', check);
      if (resetBtn) resetBtn.addEventListener('click', reset);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* RCPI knowledge checks (choice + fill in the blank) — runtime; learner view — start */
  /* ------------------------------------------------------------------------ */

  function initChoiceAndFitb(root) {
    var SELECTED = 'is-selected';
    var CORRECT = 'is-correct';
    var INCORRECT = 'is-incorrect';
    var CHECKED = 'is-checked';

    function el(tag, cls) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      return n;
    }

    function neutralise(node) {
      node.setAttribute('contenteditable', 'false');
      qsa(node, '[contenteditable="true"]').forEach(function (n) { n.setAttribute('contenteditable', 'false'); });
    }

    function collapseAll(node) {
      qsa(node, '.kc-feedback').forEach(function (fb) { fb.classList.add('kc-collapsed'); });
    }

    function freeze(node, on) {
      node.classList.toggle(CHECKED, !!on);
    }

    function status(node, txt) {
      var s = node.querySelector('.kc-status');
      if (s) s.textContent = txt || '';
    }

    function revealOverall(node, allCorrect, clean) {
      qsa(node, '.kc-feedback[data-when]').forEach(function (fb) {
        var when = fb.dataset.when;
        var show = (when === 'correct' && allCorrect && clean) || (when === 'incorrect' && !(allCorrect && clean));
        if (show && fb.textContent.trim()) fb.classList.remove('kc-collapsed');
      });
    }

    function ensureMark(node) {
      if (node.querySelector(':scope > .kc-mark')) return;
      var m = el('span', 'kc-mark');
      m.setAttribute('aria-hidden', 'true');
      var sr = el('span', 'kc-mark-sr visually-hidden');
      node.appendChild(m);
      node.appendChild(sr);
    }

    function setMark(node, ok) {
      node.classList.remove(CORRECT, INCORRECT);
      node.classList.add(ok ? CORRECT : INCORRECT);
      var m = node.querySelector(':scope > .kc-mark');
      if (m) m.textContent = ok ? '✓' : '✗';
      var sr = node.querySelector(':scope > .kc-mark-sr');
      if (sr) sr.textContent = ok ? ' Correct.' : ' Incorrect.';
    }

    function clearMark(node) {
      node.classList.remove(CORRECT, INCORRECT, SELECTED);
      var m = node.querySelector(':scope > .kc-mark');
      if (m) m.textContent = '';
      var sr = node.querySelector(':scope > .kc-mark-sr');
      if (sr) sr.textContent = '';
    }

    qsa(root, '.choice').forEach(function (widget) {
      if (widget.dataset.kcReady) return;
      widget.dataset.kcReady = '1';
      neutralise(widget);
      collapseAll(widget);
      var multi = widget.dataset.select === 'multi';
      var options = qsa(widget, '.choice-option');
      var checkBtn = widget.querySelector('.kc-check');
      var resetBtn = widget.querySelector('.kc-reset');

      options.forEach(function (opt) {
        opt.removeAttribute('data-correct-hint');
        ensureMark(opt);
        opt.setAttribute('role', multi ? 'checkbox' : 'radio');
        opt.setAttribute('aria-checked', 'false');
        opt.addEventListener('click', function () {
          if (widget.classList.contains(CHECKED)) return;
          if (multi) {
            opt.classList.toggle(SELECTED);
          } else {
            options.forEach(function (o) {
              o.classList.remove(SELECTED);
              o.setAttribute('aria-checked', 'false');
            });
            opt.classList.add(SELECTED);
          }
          opt.setAttribute('aria-checked', opt.classList.contains(SELECTED) ? 'true' : 'false');
        });
      });

      function check() {
        if (widget.classList.contains(CHECKED)) return;
        freeze(widget, true);
        var totalCorrect = 0;
        var correctSel = 0;
        var incorrectSel = 0;
        options.forEach(function (opt) {
          var isCorrect = opt.dataset.correct === 'true';
          var sel = opt.classList.contains(SELECTED);
          if (isCorrect) {
            totalCorrect++;
            setMark(opt, true);
            if (sel) correctSel++;
          } else if (sel) {
            incorrectSel++;
            setMark(opt, false);
          }
          var ofb = opt.querySelector(':scope > .kc-feedback[data-scope="option"]');
          if (sel && ofb && ofb.textContent.trim()) ofb.classList.remove('kc-collapsed');
        });
        var clean = incorrectSel === 0;
        var allCorrect = correctSel === totalCorrect;
        status(widget, multi
          ? correctSel + ' of ' + totalCorrect + ' correct selected' + (incorrectSel ? ', ' + incorrectSel + ' incorrect.' : '.')
          : (allCorrect && clean ? 'Correct.' : 'Not quite.'));
        revealOverall(widget, allCorrect, clean);
      }

      function reset() {
        freeze(widget, false);
        collapseAll(widget);
        status(widget, '');
        options.forEach(function (opt) {
          clearMark(opt);
          opt.setAttribute('aria-checked', 'false');
        });
      }

      if (checkBtn) checkBtn.addEventListener('click', check);
      if (resetBtn) resetBtn.addEventListener('click', reset);
    });

    qsa(root, '.fitb').forEach(function (widget) {
      if (widget.dataset.kcReady) return;
      widget.dataset.kcReady = '1';
      neutralise(widget);
      var body = widget.querySelector('.fitb-body');
      if (body) {
        body.innerHTML = body.innerHTML.replace(/\[\[([^\]]+)\]\]/g, function (_, ans) {
          var escaped = ans.trim()
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          return '<span class="fitb-blank"><input type="text" class="fitb-input" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Fill in the blank" data-answers="' + escaped + '"><span class="kc-mark" aria-hidden="true"></span><span class="kc-mark-sr visually-hidden"></span></span>';
        });
      }
      collapseAll(widget);
      var blanks = qsa(widget, '.fitb-blank');
      var checkBtn = widget.querySelector('.kc-check');
      var resetBtn = widget.querySelector('.kc-reset');

      function norm(s) {
        return String(s).replace(/\s+/g, ' ').trim().toLowerCase();
      }

      function check() {
        if (widget.classList.contains(CHECKED)) return;
        freeze(widget, true);
        var total = blanks.length;
        var got = 0;
        blanks.forEach(function (bl) {
          var input = bl.querySelector('.fitb-input');
          var accepted = (input.getAttribute('data-answers') || '').split('|').map(norm).filter(Boolean);
          var ok = accepted.indexOf(norm(input.value)) !== -1;
          input.disabled = true;
          bl.classList.remove(CORRECT, INCORRECT);
          bl.classList.add(ok ? CORRECT : INCORRECT);
          var m = bl.querySelector('.kc-mark');
          if (m) m.textContent = ok ? '✓' : '✗';
          var sr = bl.querySelector('.kc-mark-sr');
          if (sr) sr.textContent = ok ? ' Correct.' : ' Incorrect.';
          if (ok) got++;
        });
        status(widget, got + ' of ' + total + ' correct.');
        revealOverall(widget, got === total, true);
      }

      function reset() {
        freeze(widget, false);
        collapseAll(widget);
        status(widget, '');
        blanks.forEach(function (bl) {
          var input = bl.querySelector('.fitb-input');
          input.disabled = false;
          input.value = '';
          bl.classList.remove(CORRECT, INCORRECT);
          var m = bl.querySelector('.kc-mark');
          if (m) m.textContent = '';
          var sr = bl.querySelector('.kc-mark-sr');
          if (sr) sr.textContent = '';
        });
      }

      if (checkBtn) checkBtn.addEventListener('click', check);
      if (resetBtn) resetBtn.addEventListener('click', reset);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* RCPI knowledge checks (ordering + mark the words) — runtime; learner view — start */
  /* ------------------------------------------------------------------------ */

  function initOrderingAndMarkWords(root) {
    var SELECTED = 'is-selected';
    var CORRECT = 'is-correct';
    var INCORRECT = 'is-incorrect';
    var MISSED = 'is-missed';
    var CHECKED = 'is-checked';

    function el(tag, cls) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      return n;
    }

    function neutralise(node) {
      node.setAttribute('contenteditable', 'false');
      qsa(node, '[contenteditable="true"]').forEach(function (n) { n.setAttribute('contenteditable', 'false'); });
    }

    function collapseAll(node) {
      qsa(node, '.kc-feedback').forEach(function (fb) { fb.classList.add('kc-collapsed'); });
    }

    function freeze(node, on) {
      node.classList.toggle(CHECKED, !!on);
    }

    function status(node, txt) {
      var s = node.querySelector('.kc-status');
      if (s) s.textContent = txt || '';
    }

    function revealOverall(node, allCorrect, clean) {
      qsa(node, '.kc-feedback[data-when]').forEach(function (fb) {
        var when = fb.dataset.when;
        var show = (when === 'correct' && allCorrect && clean) || (when === 'incorrect' && !(allCorrect && clean));
        if (show && fb.textContent.trim()) fb.classList.remove('kc-collapsed');
      });
    }

    function shuffleInto(list, sel) {
      var items = qsa(list, sel);
      for (var i = items.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = items[i];
        items[i] = items[j];
        items[j] = t;
      }
      items.forEach(function (it) { list.appendChild(it); });
      return items;
    }

    qsa(root, '.ordering').forEach(function (widget) {
      if (widget.dataset.kcReady) return;
      widget.dataset.kcReady = '1';
      neutralise(widget);
      collapseAll(widget);
      var list = widget.querySelector('.ordering-list');
      var checkBtn = widget.querySelector('.kc-check');
      var resetBtn = widget.querySelector('.kc-reset');
      if (!list) return;

      qsa(list, '.ordering-item').forEach(function (it) {
        if (it.querySelector(':scope > .ordering-controls')) return;
        var c = el('span', 'ordering-controls');
        c.innerHTML = '<button type="button" class="ordering-up" aria-label="Move up">↑</button><button type="button" class="ordering-down" aria-label="Move down">↓</button>';
        it.insertBefore(c, it.firstChild);
      });

      function doShuffle() {
        var items = shuffleInto(list, '.ordering-item');
        var inPlace = items.every(function (it, i) {
          return parseInt(it.dataset.order, 10) === i + 1;
        });
        if (inPlace && items.length > 1) list.insertBefore(items[1], items[0]);
      }

      doShuffle();

      list.addEventListener('click', function (e) {
        if (widget.classList.contains(CHECKED)) return;
        var up = e.target.closest('.ordering-up');
        var dn = e.target.closest('.ordering-down');
        if (up) {
          var a = up.closest('.ordering-item');
          if (a.previousElementSibling) list.insertBefore(a, a.previousElementSibling);
        } else if (dn) {
          var b = dn.closest('.ordering-item');
          if (b.nextElementSibling) list.insertBefore(b.nextElementSibling, b);
        }
      });

      function check() {
        if (widget.classList.contains(CHECKED)) return;
        freeze(widget, true);
        var current = qsa(list, '.ordering-item');
        var n = current.length;
        var got = 0;
        current.forEach(function (it, idx) {
          var ok = parseInt(it.dataset.order, 10) === idx + 1;
          it.classList.remove(CORRECT, INCORRECT);
          it.classList.add(ok ? CORRECT : INCORRECT);
          if (ok) got++;
        });
        status(widget, got + ' of ' + n + ' in the correct position.');
        revealOverall(widget, got === n, true);
      }

      function reset() {
        freeze(widget, false);
        collapseAll(widget);
        status(widget, '');
        qsa(list, '.ordering-item').forEach(function (it) {
          it.classList.remove(CORRECT, INCORRECT);
        });
        doShuffle();
      }

      if (checkBtn) checkBtn.addEventListener('click', check);
      if (resetBtn) resetBtn.addEventListener('click', reset);
    });

    function wrapWords(body) {
      var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
      var texts = [];
      var n;
      while ((n = walker.nextNode())) texts.push(n);
      texts.forEach(function (tn) {
        var s = tn.nodeValue;
        if (s.indexOf('*') < 0 && !/[A-Za-z0-9]/.test(s)) return;
        var re = /\*([A-Za-z0-9][A-Za-z0-9'’\-]*)\*|([A-Za-z0-9][A-Za-z0-9'’\-]*)/g;
        var frag = document.createDocumentFragment();
        var last = 0;
        var m;
        while ((m = re.exec(s))) {
          if (m.index > last) frag.appendChild(document.createTextNode(s.slice(last, m.index)));
          var word = m[1] != null ? m[1] : m[2];
          var correct = m[1] != null;
          var span = el('span', 'mtw-word');
          span.setAttribute('data-correct', correct ? 'true' : 'false');
          span.textContent = word;
          frag.appendChild(span);
          last = re.lastIndex;
        }
        if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
        tn.parentNode.replaceChild(frag, tn);
      });
    }

    qsa(root, '.mtw').forEach(function (widget) {
      if (widget.dataset.kcReady) return;
      widget.dataset.kcReady = '1';
      neutralise(widget);
      var body = widget.querySelector('.mtw-body');
      if (body) wrapWords(body);
      collapseAll(widget);
      var words = qsa(widget, '.mtw-word');
      var checkBtn = widget.querySelector('.kc-check');
      var resetBtn = widget.querySelector('.kc-reset');

      function toggle(w) {
        if (widget.classList.contains(CHECKED)) return;
        w.classList.toggle(SELECTED);
        w.setAttribute('aria-pressed', w.classList.contains(SELECTED) ? 'true' : 'false');
      }

      words.forEach(function (w) {
        w.setAttribute('role', 'button');
        w.setAttribute('tabindex', '0');
        w.setAttribute('aria-pressed', 'false');
        w.addEventListener('click', function () { toggle(w); });
        w.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle(w);
          }
        });
      });

      function check() {
        if (widget.classList.contains(CHECKED)) return;
        freeze(widget, true);
        var totalCorrect = 0;
        var correctSel = 0;
        var incorrectSel = 0;
        words.forEach(function (w) {
          var isC = w.dataset.correct === 'true';
          var sel = w.classList.contains(SELECTED);
          if (isC) {
            totalCorrect++;
            if (sel) {
              correctSel++;
              w.classList.add(CORRECT);
            } else {
              w.classList.add(MISSED);
            }
          } else if (sel) {
            incorrectSel++;
            w.classList.add(INCORRECT);
          }
        });
        var clean = incorrectSel === 0;
        var allC = correctSel === totalCorrect;
        status(widget, correctSel + ' of ' + totalCorrect + ' correct' + (incorrectSel ? ', ' + incorrectSel + ' incorrect.' : '.'));
        revealOverall(widget, allC, clean);
      }

      function reset() {
        freeze(widget, false);
        collapseAll(widget);
        status(widget, '');
        words.forEach(function (w) {
          w.classList.remove(SELECTED, CORRECT, INCORRECT, MISSED);
          w.setAttribute('aria-pressed', 'false');
        });
      }

      if (checkBtn) checkBtn.addEventListener('click', check);
      if (resetBtn) resetBtn.addEventListener('click', reset);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* RCPI knowledge checks (hotspot) — runtime; learner view — start          */
  /* ------------------------------------------------------------------------ */

  function initHotspots(root) {
    qsa(root, '.hotspot').forEach(function (widget) {
      if (widget.dataset.hsReady) return;
      widget.dataset.hsReady = '1';
      widget.setAttribute('contenteditable', 'false');
      qsa(widget, '[contenteditable="true"]').forEach(function (n) { n.setAttribute('contenteditable', 'false'); });

      var stage = widget.querySelector('.hotspot-stage');
      var overlay = widget.querySelector('.hotspot-overlay');
      if (stage && overlay && overlay.parentNode !== stage) stage.appendChild(overlay);
      var markers = qsa(widget, '.hotspot-marker');
      var panels = qsa(widget, '.hotspot-panel');
      var order = markers.map(function (m) { return m.dataset.index; });
      var current = null;

      function show(i) {
        current = i;
        markers.forEach(function (m) {
          var on = m.dataset.index === i;
          m.classList.toggle('is-active', on);
          m.setAttribute('aria-expanded', on ? 'true' : 'false');
        });
        panels.forEach(function (p) { p.classList.toggle('hotspot-hidden', p.dataset.index !== i); });
        if (overlay) overlay.classList.remove('hotspot-hidden');
      }

      function hide() {
        current = null;
        markers.forEach(function (m) {
          m.classList.remove('is-active');
          m.setAttribute('aria-expanded', 'false');
        });
        panels.forEach(function (p) { p.classList.add('hotspot-hidden'); });
        if (overlay) overlay.classList.add('hotspot-hidden');
      }

      function step(dir) {
        if (current == null) return;
        var idx = order.indexOf(current) + dir;
        if (idx < 0) idx = order.length - 1;
        if (idx >= order.length) idx = 0;
        show(order[idx]);
      }

      panels.forEach(function (p) { p.classList.add('hotspot-hidden'); });
      if (overlay) overlay.classList.add('hotspot-hidden');

      markers.forEach(function (m) {
        m.setAttribute('aria-expanded', 'false');
        m.addEventListener('click', function () {
          if (m.dataset.index === current) hide();
          else show(m.dataset.index);
        });
      });

      if (overlay) {
        var closeBtn = overlay.querySelector('.hotspot-close');
        var prevBtn = overlay.querySelector('.hotspot-prev');
        var nextBtn = overlay.querySelector('.hotspot-next');
        if (closeBtn) closeBtn.addEventListener('click', hide);
        if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });
        widget.addEventListener('keydown', function (e) {
          if (current == null) return;
          if (e.key === 'Escape') hide();
          else if (e.key === 'ArrowLeft') step(-1);
          else if (e.key === 'ArrowRight') step(1);
        });
      }
    });
  }

  /* ------------------------------------------------------------------------ */
  /* RCPI knowledge checks (word bank) — runtime; D2L disables JS in edit view — start */
  /* ------------------------------------------------------------------------ */

  function initWordBank(root) {
    var SELECTED = 'is-selected';
    var CORRECT = 'is-correct';
    var INCORRECT = 'is-incorrect';
    var FILLED = 'is-filled';
    var CHECKED = 'is-checked';

    function el(tag, cls) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      return n;
    }

    function neutralise(node) {
      node.setAttribute('contenteditable', 'false');
      qsa(node, '[contenteditable="true"]').forEach(function (n) { n.setAttribute('contenteditable', 'false'); });
    }

    function collapseAll(node) {
      qsa(node, '.kc-feedback').forEach(function (fb) { fb.classList.add('kc-collapsed'); });
    }

    function freeze(node, on) {
      node.classList.toggle(CHECKED, !!on);
    }

    function status(node, txt) {
      var s = node.querySelector('.kc-status');
      if (s) s.textContent = txt || '';
    }

    function revealOverall(node, allCorrect) {
      qsa(node, '.kc-feedback[data-when]').forEach(function (fb) {
        var when = fb.dataset.when;
        var show = (when === 'correct' && allCorrect) || (when === 'incorrect' && !allCorrect);
        if (show && fb.textContent.trim()) fb.classList.remove('kc-collapsed');
      });
    }

    function norm(s) {
      return String(s).replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function shuffle(arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
      return arr;
    }

    function parse(body) {
      var decoys = [];
      var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
      var texts = [];
      var n;
      while ((n = walker.nextNode())) texts.push(n);
      texts.forEach(function (tn) {
        var s = tn.nodeValue;
        if (s.indexOf('[[') < 0) return;
        var re = /\[\[(\+)?([^\]]+)\]\]/g;
        var frag = document.createDocumentFragment();
        var last = 0;
        var m;
        while ((m = re.exec(s))) {
          if (m.index > last) frag.appendChild(document.createTextNode(s.slice(last, m.index)));
          var isDecoy = m[1] === '+';
          var word = m[2].trim();
          if (isDecoy) {
            decoys.push(word);
          } else {
            var slot = el('span', 'wordbank-slot');
            slot.setAttribute('data-answer', word);
            slot.setAttribute('role', 'button');
            slot.setAttribute('tabindex', '0');
            slot.setAttribute('aria-label', 'Empty blank');
            frag.appendChild(slot);
          }
          last = re.lastIndex;
        }
        if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
        tn.parentNode.replaceChild(frag, tn);
      });
      return decoys;
    }

    qsa(root, '.wordbank').forEach(function (widget) {
      if (widget.dataset.kcReady) return;
      widget.dataset.kcReady = '1';
      neutralise(widget);
      var body = widget.querySelector('.wordbank-body');
      var bankEl = widget.querySelector('.wordbank-bank');
      if (!body || !bankEl) return;
      var decoys = parse(body);
      collapseAll(widget);

      var slots = qsa(widget, '.wordbank-slot');
      var answers = slots.map(function (sl) { return sl.getAttribute('data-answer'); });
      shuffle(answers.concat(decoys)).forEach(function (w) {
        var chip = el('button', 'wordbank-chip');
        chip.type = 'button';
        chip.setAttribute('contenteditable', 'false');
        chip.setAttribute('aria-pressed', 'false');
        chip.textContent = w;
        bankEl.appendChild(chip);
      });

      var chips = qsa(bankEl, '.wordbank-chip');
      var picked = null;
      var checkBtn = widget.querySelector('.kc-check');
      var resetBtn = widget.querySelector('.kc-reset');

      function release() {
        if (picked) {
          picked.classList.remove(SELECTED);
          picked.setAttribute('aria-pressed', 'false');
          picked = null;
        }
      }

      function pick(chip) {
        if (widget.classList.contains(CHECKED)) return;
        if (picked === chip) {
          release();
          return;
        }
        release();
        picked = chip;
        chip.classList.add(SELECTED);
        chip.setAttribute('aria-pressed', 'true');
      }

      function toBank(chip) {
        chip.classList.remove(SELECTED, CORRECT, INCORRECT);
        bankEl.appendChild(chip);
      }

      function fill(slot) {
        if (widget.classList.contains(CHECKED) || !picked) return;
        var existing = slot.querySelector('.wordbank-chip');
        if (existing) toBank(existing);
        slot.appendChild(picked);
        slot.classList.add(FILLED);
        slot.setAttribute('aria-label', 'Blank containing ' + picked.textContent);
        release();
      }

      function emptySlot(slot) {
        var chip = slot.querySelector('.wordbank-chip');
        if (chip) toBank(chip);
        slot.classList.remove(FILLED, CORRECT, INCORRECT);
        slot.setAttribute('aria-label', 'Empty blank');
      }

      chips.forEach(function (chip) {
        chip.addEventListener('click', function (e) {
          if (widget.classList.contains(CHECKED)) return;
          if (chip.parentNode && chip.parentNode.classList.contains('wordbank-slot')) {
            e.stopPropagation();
            release();
            emptySlot(chip.parentNode);
            return;
          }
          pick(chip);
        });
      });

      slots.forEach(function (slot) {
        slot.addEventListener('click', function () { fill(slot); });
        slot.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (slot.classList.contains(FILLED) && !picked) emptySlot(slot);
            else fill(slot);
          }
        });
      });

      function check() {
        if (widget.classList.contains(CHECKED)) return;
        freeze(widget, true);
        var got = 0;
        var total = slots.length;
        slots.forEach(function (slot) {
          var chip = slot.querySelector('.wordbank-chip');
          var ok = !!chip && norm(chip.textContent) === norm(slot.getAttribute('data-answer'));
          slot.classList.remove(CORRECT, INCORRECT);
          slot.classList.add(ok ? CORRECT : INCORRECT);
          if (ok) got++;
        });
        status(widget, got + ' of ' + total + ' correct.');
        revealOverall(widget, got === total);
      }

      function reset() {
        freeze(widget, false);
        collapseAll(widget);
        status(widget, '');
        release();
        slots.forEach(function (slot) { emptySlot(slot); });
        shuffle(chips).forEach(function (chip) { bankEl.appendChild(chip); });
      }

      if (checkBtn) checkBtn.addEventListener('click', check);
      if (resetBtn) resetBtn.addEventListener('click', reset);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Master init pipeline — start                                              */
  /* ------------------------------------------------------------------------ */

  function initWithin(root) {
    root = root || document;
    initStructuralCleanup(root);
    initImagesAlt(root);
    initRevealBaseline(root);
    initListAnimations(root);
    initRowFadeIns(root);
    initResponsiveTables(root);
    cleanupSingleItemAccordionButtons(root);
    initInstructionText(root);
    initAccordions(root);
    initFlipCards(root);
    initCarouselFullscreen(root);
    initCarouselImageZoom(root);
    initStandaloneImageFullscreen(root);
    initAltBadges(root);
    initMediaPlayers(root);
    initH5PIframes(root);
    initDataTables(root);
    initBootstrapComponents(root);
    initGifRestart(root);
    initPdfOverlays(root);
    initNewTabNotes(root);
    initCarouselNextLabels(root);
    initTabPanelNav(root);
    initTabAccess(root);
    initInputBlocks(root);
    initMatchWidgets(root);
    initChoiceAndFitb(root);
    initOrderingAndMarkWords(root);
    initHotspots(root);
    initWordBank(root);
    initReferencesOffcanvas();
    initClarity();
    initMinFontGuard();
  }

  /* Entry point for whole-document initialisation. */
  function init() {
    initWithin(document);
    enforceCollapsedBaseline(document);
    initH5PResizer();
  }

  /* Expose a minimal public API for external loaders / dynamic content. */
  window.BBCustomEnhancements = {
    __loaded: true,
    init: init,
    initWithin: initWithin
  };

  onReady(init);
})(window, document);