import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit"; // Importa PieChart
import { useAppContext } from "@/context/Appcontext";
import progresoAnual from "../functions/progresoAnual";

export default function Profile() {
  const { dataUser } = useAppContext();

  const primerDate = progresoAnual(dataUser.habits).oldestDate;
  const arrayDates = progresoAnual(dataUser.habits).totalDatesTracked;

  // Obtener el día actual
  const today = new Date().toISOString().split("T")[0];

  // Función para calcular los días entre primerDate y hoy
  const getDaysInRange = (startDate, endDate) => {
    const allDaysInRange = [];
    let currentDate = new Date(startDate);
    let end = new Date(endDate);

    while (currentDate <= end) {
      allDaysInRange.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return allDaysInRange;
  };

  // Calcular todos los días en el rango desde primerDate hasta hoy
  const daysInRange = getDaysInRange(primerDate, today);

  // Calcular cuántos de esos días están trackeados
  const trackedDays = arrayDates.map(date => date.split("T")[0]);
  const trackedSet = new Set(trackedDays);
  const trackedCount = daysInRange.filter(day => trackedSet.has(day)).length;
  const untrackedCount = daysInRange.length - trackedCount;

  // Datos para el gráfico pizza
  const dataForTodayRange = [
    {
      name: "Actividad",
      population: trackedCount,
      color: "#FF7F50", // Naranja
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Inactividad",
      population: untrackedCount,
      color: "#8E44AD", // Morado
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  // Calcular los días usados y no usados en el rango anual
  const annualDaysInRange = getDaysInRange("2025-01-01", today);
  const trackedInYearCount = annualDaysInRange.filter(day => trackedSet.has(day)).length;
  const untrackedInYearCount = annualDaysInRange.length - trackedInYearCount;

  // Datos para el gráfico pizza anual
  const dataForAnnualRange = [
    {
      name: "Actividad",
      population: trackedInYearCount,
      color: "#3498DB", // Azul
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Inactividad",
      population: untrackedInYearCount,
      color: "#E74C3C", // Rojo
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  // Obtener el ancho de la pantalla
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="flex-1 items-center justify-center bg-rosa text-center">
      <Text className="mb-6 text-lg font">
       Hola {dataUser.name} Estas son tus estadisticas Habits 🙂.
        </Text>

      {/* Mostrar gráfico pizza desde el primer día hasta hoy */}
      <Text >Uso de la app desde tu Primer Registro de actividad</Text>
      <PieChart
        data={dataForTodayRange}
        width={screenWidth - 40} // El gráfico ocupará todo el ancho de la pantalla menos un margen
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      {/* Mostrar gráfico pizza anual */}
      <Text >Uso de la app en el año 2025</Text>
      <PieChart
        data={dataForAnnualRange}
        width={screenWidth - 40} // El gráfico ocupará todo el ancho de la pantalla menos un margen
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
}
