// Hanterar användarens interaktioner (klick, formulär) och kopplar dem till rätt DOM-element

import { addBook } from './firebaserequest/addbook.js'
import { updateBook } from './firebaserequest/updatebook.js'
import { deleteBook } from './firebaserequest/deletebook.js'
import { commentDrafts, findBookById, loadAndRenderBooks } from './bookstate.js'

const showFormBtn = document.getElementById('showFormBtn')
const addBookForm = document.getElementById('addBookForm')
const errorMessage = document.getElementById('errorMessage')
const wantsToReadList = document.getElementById('wantsToReadList')
const haveReadList = document.getElementById('haveReadList')

function showError(message) {
  errorMessage.textContent = message
}

function clearError() {
  errorMessage.textContent = ''
}

function handleFormToggle() {
  addBookForm.hidden = !addBookForm.hidden
  if (addBookForm.hidden === true) {
    showFormBtn.textContent = 'Add New Book'
  } else {
    showFormBtn.textContent = 'Close Form'
  }
}

// Formuläret stängs medvetet inte automatiskt, så man kan lägga till flera böcker i rad
async function handleAddBookSubmit(event) {
  const titleInput = document.getElementById('titleInput')
  const authorInput = document.getElementById('authorInput')
  event.preventDefault()
  const bookData = {
    title: titleInput.value,
    author: authorInput.value,
    isRead: false,
    rating: 0,
    comment: ''
  }
  try {
    clearError()
    await addBook(bookData)
    titleInput.value = ''
    authorInput.value = ''
    await loadAndRenderBooks()
  } catch (error) {
    showError('Kunde inte lägga till boken, försök igen.')
  }
}

async function handleReadToggle(event) {
  // Change bubblar även från t.ex. textarean vid blur, ignorera allt som inte är checkboxen
  if (event.target.type !== 'checkbox') return
  const book = findBookById(event.target.dataset.id)
  // Eventet kan bubbla upp från andra element i listan utan dataset.id (t.ex. kommentarfältet), ignorera då
  if (!book) {
    return
  }
  try {
    clearError()
    book.toggleRead()
    await updateBook(book.id, { isRead: book.isRead })
    await loadAndRenderBooks()
  } catch (error) {
    showError('Kunde inte uppdatera läststatus, försök igen.')
  }
}

async function handleRatingClick(event) {
  // Bara stjärnorna har dataset.value, ignorera klick på knappen/tomma ytor i listan
  if (!event.target.dataset.value) return
  const book = findBookById(event.target.dataset.id)
  if (!book) {
    return
  }
  try {
    clearError()
    book.setRating(Number(event.target.dataset.value))
    await updateBook(book.id, { rating: book.rating })
    await loadAndRenderBooks()
  } catch (error) {
    showError('Kunde inte spara betyget, försök igen.')
  }
}

async function handleCommentSave(event) {
  // Delar click-eventet på haveReadList med handleRatingClick, ignorera allt som inte är just den här knappen
  if (!event.target.classList.contains('comment-btn')) return
  const book = findBookById(event.target.dataset.id)
  if (!book) {
    return
  }
  try {
    clearError()
    const listItem = event.target.closest('li')
    const textarea = listItem.querySelector('textarea')
    textarea.classList.add('saved')
    book.setComment(textarea.value)
    await updateBook(book.id, { comment: book.comment })
    await loadAndRenderBooks()
    delete commentDrafts[book.id]
  } catch (error) {
    showError('Kunde inte spara kommentar, försök igen.')
  }
}

// Sparar opsarad text medan användaren skriver, så den inte försvinner om t.ex. ett betyg sätts innan "Add Comment" klickas
async function handleCommentInput(event) {
  if (!event.target.classList.contains('comment-input')) return
  commentDrafts[event.target.dataset.id] = event.target.value
}

async function handleDeleteClick(event) {
  if (!event.target.classList.contains('delete-btn')) return
  const book = findBookById(event.target.dataset.id)
  if (!book) {
    return
  }
  try {
    clearError()
    await deleteBook(book.id)
    await loadAndRenderBooks()
  } catch (error) {
    showError('Kunde inte ta bort boken, försök igen.')
  }
}

export function registerEventListeners() {
  showFormBtn.addEventListener('click', handleFormToggle)
  addBookForm.addEventListener('submit', handleAddBookSubmit)
  wantsToReadList.addEventListener('change', handleReadToggle)
  haveReadList.addEventListener('change', handleReadToggle)
  haveReadList.addEventListener('click', handleRatingClick)
  haveReadList.addEventListener('click', handleCommentSave)
  haveReadList.addEventListener('input', handleCommentInput)
  wantsToReadList.addEventListener('click', handleDeleteClick)
  haveReadList.addEventListener('click', handleDeleteClick)
}
