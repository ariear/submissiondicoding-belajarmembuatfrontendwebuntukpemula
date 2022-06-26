
const formInputBook = document.getElementById('input-book')

formInputBook.addEventListener('submit', (event) => {
    event.preventDefault()
    addBook()
})

let books = []
const getBooks = () => {
    if (localStorage.books) {
        books = JSON.parse(localStorage.getItem('books'))
    }
    getInfoBooks()
}

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

getBooks()

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

    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('year').value = ''
    document.getElementById('isComplete').value = ''
}