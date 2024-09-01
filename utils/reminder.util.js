// import User from '../models/User.model.js';
import Task from '../models/Task.models.js';
import { sendEmail } from "../config/email.config.js"
import User from '../models/User.models.js';

export const sendDailyTaskReminders = async () => {
  try {
    console.log('Fetching tasks for reminders...');
    const tasks = await Task.find({ dueDate: { $gt: new Date() } });
    
    console.log(`Found ${tasks.length} tasks to remind users about.`);  // Log the number of tasks found
    
    const usersToNotify = {};

    tasks.forEach(task => {
      const { assignedTo, title, dueDate } = task;
      if (!usersToNotify[assignedTo]) {
        usersToNotify[assignedTo] = [];
      }
      usersToNotify[assignedTo].push({ title, dueDate });
    });

    console.log(`Preparing to send emails to ${Object.keys(usersToNotify).length} users.`);  // Log the number of users to notify

    for (const [userId, tasks] of Object.entries(usersToNotify)) {
      const user = await User.findById(userId);
      if (user) {
        const taskListHtml = tasks
          .map(task => `${task.title} - Due: ${task.dueDate.toDateString()}`)
          .join('');
        const emailContent = `Here are your tasks for today:${taskListHtml}`;
        
        console.log(`Sending reminder email to user ${user.email}`);  // Log email sending action
        await sendEmail(user.email, 'Your Daily Task Reminder', emailContent);
      } else {
        console.log(`User with ID ${userId} not found.`);  // Log if a user is not found
      }
    }

    console.log('Daily task reminders processing completed.');
  } catch (error) {
    console.error('Error sending daily task reminders:', error.message);
  }
};

// export const sendDailyTaskReminders = async () => {
//   try {
//     // Get the current date and format it to get tasks for the day
//     const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

//     // Find tasks that are due today and not completed
//     const tasks = await Task.find({ dueDate: today, completed: false }).populate('assignedTo');

//     // Extract unique users from the tasks
//     const users = new Set();
//     tasks.forEach(task => users.add(task.assignedTo.email));

//     // Send email to each user
//     for (const email of users) {
//       await sendEmail(
//         email,
//         'Daily Task Reminder',
//         'You have tasks due today. Please check your task manager for details.'
//       );
//     }

//     console.log('Daily task reminders sent.');
//   } catch (error) {
//     console.error('Error sending daily task reminders:', error);
//   }
// };











// import Task from '../models/Task.models.js';
// import User from '../models/User.models.js';
// import { sendEmail } from './email.util.js';

// export const sendDailyTaskReminders = async () => {
//   try {
//     const tasks = await Task.find({ dueDate: { $gt: new Date() } }); // Find tasks that are due in the future

//     const usersToNotify = {}; // Collect user emails and their tasks

//     tasks.forEach(task => {
//       const { assignedTo, title, dueDate } = task;
//       if (!usersToNotify[assignedTo]) {
//         usersToNotify[assignedTo] = [];
//       }
//       usersToNotify[assignedTo].push({ title, dueDate });
//     });

//     // Send email to each user
//     for (const [userId, tasks] of Object.entries(usersToNotify)) {
//       const user = await User.findById(userId);
//       if (user) {
//         const taskListHtml = tasks
//           .map(task => `<li>${task.title} - Due: ${task.dueDate.toDateString()}</li>`)
//           .join('');
//         const emailContent = `<h4>Here are your tasks for today:</h4><ul>${taskListHtml}</ul>`;
//         await sendEmail(user.email, 'Your Daily Task Reminder', emailContent);
//       }
//     }
//   } catch (error) {
//     console.error('Error sending daily task reminders:', error);
//   }
// };
