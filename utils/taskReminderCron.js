import cron from 'node-cron';
import { sendDailyTaskReminders } from './reminder.util.js';


cron.schedule('0 9 * * *', () => {
  console.log('Cron job triggered to send daily task reminders');
  sendDailyTaskReminders();
});

// Schedule to run every minute to test
// cron.schedule('* * * * *', () => {
//   console.log('Cron job triggered to send daily task reminders');
//   sendDailyTaskReminders();
// });