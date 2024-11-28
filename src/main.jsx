import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App.jsx';
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <AuthContextProvider>
      <App />
      <Toaster />
    </AuthContextProvider>
  </BrowserRouter>
);
