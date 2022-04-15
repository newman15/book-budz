// This will create a new public board with the basic information:
// name, genre, and description.

import { MongoClient } from "mongodb";

export default async function handler(req, res) {

    const newPublicBoard = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const existingBoardCheck = await db.collection('public_boards').findOne({boardName: newPublicBoard.boardName});

    // If board does not exist in DB, then create it. Else, return duplicate error.
    if (existingBoardCheck === null){
        const collection = await db.collection('public_boards').insertOne(newPublicBoard); // Create a new DB table and change this to match the new table.
        res.status(200).json({error: false, clientMessage: "Successfully Created Board"});
        console.log("\nNew board successfullly added with these details:");
        console.log(newPublicBoard);
    }else{
        res.status(500).json({error: true, clientMessage: "Error: Board Already Exists!"});
        console.log("\nError: Board Already Exists");
    }

    client.close();
}