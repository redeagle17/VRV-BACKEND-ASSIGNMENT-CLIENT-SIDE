import React, { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login.components.jsx';
import SignUp from './components/signup.components.jsx';
import UserProfile from './components/userProfile.components.jsx';
import CreateUser from './components/createUser.components.jsx';
import AuthContext from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };
  return (
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/sign-in" element={<Login />} />

        <Route
          exact path="/user-profile"
          element={<RequireAuth><UserProfile /></RequireAuth> }
        />
        <Route
          exact path="/create-user"
          element={<RequireAuth><CreateUser /></RequireAuth> }
        />
      </Routes>
  );
}

export default App;
