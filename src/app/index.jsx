import React, { useState } from "react";
import { View, Button, Alert, TextInput,Text } from "react-native";
import { Link } from "expo-router";
import { useAppContext } from "@/context/Appcontext";


export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNotVerify, setIsNotVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, verifyEmail } = useAppContext();




  const handleLogin = async () => {
    const result = await login(name, email, password);
    if (result == 1) {
      setIsLoggedIn(true);
    } else if (result == 2) {
      setIsNotVerify(true)
    } else {
      alert('occurio un error inesperado')
    }
  };

  const handleVerify = async () => {
    const result = await verifyEmail(email)
    setIsNotVerify(false)
    if (result) {
      alert("Correo de verificacion enviado")
    } else {
      alert("ocurrio un error inesperado")
    }
  }


  const isFormComplete = (email || name) && password;

  return (
    <View className="flex-1 items-center w-screen -ml-12 justify-center bg-amarillo">

      <TextInput
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />


      <Button
        title="Iniciar Sesión"
        onPress={handleLogin}
        disabled={!isFormComplete}
      />


      {isLoggedIn && (
        <Link href="/habits" className="mt-4 text-blue-600">
          Ya puede Ingresar Ingresar
        </Link>
      )}

      {/* sector para verficiar email y no tener que ir a otra pagina */}
      {isNotVerify && (
        <View>
          <Text>No estas verificado quieres verificarte?</Text>
          <TextInput
            style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Button
            title="verificar"
            onPress={handleVerify}
          />
        </View>
      )}




    </View>
  );
}