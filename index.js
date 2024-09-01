import express from "express";
import cors from "cors";
import "./db/connect.js"
import "./utils/reminder.util.js";
import "./utils/taskReminderCron.js"
import cookieParser from "cookie-parser";

const app = express();
import taskRoutes from "./routes/tasks.routes.js"
import userRoutes from "./routes/user.routes.js"
import organizationRoutes from "./routes/org.routes.js";
import reminderRoutes from './routes/reminder.routes.js';


const port = 3000;

//middlewares
app.use(cors());
// parse JSON bodies
app.use(express.json());
// parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// routes
app.get('/hello', (req, res) => {
    res.send("Task Manager App");
});

app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/organizations', organizationRoutes);
app.use('/api/v1/reminders', reminderRoutes);


app.listen(port, console.log(`Server is listening on port ${port}...`));