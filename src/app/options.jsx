import { Link } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";
import { useAppContext } from "@/context/Appcontext";

export default function Options() {
  const { setToken } = useAppContext();

  const handleDeleteToken = () => {
    setToken(null)
  };
  return (
    <View className="flex-1 items-center justify-center bg-lavanda">
      <Link href="/" className="text-xl font-bold " >
        <Button title="Cerrar sesion"
          onPress={handleDeleteToken}></Button>
      </Link>
    </View>
  );
}