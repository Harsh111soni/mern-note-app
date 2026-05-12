const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in backend/.env');
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET in backend/.env');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
