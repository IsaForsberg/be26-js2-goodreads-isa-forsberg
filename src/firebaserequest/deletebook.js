import { url } from './getbooks.js'

export async function deleteBook(id) {
  const options = {
    method: 'DELETE'
  }
  try {
    const response = await fetch(`${url}/${id}.json`, options)
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
