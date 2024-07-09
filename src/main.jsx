import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Import in your main JS file, e.g., index.js or App.js
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';                 // Core CSS
import 'primeicons/primeicons.css';                               // Icons

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
