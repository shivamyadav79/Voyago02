import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import logger from './utils/logger.js';
import "./config/passport.js"; // Ensure this file contains your Google strategy

// Import Routes
import authRoutes from './routes/auth.js';
import cityRoutes from './routes/city.js';
import adminCityRoutes from './routes/adminCity.js';
import placeRoutes from './routes/place.js';
import adminPlaceRoutes from './routes/adminPlace.js';
import reviewRoutes from './routes/review.js';
import chatRoutes from './routes/chat.js';
import adminUserRoutes from './routes/adminUser.js';
import adminAnalyticsRoutes from './routes/adminAnalytics.js';
import adminAuditRoutes from './routes/adminAudit.js';
import moderatorRoutes from './routes/moderator.js';
import emailRoutes from './routes/email.js';
import searchRoutes from "./routes/search.js";
import contactRoutes from './routes/contactRoutes.js';


// Validate Required Environment Variables
if (!process.env.MONGO_URI || !process.env.SESSION_SECRET || !process.env.GOOGLE_CLIENT_ID) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// Middlewares
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info("✅ MongoDB Connected"))
  .catch(err => logger.error("❌ MongoDB Connection Error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/admin/cities', adminCityRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/admin/places', adminPlaceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/analytics', adminAnalyticsRoutes);
app.use('/api/admin/audit-logs', adminAuditRoutes);
app.use('/api/moderator', moderatorRoutes);
app.use('/api/email', emailRoutes);
app.use("/api/search", searchRoutes);
app.use('/api/contact', contactRoutes);


// Health-check Route
app.get('/', (req, res) => {
  res.send('Voyago API is running');
});

// Socket.io for Real-Time Chat
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (cityId) => {
    if (cityId) {
      socket.join(cityId);
      console.log(`User joined room: ${cityId}`);
    }
  });

  socket.on('newMessage', (data) => {
    if (!data?.cityId || !data?.message?.trim() || !data?.userId) return;
    io.to(data.cityId).emit('message', data);
  });

  socket.on('deleteMessage', (messageId) => {
    if (messageId) {
      io.emit('messageDeleted', { messageId });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Hide Logs in Production
if (process.env.NODE_ENV !== 'production') {
  console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
  console.log('Session Secret:', process.env.SESSION_SECRET);
  console.log('Email User:', process.env.EMAIL_USER);
}

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
