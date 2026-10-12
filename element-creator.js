document.addEventListener("DOMContentLoaded", () => {

  // Add event listeners for search
  searchButton.addEventListener("click", function() {
  const query = searchInput.value.trim();
  if (query) {
    searchAllApis(query);
  }
});


  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchButton").click();
    }
  });

if (navContainer) {
  const sections = document.querySelectorAll(".component-section");
  const sectionNames = new Set();

  // Add "All Components" option first
  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "creator-nav-item active";
  allButton.dataset.filter = "";
  allButton.textContent = "Back to Top";
  navContainer.appendChild(allButton);

  // Dynamically add section buttons
  sections.forEach((section) => {
    const name = section.dataset.name;
    if (name && !sectionNames.has(name)) {
      sectionNames.add(name);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "creator-nav-item";
      button.dataset.filter = name;
      button.textContent = name;
      navContainer.appendChild(button);
    }
  });

  // Handle dropdown toggle
  document.getElementById('navToggle').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('navDropdown').classList.toggle('show');
  });

  // Handle navigation clicks with scroll offset
  navContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains('creator-nav-item')) {
      // Remove active from all items
      navContainer.querySelectorAll('.creator-nav-item').forEach(btn => 
        btn.classList.remove('active'));
      
      // Add active to clicked item
      e.target.classList.add('active');
      
      const filterValue = e.target.dataset.filter;
      
      if (filterValue === "") {
        // Show all sections and scroll to top
        sections.forEach(section => section.style.display = "block");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Show all sections first
        sections.forEach(section => section.style.display = "block");
        
        // Find and scroll to the target section with offset
        const targetSection = Array.from(sections).find(section => 
          section.dataset.name === filterValue);
        
        if (targetSection) {
          const stickyHeight = document.querySelector('.row-controls-sticky').offsetHeight;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - stickyHeight - 20;
          
          window.scrollTo({ 
            top: targetPosition, 
            behavior: 'smooth' 
          });
        }
      }
      
      // Close dropdown
      document.getElementById('navDropdown').classList.remove('show');
    }
  });

  // Handle search filter
  if (filterInput) {
    filterInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      sections.forEach(section => {
        const sectionName = section.dataset.name ? section.dataset.name.toLowerCase() : "";
        const isVisible = !searchTerm || sectionName.includes(searchTerm);
        section.style.display = isVisible ? "block" : "none";
      });
      
      // Update active state in dropdown if needed
      if (searchTerm) {
        navContainer.querySelectorAll('.nav-item').forEach(btn => 
          btn.classList.remove('active'));
      }
    });
  }

  // Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const overlay = document.querySelector('.creator-component-nav-overlay');
  if (overlay && !overlay.contains(e.target)) {
    document.getElementById('navDropdown').classList.remove('show');
  }
});
}



  // Initialize all component sections
  initializeColumnSection();
  initializeCardSection();
  initializeMatchSection();
  initializeChartSection();
  initializeComponentSection("Accordions", addAccordionItem, generateAccordionCode);
  initializeComponentSection("Tabs", addTabItem, generateTabsCode);
  initializeComponentSection("Vertical Tabs", addVerticalTabItem, generateVerticalTabsCode);
  initializeComponentSection("Numbered Accordions", addNumberedAccordionItem, generateNumberedAccordionCode);
  initializeComponentSection("Icon Accordions", addIconAccordionItem, generateIconAccordionCode);
  initializeComponentSection("Flipcards", addFlipCard, generateFlipCardCode);
  initializeComponentSection("Icon Lists", addIconListItem, generateIconListCode);
  initializeComponentSection("Text Carousels", addTextCarouselSlide, generateTextCarouselCode);
  initializeComponentSection("Image Carousels", addCarouselSlide, generateCarouselCode);
  initializeComponentSection("Tables", null, generateTableCode);
  initializeComponentSection("Reveal Tables", addRevealTableRow, generateRevealTableCode);
  initializeComponentSection("Click and Reveal", addRevealItem, generateRevealCode);
  

  document
    .getElementById("iconSelectorOffcanvas")
    ?.addEventListener("hidden.bs.offcanvas", function () {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll(".offcanvas-backdrop");
      if (backdrops.length > 0) {
        backdrops.forEach((backdrop) => backdrop.remove());
      }

      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    });

  // Update all change-icon buttons to open the offcanvas
  document.querySelectorAll(".change-icon").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Store target info for later use
      if (this.closest(".icon-container")) {
        // Icon column case
        document
          .querySelectorAll(".icon-container")
          .forEach((container) => container.classList.remove("editing"));
        this.closest(".icon-container").classList.add("editing");
        currentEditTarget = "column";
        toggleColorSelector(true); // Show color selector
      } else if (this.closest(".accordion-header")) {
        // Icon accordion case
        document
          .querySelectorAll(".accordion-button")
          .forEach((button) => button.classList.remove("editing"));
        this.closest(".accordion-header")
          .querySelector(".accordion-button")
          .classList.add("editing");
        currentEditTarget = "accordion";
        toggleColorSelector(false); // Hide color selector
      } else if (this.closest("li")) {
        // Icon list case
        document
          .querySelectorAll("li")
          .forEach((li) => li.classList.remove("editing"));
        this.closest("li").classList.add("editing");
        currentEditTarget = "list";
        toggleColorSelector(true); // Show color selector
      } else if (this.closest(".card-with-icon")) {
        // Card with icon case
        document
          .querySelectorAll(".card-with-icon")
          .forEach((card) => card.classList.remove("editing"));
        this.closest(".card-with-icon").classList.add("editing");
        currentEditTarget = "card";
        toggleColorSelector(false); // Hide color selector
      }

      // Open the offcanvas
      const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("iconSelectorOffcanvas")
      );
      offcanvas.show();
    });
  });

  document.querySelectorAll(".icon-option").forEach((btn) => {
    btn.addEventListener("click", function () {
      handleIconSelection(
        this.getAttribute("data-icon"),
        this.getAttribute("data-source")
      );
    });
  });

