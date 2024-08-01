"use client";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [unread, setunread] = useState(0);
  return (
    <GlobalContext.Provider
      value={{
        unread,
        setunread,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContetx() {
  return useContext(GlobalContext);
}
