import { MongoClient } from "mongodb";

export default async function handler(req, res) {

    const book = req.body;
    console.log(book.boardName);
    console.log(book);

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const collection = db.collection('public_boards');

    const matches = {boardName: book.boardName};
    console.log(matches);
    const updateDoc = {
        $push: {
            books: book
        }
    };
    const options = {upsert: true};
    
    const addBook = await collection.updateOne(matches, updateDoc);

    client.close();

    res.json(addBook);
}