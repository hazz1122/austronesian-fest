document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar ul');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navbar.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.navbar ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navbar.classList.remove('active');
    });
  });
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
  
  // Fetch events from API
  fetchEvents();
  
  // Fetch gallery items from API
  fetchGallery();
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        alert('Pesan Anda telah terkirim! Terima kasih.');
        contactForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      });
    });
  }
});

// Fetch events from API
function fetchEvents() {
  const eventsContainer = document.getElementById('events-container');
  
  if (!eventsContainer) return;
  
  fetch('/api/events')
    .then(response => response.json())
    .then(events => {
      eventsContainer.innerHTML = '';
      
      events.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
          <div class="event-image">
            <img src="${event.imageUrl || 'assets/images/event-default.jpg'}" alt="${event.title}">
          </div>
          <div class="event-details">
            <span class="event-date">${formattedDate} • ${event.time}</span>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            <p class="event-description">${event.description.substring(0, 100)}...</p>
            <a href="#" class="btn">Detail</a>
          </div>
        `;
        
        eventsContainer.appendChild(eventCard);
      });
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      eventsContainer.innerHTML = '<p>Gagal memuat data acara. Silakan muat ulang halaman.</p>';
    });
}

// Fetch gallery items from API
function fetchGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  
  if (!galleryContainer) return;
  
  fetch('/api/gallery')
    .then(response => response.json())
    .then(galleryItems => {
      galleryContainer.innerHTML = '';
      
      galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.title}">
          <div class="gallery-overlay">
            <i class="fas fa-search-plus"></i>
          </div>
        `;
        
        galleryContainer.appendChild(galleryItem);
      });
    })
    .catch(error => {
      console.error('Error fetching gallery:', error);
      galleryContainer.innerHTML = '<p>Gagal memuat galeri. Silakan muat ulang halaman.</p>';
    });
}
