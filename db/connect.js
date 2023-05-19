import { MongoClient, ObjectId } from "mongodb";

const connectionString = "mongodb+srv://meertarbani:Hmeer1257@cluster0.fjzl35w.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("openfabric");

export default db;