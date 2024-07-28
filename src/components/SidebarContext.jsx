// SidebarContext.js
import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <SidebarContext.Provider value={{ showAll, setShowAll }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
