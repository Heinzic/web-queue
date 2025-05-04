// server.js

import dotenv from 'dotenv';
import express, { json } from 'express';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();
const app = express();
app.use(json());

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
const CHAT_IDS = new Set();

// Подписка через команду /start
bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  CHAT_IDS.add(chatId);
  console.log('Новый подписчик:', chatId);
  bot.sendMessage(chatId, 'Вы подписались на уведомления!');
});

// Ручка для отправки уведомлений
app.post('/notify', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  await Promise.allSettled(
    Array.from(CHAT_IDS).map(id => bot.sendMessage(id, message))
  );

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('🚀 Server + Bot running on http://localhost:3000');
});