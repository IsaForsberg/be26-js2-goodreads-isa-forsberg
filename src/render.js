// Renderar om hela listan: tömmer båda hyllorna och sorterar in varje bok efter isRead
export function renderBooks(bookList) {
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

    const listItem = document.createElement('li')
    listItem.textContent = `Title: ${book.title}\nAuthor:${book.author}`
    listItem.append(checkboxWrapper, ratingContainer)

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
      haveReadList.append(listItem)
    } else {
      //Oläst bok får "Mark as Read" vid checkboxen
      checkboxLabel.textContent = 'Mark as Read'
      wantsToReadList.append(listItem)
    }
  }
}