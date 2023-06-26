import { MongoClient, ObjectId } from "mongodb";

const connectionString = process.env.MONGO_DB;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("openfabric");

export default db;