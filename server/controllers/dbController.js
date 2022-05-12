const db = require('../models/booksModels');
const dbController = {};

dbController.findBook = (req, res, next) => {
  // destructure req body to retrieve ISBN
  const { isbn } = req.body;
  // define the query to get the field 
  const query = `SELECT * FROM books WHERE isbn = '${isbn}'`;
  db.query(query)
    .then((data) => {
      // check if returned object from query has row property with more than 1 row. If so, bookindb is true. Otherwise, bookindb is false
      data.rowCount > 0 ? res.locals.bookInDB = true : res.locals.bookInDB = false;
      next();
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
}

dbController.addBook = (req, res, next) => {
  // if book alrady exits in db, move onto next middlewar function
  if (res.locals.bookInDB) return next();
  //add the new book
  //deconstruct the res.locals.book object 
  const { isbn_13, title, author, subjects } = res.locals.book;
  // console.log("hello", res.locals.book);
  const query = `
  INSERT INTO books ("isbn", "title", "author", "genre")
  VALUES ('${isbn_13}', '${title}', '${author}', '${subjects}')
  `;
  // only adding/working with one specific attribute
  db.query(query)
    .then(() => next())
    .catch((err) => {
      next(err);
    });
};

dbController.findOldBook = (req, res, next) => {
  const keyword = req.body.searchString;
  const query = `SELECT users.username, users.email, books.title, books.author, users_books.condition, books.isbn
  FROM users
  JOIN users_books
  ON users.user_id = users_books.user_id
  JOIN books
  ON users_books.bookISBN = books.isbn
  WHERE title ~* '\\y${keyword}\\y'`;

  db.query(query)
    .then((data) => {
      res.locals.oldbooks = data.rows;
      next();
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
}

dbController.addOldBook = (req, res, next) => {
  const { isbn, condition } = req.body;
  const userID = '1';
  const query = `
  INSERT INTO users_books ("user_id", "bookisbn", "condition")
  VALUES ('${userID}', '${isbn}', '${condition}')
  `;
  db.query(query)
    .then(() => next())
    .catch((err) => {
      next(err);
    });
};

dbController.deleteOldBook = (req, res, next) => {
  //deconstruct the res.locals.book object 
  const _id = req.body.myOldBookId;
  const query = `DELETE FROM users_books WHERE users_books_id = ${_id}`;
  //CHANGE TO THIS LATER ONCE API WORKS AND WHAT RESULTS ARE ^^
  db.query(query)
    .then(() => next())
    .catch((err) => {
      next(err);
    });
}

dbController.findMyBookList = (req, res, next) => {
  // ***** user_id is currently hard-coded to 1, but ideally it would pull from req.cookies.ssid.
  // We didn't have time to set up cookies
  const user_id = '1'
  // const user_id= req.cookies.ssid;
  const query = `SELECT books.title, books.author, users_books.condition, books.isbn, users_books.users_books_id
  FROM users
  JOIN users_books
  ON users.user_id = users_books.user_id
  JOIN books
  ON users_books.bookISBN = books.isbn
  WHERE users.user_id = '${user_id}'`;

  db.query(query)
    .then((data) => {
      res.locals.mybooks = data.rows;
      next();
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
}

// Three Controllers to Return all info. 

dbController.getMyBookRequests = async (req, res, next) => {
  try {
    const query = 'SELECT * FROM users_books'
    const userBooks = await db.query(query)
    res.locals.userBooks = userBooks.rows;
    return next();
  } catch (err) {
    return next({
      log: 400,
      message: 'Failed to get usersBooks'
    })
  }
}

dbController.getAllBooks = async (req, res, next) => {
  try {
    const query = 'SELECT * FROM books'
    const books = await db.query(query)
    res.locals.allBooks = books.rows;
    return next();
  } catch (err) {
    return next({
      log: 400,
      message: 'Failed to getAllBooks'
    })
  }
}
dbController.getAllUsers = async (req, res, next) => {
  try{
    const query = 'SELECT * FROM users'
    const users = await db.query(query)
    res.locals.allUsers = users.rows;
    return next();
  } catch (err) {
    return next({
      log: 400,
      message: 'Failed to get all users'
    })
  }
}



dbController.requestBook = (req, res, next) => {
  const user_id = req.body.userID;
  const username = req.body.username;
  const isbn = req.body.isbn;
  // const user_id= req.cookies.ssid;
  const query = `UPDATE users_books 
  SET requester = ${user_id}
  WHERE users_books.bookisbn = '${isbn}' AND users_books.user_id = (SELECT user_id FROM users WHERE users.username = '${username}')`;
  // And where user ID equals to User ID of owner

  db.query(query)
    .then((data) => {
      res.locals.requestBooks = data.rows;
      next();
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
}

module.exports = dbController;
