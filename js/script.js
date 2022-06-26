
const formInputBook = document.getElementById('input-book')

formInputBook.addEventListener('submit', (event) => {
    event.preventDefault()
    addBook()
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

    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('year').value = ''
    document.getElementById('isComplete').value = ''
}

const contentBooks = (e) => {
    const parent = document.querySelector('.uncompletedread')

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

    wrapContent.classList.add('wrap-btn')

    wrapContent.append(completedButton)
    wrapContent.append(deleteButton)

    cardBooksUnComplete.append(wrapContent)
    cardBooksUnComplete.classList.add('card-book')
    parent.append(cardBooksUnComplete)
}

const getListBook = () => {
    let unCompleteBookList = books.filter((book) => !book.isComplete)
    return unCompleteBookList.map(e => contentBooks(e))
}

const getBooks = () => {
    if (localStorage.books) {
        books = JSON.parse(localStorage.getItem('books'))
    }
    getInfoBooks()
}

getBooks()
getListBook()