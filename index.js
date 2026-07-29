import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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

//getting the routes
import userRoutes from "./src/Routes/user.route.js";

async function run() {
  try {
    await client.connect();
    console.log("connected to mongodb ✅✅");

    //Collection
    const db = client.db("lifeStreamDB");
    const usersCollection = db.createCollection("users");
    app.locals.usersCollection = usersCollection;

    // user related
    app.use("/users", userRoutes);
  } finally {
    // Keep connection open
  }
}

run().catch(console.error);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
