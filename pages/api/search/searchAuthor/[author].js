const axios = require('axios');

/* ----------------------------------------------------------------------------
 * Function that searches by author only
 * @params {author} string
*/

export default async function handler(req, res){
    let {author} = req.query;
    
    let apiResponse = await 
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=AIzaSyAvoUBW4zDKpdNWYkZfdI6-qxV6B5Z886k`)
        .then((response) => {
            let searchResults = [];
            console.log("\nTotal Number Of Books for searchAuthor: " + response.data.items.length);
            
            // Loop through the api response data and build return object
            for (let i = 0; i < response.data.items.length; i++){
                searchResults.push(
                {
                    title: response.data.items[i].volumeInfo.title ? response.data.items[i].volumeInfo.title : "No Title Listed",
                    author: response.data.items[i].volumeInfo.authors ? response.data.items[i].volumeInfo.authors[0] : "No Author Listed",
                    date: response.data.items[i].volumeInfo.publishedDate ? response.data.items[i].volumeInfo.publishedDate : "No Date Listed",
                    isbn: response.data.items[i].volumeInfo.industryIdentifiers ? response.data.items[i].volumeInfo.industryIdentifiers[0].identifier : "No ISBN Listed",
                    description: response.data.items[i].volumeInfo.description ? response.data.items[i].volumeInfo.description : "No description Listed",
                    image: response.data.items[i].volumeInfo.imageLinks ? response.data.items[i].volumeInfo.imageLinks.thumbnail : "No Image Listed"
                })
            }
            return searchResults;
        })
        .catch(function (error) {
            console.log("\nERROR!! searchAuthor() -- check server");
            return error;
        })

        res.send(apiResponse);
}