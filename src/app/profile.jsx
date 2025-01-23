import React from "react";
import { View, Text } from "react-native";
import { useAppContext } from "@/context/Appcontext";

export default function Profile() {
  const { dataUser } = useAppContext();


  
  return (
    <View className="flex-1 items-center justify-center bg-rosa">
      <Text className="text-xl font-bold">Perfil</Text>
      <Text>Name: {dataUser.name}</Text>
      <Text>Email: {dataUser.email}</Text>
      <Text>Id: {dataUser.id}</Text>
    </View>
  );
}