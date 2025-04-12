document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Global variables
  const body = document.body;
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section');
  const contactForm = document.getElementById('contactForm');

  // Navigation toggle for mobile
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
  }

  // Close menu when clicking on a nav link (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Scroll event handling (header background and active nav links)
  window.addEventListener('scroll', function() {
    // Add background to header on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });

  // Set active nav link based on scroll position
  function updateActiveNavLink() {
    let scrollPosition = window.scrollY;

    // Adjust for header height
    scrollPosition += 150;

    // Find which section is in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const sectionId = section.getAttribute('id');
        
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get the target element's offset from the top
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        // Adjust scroll position to account for fixed header
        const headerOffset = 100;
        const offsetPosition = targetPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Prevent default form submission and show success message
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form elements
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      const submitBtn = document.querySelector('.submit-btn');
      
      // Basic validation
      if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Simulate form submission
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';
      
      // Simulate server response
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      }, 1500);
    });
  }

  // Show notification
  function showNotification(message, type) {
    // Check if a notification container exists
    let notifContainer = document.querySelector('.notification-container');
    
    // Create notification container if it doesn't exist
    if (!notifContainer) {
      notifContainer = document.createElement('div');
      notifContainer.className = 'notification-container';
      document.body.appendChild(notifContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification to container
    notifContainer.appendChild(notification);
    
    // Add entry animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Update copyright year
  const copyrightYear = document.querySelector('.copyright');
  if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2023', currentYear);
  }

  // Initialize on page load
  updateActiveNavLink();
});
