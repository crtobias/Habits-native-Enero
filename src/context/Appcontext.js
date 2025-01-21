import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import decodeToken from "@/JWT/decoJwt";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Token, setToken] = useState()

  const [dataUser, setDataUser] = useState()
  const [habits , setHabit] = useState([])

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

  const createUser = async (email, name, password) => {
    try {
      if (!email || !name || !password) {
        console.log("todos los campos son requeridos");
      }

      const response = await fetch('http://localhost:3000/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });



      if (!response.ok) {
        console.log("error al crear el usuario");
        return 2
      }


      const data = await response.json();
      console.log('Usuario creado:', data);
      return 1
    } catch (error) {
      console.error('Error:', error.message);
      return 2
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
        } else if (d.message == "Contraseña incorrecta") {
          console.log('Contraseña incorrecta');
          return 3
        } else if (d.message == "Usuario no verificado") {
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
        } else if (d.message == "Usuario no verificado") {
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

  const getUserData = async (id, rol) => {
    try {
      if (!id || !rol) {
        console.log("falta id o rol");
        return 2
      }

      const response = await fetch(`http://localhost:3000/users/getUser/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log(`Error en la solicitud: ${response.status}`);
        return 0
      }

      const data = await response.json();
      console.log('Datos del usuario:', data);
      setDataUser(data)
      setHabit(data.habits)
      return 1;
    } catch (error) {
      console.error('Error:', error.message);
      return 0;
    }
  };


  const createHabit = async (name, goalType,userId) => {
    try {
      const response = await fetch("http://localhost:3000/habit/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          goalType,
          userId,
        }),
      });
  
      if (response.ok) {
        const newHabit = await response.json();
        
        setHabit((prevHabits) => [...prevHabits, newHabit]);
        alert("Hábito creado exitosamente!");
        return true;
      } else {
        const data = await response.json();
        alert(`Error: ${data.message || "Algo salió mal"}`);
        return false;
      }
    } catch (error) {
      console.error("Error al crear el hábito:", error);
      alert("Error inesperado al crear el hábito.");
      return false;
    }
  };
  

  const deleteHabit = async (habitId) => {
    try {
      const response = await fetch(`http://localhost:3000/habit/delete/${habitId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setHabit((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
        alert("Hábito eliminado exitosamente!");
        return true;
      } else {
        const data = await response.json();
        alert(`Error: ${data.message || "Algo salió mal"}`);
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar el hábito:", error);
      alert("Error inesperado al eliminar el hábito.");
      return false;
    }
  };
  


  const trackHabitDate = async (habitId) => {
    try {
      const response = await fetch(`http://localhost:3000/habit/addTrack/${habitId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const updatedHabit = await response.json();
        setHabit((prevHabits) =>
          prevHabits.map((habit) =>
            habit.id === habitId ? { ...habit, datesTracked: updatedHabit.datesTracked } : habit
          )
        );
        alert("Fecha de seguimiento agregada exitosamente!");
        return true;
      } else {
        const data = await response.json();
        alert(`Error: ${data.message || "Algo salió mal"}`);
        return false;
      }
    } catch (error) {
      console.error("Error al agregar la fecha de seguimiento:", error);
      alert("Error inesperado al agregar la fecha de seguimiento.");
      return false;
    }
  };
  

  return (
    <AppContext.Provider value={{trackHabitDate,deleteHabit,createHabit,setToken , createUser, login, verifyEmail, changePassword, Token, dataUser, setDataUser, getUserData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
