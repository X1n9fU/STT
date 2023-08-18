import React, { createContext, useContext, useState } from "react";

const DetailAddrContext = createContext();

export function DetailAddrProvider({ children }) {
  const [detailAddr, setDetailAddr] = useState("");

  return (
    <DetailAddrContext.Provider value={{ detailAddr, setDetailAddr }}>
      {children}
    </DetailAddrContext.Provider>
  );
}

export function useDetailAddr() {
  return useContext(DetailAddrContext);
}
