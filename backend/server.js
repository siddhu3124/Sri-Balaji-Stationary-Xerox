import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import fileRoutes from './routes/fileRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://sri-balaji-stationery-xerox.vercel.app/', // Allow frontend to access
  credentials: true
}));
app.use(express.json());

// Set up directory path resolution for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static uploaded files dynamically (writeable under /tmp on Vercel)
const isVercel = process.env.VERCEL === '1';
if (isVercel) {
  app.use('/uploads', express.static('/tmp/uploads'));
} else {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

// Routes
app.use('/api/upload', fileRoutes);
app.use('/api/orders', orderRoutes);

// Base route for API status
app.get('/', (req, res) => {
  res.send('Xerox & Stationery Shop API is running...');
});

// Port configuration
const PORT = process.env.PORT || 5000;

if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
