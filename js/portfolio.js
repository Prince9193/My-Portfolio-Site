document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Portfolio filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Filter projects based on category
  function filterProjects(category) {
    projectCards.forEach(card => {
      // Remove existing animation classes
      card.classList.remove('fade-in-up', 'fade-in-down', 'fade-in-left', 'fade-in-right', 'zoom-in');
      
      // Get card category
      const cardCategory = card.dataset.category;
      
      // Check if card should be shown
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        // Add animation with a small delay
        setTimeout(() => {
          card.classList.add('zoom-in');
        }, 10);
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get category from data attribute
      const category = this.dataset.filter;
      
      // Filter projects
      filterProjects(category);
    });
  });

  // Masonry layout effect for portfolio grid
  function applyMasonryLayout() {
    // Only apply if projects section exists
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    // Check if we're on a larger screen
    if (window.innerWidth >= 768) {
      const grid = projectsGrid;
      const items = Array.from(grid.children);
      
      // Reset heights first
      items.forEach(item => {
        item.style.gridRowEnd = '';
      });
      
      // Get the first computed item width to calculate columns
      const firstItemWidth = items[0].getBoundingClientRect().width;
      const columnCount = Math.floor(grid.clientWidth / firstItemWidth);
      
      // Initialize an array to track column heights
      let columnHeights = Array(columnCount).fill(0);
      
      // Position each item
      items.forEach(item => {
        // Find the column with the minimum height
        const minHeightColumn = columnHeights.indexOf(Math.min(...columnHeights));
        
        // Position the item in that column
        item.style.gridColumnStart = minHeightColumn + 1;
        
        // Update the column height
        columnHeights[minHeightColumn] += item.clientHeight + 20; // 20px for gap
      });
      
      // Set the grid height to the maximum column height
      grid.style.height = `${Math.max(...columnHeights)}px`;
    } else {
      // Reset grid styles for mobile
      projectsGrid.style.height = 'auto';
      
      // Reset item styles
      Array.from(projectsGrid.children).forEach(item => {
        item.style.gridColumnStart = '';
        item.style.gridRowStart = '';
      });
    }
  }

  // Apply masonry layout on page load and resize
  window.addEventListener('load', applyMasonryLayout);
  window.addEventListener('resize', applyMasonryLayout);

  // Add hover effect to project cards
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add shadow and transform effect
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = 'var(--shadow-lg)';
      
      // Find the project image placeholder and add a smooth scale
      const imgPlaceholder = this.querySelector('.project-img-placeholder');
      if (imgPlaceholder) {
        imgPlaceholder.style.transform = 'scale(1.05)';
        imgPlaceholder.style.transition = 'transform 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      // Reset effects
      this.style.transform = '';
      this.style.boxShadow = '';
      
      // Reset image placeholder
      const imgPlaceholder = this.querySelector('.project-img-placeholder');
      if (imgPlaceholder) {
        imgPlaceholder.style.transform = '';
      }
    });
  });

  // Project modal functionality
  function setupProjectModals() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // For demonstration, prevent default navigation
        if (this.textContent.includes('Preview')) {
          e.preventDefault();
          
          // Get project data
          const projectCard = this.closest('.project-card');
          const projectTitle = projectCard.querySelector('.project-title').textContent;
          const projectDesc = projectCard.querySelector('.project-desc').textContent;
          
          // Create modal HTML
          showProjectModal(projectTitle, projectDesc);
        }
      });
    });
  }

  // Create and show modal
  function showProjectModal(title, description) {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'project-modal-container';
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modalContainer.style.display = 'flex';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.padding = '20px';
    modalContainer.style.zIndex = '2000';
    modalContainer.style.opacity = '0';
    modalContainer.style.transition = 'opacity 0.3s ease';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'project-modal';
    modalContent.style.backgroundColor = 'var(--bg-color)';
    modalContent.style.borderRadius = 'var(--radius-md)';
    modalContent.style.padding = '30px';
    modalContent.style.maxWidth = '800px';
    modalContent.style.width = '100%';
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflow = 'auto';
    modalContent.style.position = 'relative';
    modalContent.style.transform = 'translateY(50px)';
    modalContent.style.transition = 'transform 0.3s ease';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '15px';
    closeButton.style.right = '15px';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'var(--text-color)';
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.style.marginBottom = '20px';
    
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = title;
    modalTitle.style.fontSize = '24px';
    
    modalHeader.appendChild(modalTitle);
    
    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    const modalDescription = document.createElement('p');
    modalDescription.textContent = description;
    
    const modalNote = document.createElement('p');
    modalNote.textContent = 'This is a demonstration modal for the project preview functionality.';
    modalNote.style.marginTop = '20px';
    modalNote.style.fontStyle = 'italic';
    modalNote.style.color = 'var(--text-light)';
    
    modalBody.appendChild(modalDescription);
    modalBody.appendChild(modalNote);
    
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContainer.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modalContainer);
    
    // Trigger animation
    setTimeout(() => {
      modalContainer.style.opacity = '1';
      modalContent.style.transform = 'translateY(0)';
    }, 10);
    
    // Close on button click
    closeButton.addEventListener('click', () => {
      closeModal(modalContainer, modalContent);
    });
    
    // Close on outside click
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        closeModal(modalContainer, modalContent);
      }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(modalContainer, modalContent);
      }
    });
  }

  // Close modal with animation
  function closeModal(container, content) {
    content.style.transform = 'translateY(50px)';
    container.style.opacity = '0';
    
    setTimeout(() => {
      container.remove();
    }, 300);
  }

  // Initialize the modal functionality
  setupProjectModals();
});
