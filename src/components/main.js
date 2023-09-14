import { createRoot } from 'react-dom/client'
import {StrictMode} from 'react'
import User from './user'
const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <User {...(__INIT_DATA__||{})} />
)
