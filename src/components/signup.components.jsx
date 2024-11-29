import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    try {
      const response = await fetch("https://vrv-backend-assignment.vercel.app/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const { message, data } = await response.json();
        toast.success(`${message}. Welcome, ${data.name}! Redirecting to sign-in...`);
        setTimeout(() => navigate("/sign-in"), 2000);
      } else {
        const { message } = await response.json();
        toast.error(`${message}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="App">
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>VRV SECURTIY</h3>
                    <h3>Sign Up</h3>

                    <div className="mb-3">
                        <label>Enter name</label>
                        <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                        type="email"
                        name="email"
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
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                        Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered? <a href="/sign-in">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default SignUp;
