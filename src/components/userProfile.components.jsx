import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const UserProfile = () => {
  const userData = JSON.parse(localStorage.getItem("Users"));
  const accessToken = userData.accessToken;
  const { setDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle service request
  const handleService = async (endpoint) => {
    try {
      if(endpoint === "create-user"){
        navigate("/create-user");
        return;
      }

      const response = await fetch(`http://localhost:8000/api/v1/role/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      if (response.ok) {
        const { message } = await response.json();
        toast.success(`${message}!`);
      } else {
        const { message } = await response.json();
        toast.error(`${message}`);
      }
    } catch (error) {
      toast.error("There was an error making the request.");
    }
  };

  const handleLogout = () => {
    setDispatch({ type: "LOGOUT" });
    toast.success("You have been logged out.");
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-white mb-4">VRV SECURITY</h1>

      <div className="card text-white bg-dark" style={{ width: "30rem", height: "400px" }}>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <h2 className="card-title text-center">Available Services</h2>
          <button className="btn btn-light w-75 mb-3" onClick={() => handleService("create-user")}>Create User</button>
          <button className="btn btn-light w-75 mb-3" onClick={() => handleService("get-all-vulnerabilities")}>Get all vulnerabilities</button>
          <button className="btn btn-light w-75 mb-3" onClick={() => handleService("add-new-vulnerabilities")}>Add new vulnerabilities</button>
          <button className="btn btn-light w-75 mb-3" onClick={() => handleService("assign-vulnerabilities")}>Assign vulnerabilities</button>
          <button className="btn btn-light w-75 mb-3" onClick={() => handleService("update-vulnerabilities-status")}>Update vulnerabilities status</button>
          <button className="btn btn-light w-75 mb-3" onClick={() => handleService("view-resolved-vulnerabilities")}>View resolved vulnerabilities</button>
        </div>
      </div>

      <button className="btn btn-danger w-[30rem] mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
