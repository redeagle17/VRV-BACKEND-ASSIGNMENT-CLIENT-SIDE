import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ROLES = {
  "Security-Analyst": 2,
  "Responder": 3,
  "Auditor": 4
};

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("Users"));
  const accessToken = userData.accessToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/create-user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, email, role }),
      });

      if (response.ok) {
        const { message } = await response.json();
        toast.success(`${message}!`);
        setTimeout(() => navigate("/user-profile"), 2000);
      } else {
        const { message } = await response.json();
        toast.error(`${message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("There was an error making the request.");
    }
  };

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>VRV SECURITY</h3>
            <h3>Create User</h3>

            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
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
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Role</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                {Object.entries(ROLES).map(([roleName, roleId]) => (
                  <option key={roleId} value={roleId}>
                    {roleName}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>

            <p className="forgot-password text-right">
              Go Back <a href="/user-profile">Click Here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
