// PRODUCTION
const STRIPE_PUBLISHABLE_KEY = "pk_live_doCHB0jglD5eISjEmB1vB6mb00xIg51noK";
// const STRIPE_PUBLISHABLE_KEY = "pk_test_51KRElxBHssw16TqHLVweh7MZorffCzySrRWdwAeURnEjnjuNZ7tsIfnmcBq1px0qSGWfJ3Kl2bDQRjaCCJpEO27W005Qidmdci"; // STAGING
const API_BASE_URL = "https://hazwoper-osha.com/api";

// id/price/sku match the hazwoper-osha.com catalog entry for this course
// (data-id, data-price, data-sku on hazwoper-osha.com/online-courses/cdl-entry-level-driver-training-eldt-class-a).
var courses = [
  { id: 304, code: 'class-a', name: 'CDL Entry Level Driver Training (ELDT) - Class A', price: 159.99, listPrice: 199.99, sku: 'ELDTClassA' }
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
});
