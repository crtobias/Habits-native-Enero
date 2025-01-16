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
        } else if (d.message == "Contraseña incorrecta"){
          console.log('Contraseña incorrecta');
          return 3
        } else if (d.message == "Usuario no verificado"){
          console.log("Usuario no verificado");
          return 2
        } else {
          return 0
        }

      } else {
        console.log(`Login Failed: ${d.message || "Something went wrong"}`);
        if (d.message == "Contraseña incorrecta") {
          alert("password incorrecto")
          return 3
        } else if (d.message == "Usuario no verificado"){
          alert("usuario no verificado")
          return 2
        }
        return 0;
      }
    } catch (error) {
      alert("Error: Something went wrong with the network");
      console.log(error);
      return false;
    }
  };

  const changePassword = async (email, newPassword) => {
    try {
      const response = await fetch("http://localhost:3000/users/send-email-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Correo de confirmación enviado para cambiar la contraseña");
        return true;
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return false;
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      alert("Ocurrió un error inesperado al cambiar la contraseña");
      return false;
    }
  };

  const showAlert = () => {
    Alert.alert("React Context", "test React Context");
  };

  return (
    <AppContext.Provider value={{ showAlert, login,verifyEmail ,changePassword  }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
