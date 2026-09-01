// PRODUCTION
const STRIPE_PUBLISHABLE_KEY = "pk_live_doCHB0jglD5eISjEmB1vB6mb00xIg51noK";
// const STRIPE_PUBLISHABLE_KEY = "pk_test_51KRElxBHssw16TqHLVweh7MZorffCzySrRWdwAeURnEjnjuNZ7tsIfnmcBq1px0qSGWfJ3Kl2bDQRjaCCJpEO27W005Qidmdci"; // STAGING
const API_BASE_URL = "https://hazwoper-osha.com/api";

// id/sku match the hazwoper-osha.com catalog entry for this course
// (data-id, data-sku on hazwoper-osha.com/online-courses/cdl-entry-level-driver-training-eldt-class-a).
// NOTE: price below is a site-side display/checkout-summary price only. hazwoper-osha.com's own
// catalog entry for course id 304 is priced at $159.99, the amount actually charged is
// determined server-side by hazwoper-osha.com's /add_order response, not by this value.
var courses = [
  { id: 304, code: 'class-a', name: 'CDL Entry Level Driver Training (ELDT) - Class A', price: 35, sku: 'ELDTClassA' }
];

function formatMoney(amount) {
  return Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Mobile nav toggle (shared by all pages; lets the checkout page run without main.js)
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav && !navToggle.dataset.navWired) {
    navToggle.dataset.navWired = '1';
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Curriculum modules & FAQ: expand on hover (preview), stay open once clicked (locked)
  document.querySelectorAll('.module, .faq-item').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      el.open = true;
    });
    el.addEventListener('mouseleave', function () {
      if (!el.dataset.locked) el.open = false;
    });
    var summary = el.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', function (e) {
        e.preventDefault();
        if (el.dataset.locked) {
          delete el.dataset.locked;
          el.open = false;
        } else {
          el.dataset.locked = '1';
          el.open = true;
        }
      });
    }
  });
});
