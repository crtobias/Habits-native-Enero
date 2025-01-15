import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import { Link } from "expo-router";
import decodeToken from "@/JWT/decoJwt";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "test",
          password: "test",
        }),
      });

      const d = await response.json();
      const data = await decodeToken(d.token)

      if (response.ok) {
        alert("Login Success! Redirecting...");
       

        if(data.rol == "user"){
          setIsLoggedIn(true); 
        }
        else{
          alert('debes verificar el correo antes de entrar')
        }

        console.log(data);
      } else {
        alert("Login Failed", data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Error", "Something went wrong with the network");
    }
  };

  return (
    <View className="flex-1 items-center w-screen -ml-12 justify-center bg-amarillo">
      <Button title="Iniciar Sesión" onPress={handleLogin} />

      
      {isLoggedIn && (
        <Link href="/habits" className="mt-4 text-blue-600">
          Ingresar
        </Link>
      )}
    </View>
  );
}
