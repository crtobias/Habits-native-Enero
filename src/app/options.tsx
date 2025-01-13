import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function Options() {
  return (
    <View className="flex-1 items-center justify-center bg-lavanda">
      <Link href="/" className="text-xl font-bold">Cerrar Sesion</Link>
    </View>
  );
}