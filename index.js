import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

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

//--------------------------------------------------------------------------------------------------------

async function run() {
  try {
    await client.connect();
    console.log("connected to mongodb ✅✅");

    //-------------------------------------All Collections----------------------------------------

    const db = client.db("lifeStreamDB");
    const usersCollection = db.collection("users");
    app.locals.usersCollection = usersCollection;

    //---------------------------------All APIs----------------------------------------------------
    app.get("/", (req, res) => {
      res.send("LifeStream is running...");
    });
    // user related
    app.use("/users", userRoutes);

    //---------------------------------------------------------------------------------------------
  } finally {
  }
}

run().catch(console.error);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
