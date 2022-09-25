import React, { createContext, useState, useContext } from "react";

export const addPayment = createContext();

export const AddPaymentProvider = ({ children }) => {
  const [open, setOpenSlide] = useState(false);

  return (
    <addPayment.Provider value={{ open, setOpenSlide }}>
      {children}
    </addPayment.Provider>
  );
};

export function useAddPayment() {
  return useContext(addPayment);
}
