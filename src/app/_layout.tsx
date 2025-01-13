import "../global.css";
import { Slot, usePathname } from "expo-router";
import { View,Image } from "react-native";
import { Link,} from "expo-router";

export default function Layout() {
  const pathname = usePathname()


  return(
    <View className="flex flex-1">
       {pathname !== "/" && <Header />}
      <View className="flex-1 ml-12">
        <Slot />
      </View>
    </View>
  )
}

function Header() {
  return (
    <View>
      <View className="bg-morado w-12 min-h-screen flex flex-col justify-start gap-1 items-center absolute left-0">
        
        <Link
          href="/habits"
          className="w-full"
        >
          <View className="bg-amarillo w-full h-40 rounded-tl-2xl rounded-bl-2xl flex justify-center items-center">
            <Image
              source={require("../assets/Book.png")} 
              style={{ width: 24, height: 24, marginBottom: 4 }}
            />
          </View>
        </Link>

        
        <Link
          href="/profile"
          className="w-full"
        >
          <View className="bg-rosa w-full h-40 rounded-tl-2xl rounded-bl-2xl flex justify-center items-center">
            <Image
              source={require("../assets/Customer.png")}
              style={{ width: 24, height: 24, marginBottom: 4 }}
            />
          </View>
        </Link>

        
        <Link
          href="/options"
          className="w-full"
        >
          <View className="bg-lavanda w-full h-40 rounded-tl-2xl rounded-bl-2xl flex justify-center items-center">
            <Image
              source={require("../assets/Slider.png")} 
              style={{ width: 24, height: 24, marginBottom: 4 }}
            />
          </View>
        </Link>
      </View>
    </View>
  );
}