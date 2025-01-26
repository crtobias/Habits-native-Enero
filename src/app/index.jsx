import React, { useState } from "react";
import { View, Button, Alert, TextInput, Text, Image, TouchableOpacity } from "react-native";
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
    } else if (result == 3) {
      SetincorrectoPas(true)
    } else {
      setIsNotVerify(true)
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
    setIsNotVerify(false)
  }
  const handleactivarCreate = async () => {
    setCreate(true)
    setLog(false)
    SetincorrectoPas(false)
    SetincorrectoPasDos(false)
    setIsNotVerify(false)
  }

  const handleChangePass = () => {
    setLog(false)
    SetincorrectoPasDos(true)
    SetincorrectoPas(false)
    setIsNotVerify(false)
  }

  const isFormComplete = (email || name) && password;
  const isFormCreateComplete = email && name && password;

  return (
    <View className="flex-1 items-center w-screen -ml-12 justify-center bg-amarillo">


      <View className="flex flex-row gap-2 mt-8">
        <TouchableOpacity
          className="bg-amarillooscuro px-4 py-2 rounded border border-gray-600"
          onPress={handleactivarLogin}
        >
          <Text className="text-white font-bold">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-amarillooscuro px-4 py-2 rounded border border-gray-600"
          onPress={handleactivarCreate}
        >
          <Text className="text-white font-bold">Create</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xxs mt-14">Habits</Text>

      {create && (
        <View className="flex-1 items-center w-screen  justify-center bg-amarillo">
          <Text>Crear Usuario</Text>
          <TextInput
            style={{ backgroundColor: '#E3B1A3', width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={{ backgroundColor: '#E3B1A3', width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{ backgroundColor: '#E3B1A3', width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
            placeholder="Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="bg-amarillooscuro px-4 py-2 rounded border border-gray-600 mb-12"
            onPress={handleCreate}
            disabled={!isFormCreateComplete}
          >

            <Text className="text-white font-bold">
              {isFormCreateComplete ? "Crear" : "Completa los campos"}
            </Text>

          </TouchableOpacity>




        </View>
      )}



      {log && (
        <View className="flex-1 items-center w-screen  justify-center bg-amarillo">
          <Text>Login</Text>
          <TextInput
            style={{ backgroundColor: '#E3B1A3', width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}

          />
          <TextInput
            style={{ backgroundColor: '#E3B1A3', width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{ backgroundColor: '#E3B1A3', width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
            placeholder="Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="bg-amarillooscuro px-4 py-2 rounded border border-gray-600"
            onPress={handleLogin}
            disabled={!isFormComplete}
          >
            <Text className="text-white font-bold">
              {isFormComplete ? "Login" : "Completa los campos"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoggedIn && (
        <Link href="/habits" className="mb-20">
          <View className="items-center text-center gap-3">
            <Text className="text-xl text-lavanda">Ya puedes ingresar</Text>
            <Image
              className=""
              source={require("../assets/cont.png")}
              style={{ width: 75, height: 85, marginBottom: 5 }}
            />
          </View>
        </Link>
      )}


      {isNotVerify && (
        <View>
          <Text>No estas verificado quieres verificarte?</Text>
          <TextInput
            style={{ backgroundColor: '#E3B1A3', width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />


          <TouchableOpacity
            className="mb-10 items-center bg-amarillooscuro px-4 py-2 rounded border border-gray-600"
            onPress={handleVerify}
          >
            <Text className="text-white font-bold">
              Enviar Verificacion
            </Text>
          </TouchableOpacity>

        </View>
      )}

      {incorrectoPas && (
        <View>

          <TouchableOpacity
            className="border bg-amarillooscuro px-4 py-2 rounded border-gray-600 mb-12"
            onPress={handleChangePass}
          >
            <Text className="text-white font-bold">Queres cambiar el Password?</Text>
          </TouchableOpacity>
        </View>
      )}

      {incorrectoPasDos && (
        <View className="items-center">
          <Text>Cambiar Password</Text>
          <TextInput
            style={{ backgroundColor: '#E3B1A3', width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{ backgroundColor: '#E3B1A3', width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
            placeholder="New Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />



          <TouchableOpacity
            className="bg-amarillooscuro px-4 py-2 rounded border-gray-600"
            onPress={handleNewPassword}
            disabled={!isFormComplete}
          >
            <Text className="text-white font-bold">Cambiar</Text>
          </TouchableOpacity>

        </View>
      )}






    </View>
  );
}