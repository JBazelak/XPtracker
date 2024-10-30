import express from 'express';
import ViteExpress from 'vite-express';
import mongoose from 'mongoose';
import SkillRoute from './routes/SkillRoute.js';
import dotenv from 'dotenv';
import users from './routes/UserRoutes.js';
import TrainingRoutes from './routes/TrainingRoutes.js'
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// DB connection
async function connectToDb() {  // Poprawna nazwa funkcji
  await mongoose.connect(process.env.MONGO_URI);
}

connectToDb()
  .then(() => {
    ViteExpress.listen(app, port, () => {
      console.log(`Server is listening on port: ${port}`);
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch(err => console.log(err));

// Routes

app.use('/api/users', users);
app.use('/api/users', SkillRoute);
app.use('/api/users', TrainingRoutes)

