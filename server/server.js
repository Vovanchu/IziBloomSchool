require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// API для прийому форми
app.post('/proxy', async (req, res) => {
  const { name, phone, message, formType, age } = req.body;

  if (!name || !phone || !formType) {
    return res.status(400).json({ status: 'error', message: 'Обов’язкові поля не заповнені' });
  }

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  const text = `📩 Форма: ${formType}\n👤 Ім’я: ${name}\n📱 Телефон: ${phone}\n${age ? `🎂 Вік: ${age}\n` : ''}💬 Повідомлення: ${message || '—'}`;

  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text,
    });

    return res.json({ status: 'ok', message: 'Успішно надіслано' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ status: 'error', message: 'Помилка надсилання в Telegram' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
