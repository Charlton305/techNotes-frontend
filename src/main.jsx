import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import App from './App.jsx'
import './index.css'
import { store } from "./app/store.js"
import { Provider } from "react-redux"

if (process.env.NODE_ENV === "production") disableReactDevTools()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
