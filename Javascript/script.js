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




const myLibrary = [];


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
    
function displayCard(i) {
    // for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card")
        bookCard.classList.add("book")
        bookCard.dataset.uniqueId = myLibrary[i].id;
        bookCard.dataset.arrayLength = myLibrary.length - 1;

        const imageParent = document.createElement("div");
        imageParent.classList.add("image");

        const coverImage = document.createElement("img")
        coverImage.src = myLibrary[i].bookcover;
        

        

        const imageDetails = document.createElement("div");
        imageDetails.classList.add("image-details");

        const title = document.createElement("h3")
        title.classList.add("bookTitle")
        title.innerText = myLibrary[i].bookname

        const author = document.createElement("h6")
        author.classList.add("authorName")
        author.innerText = myLibrary[i].authorname

        const pages = document.createElement("h6")
        pages.classList.add("authorName")
        pages.innerText = myLibrary[i].pagesnumber

        const complete = document.createElement("button");
        complete.classList.add("book-btn", "complete");
        complete.innerHTML = myLibrary[i].read ? "Completed" : "Mark Complete";
        complete.dataset.arrayLength = i;

        // ✅ Add event listener directly here
        // complete.addEventListener('click', () => {
        //     myLibrary[i].toggleRead();
        //     complete.innerHTML = myLibrary[i].read ? "Completed" : "Mark Complete";
        // });

        const deleteCard = document.createElement("button")
        deleteCard.classList.add("book-btn")
        deleteCard.classList.add("delete")
        deleteCard.innerHTML = "Delete";
        deleteCard.dataset.uniqueId = myLibrary[i].id;
        
        

        // complete.addEventListener('click', () => {
        //     if(myLibrary[i].read){
        //         myLibrary[i].read = false;
        //     }else{
        //         myLibrary[i].read = true;
        //     }
        // })

        books.appendChild(bookCard);
        bookCard.appendChild(imageParent)
        imageParent.appendChild(coverImage)
        bookCard.appendChild(imageDetails)
        imageDetails.appendChild(title)
        imageDetails.appendChild(author)
        imageDetails.appendChild(pages)
        imageDetails.appendChild(complete)
        imageDetails.appendChild(deleteCard)



        const deleteAll = document.querySelectorAll(".delete")
        deleteAll.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', (e) => {
                const id = deleteBtn.getAttribute("data-unique-id");
                const theBook = document.querySelector(`.book[data-unique-id= "${id}"]`);
                if(theBook){
                    theBook.remove()
                }
        
        
            })
        });


        const markComplete = document.querySelectorAll(".complete");
        markComplete.forEach(markCompleteBtn => {
            
            markCompleteBtn.addEventListener('click', (e) => {
                const index = markCompleteBtn.getAttribute("data-array-length");
                const theIndex = document.querySelector(`.book[data-array-length= "${index}"]`);
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
    // 
    let newDetail = addBookToLibrary();
    myLibrary.push(newDetail);
    console.log(myLibrary)
    let numberOfDetails = myLibrary.length - 1;
    displayCard(numberOfDetails);
})


