/* ==========================================================================
   WebMine — nav.js
   1. Current-page marking
   2. Hide on scroll down / show on scroll up / always visible at the top
   ========================================================================== */

/* ==========================================================================
   1. Current-Page Marking
   ========================================================================== */
// Extract everything after the last slash of the URL
const path = window.location.pathname;
const page = path.substring(path.lastIndexOf('/') + 1);

// If the URL doesn't explicitly end in .html (e.g., "/" or "/WebMine"),
// default to index.html so the Home link highlights correctly.
const currentPage = page.endsWith('.html') ? page : 'index.html';

document.querySelectorAll('.nav-link').forEach((link) => {
  // Remove any hardcoded class so JS is the single source of truth
  link.classList.remove('current-page');
  
  // Apply the gold underline to the matching link
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('current-page');
  }
});

/* ==========================================================================
   2. Scroll Behavior
   ========================================================================== */
const navbar = document.getElementById('navbar');

if (navbar) {
  let lastScrollY = window.scrollY;
  
  // Small buffer so tiny scroll jitters don't trigger the animation
  const scrollThreshold = 5;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Always visible at the very top of the page
    if (currentScrollY <= 10) {
      navbar.classList.remove('nav-hidden');
      lastScrollY = currentScrollY;
    }
    // Scrolling down: slide out of view
    else if (currentScrollY > lastScrollY + scrollThreshold) {
      navbar.classList.add('nav-hidden');
      lastScrollY = currentScrollY;
    }
    // Scrolling up: slide back in immediately
    else if (currentScrollY < lastScrollY - scrollThreshold) {
      navbar.classList.remove('nav-hidden');
      lastScrollY = currentScrollY;
    }
  }, { passive: true }); // Keeps scrolling performance smooth
}
