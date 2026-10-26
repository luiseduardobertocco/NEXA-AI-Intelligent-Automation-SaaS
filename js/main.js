"use strict";

const toggleNavbar = () => {
  const navbar = document.querySelector('.navbar');
  const scrollThreshold = 24;

  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
};

const toggleMobileMenu = () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navCollapse = document.getElementById('mainNav');

  if (!navbarToggler || !navCollapse) return;

  const closeMenu = () => {
    navCollapse.classList.remove('show');
    navbarToggler.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    navCollapse.classList.add('show');
    navbarToggler.setAttribute('aria-expanded', 'true');
  };

  navbarToggler.addEventListener('click', (event) => {
    event.preventDefault();

    const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navCollapse.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    const clickInside = navCollapse.contains(event.target) || navbarToggler.contains(event.target);
    if (!clickInside && navCollapse.classList.contains('show')) {
      closeMenu();
    }
  });
};

const setupRevealAnimations = () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    document.querySelectorAll('.reveal').forEach((element) => {
      element.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
};

const setupFormValidation = () => {
  const form = document.getElementById('signupForm');
  const successMessage = document.getElementById('signupSuccess');

  if (!form || !successMessage) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const fullName = String(formData.get('fullName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();

    if (!fullName || !email || !company) {
      form.reportValidity();
      return;
    }

    form.reset();
    successMessage.hidden = false;
    const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    setTimeout(() => {
      if (modal) {
        modal.hide();
      }
      successMessage.hidden = true;
    }, 2200);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  toggleNavbar();
  toggleMobileMenu();
  setupRevealAnimations();
  setupFormValidation();
});
