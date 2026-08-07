import "./src/loadEnv.js";
import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

import userRoutes from "./src/Routes/user.route.js";
import donationRoutes from "./src/Routes/donationReq.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@fs.tvevqb6.mongodb.net/?appName=FS`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await client.connect();

  console.log("MongoDB connected ✅");

  const db = client.db("lifeStreamDB");

  app.locals.usersCollection = db.collection("users");

  app.locals.donationRequestsCollection = db.collection("donationRequests");

  isConnected = true;
}

// Make sure DB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);

    res.status(500).send({
      message: "Database connection failed",
    });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("LifeStream is running...");
});

// Routes
app.use("/users", userRoutes);
app.use("/donation-requests", donationRoutes);

export default app;
