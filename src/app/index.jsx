import React, { useState } from "react";
import { View, Button, Alert, TextInput, Text } from "react-native";
import { Link } from "expo-router";
import { useAppContext } from "@/context/Appcontext";


export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNotVerify, setIsNotVerify] = useState(false);

  const [incorrectoPas, SetincorrectoPas] = useState(false);
  const [incorrectoPasDos, SetincorrectoPasDos] = useState(false);

  const [log, setLog] = useState(false);
  const [create, setCreate] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, verifyEmail, changePassword, createUser } = useAppContext();

  const handleCreate = async () => {
    let result = await createUser(name, email, password);
    if (result = 1) {
      alert("usuario creado Porfavor verifique su email y inicie sesion")
      setCreate(false);
      setLog(true);
    } else {
      alert("ocurrio un error o el usuario ya esta en uso")
    }
  }


  const handleLogin = async () => {
    const result = await login(name, email, password);
    if (result == 1) {
      setIsLoggedIn(true);
    } else if (result == 2) {
      setIsNotVerify(true)
    } else if (result == 3) {
      SetincorrectoPas(true)
    } else {
      alert('occurio un error inesperado verifique su email o name o intente mas tarde')
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


  const handleNewPassword = async () => {
    changePassword(email, password)
    SetincorrectoPas(false)
  }

  const handleactivarLogin = async () => {
    setLog(true)
    setCreate(false)
    SetincorrectoPas(false)
    SetincorrectoPasDos(false)
  }
  const handleactivarCreate = async () => {
    setCreate(true)
    setLog(false)
    SetincorrectoPas(false)
    SetincorrectoPasDos(false)
  }

  const handleChangePass = () => {
    setLog(false)
    SetincorrectoPasDos(true)
    SetincorrectoPas(false)
  }

  const isFormComplete = (email || name) && password;
  const isFormCreateComplete = email && name && password;

  return (
    <View className="flex-1 items-center w-screen -ml-12 justify-center bg-amarillo">


      <View className="flex flex-row gap-2 mt-8">
        <Button
          title="Login"
          onPress={handleactivarLogin}
        ></Button>
        <Button
          title="Create"
          onPress={handleactivarCreate}
        ></Button>
      </View>

      <Text className="text-xxs mt-14">Habits</Text>

      {create && (
        <View className="flex-1 items-center w-screen -ml-12 justify-center bg-amarillo">
          Crear Usuario
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
            title="Crear Usuario"
            onPress={handleCreate}
            disabled={!isFormCreateComplete}
          />
        </View>
      )}



      {log && (
        <View className="flex-1 items-center w-screen -ml-12 justify-center bg-amarillo">
          <Text>Login</Text>
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
        </View>
      )}

      {isLoggedIn && (
        <Link href="/habits" className="mt-4 text-blue-600 mb-10">
          <Text className="text-xl">Ya puedes ingresar</Text>
        </Link>
      )}


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

      {incorrectoPas && (
        <View>
          <Button
            title="Queres cambiar el password?"
            onPress={handleChangePass}
          />
        </View>
      )}

      {incorrectoPasDos && (
        <View>
          <Text>Cambiar Password</Text>
          <TextInput
            style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
            placeholder="New Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title="Cambiar"
            onPress={handleNewPassword}
            disabled={!isFormComplete}
          />

        </View>
      )}






    </View>
  );
}