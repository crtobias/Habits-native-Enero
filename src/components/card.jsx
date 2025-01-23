import calcularRacha from "@/functions/calcularRacha";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useAppContext } from "@/context/Appcontext";


export default function Card({ habit }) {
    const racha = calcularRacha(habit.datesTracked)
    const { trackHabitDate , deleteHabit } = useAppContext();

    const handleTrack = () => {
        trackHabitDate(habit.id)
    }

    const handleDelete = () => {
        deleteHabit(habit.id)
    }
    

    return (
        <View key={habit.id} className="flex-row m-4  relative h-32 w-full  overflow-hidden opacity-70 shadow-md">
            <View className="w-3 bg-card"></View>
            <View className="w-full  text-center">
                <View className=" opacity-40 bg-card w-full absolute h-full p-4"></View>
                <View className="p-4">
                    <Text className="text-lg">{habit.name}</Text>
                    <Text className="text-sm" >Estas Intentando  {habit.goalType} este habito</Text>

                    <Text>
                        {racha >= 3 ? `Racha: ${racha}` : "Actualmente no tienes racha"}
                    </Text>

                </View>

                <TouchableOpacity className="absolute right-6 bottom-3" onPress={() => handleTrack(habit.id)}>
                    <Image
                        source={require("../assets/Add.png")}
                        style={{ width: 24, height: 24, marginBottom: 4 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="absolute right-16 bottom-3" onPress={() => handleDelete(habit.id)}>
                    <Image
                        source={require("../assets/Delete.png")}
                        style={{ width: 24, height: 24, marginBottom: 4 }}
                    />
                </TouchableOpacity>

            </View>
        </View >
    )
}