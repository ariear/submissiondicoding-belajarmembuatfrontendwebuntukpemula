
const formInputBook = document.getElementById('input-book')

formInputBook.addEventListener('submit', (event) => {
    event.preventDefault()
    addBook()
})

document.getElementById('isComplete').addEventListener('click', (e) => {
    let btn = document.getElementById('btn-addtochart')
    if (e.target.checked) {
        btn.innerText = 'Masukkan buku ke rak selesai dibaca'
    }else {
        btn.innerText = 'Masukkan buku ke rak Belum selesai dibaca'
    }
})

let books = []

const getInfoBooks = () => {
    const totalBooks = document.querySelector('.total-books')
    totalBooks.innerText = books.length

    const completeRead = books.filter((book) => book.isComplete)
    const completeBook = document.querySelector('.completed-books')
    completeBook.innerText = completeRead.length

    const unCompleteRead = books.filter((book) => !book.isComplete)
    const unCompleteBook = document.querySelector('.unCompleted-books')
    unCompleteBook.innerText = unCompleteRead.length
}

const generateId = () => {
    return +new Date();
  }

const addBook = () => {
    const id = generateId()
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const year = document.getElementById('year').value
    const isComplete = document.getElementById('isComplete').checked

    books.push({
        id,
        title,
        author,
        year,
        isComplete
    })

    localStorage.setItem('books', JSON.stringify(books))
    getBooks()
    document.dispatchEvent(new Event('RENDER_EVENT'))

    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('year').value = ''
    document.getElementById('isComplete').value = ''
}

function removeBook(bookId) {
    const bookTarget = findBookIndex(bookId);
   
    if (bookTarget === -1) return;
   
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event('RENDER_EVENT'));
    localStorage.setItem('books', JSON.stringify(books))
    getBooks()
  }

  function findBookIndex(bookId) {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index;
      }
    }
    return -1;
  }

  function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = false;
    document.dispatchEvent(new Event('RENDER_EVENT'));
    localStorage.setItem('books', JSON.stringify(books))
    getBooks()
  }

  function addBookToCompleted (bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = true;
    document.dispatchEvent(new Event('RENDER_EVENT'));
    localStorage.setItem('books', JSON.stringify(books))
    getBooks()
  }

  function findBook(bookId) {
    for (const bookItem of books) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
  }

document.addEventListener('RENDER_EVENT', () => {
    const parentUnCompleted = document.querySelector('.parent-card-books')
    parentUnCompleted.innerHTML = ''
 
    const parentCompleted = document.querySelector('.parent-card-books-completed')
    parentCompleted.innerHTML = ''

    getListBookUnCompleted()
    getListBookCompleted()
})

const cardUnCompleted = (e) => {
    const parent = document.querySelector('.parent-card-books')

    const cardBooksUnComplete = document.createElement('div')
    const title = document.createElement('h3')
    const author = document.createElement('p')
    const year = document.createElement('p')
    
    title.innerText = e.title
    author.innerText = `Penulis : ${e.author}`
    year.innerText = `Tahun : ${e.year}`

    cardBooksUnComplete.append(title)
    cardBooksUnComplete.append(author)
    cardBooksUnComplete.append(year)

    const wrapContent = document.createElement('div')
    const completedButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    
    completedButton.innerText = 'selesai dibaca'
    deleteButton.innerText = 'hapus buku'
    
    completedButton.classList.add('btn-green')
    deleteButton.classList.add('btn-red')

    completedButton.addEventListener('click', () => {
        addBookToCompleted(e.id)
    })

    deleteButton.addEventListener('click', () => {
        removeBook(e.id)
    })

    wrapContent.classList.add('wrap-btn')

    wrapContent.append(completedButton)
    wrapContent.append(deleteButton)

    cardBooksUnComplete.append(wrapContent)
    cardBooksUnComplete.classList.add('card-book')
    parent.append(cardBooksUnComplete)
}

const cardCompleted = (e) => {
    const parent = document.querySelector('.parent-card-books-completed')

    const cardBooksUnComplete = document.createElement('div')
    const title = document.createElement('h3')
    const author = document.createElement('p')
    const year = document.createElement('p')
    
    title.innerText = e.title
    author.innerText = `Penulis : ${e.author}`
    year.innerText = `Tahun : ${e.year}`

    cardBooksUnComplete.append(title)
    cardBooksUnComplete.append(author)
    cardBooksUnComplete.append(year)

    const wrapContent = document.createElement('div')
    const completedButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    
    completedButton.innerText = 'belum selesai dibaca'
    deleteButton.innerText = 'hapus buku'
    
    completedButton.classList.add('btn-green')
    deleteButton.classList.add('btn-red')

    completedButton.addEventListener('click', () => {
        undoBookFromCompleted(e.id)
    })

    deleteButton.addEventListener('click', () => {
        removeBook(e.id)
    })

    wrapContent.classList.add('wrap-btn')

    wrapContent.append(completedButton)
    wrapContent.append(deleteButton)

    cardBooksUnComplete.append(wrapContent)
    cardBooksUnComplete.classList.add('card-book')
    parent.append(cardBooksUnComplete)
}

const getListBookUnCompleted = () => {
    let unCompleteBookList = books.filter((book) => !book.isComplete)
    return unCompleteBookList.map(e => cardUnCompleted(e))
}
const getListBookCompleted = () => {
    let unCompleteBookList = books.filter((book) => book.isComplete)
    return unCompleteBookList.map(e => cardCompleted(e))
}

const getBooks = () => {
    if (localStorage.books) {
        books = JSON.parse(localStorage.getItem('books'))
    }
    getInfoBooks()
}

getBooks()
getListBookCompleted()
getListBookUnCompleted()


document.getElementById('search').addEventListener('input', (event) => {
    const filter = event.target.value.toLowerCase()
    const listCard = document.querySelectorAll('.card-book')

    listCard.forEach((item) => {
        let text = item.querySelector('h3').textContent
        if (text.toLowerCase().includes(filter.toLowerCase())) {
            item.style.display = ''
        }else {
            item.style.display = 'none'
        }
    })
})