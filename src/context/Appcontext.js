import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import decodeToken from "@/JWT/decoJwt";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Token, setToken] = useState()

  const verifyEmail = async (email) => {
    try {
      const response = await fetch("http://localhost:3000/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Correo electrónico verificado correctamente!");
        return true;  
      } else {
        alert(`Error al verificar el correo: ${data.message || "Algo salió mal"}`);
        return false; 
      }
    } catch (error) {
      alert("Error: Algo salió mal con la red");
      return false;  
    }
  };


  const login = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
        }),
      });

      const d = await response.json();
      const data = decodeToken(d.token);
      console.log(data);
      

      if (response.ok) {
        console.log("Login Success! Redirecting...");
        
        if (data.rol === "user") {
          setToken(data)
          setIsLoggedIn(true);
          return 1;
        } else {
          console.log('usuario no verificado');
          return 2;
        }

      } else {
        console.log(`Login Failed: ${d.message || "Something went wrong"}`);
        return 2;
      }
    } catch (error) {
      alert("Error: Something went wrong with the network");
      console.log(error);
      return false;
    }
  };

  const showAlert = () => {
    Alert.alert("React Context", "test React Context");
  };

  return (
    <AppContext.Provider value={{ showAlert, login,verifyEmail  }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
