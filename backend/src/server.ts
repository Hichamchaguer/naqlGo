import express from 'express';
import mongoose from 'mongoose';
import routes from './database/routes/user_auth';
import offerRoutes from './database/routes/offers';
import bidRoutes from './database/routes/bids';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const dbHost = process.env.DB_HOST || 'mongoDB';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'naqlgo_server';
const dbUser = process.env.DB_USER || 'hicham';
const dbPassword = process.env.DB_PASSWORD || '123';

const credentials = dbUser && dbPassword ? `${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPassword)}@` : '';
const mongoUri = `mongodb://${credentials}${dbHost}:${dbPort}/${dbName}${credentials ? '?authSource=admin' : ''}`;

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const app = express();
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

const PORT = 3002;
app.use(express.json());

// User authentication routes
app.use('/api', routes);
app.use('/api', offerRoutes);
app.use('/api', bidRoutes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});