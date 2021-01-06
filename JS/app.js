console.log("Welcome to Shelf Manager: A books management tool!");

// Display constructor
function Display() {

}
Display.prototype.getBookCount = function () {
    let totalBookCount = document.getElementById("totalBookCount");
    let bookObjArr;
    let savedBooks = localStorage.getItem("savedBooks");
    if (savedBooks == null) {
        bookObjArr = [];
    }
    else {
        bookObjArr = JSON.parse(savedBooks);
    }
    if (bookObjArr.length == 0) {
        totalBookCount.innerText = 0;
    }
    else {
        totalBookCount.innerText = bookObjArr.length;
    }
}

// Book constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

showBooks();

// Shows all the boooks 
function showBooks() {
    let bookObjArr;
    let savedBooks = localStorage.getItem("savedBooks");
    if (savedBooks == null) {
        bookObjArr = [];
    }
    else {
        bookObjArr = JSON.parse(savedBooks);
    }

    let booksInfoString = "";
    bookObjArr.forEach((element, index) => {
        booksInfoString += `
                <tr class="savedBooksUI">
                  <td>${index + 1}</td>
                  <td>${element.name}</td>
                  <td>${element.author}</td>
                  <td>${element.type}</td>
                  <td><button type="button" class="btn-close danger" id="${index}" onclick="deleteBook(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-dismiss="alert" aria-label="Close"></button></td>
                </tr>`;

    });
    let booksField = document.getElementById("booksField");
    let noBooks = document.querySelector(".noBooks");
    let scrollableTableBody = document.querySelector(".scrollableTableBody")

    if (bookObjArr.length != 0) {
        booksField.innerHTML = booksInfoString;
        scrollableTableBody.style.display = "block";
        noBooks.style.display = "none";
    }
    else {
        noBooks.innerHTML = `<p>Your books will appear here.</p> <p>Looks like you haven't added a book yet. Try to give Title, Author and Type then click "Add Book" button to add book into shelf!</p>`;
        scrollableTableBody.style.display = "none";
        noBooks.style.display = "flex";
    }
    let display = new Display;
    display.getBookCount();
}

// Deletes books
function deleteBook(bookIndex) {
    let userConnfirmination = document.getElementById("delBook");
    let bookObjArr = JSON.parse(localStorage.getItem("savedBooks"));
    userConnfirmination.addEventListener("click", () => {
        bookObjArr.splice(bookIndex, 1);
        localStorage.setItem("savedBooks", JSON.stringify(bookObjArr));
        showBooks();
    });
}

// Shows dissmissable alert on saving and invalid data.
function showMessage(params) {

    let alertArea = document.querySelector(".container");

    let alertMsg = document.createElement("div");
    alertMsg.setAttribute("role", "alert");
    alertMsg.innerHTML = "";
    if (params == "added") {
        alertMsg.setAttribute("class", "alert alert-success alert-dismissible fade show");
        alertMsg.innerHTML = `<strong>Success!</strong> Your book has been successfully added to the shelf.
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        alertArea.insertBefore(alertMsg, alertArea.children[1]);

    }
    else if (params == "invalid") {
        alertMsg.setAttribute("class", "alert alert-warning alert-dismissible fade show");
        alertMsg.innerHTML = `<strong>Invalid!</strong> Book title or author are not vallid. You should check in on some of those fields below.
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        alertArea.insertBefore(alertMsg, alertArea.children[1]);
    }
    else if (params == "deleteBook") {
        alertMsg.setAttribute("class", "alert alert-danger alert-dismissible fade show");
        alertMsg.innerHTML = `<strong>Delete!</strong> Your book has been successfully deleted from the shelf.
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        alertArea.insertBefore(alertMsg, alertArea.children[1]);
    }
    else {
        alertMsg.setAttribute("class", "alert alert-warning alert-dismissible fade show");
        alertMsg.innerHTML = `<strong>Invalid author name!</strong> Book author is not valid. Author name can not contain numbers and/or special character.
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        alertArea.insertBefore(alertMsg, alertArea.children[1]);
    }

    setTimeout(() => {
        alertMsg.remove();
    }, 5500);
}

// Saves books to the local storage
Display.prototype.addTobooks = function (bookObj) {
    let bookObjArr;
    let savedBooks = localStorage.getItem("savedBooks");
    if (savedBooks == null) {
        bookObjArr = [];
    }
    else {
        bookObjArr = JSON.parse(savedBooks);
    }
    bookObjArr.push(bookObj);
    localStorage.setItem("savedBooks", JSON.stringify(bookObjArr));
    this.getBookCount();
    showBooks();
}

// Clears form feilds
Display.prototype.clear = function () {
    let bookForm = document.getElementById("bookForm");
    bookForm.reset();
}

