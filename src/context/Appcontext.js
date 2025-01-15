
import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';


const AppContext = createContext();


export const AppProvider = ({ children }) => {
  
  const showAlert = () => {
    Alert.alert("React Context", "test React Context");
  };

  return (
    <AppContext.Provider value={{ showAlert }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  return useContext(AppContext);
};
