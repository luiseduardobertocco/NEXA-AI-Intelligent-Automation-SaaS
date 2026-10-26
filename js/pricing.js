"use strict";

const billingOptions = document.querySelectorAll('.billing-option');
const priceElements = document.querySelectorAll('.price');

const updatePricing = (billingType) => {
  billingOptions.forEach((button) => {
    const isActive = button.dataset.billing === billingType;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  priceElements.forEach((priceElement) => {
    const value = priceElement.dataset[billingType];
    if (value) {
      priceElement.textContent = value;
    }
  });
};

billingOptions.forEach((button) => {
  button.addEventListener('click', () => updatePricing(button.dataset.billing));
});

updatePricing('monthly');
