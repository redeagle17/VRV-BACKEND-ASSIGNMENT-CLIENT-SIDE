import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login.components.jsx';
import SignUp from './components/signup.components.jsx';
import UserProfile from './components/userProfile.components.jsx';
import CreateUser from './components/createUser.components.jsx';

function App() {
  
  
  return (
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<Login />} />

        <Route
          path="/user-profile"
          element={accessToken ? <UserProfile /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/create-user"
          element={accessToken ? <CreateUser /> : <Navigate to="/sign-in" />}
        />
      </Routes>
  );
}

export default App;