// Validates the data -> Title and Author
Display.prototype.validateData = function (name, author) {

    if (this.isAlphanumeric(author)) {
        showMessage("invalidAuthor");
    }

    else if (name.trim().length < 3 || author.trim().length < 3) {
        showMessage("invalid")
    }
    else {
        showMessage("added");

        let bookType = document.getElementById("bookTypes");
        let type = bookType.options[bookType.selectedIndex].text;
        bookObj = new Book(name, author, type);

        this.addTobooks(bookObj);
        this.clear();
    }
}

// Validates for the author name if it contains numbers/special characters or not 
Display.prototype.isAlphanumeric = function (name) {
    for (let index = 0; index < name.length; index++) {
        if (name.charCodeAt(index) < 65 || (name.charCodeAt(index) > 90 && name.charCodeAt(index) < 97 && name.charCodeAt(index) > 122)) {
            if (name.charCodeAt(index) === 32) {
                continue;
            }
            return true;
        }
    }
    return false;
}

//Event listening on Add book
let bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", addBook);

function addBook(e) {
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("bookAuthor").value;
    let display = new Display();
    display.validateData(name, author);

    e.preventDefault();
}

//Search button functionality
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchBooksClick);

function searchBooksClick(e) {
    let searchBy = document.getElementById("searchBy");
    let searchByText = searchBy.options[searchBy.selectedIndex].text;

    let savedBooksUI = document.getElementsByClassName("savedBooksUI");
    let searchTerm = document.getElementById("search").value.toLowerCase().trim();

    if (searchByText == "Search by Title") {
        Array.from(savedBooksUI).forEach((element, index) => {
            let title = element.getElementsByTagName("td")[1].innerText.toLowerCase();
            if (title.includes(searchTerm)) {
                element.style.border = "2px solid #0d6efd";
                savedBooksUI[index].style.display = "table-row";
            }
            else {
                element.style.display = "none";
            }
        });
    }
    else if (searchByText == "Search by Author") {
        Array.from(savedBooksUI).forEach((element, index) => {
            let author = element.getElementsByTagName("td")[2].innerText.toLowerCase();
            if (author.includes(searchTerm)) {
                element.style.border = "2px solid #0d6efd";
                savedBooksUI[index].style.display = "table-row";
            }
            else {
                element.style.display = "none";
            }
        });
    }
    else if (searchByText == "Search by Type") {
        Array.from(savedBooksUI).forEach((element, index) => {
            let type = element.getElementsByTagName("td")[3].innerText.toLowerCase();
            if (type.includes(searchTerm)) {
                element.style.border = "2px solid #0d6efd";
                savedBooksUI[index].style.display = "table-row";
            }
            else {
                element.style.display = "none";
            }
        });
    }
    if (searchTerm == "") {
        showBooks();
    }
    e.preventDefault();
}

let search = document.getElementById("search");
search.addEventListener("input", searchBooksBy);

// Highlighting results by searching
function searchBooksBy(e) {
    let searchBy = document.getElementById("searchBy");
    let searchByText = searchBy.options[searchBy.selectedIndex].text;
    let savedBooksUI = document.getElementsByClassName("savedBooksUI");
    let searchTerm = search.value.toLowerCase().trim();

    if (searchByText == "Search by Title") {
        Array.from(savedBooksUI).forEach((element, index) => {
            let title = element.getElementsByTagName("td")[1].innerText.toLowerCase();
            if (title.includes(searchTerm)) {
                element.style.border = "2px solid #0d6efd";
                savedBooksUI[index].style.display = "table-row";
            }
            else {
                element.style.border = "1px solid white"
            }
        });
    }
    else if (searchByText == "Search by Author") {
        Array.from(savedBooksUI).forEach((element, index) => {
            let author = element.getElementsByTagName("td")[2].innerText.toLowerCase();
            if (author.includes(searchTerm)) {
                element.style.border = "2px solid #0d6efd";
                savedBooksUI[index].style.display = "table-row";
            }
            else {
                element.style.border = "1px solid white"
            }
        });
    }
    else if (searchByText == "Search by Type") {
        Array.from(savedBooksUI).forEach((element, index) => {
            let type = element.getElementsByTagName("td")[3].innerText.toLowerCase();
            if (type.includes(searchTerm)) {
                element.style.border = "2px solid #0d6efd";
                savedBooksUI[index].style.display = "table-row";
            }
            else {
                element.style.border = "1px solid white"
            }
        });
    }
    if (searchTerm == "") {
        Array.from(savedBooksUI).forEach((element) => {
            element.style.border = "1px solid white";
        });
    }

    e.preventDefault();
}

// Delte book event listner and message
let delBook = document.getElementById("delBook");
delBook.addEventListener("click", () => {
    showMessage("deleteBook");
});