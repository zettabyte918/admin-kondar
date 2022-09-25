import React, { createContext, useState, useContext } from "react";

export const listStudents = createContext();

export const ListStudentsProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);

  return (
    <listStudents.Provider value={{ open, setOpen, students, setStudents }}>
      {children}
    </listStudents.Provider>
  );
};

export function useList() {
  return useContext(listStudents);
}
