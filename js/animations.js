document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  console.log('Animations script loaded!');

  // Immediately animate the hero section elements
  animateHeroElements();

  // Intersection Observer for revealing elements as they scroll into view
  const observerOptions = {
    root: null, // using viewport as container
    rootMargin: '0px',
    threshold: 0.1 // when 10% of the element is visible
  };

  // Create observer for animations
  const animateObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Element is intersecting:', entry.target);
        // Get data attribute for animation type
        const animationType = entry.target.dataset.animate || 'fade-in-up';
        entry.target.classList.add(animationType);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add all elements with .animate class to observer
  document.querySelectorAll('.animate').forEach(element => {
    animateObserver.observe(element);
  });

  // Apply animation classes to elements that don't have them
  applyAnimationClasses();

  // Create observer for skill bars
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target;
        const width = skillLevel.dataset.width || skillLevel.style.width;
        
        console.log('Animating skill bar:', width);
        
        // Reset width to 0 before animation
        skillLevel.style.width = '0';
        
        // Trigger animation after a small delay
        setTimeout(() => {
          skillLevel.style.width = width;
        }, 100);
        
        observer.unobserve(skillLevel);
      }
    });
  }, observerOptions);

  // Add all skill bars to observer
  document.querySelectorAll('.skill-level').forEach(element => {
    skillObserver.observe(element);
  });

  // Type effect for hero subtitle (if it exists)
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    function typeEffect() {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 100);
      }
    }
    
    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
    console.log('Typing effect initialized');
  }

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      if (scrollPosition < hero.offsetHeight) {
        // Parallax for hero shape
        const heroShape = document.querySelector('.hero-shape');
        if (heroShape) {
          heroShape.style.transform = `translateY(${scrollPosition * 0.2}px) rotate(${scrollPosition * 0.02}deg)`;
        }
      }
    });
    console.log('Parallax effect initialized');
  }

  // Initial animations for hero section
  function animateHeroElements() {
    console.log('Animating hero elements');
    
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroShape = document.querySelector('.hero-shape');
    
    if (heroTitle) {
      heroTitle.style.opacity = '0';
      setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.classList.add('fade-in-down');
      }, 300);
    }
    
    if (heroDescription) {
      heroDescription.style.opacity = '0';
      setTimeout(() => {
        heroDescription.style.opacity = '1';
        heroDescription.classList.add('fade-in-up');
      }, 700);
    }
    
    if (heroButtons) {
      heroButtons.style.opacity = '0';
      setTimeout(() => {
        heroButtons.style.opacity = '1';
        heroButtons.classList.add('fade-in-up');
      }, 900);
    }
    
    if (heroShape) {
      heroShape.style.opacity = '0';
      setTimeout(() => {
        heroShape.style.opacity = '0.8';
        heroShape.classList.add('fade-in');
      }, 1000);
    }
  }

  // Add animation classes to elements that should be animated
  function applyAnimationClasses() {
    console.log('Applying animation classes');
    
    // Project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
      card.classList.add('animate');
      card.dataset.animate = 'fade-in-up';
      card.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Section headers
    document.querySelectorAll('.section-header').forEach(header => {
      header.classList.add('animate');
      header.dataset.animate = 'fade-in-up';
    });
    
    // About content
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
      aboutText.classList.add('animate');
      aboutText.dataset.animate = 'fade-in-left';
    }
    
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
      aboutImage.classList.add('animate');
      aboutImage.dataset.animate = 'fade-in-right';
    }
    
    // Skills categories
    document.querySelectorAll('.skill-category').forEach((category, index) => {
      category.classList.add('animate');
      category.dataset.animate = 'fade-in-up';
      category.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Contact elements
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
      contactInfo.classList.add('animate');
      contactInfo.dataset.animate = 'fade-in-left';
    }
    
    const contactForm = document.querySelector('.contact-form-container');
    if (contactForm) {
      contactForm.classList.add('animate');
      contactForm.dataset.animate = 'fade-in-right';
    }

    // Add animation to all section elements
    document.querySelectorAll('section').forEach(section => {
      const elements = section.querySelectorAll('h3, p, .btn, .skill-item, .project-card');
      elements.forEach((element, index) => {
        element.classList.add('animate');
        element.dataset.animate = 'fade-in-up';
        element.style.animationDelay = `${0.1 * index}s`;
      });
    });
  }

  // Animate logo on hover
  const logo = document.querySelector('.logo-text');
  if (logo) {
    logo.addEventListener('mouseover', function() {
      this.classList.add('pulse');
    });
    
    logo.addEventListener('mouseout', function() {
      this.classList.remove('pulse');
    });
  }

  // Animate button hover states with custom effects
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseover', function() {
      this.classList.add('pulse');
    });
    
    button.addEventListener('mouseout', function() {
      this.classList.remove('pulse');
    });
  });

  // Create a dynamic cursor effect
  createCustomCursor();

  // Custom cursor effect
  function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Style the cursor
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(93, 76, 255, 0.3)';
    cursor.style.boxShadow = '0 0 10px rgba(93, 76, 255, 0.5)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s';
    
    // Inner cursor
    const innerCursor = document.createElement('div');
    innerCursor.classList.add('inner-cursor');
    innerCursor.style.position = 'absolute';
    innerCursor.style.width = '5px';
    innerCursor.style.height = '5px';
    innerCursor.style.top = '50%';
    innerCursor.style.left = '50%';
    innerCursor.style.borderRadius = '50%';
    innerCursor.style.backgroundColor = 'var(--primary-color)';
    innerCursor.style.transform = 'translate(-50%, -50%)';
    cursor.appendChild(innerCursor);
    
    // Move cursor with mouse
    document.addEventListener('mousemove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    // Scale cursor on link hover
    const links = document.querySelectorAll('a, button, .project-card, .social-link');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = 'rgba(93, 76, 255, 0.1)';
      });
      
      link.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(93, 76, 255, 0.3)';
      });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', e => {
      if (e.relatedTarget === null) {
        cursor.style.opacity = '0';
      }
    });
    
    document.addEventListener('mouseover', () => {
      cursor.style.opacity = '1';
    });
    
    console.log('Custom cursor initialized');
  }

  // Trigger animations on scroll
  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Animate elements when scrolled into view
    document.querySelectorAll('.animate:not(.fade-in-up):not(.fade-in-down):not(.fade-in-left):not(.fade-in-right):not(.zoom-in)').forEach(element => {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      if (scrolled > elementPosition - windowHeight + 100) {
        const animationType = element.dataset.animate || 'fade-in-up';
        element.classList.add(animationType);
      }
    });
  });

  // Initial scroll trigger
  setTimeout(function() {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
});
