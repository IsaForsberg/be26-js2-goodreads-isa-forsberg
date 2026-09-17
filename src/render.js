// Bygger om listorna i DOM:en utifrån aktuell bokdata

function buildBookInfo(book) {
  const bookInfo = document.createElement('p')
  bookInfo.className = 'book-info'
  bookInfo.textContent = `Title: ${book.title}\nAuthor: ${book.author}`
  return bookInfo
}

function buildCheckboxSection(book) {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = book.isRead
  checkbox.dataset.id = book.id

  const checkboxLabel = document.createElement('label')
  if (!book.isRead) {
    checkboxLabel.textContent = 'Mark as Read'
  }

  const checkboxWrapper = document.createElement('span')
  checkboxWrapper.className = 'checkbox-wrapper'
  checkboxWrapper.append(checkbox, checkboxLabel)
  return checkboxWrapper
}

function buildRatingSection(book) {
  const ratingContainer = document.createElement('div')
  ratingContainer.className = 'rating-container'

  if (book.isRead) {
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
  }
  return ratingContainer
}

function buildDeleteButton(book) {
  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Delete Book'
  deleteBtn.className = 'delete-btn'
  deleteBtn.dataset.id = book.id
  return deleteBtn
}

function buildCommentSection(book, commentDrafts) {
  const commentInput = document.createElement('textarea')
  commentInput.className = 'comment-input'
  commentInput.dataset.id = book.id
  commentInput.value = commentDrafts[book.id] ?? (book.comment || '')
  commentInput.maxLength = 200

  const commentBtn = document.createElement('button')
  commentBtn.textContent = 'Add Comment'
  commentBtn.dataset.id = book.id
  commentBtn.className = 'comment-btn'

  return [commentInput, commentBtn]
}

function buildBookListItem(book, commentDrafts) {
  const listItem = document.createElement('li')
  listItem.append(
    buildBookInfo(book),
    buildCheckboxSection(book),
    buildRatingSection(book),
    buildDeleteButton(book)
  )

  if (book.isRead) {
    listItem.append(...buildCommentSection(book, commentDrafts))
  }

  return listItem
}

export function renderBooks(bookList, commentDrafts) {
  const wantsToReadList = document.getElementById('wantsToReadList')
  const haveReadList = document.getElementById('haveReadList')
  wantsToReadList.innerHTML = ''
  haveReadList.innerHTML = ''

  for (const book of bookList) {
    const listItem = buildBookListItem(book, commentDrafts)
    if (book.isRead) {
      haveReadList.append(listItem)
    } else {
      wantsToReadList.append(listItem)
    }
  }
}
