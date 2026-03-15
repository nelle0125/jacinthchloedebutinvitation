// ===== MAIN SITE SCRIPT =====
document.addEventListener('DOMContentLoaded', function () {

  /* ========== NAV TOGGLE ========== */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('active');
    });
  }

  /* ========== SMOOTH SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 72; // adjust for header height
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });

          // Close mobile nav after click
          if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            navToggle?.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  /* ========== SWIPER INIT ========== */
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.mySwiper', {
      loop: true,
      centeredSlides: true,
      spaceBetween: 18,
      slidesPerView: 'auto',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        640: { slidesPerView: 1.4 },
        900: { slidesPerView: 2.2 },
      }
    });

    // Respect user preference for reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) {
      swiper.autoplay.stop();
    }
  }

  /* ========== AOS INIT ========== */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      once: true,
      offset: 60
    });
  }

  /* ========== BACKGROUND MUSIC AUTOPLAY + TOGGLE ========== */
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  let isPlaying = false;

  if (bgMusic && musicToggle) {
    function playMusic() {
      bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🔊';
        musicToggle.title = 'Pause background music';
      }).catch(() => {
        console.log('Autoplay blocked. Waiting for user interaction.');
      });
    }

    // Attempt autoplay once DOM is ready
    setTimeout(() => {
      bgMusic.muted = true;
      bgMusic.play().then(() => {
        bgMusic.pause();
        bgMusic.muted = false;
        playMusic();
      }).catch(() => {
        // If blocked, enable on first user interaction
        const enableOnInteraction = () => {
          playMusic();
          document.removeEventListener('click', enableOnInteraction);
          document.removeEventListener('scroll', enableOnInteraction);
        };
        document.addEventListener('click', enableOnInteraction);
        document.addEventListener('scroll', enableOnInteraction);
      });
    }, 1000);

    // Manual toggle
    musicToggle.addEventListener('click', () => {
      if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '♫';
        musicToggle.title = 'Play background music';
      } else {
        playMusic();
      }
    });
  }

  /* ========== GUEST TABS SWITCH ========== */
  const guestTabs = document.querySelectorAll('.guest-tab');
  const guestGrids = document.querySelectorAll('.guest-grid');

  guestTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      guestTabs.forEach(t => t.classList.remove('active'));
      guestGrids.forEach(grid => grid.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      document.getElementById(target)?.classList.add('active');
    });
  });

  /* ========== GIFT GUIDE ACCORDION ========== */
  const giftGuides = document.querySelectorAll('.gift-guide');
  giftGuides.forEach(guide => {
    const toggle = guide.querySelector('.gift-toggle');
    toggle?.addEventListener('click', () => {
      guide.classList.toggle('active');
    });
  });

});

 // Simple Lightbox JS
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.src;
        lightbox.classList.add('active');
      });
    });

    closeLightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });

   document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("highlightVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");

  // Try autoplay muted
  video.play().catch(() => console.warn("Autoplay blocked. Video will play after user interaction."));

  const enableSound = () => {
    if (video.muted) {
      video.muted = false;
      video.currentTime = 0; // restart video when sound enabled
      video.play().catch(() => {});
      unmuteBtn.classList.add("hidden");
    }
    // Remove event listeners after interaction
    document.removeEventListener("click", enableSound);
    document.removeEventListener("scroll", enableSound);
    document.removeEventListener("touchstart", enableSound);
  };

  // Allow both button and any user gesture to enable sound
  unmuteBtn.addEventListener("click", enableSound);
  document.addEventListener("click", enableSound);
  document.addEventListener("scroll", enableSound);
  document.addEventListener("touchstart", enableSound);
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("highlightVideo");
  video.addEventListener("loadeddata", () => {
    video.style.opacity = "1";
    video.style.transition = "opacity 0.6s ease";
  });
});
