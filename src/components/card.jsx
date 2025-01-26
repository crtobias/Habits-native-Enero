import React, { useState } from "react";
import calcularRacha from "@/functions/calcularRacha";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAppContext } from "@/context/Appcontext";
import Modal from "react-native-modal";

export default function Card({ habit }) {
    const racha = calcularRacha(habit.datesTracked);
    const { trackHabitDate, deleteHabit } = useAppContext();

    const [isModalVisible, setModalVisible] = useState(false);
    const handleTrack = () => {
        trackHabitDate(habit.id);
    };

    const handleDelete = () => {
        deleteHabit(habit.id);
        setModalVisible(false);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View key={habit.id} className=" flex-row m-4  relative h-32 w-full  overflow-hidden opacity-70 shadow-md">
            <View className="w-3 bg-card"></View>
            <View className="w-full text-center">
                <View className=" opacity-40 bg-card w-full absolute h-full p-4"></View>
                <View className="p-4">
                <Text className="text-lg font-bold text-gray-800">{habit.name}</Text>
                    <Text className="text-sm">Meta: {habit.goalType}</Text>


                    {racha >= 3 ? (
                        <View className="flex-row items-center gap-2">
                            <Text>Racha : {racha}</Text>
                            <Image
                                source={require("../assets/Fire.png")} // Asegúrate de tener esta imagen en tu carpeta de assets
                                style={{ width: 24, height: 24, }}
                            />
                        </View>
                    ) : (
                        <Text>Racha sin Desbloquear</Text>
                    )}


                </View>

                <TouchableOpacity className="absolute right-6 bottom-3" onPress={() => handleTrack(habit.id)}>
                    <Image
                        source={require("../assets/Add.png")}
                        style={{ width: 24, height: 24, marginBottom: 4 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="absolute right-16 bottom-3" onPress={toggleModal}>
                    <Image
                        source={require("../assets/Delete.png")}
                        style={{ width: 24, height: 24, marginBottom: 4 }}
                    />
                </TouchableOpacity>


                <Modal isVisible={isModalVisible}>
                    <View className="bg-white p-6 rounded-lg">
                        <Text className="text-lg">¿Estás seguro de que quieres eliminar este hábito?</Text>
                        <View className="flex-row justify-between mt-4">
                            <TouchableOpacity onPress={toggleModal} className="bg-gray-500 p-2 rounded">
                                <Text className="text-white">Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDelete} className="bg-red-500 p-2 rounded">
                                <Text className="text-white">Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    );
}
