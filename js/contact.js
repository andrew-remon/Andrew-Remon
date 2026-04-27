/* ============================================================
   CONTACT.JS — Form Validation & Formspree Submission
   Andrew Remon Portfolio
   ============================================================ */

const ContactForm = (() => {
  function init() {
    const form    = document.getElementById('contact-form');
    const status  = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic validation
      const fields   = form.querySelectorAll('[required]');
      let   hasError = false;

      fields.forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          group && group.classList.add('error');
          hasError = true;
        } else {
          group && group.classList.remove('error');
        }
      });

      if (hasError) return;

      // Submit to Formspree
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      try {
        const res = await fetch(form.action, {
          method:  'POST',
          body:    new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          showStatus('success', '✓ Message sent! I\'ll get back to you soon.');
          form.reset();
        } else {
          showStatus('error', '✗ Something went wrong. Please email me directly.');
        }
      } catch {
        showStatus('error', '✗ Network error. Please try again later.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }
    });

    // Live field validation — remove error on input
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        const group = field.closest('.form-group');
        if (field.value.trim()) group && group.classList.remove('error');
      });
    });
  }

  function showStatus(type, message) {
    const status = document.getElementById('form-status');
    if (!status) return;
    status.textContent = message;
    status.className   = `form-status ${type}`;
    status.style.display = 'block';
    setTimeout(() => { status.style.display = 'none'; }, 6000);
  }

  return { init };
})();

export default ContactForm;
