/**
 * Lead Fall Agency - Theme Initialization
 * Initializes all interactive features, animations, and slideshows
 */

// Initialize theme settings BEFORE theme.js loads
(function() {
  window.theme = window.theme || {};
  window.theme.settings = window.theme.settings || {
    dynamicVariantsEnable: true,
    cartType: "drawer",
    isCustomerTemplate: false,
    moneyFormat: "${{amount}}",
    predictiveSearch: false,
    predictiveSearchType: "product,page,article",
    quickView: false,
    themeName: 'Motion',
    themeVersion: "8.0.0"
  };
})();

window.theme.routes = {
  home: "/",
  cart: "/cart.js",
  cartPage: "/cart",
  cartAdd: "/cart/add.js",
  cartChange: "/cart/change.js"
};

window.theme.strings = {
  soldOut: "Sold Out",
  unavailable: "Unavailable",
  inStockLabel: "In stock",
  stockLabel: "[count] in stock",
  willNotShipUntil: "Will not ship until [date]",
  willBeInStockAfter: "Will be in stock after [date]",
  waitingForStock: "Inventory on the way",
  cartSavings: "You're saving [savings]",
  cartEmpty: "Your cart is currently empty.",
  cartTermsConfirmation: "You must agree with the terms and conditions",
  searchCollections: "Collections",
  searchPages: "Pages",
  searchArticles: "Articles"
};

// Page transition functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add loaded class to body for animations
  setTimeout(function() {
    document.body.classList.add('loaded');
  }, 50);

  // Initialize slideshows
  initializeSlideshows();
  
  // Initialize animations
  initializeAnimations();
  
  // Initialize mobile navigation
  initializeMobileNav();
  
  // Initialize form handling
  initializeForms();
  
  // Trigger page loaded event for theme.js
  var event = new CustomEvent('page:loaded');
  document.dispatchEvent(event);
});

/**
 * Initialize all slideshows on the page
 */
function initializeSlideshows() {
  // Check if Flickity is available
  if (typeof Flickity === 'undefined') {
    console.log('Flickity not loaded, using basic slideshow fallback');
    return;
  }
  
  var slideshows = document.querySelectorAll('.slideshow-wrapper');
  slideshows.forEach(function(slideshow) {
    var options = {
      cellAlign: 'left',
      contain: true,
      prevNextButtons: true,
      pageDots: true,
      wrapAround: true,
      autoPlay: false,
      pauseAutoPlayOnHover: true,
      adaptiveHeight: true,
      imagesLoaded: true
    };
    
    // Check for autoplay setting
    var autoplaySpeed = slideshow.dataset.autoplaySpeed;
    if (autoplaySpeed) {
      options.autoPlay = parseInt(autoplaySpeed) * 1000;
    }
    
    new Flickity(slideshow, options);
  });
}

/**
 * Initialize scroll-based animations
 */
function initializeAnimations() {
  // Animate elements on scroll
  var animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    animatedElements.forEach(function(el) {
      el.classList.add('animated');
    });
  }
  
  // Add animation classes to sections for entrance effects
  var sections = document.querySelectorAll('section');
  sections.forEach(function(section) {
    section.classList.add('animate-on-scroll');
  });
}

/**
 * Initialize mobile navigation
 */
function initializeMobileNav() {
  // Create mobile menu toggle button if not exists
  var header = document.querySelector('.site-header');
  if (!header) return;
  
  var nav = header.querySelector('.main-nav');
  if (!nav) return;
  
  // Add mobile toggle button
  var toggleBtn = document.createElement('button');
  toggleBtn.className = 'mobile-nav-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle navigation');
  toggleBtn.innerHTML = '<span></span><span></span><span></span>';
  
  var headerWrapper = header.querySelector('.header-wrapper');
  if (headerWrapper && !header.querySelector('.mobile-nav-toggle')) {
    headerWrapper.appendChild(toggleBtn);
  }
  
  // Toggle navigation on click
  toggleBtn.addEventListener('click', function() {
    nav.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });
  
  // Close nav when clicking outside
  document.addEventListener('click', function(e) {
    if (!header.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      toggleBtn.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });
}

/**
 * Initialize form handling with validation
 */
function initializeForms() {
  var forms = document.querySelectorAll('form');
  
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      // Basic validation
      var requiredFields = form.querySelectorAll('[required]');
      var isValid = true;
      
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields');
      }
    });
    
    // Remove error class on input
    var inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
      input.addEventListener('input', function() {
        this.classList.remove('error');
      });
    });
  });
}

/**
 * Smooth scroll for anchor links
 */
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.hash) {
    var targetId = e.target.hash.slice(1);
    var targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

/**
 * Lazy load images
 */
if ('IntersectionObserver' in window) {
  var lazyImages = document.querySelectorAll('img[data-src]');
  var imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(function(img) {
    imageObserver.observe(img);
  });
}
