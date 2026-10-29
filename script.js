
document.addEventListener('DOMContentLoaded', () => {

  // ================= 1. THEME TOGGLER =================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');

  if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      body.classList.toggle('dark-theme');

      if (body.classList.contains('light-theme')) {
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
    });
  }


  // ================= 2. MOBILE MENU TOGGLE =================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileToggleIcon = document.getElementById('mobileToggleIcon');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && mobileToggleIcon && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');

      if (navMenu.classList.contains('active')) {
        mobileToggleIcon.className = 'fa-solid fa-xmark';
      } else {
        mobileToggleIcon.className = 'fa-solid fa-bars';
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggleIcon.className = 'fa-solid fa-bars';
      });
    });
  }


  // ================= 3. SCROLL REVEAL ANIMATIONS =================
  const revealElements = document.querySelectorAll('.reveal');

  const checkReveal = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 130;

    revealElements.forEach(element => {
      const revealTop = element.getBoundingClientRect().top;

      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', checkReveal);
  checkReveal();


  // ================= 4. DYNAMIC SKILL BARS =================
  const skillSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress');
  let skillsAnimated = false;

  const triggerSkillBars = () => {
    if (!skillSection || skillsAnimated) return;

    const rect = skillSection.getBoundingClientRect();

    if (
      rect.top <= window.innerHeight * 0.85 &&
      rect.bottom >= 0
    ) {
      progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');

        if (targetWidth) {
          bar.style.width = targetWidth;
        }
      });

      skillsAnimated = true;
    }
  };

  window.addEventListener('scroll', triggerSkillBars);
  triggerSkillBars();


  // ================= 5. COUNTER ANIMATION (FIXED) =================
  const statNumbers = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  const animateCounters = () => {
    if (countersStarted || statNumbers.length === 0) return;

    const statsSection = document.querySelector('.stats-row');

    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();

    // Start animation when statistics become visible
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersStarted = true;

      statNumbers.forEach(counter => {
        const target = Number(counter.getAttribute('data-target'));

        if (!Number.isFinite(target)) return;

        const duration = 1500;
        const startTime = performance.now();

        // Start each number at zero
        counter.textContent = '0';

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smooth ease-out animation
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          const currentValue = Math.floor(
            easedProgress * target
          );

          counter.textContent = currentValue;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            // Ensure the exact target is displayed
            counter.textContent = target;
          }
        };

        requestAnimationFrame(updateCounter);
      });
    }
  };

  window.addEventListener('scroll', animateCounters);
  animateCounters();


  // ================= 6. PROJECT FILTERING =================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll(
    '.projects-grid .project-card'
  );

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(button => {
        button.classList.remove('active');
      });

      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // ================= 7. SCROLL TO TOP / BOTTOM BUTTON =================
  const scrollBtn = document.getElementById('scrollDirectionBtn');
  const scrollIcon = document.getElementById('scrollIcon');

  const updateScrollButton = () => {
    if (!scrollBtn || !scrollIcon) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Hide the button when already at the top
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }

    if (window.scrollY < scrollableHeight / 2) {
      scrollIcon.className = 'fa-solid fa-arrow-down';
      scrollBtn.setAttribute('title', 'Scroll to Bottom');
      scrollBtn.setAttribute('aria-label', 'Scroll to Bottom');
    } else {
      scrollIcon.className = 'fa-solid fa-arrow-up';
      scrollBtn.setAttribute('title', 'Scroll to Top');
      scrollBtn.setAttribute('aria-label', 'Scroll to Top');
    }
  };

  window.addEventListener('scroll', updateScrollButton);
  window.addEventListener('resize', updateScrollButton);
  updateScrollButton();

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY < scrollableHeight / 2) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }


  // ================= 8. CONTACT FORM & TOAST =================
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  if (contactForm && toast) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();

      toast.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    });
  }

});

