import './style.css'
import { Book } from './Book.js'
import { getBooks } from './firebaserequest/getbooks.js'
import { renderBooks } from './render.js'
import { addBook } from './firebaserequest/addbook.js'
import { updateBook } from './firebaserequest/updatebook.js'

let bookList = [];
//skapar array för att samal objekten
//omvandlar rådata till instanser och samlar dem i en array
function mapBooks(data) {
  const bookList = []
  for (const key in data) {
    const item = data[key]
    bookList.push(new Book(key, item.title, item.author, item.isRead, item.rating, item.comment))
  }
  return bookList
}

// Hämtar färsk data från Firebase, mappar till Book-instanser och renderar om listan
async function loadAndRenderBooks() {
   bookList = mapBooks(await getBooks())
  renderBooks(bookList)
}
await loadAndRenderBooks()

const showFormBtn = document.getElementById('showFormBtn')
const addBookForm = document.getElementById('addBookForm')

// Visar/döljer formuläret och uppdaterar knapptexten därefter
showFormBtn.addEventListener('click', () => {
  addBookForm.hidden = !addBookForm.hidden
  if (addBookForm.hidden === true){
    showFormBtn.textContent = 'Add New Book'
  } else {
    showFormBtn.textContent = 'Close Form'
  }
})



// Lägger till en ny bok via addBook och rensar formuläret, formuläret förblir öppet
addBookForm.addEventListener('submit', async (event)=> {
const titleInput = document.getElementById('titleInput')
const authorInput = document.getElementById('authorInput')
    event.preventDefault();
    const bookData = {
    title: titleInput.value,
    author: authorInput.value,
    isRead: false,
    rating: 0,
    comment: ''
 }
   await addBook(bookData)
    titleInput.value = ''
    authorInput.value = ''
   await loadAndRenderBooks()

})

// Togglar isRead på boken som checkboxen tillhör, sparar ändringen i Firebase och renderar om listan
async function handleReadToggle(event){
  const book = bookList.find(book => book.id === event.target.dataset.id)
  book.toggleRead()
  await updateBook(book.id, { isRead: book.isRead })
  await loadAndRenderBooks()
}

// Sätter betyget på boken vars stjärna klickades, sparar ändringen i Firebase och renderar om listan
async function handleRatingClick (event){
  const book = bookList.find(book => book.id === event.target.dataset.id)
  book.setRating(Number(event.target.dataset.value))
  await updateBook(book.id, {rating: book.rating})
  await loadAndRenderBooks()
}
const wantsToReadList = document.getElementById('wantsToReadList')
const haveReadList = document.getElementById('haveReadList')

wantsToReadList.addEventListener('change', handleReadToggle)
haveReadList.addEventListener('change', handleReadToggle)
haveReadList.addEventListener('click', handleRatingClick)




