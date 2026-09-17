// Datalager: håller bokdata i minnet och hämtar/mappar den från Firebase

import { Book } from './Book.js'
import { getBooks } from './firebaserequest/getbooks.js'
import { renderBooks } from './render.js'

let bookList = []
// Håller opsarad kommentartext per boks id, så den inte försvinner vid omrendering (betygsättning)
export const commentDrafts = {}

function mapBooks(data) {
  const bookList = []
  for (const key in data) {
    const item = data[key]
    bookList.push(new Book(key, item.title, item.author, item.isRead, item.rating, item.comment))
  }
  return bookList
}

export function findBookById(id) {
  return bookList.find(book => book.id === id)
}

export async function loadAndRenderBooks() {
  bookList = mapBooks(await getBooks())
  renderBooks(bookList, commentDrafts)
}