import React, { useEffect } from "react";
import { View, Text, Button,ScrollView } from "react-native";
import { useAppContext } from "@/context/Appcontext";
import { Link } from "expo-router";
import Card from "@/components/card";

export default function Habits() {
  const { Token, getUserData, dataUser } = useAppContext();

  
  

  useEffect(() => {
    if (Token.rol && Token.id) {
      getUserData(Token.id, Token.rol);
    }
  }, []);

  
  
  
  
  return (
    <ScrollView className="flex-1 bg-amarillo border" contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}>
      <Text></Text>
      {dataUser && (
        <View className="w-full items-center">
          {dataUser.habits && dataUser.habits.length > 0 ? (
            <View className="w-4/5 items-center">
              {dataUser.habits.map((habit, index) => (
                <Card key={index} habit={habit} />
              ))}
            </View>
          ) : (
            <Text>No hay hábitos disponibles.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};