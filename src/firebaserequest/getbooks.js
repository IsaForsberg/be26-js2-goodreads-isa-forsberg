export const url = 'https://goodreads-75a80-default-rtdb.europe-west1.firebasedatabase.app/books'

// Hämtar all bokdata (rått objekt keyat på Firebase-id) från databasen
export async function getBooks() {
  try {
    const response = await fetch(`${url}.json`)
    if (!response.ok) {
      throw new Error(`Something went wrong!: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
