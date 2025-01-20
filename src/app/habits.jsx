import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useAppContext } from "@/context/Appcontext";


export default function Habits() {
  const { Token, getUserData, dataUser } = useAppContext();

  useEffect(() => {
    if (Token.rol && Token.id) {
      getUserData(Token.id, Token.rol);
    }
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-amarillo">
      <Text className="text-xl font-bold">Habitos</Text>
      <Text className="text-lg">datos de token</Text>
      <Text>rol: {Token.rol}  id: {Token.id}</Text>
      {dataUser && (
        <View>
          <Text className="text-lg">Datos de usuario</Text>
          <Text className="text-lg"></Text>
          <Text className="text-lg"></Text>
          <Text className="text-lg">Name: {dataUser.name}</Text>
          <Text className="text-lg">Email: {dataUser.email}</Text>
          <Text className="text-lg">Status: {dataUser.status}</Text>

          {dataUser && dataUser.habits && dataUser.habits.length > 0 ? (
            <View>
              <Text>Habitos</Text>
              {dataUser.habits.map((habit, index) => (
                <View key={index} className="text-lg">
                  <Text>Name {index + 1}: {habit.name}</Text>
                  <Text>meta : {habit.goalType}</Text>
                  <Text>id : {habit.id}</Text>
                </View >

              ))}
            </View>
          ) : (
            <Text>No hay hábitos disponibles.</Text>
          )}

        </View>
      )}
    </View>
  );
};