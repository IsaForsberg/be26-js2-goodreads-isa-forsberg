// Representerar en bok, med privata fält och kontrollerad åtkomst via getters/metoder
export class Book {
  #id
  #title
  #author
  #isRead
  #rating
  #comment

  constructor(id, title, author, isRead, rating, comment) {
    this.#id = id
    this.#title = title
    this.#author = author
    this.#isRead = isRead
    this.#rating = rating
    this.#comment = comment
  }

  get title() {
    return this.#title
  }

  get id() {
    return this.#id
  }

  get author() {
    return this.#author
  }

  get isRead() {
    return this.#isRead
  }

  get rating() {
    return this.#rating
  }

  get comment() {
    return this.#comment
  }

  // Växlar mellan läst/oläst
  toggleRead() {
    this.#isRead = !this.#isRead
  }

  // Sätter betyg, kastar fel om värdet ligger utanför 1-5
  setRating(value) {
    if (value < 1 || value > 5) {
      throw new Error('cant be over 5 och under 1')
    }
    this.#rating = value
  }

  // Sätter kommentartext
  setComment(text) {
    this.#comment = text
  }
}