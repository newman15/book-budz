import { MongoClient } from "mongodb";

export default async function handler(req, res) {

    const book = req.body;
    console.log(book);

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const collection = db.collection('books');
    
    const addBook = await collection.deleteOne(book);
    client.close();

    res.json(addBook);
}