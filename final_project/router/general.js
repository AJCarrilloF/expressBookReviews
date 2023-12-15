const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //let libros = JSON.stringify(this.books);

  return res.status(200).json(books);
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params["isbn"];
  // if (isNaN(isbn)){
  //   return res.status(300).json({message: "ISBN not valid."})
  // }
  //let toSend = books.map();
  //let arr = Object.values(books);
  let found = books[isbn];
  if (! found){
    return res.status(300).json({error: `ISBN "${isbn}" not found or not valid.`})
  }
  // console.log(`ISBN: ${isbn}`);
  // console.log(`Tipo books: ${typeof books}`);
  
  //let found = arr.filter((book)=> book.isbn === isbn);
  //console.log(`Encontre ${found} de tipo ${typeof found}`);

  return res.status(200).json(books[isbn]);
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params["author"];
  
  let arrBooks = Object.values(books);
  // console.log(books);
  // console.log(arrBooks);
  let arrISBN = Object.keys(books);
  let iter = 0;
  let found = {};
  for(let book in arrBooks){
    
    console.log(typeof arrBooks[book]);
    let isbn = arrISBN[iter];
    if(arrBooks[book].author === author){
      
      found[isbn] = arrBooks[book];
    }
    iter+=1;
  }
  
  return res.status(300).json(found);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
