import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App.jsx';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* BrowserRouter is the top-level wrapper */}
    <App />
    <Toaster />
  </BrowserRouter>
);
