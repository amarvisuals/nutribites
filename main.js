/**
 * NUTRIBITES™ - Interactive Script & Animation Controller
 * 15+ Years UX/UI Best Practices: Non-blocking, accessible, fluid interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY NAVBAR SCROLL EFFECT
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. MOBILE HAMBURGER DRAWER
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active-drawer');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active-drawer')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close drawer when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active-drawer');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. SEARCH OVERLAY POPUP
  const searchBtn = document.querySelector('.icon-btn[aria-label="Search"]');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = prompt('Search Nutribites (e.g. Almond, Dark Chocolate, Pistachio):');
      if (query && query.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(query.trim())}`;
      }
    });
  }

  // 4. INTERACTIVE CART COUNTER & FEEDBACK TOAST
  let cartCount = 1;
  const cartBadge = document.querySelector('.cart-badge');
  const toastContainer = document.createElement('div');
  toastContainer.className = 'nb-toast';
  document.body.appendChild(toastContainer);

  window.showToast = function(message) {
    toastContainer.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toastContainer.classList.add('show');
    setTimeout(() => {
      toastContainer.classList.remove('show');
    }, 3200);
  };

  window.addToCart = function(productName, price) {
    cartCount++;
    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.transform = 'scale(1.35)';
      setTimeout(() => cartBadge.style.transform = 'scale(1)', 250);
    }
    showToast(`Added <strong>${productName}</strong> (${price}) to your cart!`);
  };

  // Attach to product cards
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      const title = card ? card.querySelector('.prod-title').textContent : 'Nutribites Bar';
      const spec = card ? card.querySelector('.prod-spec').textContent : '₹60';
      addToCart(title, spec.split('•')[1] || '₹60');
    });
  });

  // 5. TESTIMONIAL CAROUSEL SLIDER
  const testimonials = [
    {
      quote: "NUTRIBITES chocolate bars are always fresh, bursting with crunch and trusted by our family. The combination of almonds, cashews and rich cocoa is truly world-class.",
      name: "Priya Mishra",
      location: "Bhubaneswar, Odisha",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    },
    {
      quote: "As a marathon runner, finding a clean chocolate snack packed with real nuts without oily aftertaste was difficult until I tried Nutribites. 10/10 recommendation!",
      name: "Rahul Mohanty",
      location: "Cuttack, Odisha",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    {
      quote: "The packaging is so luxurious and the chocolate melts smoothly while maintaining that satisfying roasted pistachio crunch. My kids love it too!",
      name: "Ananya Patnaik",
      location: "Rourkela, Odisha",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
    }
  ];

  let currentTestimonialIdx = 0;
  const quotePara = document.querySelector('.testimonial-quote-box p');
  const userAvatar = document.querySelector('.testimonial-user .user-avatar');
  const userName = document.querySelector('.testimonial-user .user-info h4');
  const userLoc = document.querySelector('.testimonial-user .user-info span');
  const prevTestimonialBtn = document.querySelector('.three-col-grid .col-card-box .arrow-btn[aria-label="Prev"]');
  const nextTestimonialBtn = document.querySelector('.three-col-grid .col-card-box .arrow-btn[aria-label="Next"]');

  function updateTestimonial(idx) {
    if (!quotePara) return;
    const item = testimonials[idx];
    quotePara.style.opacity = '0';
    quotePara.style.transform = 'translateY(6px)';
    
    setTimeout(() => {
      quotePara.textContent = `"${item.quote}"`;
      if (userName) userName.textContent = item.name;
      if (userLoc) userLoc.textContent = item.location;
      if (userAvatar) userAvatar.src = item.avatar;
      quotePara.style.opacity = '1';
      quotePara.style.transform = 'translateY(0)';
    }, 200);
  }

  if (prevTestimonialBtn && nextTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', () => {
      currentTestimonialIdx = (currentTestimonialIdx - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonialIdx);
    });
    nextTestimonialBtn.addEventListener('click', () => {
      currentTestimonialIdx = (currentTestimonialIdx + 1) % testimonials.length;
      updateTestimonial(currentTestimonialIdx);
    });
  }

  // 6. VIDEO MODAL POPUP FOR RECIPES
  const playBtn = document.querySelector('.video-play-center');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'nb-video-modal';
      modal.innerHTML = `
        <div class="video-modal-backdrop"></div>
        <div class="video-modal-content">
          <button class="video-modal-close" aria-label="Close Modal"><i class="fa-solid fa-xmark"></i></button>
          <div class="video-frame-wrap">
            <iframe width="100%" height="450" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Nutribites Recipes Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeModal = () => modal.remove();
      modal.querySelector('.video-modal-backdrop').addEventListener('click', closeModal);
      modal.querySelector('.video-modal-close').addEventListener('click', closeModal);
    });
  }

  // 7. SMOOTH INTERSECTION OBSERVER FOR SCROLL REVEALS
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.cat-card, .product-card, .trust-item, .about-split, .col-card-box').forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });
});
