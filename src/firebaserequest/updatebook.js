import { url } from './getbooks.js'

export async function updateBook(id, changes) {
  const options = {
    method: 'PATCH',
    body: JSON.stringify(changes),
    headers: {
      'Content-Type': 'application/json'
    }
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
