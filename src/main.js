// Startpunkt: laddar böckerna och kopplar på all interaktion

import './style.css'
import { loadAndRenderBooks } from './bookstate.js'
import { registerEventListeners } from './eventhandlers.js'

await loadAndRenderBooks()
registerEventListeners()
