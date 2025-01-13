import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 items-center w-screen -ml-12 justify-center bg-amarillo">

      <Link href="/habits" className="text-xl font-bold">Iniciar Sesion</Link>

    </View>
  );
}