/**
 * NGO-Project — Main JavaScript
 * Owner: Member 3 (Interactivity & Forms)
 */

/* ================================================
   1. Navigation — scroll-shadow + mobile hamburger
   ================================================ */
(function initNavigation() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (!navbar) return;

  // Add shadow on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Toggle mobile menu
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();


/* ================================================
   2. Counter animation (homepage impact stats)
   ================================================ */
(function initCounters() {
  const statItems = document.querySelectorAll('[data-target]');
  if (!statItems.length) return;

  /**
   * Animate a single counter element from 0 to its data-target value.
   * @param {HTMLElement} el
   */
  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800; // ms
    const step     = target / (duration / 16);
    let   current  = 0;

    const tick = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString() + '+';
      }
    };

    requestAnimationFrame(tick);
  }

  // Use IntersectionObserver so counters only fire when visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  statItems.forEach(el => observer.observe(el));
})();


/* ================================================
   3. Contact form validation & submission
   ================================================ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    firstName : { el: form.querySelector('#firstName'), errEl: form.querySelector('#firstNameError'), label: 'First name' },
    lastName  : { el: form.querySelector('#lastName'),  errEl: form.querySelector('#lastNameError'),  label: 'Last name'  },
    email     : { el: form.querySelector('#email'),     errEl: form.querySelector('#emailError'),     label: 'Email'      },
    subject   : { el: form.querySelector('#subject'),   errEl: form.querySelector('#subjectError'),   label: 'Subject'    },
    message   : { el: form.querySelector('#message'),   errEl: form.querySelector('#messageError'),   label: 'Message'    },
  };

  const successEl = document.getElementById('contactSuccess');

  /**
   * Validate a single field.
   * @param {string} key
   * @returns {boolean}
   */
  function validateField(key) {
    const { el, errEl, label } = fields[key];
    let error = '';

    if (!el || !el.value.trim()) {
      error = `${label} is required.`;
    } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) {
      error = 'Please enter a valid email address.';
    }

    if (errEl) errEl.textContent = error;
    if (el)    el.classList.toggle('error', Boolean(error));
    return !error;
  }

  // Live validation on blur
  Object.keys(fields).forEach(key => {
    const { el } = fields[key];
    if (el) {
      el.addEventListener('blur', () => validateField(key));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) validateField(key);
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) return;

    // Simulate async submission
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      if (successEl) {
        successEl.classList.add('visible');
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }, 1200);
  });
})();


/* ================================================
   4. Donation widget
   ================================================ */
(function initDonationWidget() {
  const amountBtns   = document.querySelectorAll('.amount-btn');
  const customInput  = document.getElementById('customAmount');
  const donateBtn    = document.getElementById('donateBtn');
  const freqTabs     = document.querySelectorAll('.frequency-tab');

  if (!amountBtns.length) return;

  let selectedAmount = 25;   // default
  let frequency      = 'once';

  /** Update the donate button label */
  function updateDonateButton() {
    if (!donateBtn) return;
    const freqLabel = frequency === 'monthly' ? '/month' : frequency === 'annual' ? '/year' : '';
    donateBtn.textContent = `Donate $${selectedAmount}${freqLabel} Now`;
  }

  // Amount preset buttons
  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmount = parseInt(btn.getAttribute('data-amount'), 10);
      if (customInput) customInput.value = '';
      updateDonateButton();
    });
  });

  // Custom amount input
  if (customInput) {
    customInput.addEventListener('input', () => {
      const val = parseInt(customInput.value, 10);
      if (val > 0) {
        amountBtns.forEach(b => b.classList.remove('active'));
        selectedAmount = val;
        updateDonateButton();
      }
    });
  }

  // Frequency tabs
  freqTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      freqTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      frequency = tab.getAttribute('data-freq');
      updateDonateButton();
    });
  });

  // Donate button click — validate donor fields then show toast
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      const nameEl  = document.getElementById('donorName');
      const emailEl = document.getElementById('donorEmail');
      const nameErr = document.getElementById('donorNameError');
      const emailErr= document.getElementById('donorEmailError');

      let valid = true;

      if (!nameEl || !nameEl.value.trim()) {
        if (nameErr) nameErr.textContent = 'Please enter your full name.';
        if (nameEl)  nameEl.classList.add('error');
        valid = false;
      } else {
        if (nameErr) nameErr.textContent = '';
        if (nameEl)  nameEl.classList.remove('error');
      }

      if (!emailEl || !emailEl.value.trim()) {
        if (emailErr) emailErr.textContent = 'Please enter your email address.';
        if (emailEl)  emailEl.classList.add('error');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
        if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
        if (emailEl)  emailEl.classList.add('error');
        valid = false;
      } else {
        if (emailErr) emailErr.textContent = '';
        if (emailEl)  emailEl.classList.remove('error');
      }

      if (!valid) return;

      // Simulate processing
      donateBtn.disabled = true;
      donateBtn.textContent = 'Processing…';

      setTimeout(() => {
        donateBtn.disabled = false;
        updateDonateButton();
        showToast(`🎉 Thank you for your $${selectedAmount} donation! We'll send a receipt to ${emailEl.value.trim()}.`);
        if (nameEl)  nameEl.value  = '';
        if (emailEl) emailEl.value = '';
      }, 1400);
    });
  }
})();


/* ================================================
   5. Volunteer button — open mailto
   ================================================ */
(function initVolunteer() {
  const btn = document.getElementById('volunteerBtn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('📧 We\'ll redirect you to our volunteer application form shortly!');
    setTimeout(() => {
      window.location.href = 'mailto:volunteer@hopereach.org?subject=Volunteer Application';
    }, 1500);
  });
})();


/* ================================================
   6. Toast notification helper
   ================================================ */
/**
 * Show a toast notification at the bottom-right of the screen.
 * @param {string} message
 * @param {number} [duration=4000] — ms before auto-dismiss
 */
function showToast(message, duration = 4000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, duration);
}


/* ================================================
   7. Smooth scroll for in-page anchor links
   ================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
