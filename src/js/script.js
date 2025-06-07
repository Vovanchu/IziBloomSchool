document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.querySelector('input[name="name"]').value;
  const phone = form.querySelector('input[name="phone"]').value;
  const message = form.querySelector('textarea[name="message"]')?.value || '';
  const age = form.querySelector('input[name="age"]')?.value || '';
  const formType = form.getAttribute('data-form-type') || 'Форма без типу';

  try {
    const response = await fetch('/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, message, age, formType }),
    });

    const responseText = await response.text();
    console.log('Raw response text:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error('Невірний формат відповіді від сервера');
    }

    if (!response.ok) {
      throw new Error(data.message || `Помилка сервера: ${response.status}`);
    }

    alert(data.message);
    form.reset();

  } catch (err) {
    console.error('Fetch error:', err);
    alert(err.message || 'Сталася помилка при відправці форми. Спробуйте пізніше.');
  }
});
