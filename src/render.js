// Renderar om hela listan: tömmer båda hyllorna och sorterar in varje bok efter isRead
export function renderBooks(bookList, commentDrafts) {
  const wantsToReadList = document.getElementById('wantsToReadList')
  const haveReadList = document.getElementById('haveReadList')
  wantsToReadList.innerHTML = ''
  haveReadList.innerHTML = ''

  for (const book of bookList) {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = book.isRead
    // Märker checkboxen med bokens id (data-id) så main.js kan koppla event.target till rätt bok
    checkbox.dataset.id = book.id

    const checkboxLabel = document.createElement('label')
    const checkboxWrapper = document.createElement('span') // för styling, centrera text och box
    checkboxWrapper.className = 'checkbox-wrapper'
    checkboxWrapper.append(checkbox, checkboxLabel)

    // Håller ihop stjärnorna, fylls bara i om boken är läst
    const ratingContainer = document.createElement('div')
    ratingContainer.className = 'rating-container'

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete Book'
    deleteBtn.className = 'delete-btn'
    deleteBtn.dataset.id = book.id
    
    const bookInfo = document.createElement('p')
    bookInfo.className = 'book-info'
    bookInfo.textContent = `Title: ${book.title}\nAuthor: ${book.author}`

    const listItem = document.createElement('li')
    listItem.append(bookInfo, checkboxWrapper, ratingContainer, deleteBtn)

    if (book.isRead === true) {
      // Skapar 5 stjärnor, fyller dem upp till book.rating och märker varje med bokens id + eget värde (1-5)
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span')
        star.dataset.value = i
        star.dataset.id = book.id
        if (i <= book.rating) {
          star.innerHTML = '★' 
          star.style.color = 'gold'
        } else {
          star.innerHTML = '☆' 
          star.style.color = 'black'
        }
        ratingContainer.appendChild(star)
      }
       const commentInput = document.createElement('textarea')
       const commentBtn = document.createElement('button')
       commentBtn.textContent = 'Add Comment'
       commentBtn.dataset.id = book.id
       commentBtn.className = 'comment-btn'
       commentInput.className = 'comment-input'
       commentInput.dataset.id = book.id
       // Prioriterar en opsarad draft (från main.js) över den sparade kommentaren i Firebase
       commentInput.value = commentDrafts[book.id] ?? (book.comment || '')
       commentInput.maxLength = 200
       listItem.append(commentInput, commentBtn)
      haveReadList.append(listItem)
    } else {
      //Oläst bok får "Mark as Read" vid checkboxen
      checkboxLabel.textContent = 'Mark as Read'
      wantsToReadList.append(listItem)
    }
  }
}