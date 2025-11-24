/**
 * Lead Fall Agency - Theme Initialization
 * Initializes all interactive features, animations, and slideshows
 * Note: Theme object is initialized in pre-init.js which loads first
 */

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
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.setAttribute('aria-controls', 'main-navigation');
  toggleBtn.innerHTML = '<span></span><span></span><span></span>';
  
  // Add ID to nav for ARIA
  nav.id = 'main-navigation';
  
  var headerWrapper = header.querySelector('.header-wrapper');
  if (headerWrapper && !header.querySelector('.mobile-nav-toggle')) {
    headerWrapper.appendChild(toggleBtn);
  }
  
  // Toggle navigation on click
  toggleBtn.addEventListener('click', function() {
    var isOpen = nav.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    document.body.classList.toggle('nav-open');
    
    // Update ARIA attribute for accessibility
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  
  // Close nav when clicking outside
  document.addEventListener('click', function(e) {
    if (!header.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      toggleBtn.classList.remove('active');
      document.body.classList.remove('nav-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
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
      var firstInvalidField = null;
      
      // Remove any existing error messages
      var existingErrors = form.querySelectorAll('.field-error-message');
      existingErrors.forEach(function(error) {
        error.remove();
      });
      
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Create inline error message
          var errorMsg = document.createElement('span');
          errorMsg.className = 'field-error-message';
          errorMsg.textContent = 'This field is required';
          errorMsg.setAttribute('role', 'alert');
          
          // Insert error message after the field
          field.parentNode.insertBefore(errorMsg, field.nextSibling);
          
          if (!firstInvalidField) {
            firstInvalidField = field;
          }
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        
        // Focus on first invalid field for better UX
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
      }
    });
    
    // Remove error class and message on input
    var inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
      input.addEventListener('input', function() {
        this.classList.remove('error');
        
        // Remove error message if it exists
        var errorMsg = this.nextSibling;
        if (errorMsg && errorMsg.classList && errorMsg.classList.contains('field-error-message')) {
          errorMsg.remove();
        }
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
