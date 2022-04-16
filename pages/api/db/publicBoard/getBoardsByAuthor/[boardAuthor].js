// This returns all public book boards by a given author
import { MongoClient } from "mongodb";

export default async function handler(req,res){

    const boardAuthor = req.query;
    let publicBoards; // Array to store the boards
    console.log(boardAuthor);

    // DB Connection Info
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const collection = db.collection('public_boards');
    const options = {
        // Sort in ascending order by title (A->Z)
        sort: {boardName: 1}
    }

    // Search the DB for matching query options
    const findBoards = collection.find(boardAuthor, options);

    // If no documents were found
    if ((await findBoards.count()) === 0){
        publicBoards = ("No Documents Found!")
    }
    else{
        publicBoards = await findBoards.toArray();
        console.log("Public Boards: ");
        console.log(publicBoards);
    }

    client.close();

    res.json(publicBoards);
}