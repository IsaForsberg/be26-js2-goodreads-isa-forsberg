// Renderar om hela listan: tömmer båda hyllorna och sorterar in varje bok efter isRead
export function renderBooks(bookList){
    const wantsToReadList = document.getElementById('wantsToReadList')
    const haveReadList = document.getElementById('haveReadList')
     wantsToReadList.innerHTML = ''
     haveReadList.innerHTML = ''
    
    for (const book of bookList) {
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = book.isRead
        checkbox.dataset.id = book.id
        const listItem = document.createElement('li')
        listItem.textContent = `${book.title} ${book.author}`
        listItem.append(checkbox)
        if(book.isRead === true){
            haveReadList.append(listItem)
        }else{
            wantsToReadList.append(listItem)
        }  
    }
}