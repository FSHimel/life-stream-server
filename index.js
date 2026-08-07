import "./src/loadEnv.js";
import express from "express";
import cors from "cors";

import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const port = process.env.PORT || 5000;

//---------------------------------Middleware----------------------------------------------------
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

//---------------------------------Getting The Routes----------------------------------------------------

import userRoutes from "./src/Routes/user.route.js";
import donationRoutes from "./src/Routes/donationReq.route.js";

//--------------------------------------------------------------------------------------------------------

async function run() {
  try {
    await client.connect();
    // console.log("connected to mongodb ✅✅");

    //-------------------------------------All Collections----------------------------------------

    const db = client.db("lifeStreamDB");
    const usersCollection = db.collection("users");
    app.locals.usersCollection = usersCollection;

    const donationRequestsCollection = db.collection("donationRequests");
    app.locals.donationRequestsCollection = donationRequestsCollection;

    //---------------------------------All APIs----------------------------------------------------
    app.get("/", (req, res) => {
      res.send("LifeStream is running...");
    });
    // user related
    app.use("/users", userRoutes);

    //donation related
    app.use("/donation-requests", donationRoutes);

    //---------------------------------------------------------------------------------------------
  } finally {
  }
}

export default app;
