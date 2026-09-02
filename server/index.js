import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import examRoutes from "./routes/exam.route.js";
import testRoutes from "./routes/test.route.js";
import contactRoutes from "./routes/contact.route.js";
import uploadRoutes from "./routes/upload.route.js";
import zoomClassRoutes from "./routes/zoomClass.route.js";
import testInquiryRoutes from "./routes/testInquiry.route.js";
import syllabusRoutes from "./routes/syllabus.route.js";

// Uncaught exception guards to prevent unexpected process restarts
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception caught on Server:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});

const __dirname = path.resolve();
// Explicitly resolve .env path relative to server directory
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

const httpServer = createServer(app);

// Configure Keep-Alive timeouts to prevent ECONNRESET between Vite proxy and Node server
httpServer.keepAliveTimeout = 65000;
httpServer.headersTimeout = 66000;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(`📡 Socket connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`🔌 Socket disconnected: ${socket.id}`);
  });
});

app.use(cors());
app.use(express.json({ type: ['application/json', 'text/plain', 'text/json', '*/json'] }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/zoom-classes", zoomClassRoutes);
app.use("/api/test-inquiries", testInquiryRoutes);
app.use("/api/syllabus", syllabusRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    dbConnected: mongoose.connection.readyState === 1,
    port: PORT
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler caught:", err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Start HTTP Server immediately so port 5050 is always active
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend Server is running on http://localhost:${PORT}`);
  console.log(`✅ Ready to handle API requests!`);
});

// Connect to MongoDB asynchronously
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    .then(() => {
      console.log("🌟 MongoDB Connected Successfully!");
    })
    .catch((error) => {
      console.error("❌ Error connecting to MongoDB:", error.message);
    });
} else {
  console.error("⚠️ MONGO_URI is not defined in environment!");
}
