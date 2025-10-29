// frontend/src/main.jsx (Your entry point)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Your styles
import { CartProvider } from './context/cartContext.jsx'; // <--- Import the provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* <--- WRAP THE APPLICATION HERE */}
      <App />
    </CartProvider>
  </React.StrictMode>,
);