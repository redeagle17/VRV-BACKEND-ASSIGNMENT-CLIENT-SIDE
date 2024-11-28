import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer.jsx";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("Users")) || null,
};

const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, setDispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser: state.currentUser, setDispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;