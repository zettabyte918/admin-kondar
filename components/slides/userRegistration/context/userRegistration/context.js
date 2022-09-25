import React, { createContext, useState, useContext } from "react";

export const userRegistration = createContext();

export const UserRegistrationProvide = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <userRegistration.Provider value={{ open, setOpen }}>
      {children}
    </userRegistration.Provider>
  );
};

export function useUserRegistration() {
  return useContext(userRegistration);
}