// Save colors when dropdowns change
Object.values(colorSelectors).forEach(selector => {
  selector.addEventListener('change', saveColors);
});

// Load saved colors on page load
loadSavedColors();


  if (typeof initializeIconSelector === 'function') {
    initializeIconSelector();
  }

    document.getElementById('quickSelectToggle').addEventListener('click', () => {
  console.log('Quick Select button clicked');
  const offcanvasElement = document.getElementById('quickSelectOffcanvas');
  if (!offcanvasElement) {
    console.error('Offcanvas element not found');
    return;
  }
  const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
  offcanvas.show();
  buildQuickSelectList();
});

document.getElementById('copyOneOfEverythingBtn')?.addEventListener('click', () => {
  copyOneOfEverything();
  buildQuickSelectList();
});

document.querySelectorAll('.copy-transcript-accordion-wysiwyg').forEach(function(transcriptCopyBtn) {
  transcriptCopyBtn.addEventListener('click', function() {
    console.log('Transcript button clicked');
    const container = document.querySelector('#iconAccordion');
    if (!container) {
      console.error("Transcript container not found");
      alert("Transcript container not found");
      return;
    }
    try {
      const code = generateTranscriptIconAccordionCode(container);
      console.log('Generated code:', code);
      universalCopy(code, true);
      showToast("Transcript accordion code copied in WYSIWYG format!", "success");
    } catch (err) {
      console.error('Error in transcript copy:', err);
      alert('Error generating or copying transcript accordion');
    }
  });
});

  // --- Builder sanity checks --------------------------------------------
  // The builder tool is only ever supposed to hold "edit mode" markup —
  // bootstrap-custom-cleanup.js (the learner-facing runtime) is documented
  // as running on the published D2L page, never here. If it (or stale
  // pasted-in content) ever touches this page, .component-container picks
  // up data-bb-* guard attributes that silently break re-initialization
  // once that markup is copied back out. This also flags accordion/reveal
  // items whose collapsed-class, aria-expanded, and show-class disagree
  // with each other, which is otherwise invisible until pasted into D2L.
  function runBuilderSanityChecks() {
    const problems = [];

    document.querySelectorAll('.component-container *').forEach((el) => {
      for (const attr of el.attributes) {
        if (attr.name.indexOf('data-bb-') === 0) {
          problems.push({ issue: 'stray runtime attribute in builder', attr: attr.name, el });
        }
      }
    });

    document.querySelectorAll('.component-container .accordion-item, .component-container .reveal-container').forEach((item) => {
      const btn = item.querySelector('.accordion-button, .reveal-button');
      const panel = item.querySelector('.accordion-collapse, .collapse');
      if (!btn || !panel) return;
      const ariaOpen = btn.getAttribute('aria-expanded') === 'true';
      const classOpen = !btn.classList.contains('collapsed');
      const panelOpen = panel.classList.contains('show');
      if (ariaOpen !== classOpen || ariaOpen !== panelOpen) {
        problems.push({
          issue: 'button/panel state mismatch',
          detail: `aria-expanded=${ariaOpen} collapsed-class-says-open=${classOpen} panel-has-show=${panelOpen}`,
          btn,
          panel,
        });
      }
    });

    if (problems.length) {
      console.warn(`[builder-check] ${problems.length} issue(s) found:`, problems);
    } else {
      console.log('[builder-check] clean');
    }
    return problems;
  }

  window.runBuilderSanityChecks = runBuilderSanityChecks;

  let sanityCheckHandle = null;
  new MutationObserver(() => {
    clearTimeout(sanityCheckHandle);
    sanityCheckHandle = setTimeout(runBuilderSanityChecks, 200);
  }).observe(document.body, { childList: true, subtree: true, attributes: true });

  setTimeout(runBuilderSanityChecks, 500);

});// End of element-creator.js