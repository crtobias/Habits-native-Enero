import React from "react";
import { View, Text,Button } from "react-native";
import { useAppContext } from "@/context/Appcontext";


export default function Habits() {
  const { showAlert } = useAppContext();


  return (
    <View className="flex-1 items-center justify-center bg-amarillo">
      <Text className="text-xl font-bold">Habitos</Text>
      <Button title="Show Alert" onPress={showAlert} />
    </View>
  );
};