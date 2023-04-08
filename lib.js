let myLibrary = [];

function Book(title, author, nrOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.nrOfPages = nrOfPages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  event.preventDefault();

  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let isRead = document.querySelector("#read").checked;
  let addedBook = new Book(title, author, pages, isRead);
  myLibrary.push(addedBook);
  console.table(addedBook);
  console.table(myLibrary);
  bookDisplay();
  let bookCards = document.querySelectorAll(".bookCard");
  let i = 0;
  bookCards.forEach((book) => {
    book.dataset.index = i;
    i++;
  });
}

testBook1 = new Book("Song of Ice and Fire", "George R R Martin", 5000, false);
testBook2 = new Book("Fram Ursul Polar", "Cezar Petrescu", 180, true);
//myLibrary.push(testBook1);
//myLibrary.push(testBook2);

function bookDisplay() {
  let bookWrapper = document.querySelector(".bookWrapper");
  let bookCards = document.querySelectorAll(".bookCard");
  bookCards.forEach((book) => bookWrapper.removeChild(book));
  for (let i = 0; i < myLibrary.length; i++) {
    let bookCard = document.createElement("div");
    bookCard.setAttribute("class", "bookCard");

    const titleText = document.createElement("p");
    titleText.textContent = '"' + myLibrary[i].title + '"';
    const author = document.createElement("p");
    author.textContent = "By: " + myLibrary[i].author;
    const nrOfPages = document.createElement("p");
    nrOfPages.textContent = myLibrary[i].nrOfPages + " pages";
    const readStatus = document.createElement("p");
    if (myLibrary[i].isRead) {
      readStatus.textContent = "Has been read";
    } else {
      readStatus.textContent = "Not read yet";
    }

    const readButton = document.createElement("button");
    readButton.textContent = "Change read status";
    readButton.setAttribute("class", "readButton");
    readButton.addEventListener("click", () => {
      if (myLibrary[i].isRead) {
        myLibrary[i].isRead = false;
      } else {
        myLibrary[i].isRead = true;
      }
      bookDisplay();
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove book";
    removeButton.setAttribute("class", "removeButton");
    removeButton.addEventListener("click", () => {
      let removedBook = document.querySelector(`[data-index="${i}"]`);
      bookWrapper.removeChild(removedBook);
      myLibrary.splice(i, 1);
    });

    bookCard.appendChild(titleText);
    bookCard.appendChild(author);
    bookCard.appendChild(nrOfPages);
    bookCard.appendChild(readStatus);
    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);
    bookWrapper.appendChild(bookCard);
  }
}

const newBookButton = document.querySelector("#addBook");
newBookButton.addEventListener("click", () => {
  let formBlock = document.querySelector(".formWrapper");
  formBlock.classList.toggle("visible");
});

const form = document.querySelector("form");
form.addEventListener("submit", () => {
  let formBlock = document.querySelector(".formWrapper");
  addBookToLibrary();
  form.reset();
  formBlock.classList.toggle("visible");
});

bookDisplay();
