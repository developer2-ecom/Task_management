import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
 
  const login = async (input) => {
    try {
      await axios
        .post("http://localhost:3001/backend/route/task.route")
        .then((res) => {
          
          setCurrentUser({
            name: res.data.name,
            email: res.data.email,
            list: res.data.list,
          });
          document.cookie = `access_token=${res.data.token};`;
          console.log("cookiiiie", document.cookie);
          console.log("response", input);
          setIsAuthenticated(true);


          console.log("username:", res.data.name);
          console.log("access token", res.data.token);
        });
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };



  const logout = async (req, res) => {
    try {
      const res = await axios.post("http://localhost:3002/api/auth/logout");
      console.log(res);
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      setIsAuthenticated(false);
      setCurrentUser(null);

      localStorage.clear();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
