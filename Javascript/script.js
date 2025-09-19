const addBook = document.querySelector(".addBook");
const goBack = document.querySelector(".goBack")
const panel = document.querySelector(".panel");
const overlay = document.querySelector(".overlay");
const bookName = document.querySelector("#bookName")
const authorName = document.querySelector("#authorName")
const pagesNumber = document.querySelector("#pagesNumber")
const bookCover = document.querySelector("#bookCover")
const addBtn = document.querySelector(".addBtn")
const complete = document.querySelector(".book .image-details .complete")
const books = document.querySelector(".books")
const book = document.querySelector(".book")
const allBookCards = document.querySelectorAll(".book")


addBook.addEventListener('click', () => {
    panel.classList.add('active');
    overlay.classList.add('active');
})

goBack.addEventListener('click', () => {
    panel.classList.remove('active');
    overlay.classList.remove('active');
})

overlay.addEventListener('click', () => {
    panel.classList.remove('active');
    overlay.classList.remove('active');
})

panel.addEventListener('click', (e) => {
    e.stopPropagation();
})



let myLibrary = [];


// CONSTRUCTOR FUNCTION OF BOOK
function Book(bookname, authorname, pagesnumber, bookcover) {
    this.id = crypto.randomUUID();
    this.bookname = bookname;
    this.authorname = authorname;
    this.pagesnumber = pagesnumber;
    this.bookcover = bookcover;
    this.read = false;
}

Book.prototype.toggleRead = function(){
    this.read = !this.read;
}


// FUNCTION THAT GIVE US DATA URL WHEN WE CHANGE THE FILE INPUT
let coverOfBook = null; 
bookCover.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const dataURL = e.target.result;
            coverOfBook = dataURL; // Assign the dataURL to the higher-scoped variable
            displayBookCover(coverOfBook); // Example: call a function that uses the dataURL
        };
        reader.readAsDataURL(file);
    }
});

let theGlobalBookCover;
function displayBookCover(dataUrl) {
    if (dataUrl) {
        theGlobalBookCover = dataUrl
    } else {
        console.log("coverOfBook is not yet available.");
    }
}



// FUNCTION THAT CREATES A NEW INSTANCE OF THE BOOK CONSTRUCTOR
function addBookToLibrary() {
  // take params, create a book then store it in the myLibrary
  let nameOfAuthor = authorName.value;
  let nameOfBook = bookName.value;
  let pagesOfBook = pagesNumber.value

    let coverOfBook = theGlobalBookCover; 
  const newBook = new Book(nameOfBook, nameOfAuthor, pagesOfBook, coverOfBook);
        return newBook;
  
}


// FUNCION THAT CREATES A NEW CARD


function createNewBook(book, index){
        // Card Div - Parent Element
        const bookCard = document.createElement("div");
        bookCard.classList.add("card")
        bookCard.classList.add("book")
        bookCard.dataset.uniqueId = book.id;
        bookCard.dataset.arrayLength = index;

        // Image container
        const imageParent = document.createElement("div");
        imageParent.classList.add("image");

        const coverImage = document.createElement("img")
        coverImage.src = book.bookcover;

        // Image Details Container
        const imageDetails = document.createElement("div");
        imageDetails.classList.add("image-details");

        // Book Title
        const title = document.createElement("h3")
        title.classList.add("bookTitle")
        title.innerText = book.bookname

        // Author's Name
        const author = document.createElement("h6")
        author.classList.add("authorName")
        author.innerText = book.authorname

        // Number of Pages
        const pages = document.createElement("h6")
        pages.innerText = book.pagesnumber

        // Mark Complete Button
        const complete = document.createElement("button");
        complete.classList.add("book-btn", "complete");
        complete.innerHTML = "Mark Complete"

        // Delete Button
        const deleteCard = document.createElement("button")
        deleteCard.classList.add("book-btn")
        deleteCard.classList.add("delete")
        deleteCard.innerHTML = "Delete";


        // books.appendChild(bookCard);
        bookCard.appendChild(imageParent)
        imageParent.appendChild(coverImage)
        bookCard.appendChild(imageDetails)
        imageDetails.appendChild(title)
        imageDetails.appendChild(author)
        imageDetails.appendChild(pages)
        imageDetails.appendChild(complete)
        imageDetails.appendChild(deleteCard)

        return bookCard;


}


    
function displayCard(i) {
        const markComplete = document.querySelectorAll(".complete");
        markComplete.forEach(markCompleteBtn => {
            
            markCompleteBtn.addEventListener('click', (e) => {
                const index = markCompleteBtn.getAttribute("data-array-length");
                const theIndex = document.querySelector(`.book[data-array-length="${index}"]`);
                if(theIndex){
                    console.log("Inde is true" + index)
                    myLibrary[index].toggleRead();
                    markCompleteBtn.innerHTML = myLibrary[index].read ? "Completed" : "Mark Complete";
                }
        
        
            })
        })

    }
// }





// FUNCTION THAT HANDLES THE CLICK OF ADD BOOK
addBtn.addEventListener('click', (e) => {
    e.preventDefault() 
    let newDetail = addBookToLibrary();
    myLibrary.push(newDetail);
    console.log(myLibrary)
    let recentBook = createNewBook(newDetail, myLibrary.length - 1);
    books.appendChild(recentBook);

})



books.addEventListener('click', (e) => {
  const completeBtn = e.target.closest('.complete');

  if (completeBtn && books.contains(completeBtn)) {
    const card = completeBtn.closest('.card');
    const id = card.dataset.uniqueId;
    console.log("You dey work?");
    myLibrary = myLibrary.map(book => {
        if (book.id === id) {
          book.read = !book.read;
          e.target.textContent = book.read ? "Completed" : "Mark Complete";
        }
        return book;
      });
      

    
    // toggle book by id
  }

  const deleteBtn = e.target.closest('.delete');
  if (deleteBtn && books.contains(deleteBtn)) {
    const card = deleteBtn.closest('.card');
    const id = card.dataset.uniqueId;
    card.remove()
    myLibrary = myLibrary.filter(book => book.id !== id);
     console.log(id)
  }
});
