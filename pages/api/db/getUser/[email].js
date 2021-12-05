import {MongoClient} from "mongodb";

/*
 * Module that returns the matching user info, if exists.
 * @param {object} req The email passed to this API route
 * @return {object} dbResults The matching user info found in the DB
*/
 export default async function handler(req, res){

    let user = req.query; // Obtain query object from URL
    let email = user.email; // Get the email value from object
    let dbResults; // Variable to store the dbResults

    const uri = process.env.URI; // Mongo URI string
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Create new client connection

    try {
        await client.connect(); // connect to DB Cluster
        const collection = client.db("development").collection("users"); // Create collection of db/document

        const query = {email: email}; // The query parameter. Search based on email
        dbResults = await collection.findOne(query); // Store search results in dbResults
    }

    catch {
        console.log("Failed To Connect");
        console.dir();
    }

    finally {
        await client.close(); // Close Connection
    }

    // If dbResults has data return it, else return string notification.
    dbResults ? res.send(dbResults) : res.send("No Matching DB Entries");
}