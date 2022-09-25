import React, { createContext, useContext, useReducer } from "react";
import { Reducer } from "./reducer";
import { v4 as uuidv4 } from "uuid";

export const ToastContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(Reducer, []);

  const addNotification = (type, header, content) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: uuidv4(),
        show: true,
        type,
        header,
        content,
      },
    });
  };

  const deleteNotification = (id) => {
    dispatch({
      type: "DELETE_NOTIFICATION",
      payload: id,
    });
  };
  return (
    <ToastContext.Provider
      value={{ notifications, addNotification, deleteNotification }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export function useNotification() {
  return useContext(ToastContext);
}
