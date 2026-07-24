// Wait for DOM content to load fully
document.addEventListener('DOMContentLoaded', 
  // 3. Contact Form AJAX Submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formStatus.textContent = '';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
          contactForm.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Oops! There was a problem submitting your message. Please try again.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }
  () => {

  // Select DOM Elements
  const themeToggleBtn = document.getElementById('theme-toggle');
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links'); // Matched to HTML id="nav-links"

  // 1. Theme Switcher with localStorage Persistence
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');

      let theme = 'dark';
      if (document.body.classList.contains('light-mode')) {
        theme = 'light';
        themeToggleBtn.textContent = '☀️';
      } else {
        themeToggleBtn.textContent = '🌙';
      }

      // Save user preference
      localStorage.setItem('theme', theme);
    });
  }

  // 2. Mobile Menu Toggle & Auto-Close
  if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      menuToggleBtn.textContent = isOpen ? '✖' : '☰';
    });

    // Close menu when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggleBtn.textContent = '☰';
      });
    });
  }

});