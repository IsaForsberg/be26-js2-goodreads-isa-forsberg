import { url } from "./getbooks.js" 


// POST:ar ett nytt bok-objekt till Firebase och returnerar svaret (bl.a. den nya nyckeln)
export async function addBook(bookData){
        const options = {
            method: 'POST',
            body: JSON.stringify(bookData),
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(`${url}.json`, options)
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

