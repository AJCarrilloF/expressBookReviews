const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  // console.log(username);
  // console.log(password);

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
      //console.log(users);
    } else {
      return res.status(409).json({ message: "User already exists!" });
    }
  }
  return res.status(412).json({ message: "Unable to register user." });


  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //let libros = JSON.stringify(this.books);
  console.log(users);
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


  let title = req.params["title"];
  
  let arrBooks = Object.values(books);
  // console.log(books);
  // console.log(arrBooks);
  let arrISBN = Object.keys(books);
  let iter = 0;
  let found = {};
  for(let book in arrBooks){
    
    console.log(typeof arrBooks[book]);
    let isbn = arrISBN[iter];
    if(arrBooks[book].title === title){
      
      found[isbn] = arrBooks[book];
    }
    iter+=1;
  }
  
  return res.status(300).json(found);

  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

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

  return res.status(200).json(books[isbn].reviews);

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
