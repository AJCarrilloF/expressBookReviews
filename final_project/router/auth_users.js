const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ "username": "root", "password": "root" },];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid

}

const authenticatedUser = (username, password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username = req.body.username;
  let password = req.body.password;
  
  
  if (username && password){
    
    let found = users.filter(function(user) { return user.username === username; });
   
    if(found.length>0 && found[0].password === password) {
      
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
  
      req.session.authorization = {
        accessToken, username
      };
      //console.log(req.session.authorization['accessToken']);
      return res.status(202).json({message: "User logged in."});
    }else{
      return res.status(300).json({message: "User or password are incorrect."});

    }
  }else{
    return res.status(300).json({message: "User or password not received."});
  }
   
  
  //return res.status(300).json({message: "User or password not received."});
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  let isbn = req.params["isbn"];
  let review = req.body.review;
  let found = books[isbn];
  let username = req.session.authorization['username']
  console.log(found.reviews)
  let nextID = getNextID(found.reviews);
  
  if(!found){
    //
    return res.status(404).json({message: "Book not found."});
  }

  
  

  if(isbn && username && review){
    //PROCEDO, SÍ TENGO VALORES
    
    
    let toSave = {};
    toSave.username = username;
    toSave.review = review;
    console.log(review);
    found.reviews[nextID.toString()] = toSave;
    books[isbn] = found
    return res.status(202).json({message: "Review added.",book: found});
    
    //books.filter(function() { return books.isbn === isbn; }).reviews.
  }else{

    return res.status(404).json({message: "Book not found."});
  }

  // return res.status(300).json({message: "Yet to be implemented"});
});


regd_users.delete("/auth/review/:isbn", (req, res) =>{
  let isbn = req.params["isbn"];

  let book = books[isbn];
  let reviews = book.reviews;
  let username = req.body.username;
  //let found = users.filter(function(user) { return user.username === username; });
  //let found = reviews.filter(function(user) { return user.username === username; });

  if(!book){
    //
    return res.status(404).json({message: "Book not found."});
  }

  
  let review = req.body.review;

  if(isbn && username){
    //PROCEDO, SÍ TENGO VALORES
    
    //found
    
    let ids = Object.keys(reviews);
    let reviewsDeleted = 0;
    let nReviews = {};

    if(ids.length>0){
      ids.forEach(element => {
        if(reviews[element].username != username){
          nReviews[element] = reviews[element];
          reviewsDeleted += 1;
        }
      });
    }

    book.reviews = nReviews;
    return res.status(202).json({message: "Reviews deleted. ".concat(' ',reviewsDeleted.toString()),book: book});
    
    //books.filter(function() { return books.isbn === isbn; }).reviews.
  }else{

    return res.status(404).json({message: "Invalid values."});
  }
});

const getNextID = (reviews = {})=>{
  let max = 0;

  if(reviews){

    let arrKeys = Object.keys(reviews);

    if (arrKeys.length>0){
    
      arrKeys.forEach(element => {
      if (parseInt(element) > max){
        max = parseInt(element);
      }
    });
    
  }
}
return max + 1;

} ;

const doesExist = (username) => {
  let found = users.filter(function(user) { return user.username === username; });
  
  return found.length>0;
};

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.doesExist = doesExist;
module.exports.users = users;


