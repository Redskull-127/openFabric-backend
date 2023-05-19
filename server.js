import express from "express";
import db from "./db/connect.js";
import { ObjectId } from "mongodb";
import verifyToken from "./middleware/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://open-fabric-frontend-redskull-127.vercel.app"],
}));
app.get("/", verifyToken,async (req, res) => {
  let collection = db.collection("backend");
  let result = await collection.find({}).toArray();
  res.json(result);
});

app.post("/find/:id", verifyToken, async (req, res) => {
  console.log(req.params.id);
  let collection = db.collection("backend");
  let query = { _id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
  res.json(result);
});

app.post("/", verifyToken, async (req, res) => {
  let collection = db.collection("backend");
  req.body.date = new Date().toLocaleDateString();
  let push = await collection.insertOne(req.body);
  res.json(push);
});

app.delete("/", verifyToken, async (req, res) => {
  console.log(req.body.id);
  let collection = db.collection("backend");
  let query = { _id: new ObjectId(req.body.id) };
  let result = await collection.deleteOne(query);
  res.json({ result: result });
});

app.post("/auth", (req, res) => {
  // console.log(process.env.TOKEN_KEY);

  const { email, password } = req.body;
  console.log(email, password);
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  if (
    bcrypt.compare(password, '$2a$10$V29/zxy3TZ7A6Pt4uFIRzu66WTk8IV1.5JLazERg6qJ2Yi33pH5nq') &&
    email === 'openfabric@gmail.com'
  ) {
    const token = jwt.sign({ email }, 'secretkey');
    res.status(200).json({ token: token, expiresIn: "Never" });
  }
  // res.status(400).send("Invalid Credentials");
  res.end();
});

app.listen(5000, () => console.log("Server started at http://localhost:5000"));
