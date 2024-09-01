import express from 'express';
import { sendDailyTaskReminders } from '../utils/reminder.util.js';

const router = express.Router();

router.get('/test-reminder', async (req, res) => {
    try {
        await sendDailyTaskReminders();
        res.send('Test reminder emails sent.');
    } catch (error) {
        res.status(500).send('Error sending test reminder emails.');
    }
});

export default router;
