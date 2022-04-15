// This returns all public book boards by a given author
import { MongoClient } from "mongodb";

export default async function handler(req,res){

    let publicBoards;

    // DB Connection Info
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const collection = db.collection('public_boards');
    const options = {
        // Sort in ascending order by boardName (A->Z)
        // Only return boardName fields from DB
        sort: {boardName: 1},
        projection: {
            boardName: 1,
            boardGenre: 1,
            boardDescription: 1,
            boardImage: 1,
            _id: 0
        }
    }

    // Search the DB for all collections in 'public_boards'
    const findBoards = collection.find({}, options);

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