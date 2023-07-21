import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { userContext } from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <userContext.Provider >
    <App />
   </userContext.Provider>,
)
