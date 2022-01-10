import { MongoClient } from "mongodb";

export default async function handler(req, res) {

    const userId = req.query;
    let bookBoard; // Store final bookboard results from DB

    // DB Connection Info
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const collection = db.collection('books');
    const options = {
        // Sort in ascending order by title (A->Z)
        sort: {title: 1}
    }
    
    // Search the DB for matching query options
    const findBoard = collection.find(userId, options);

    // If no documents were found
    if ((await findBoard.count()) === 0){
        bookBoard = ("No Documents Found!")
    }
    else{
        bookBoard = await findBoard.toArray();
    }

    client.close();

    res.json(bookBoard);
}