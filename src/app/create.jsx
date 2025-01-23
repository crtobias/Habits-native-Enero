import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import { useAppContext } from "@/context/Appcontext";

export default function Create() {
  const { createHabit, dataUser } = useAppContext();
  
  const [habitName, setHabitName] = useState("");
  const [goalType, setGoalType] = useState("adopt"); 

  const handleSubmit = async () => {
    if (!habitName) {
      Alert.alert("Error", "El nombre del hábito es obligatorio");
      return;
    }

  
    const result = await createHabit(habitName, goalType, dataUser.id);

    if (result === 1) {
      Alert.alert("Éxito", "Hábito creado exitosamente!");
    } else {
      Alert.alert("Error", "Hubo un problema al crear el hábito");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-lavanda p-4">
      <Text className="text-2xl mb-4">Crear Hábito</Text>

 
      <TextInput
        value={habitName}
        onChangeText={setHabitName}
        placeholder="Nombre del hábito"
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          width: "80%",
          marginBottom: 20,
          paddingLeft: 10,
          borderRadius: 5,
        }}
      />

    
      <View className="flex-row justify-around mb-6 w-full">
        <TouchableOpacity
          onPress={() => setGoalType("adopt")}
          style={{
            backgroundColor: goalType === "adopt" ? "#6a4dfd" : "#ccc",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text className="text-white">Adopt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGoalType("remove")}
          style={{
            backgroundColor: goalType === "remove" ? "#6a4dfd" : "#ccc",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text className="text-white">Remove</Text>
        </TouchableOpacity>
      </View>

      
      <Button title="Crear Hábito" onPress={handleSubmit} />
    </View>
  );
}
