document.querySelectorAll('form.tg-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();

    if (!name || !phone) {
      Swal.fire('Помилка', 'Ім’я і телефон обов’язкові', 'error');
      return;
    }

    const messageField = form.querySelector('textarea[name="message"]') || form.querySelector('select[name="message"]');
    const message = messageField ? messageField.value.trim() : '';

    const ageInput = form.querySelector('input[name="age"]');
    const age = ageInput ? ageInput.value.trim() : '';

    const formType = form.getAttribute('data-form-type') || 'Форма без типу';

    try {
      const response = await fetch('https://www.izibloomschool.com/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message, age, formType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Сталася помилка');
      }

      Swal.fire('Успіх', data.message, 'success');
      form.reset();

    } catch (err) {
      Swal.fire('Помилка', err.message, 'error');
    }
  });
});
