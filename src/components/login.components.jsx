import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setDispatch } = useContext(AuthContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { message, data } = await response.json();
        setDispatch({ type: "LOGIN", payload: data });
        toast.success(`${message}. Welcome, ${data.user.name}!`);

        setTimeout(() => {
            navigate("/user-profile");
          }, 2000);
      } else {
        const { message } = await response.json();
        toast.error(`${message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="App">
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                <h3>VRV SECURTIY</h3>
                <h3>Sign In</h3>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
                </div>

                <p className="forgot-password text-right">
                    Don't have an account? <a href="/">Sign up</a>
                </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
