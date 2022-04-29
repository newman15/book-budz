import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {

    const book = req.body;
    book._id = ObjectId(book._id);
    console.log(book);

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const collection = db.collection('books');
    
    const deleteBook = await collection.deleteOne(book);

    if (deleteBook.deletedCount === 1) {
        console.log(`Successfully deleted book: ${book.title}`);
        res.status(200).json({message: `Successfully deleted book: ${book.title}`});
    } 
    else {
        console.log("No documents matched the query. Deleted 0 documents.");
        res.status(500).json({error: `ERROR: No documents matched the query. Deleted 0 documents.`})
    }
    client.close();
}