// This returns all public book boards by a given author
import { MongoClient } from "mongodb";

export default async function handler(req,res){

    // Store boardName passed in from the URL
    const boardName = req.query;

    // Create Client Connection
    const client = await MongoClient.connect(process.env.MONGODB_URI);

    // Specify the collection and the search query. Store results in findBooks
    const findBooks = await client.db().collection('public_boards').findOne(boardName);
    client.close();

    // If query returns no books, return error msg. Else return the response object.
    if (!findBooks){
        res.status(400).json({error: "Error! No Boards Found"})
    }
    else {
        res.status(200).json(findBooks);
    }
}