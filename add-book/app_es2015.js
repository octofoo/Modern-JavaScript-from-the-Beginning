// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class
class UI {
  constructor() { }

  addBookToList(book) {
    const list = document.getElementById('book-list');
    // create table row
    const row = document.createElement('tr');
    // create row cells
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    // add row to table
    list.appendChild(row);
  }

  // Show alert
  showAlert(message, className) {
    // create div
    const div = document.createElement('div');
    // add id
    div.id = 'alert-flash';
    // add classes
    div.className = `alert ${className}`;
    // add message
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.getElementById('container');
    // get before
    const form = document.getElementById('book-form');
    // insert div into container, place before form
    container.insertBefore(div, form);
    // disappear in 3 seconds
    setTimeout(function () {
      document.getElementById('alert-flash').remove();
    }, 3000);
  }

  // Clear input
  clearInput(book) {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  // Delete book
  deleteBook(target) {
    if (target.className === 'delete') {
      // delete parent element second level, which is <tr>
      target.parentElement.parentElement.remove();
    }
  }
}

// Local Storage class
// all methods are static so no need to
// instantiate LocalStorage object to access them
class LocalStorage {
  // get books in local storage
  static getBooks() {
    // set local variable
    let books;
    // check if local storage has already books in it
    if (localStorage.getItem('books') === null) {
      // if not set books as empty array
      books = [];
    } else {
      // if yes get books from local storage and set them as books
      books = JSON.parse(localStorage.getItem('books'));
    }
    // return books because method is static
    return books;
  }

  // display books in local storage
  static displayBooks() {
    // set local constant as array from getBooks method
    const books = LocalStorage.getBooks();
    // loop through books array
    books.forEach(function (book) {
      // instantiate UI object
      const ui = new UI();
      // call addBookToList method
      ui.addBookToList(book);
    });
  }

  // add books to local storage
  static addBook(book) {
    // set local constant as array from getBooks method
    const books = LocalStorage.getBooks();
    // push book from parameter to array
    books.push(book);
    // overwrite books object in local storage with updated object
    // use JSON.stringify to convert from array to object
    localStorage.setItem('books', JSON.stringify(books));
  }

  // remove book from local storage
  static removeBook(isbn) {
    // set local constant as array from getBooks method
    const books = LocalStorage.getBooks();
    // loop through books array
    books.forEach(function (book, index) {
      // if ISBN of book equals to isbn from method parameter
      if (book.isbn === isbn) {
        // remove index position, one entry
        books.splice(index, 1);
      }
      // overwrite books object in local storage with updated object
      // use JSON.stringify to convert from array to object
      localStorage.setItem('books', JSON.stringify(books));
    });
  }
}

// Event listener DOM load
document.addEventListener('DOMContentLoaded', LocalStorage.displayBooks);

// Event listener add book
document
  .getElementById('book-form')
  .addEventListener('submit', function (eventObject) {
    // get input values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    // instantiate book
    const book = new Book(title, author, isbn);
    // instantiate UI
    const ui = new UI();
    // validate input
    if (title === '' || author === '' || isbn === '') {
      // show error
      ui.showAlert('Please fill all the fields.', 'error');
    } else {
      // add book
      ui.addBookToList(book);
      // add book to local storage
      LocalStorage.addBook(book);
      // clear input
      ui.clearInput();
      // show success
      ui.showAlert('Book sucessfully added.', 'success');
    }
    // prevent default
    eventObject.preventDefault();
  });

// Event listener remove book
document
  .getElementById('book-list')
  .addEventListener('click', function (eventObject) {
    // instantiate UI
    ui = new UI();
    // delete book
    ui.deleteBook(eventObject.target);
    // remove from local storage
    // eventObject.target is <a>
    // parentElement is <td>
    // previousElementSibling is previous <td>
    // textContent is ISBN
    LocalStorage.removeBook(eventObject.target.parentElement.previousElementSibling.textContent);
    // show success
    ui.showAlert('Book successfully deleted.', 'success');
    // prevent default
    eventObject.preventDefault();
  });
