// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
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
};

// Show alert
UI.prototype.showAlert = function (message, className) {
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
};

// Clear input
UI.prototype.clearInput = function (book) {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    // delete parent element second level, which is <tr>
    target.parentElement.parentElement.remove();
  }
};

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
    // show success
    ui.showAlert('Book successfully deleted.', 'success');
    // prevent default
    eventObject.preventDefault();
  });
