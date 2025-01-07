import "../global.css";
import { Slot } from "expo-router";
import { View } from "react-native";
import { Link } from "expo-router";

export default function Layout() {
  return(
    <View className="flex flex-1">
      <Header />
      <View className="flex-1 ml-14">
        <Slot />
      </View>
    </View>
  )
}


function Header() {
  return (
    <View>
      <View className="bg-purple-600 w-24 min-h-screen flex flex-col justify-center gap-2 items-center absolute left-0">
        
        <View className="bg-slate-700 w-full h-24 pl-6 rounded-tl-2xl rounded-bl-2xl">
            <Link  
              className="-rotate-90 h-full text-center"
              href='/'>habits</Link>
        </View>
        <View className="bg-slate-700 w-full h-24 pl-6 rounded-tl-2xl rounded-bl-2xl">
            <Link 
              className="-rotate-90 h-full text-center"
              href='/profile'>profile</Link>
        </View>
        <View className="bg-slate-700 w-full h-24 pl-6 rounded-tl-2xl rounded-bl-2xl">
            <Link 
              className="-rotate-90 h-full text-center "
              href='/options'>options</Link>
        </View>
        
      </View>
    </View>

  );
}