import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import AllRoutes from "./AllRoutes";
import Header from './components/header';
import Sidebar from './components/sidebar';
import { SidebarProvider } from './components/SidebarContext';

const MainLayout = () => {
  const location = useLocation();
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Verify token exists

    // Show sidebar ONLY if user is on /auth route AND actively logged in
    if (location.pathname.startsWith('/auth') && token) {
      setHideMenu(true);
    } else {
      setHideMenu(false);
    }
  }, [location.pathname]);

  return (
    <>
      {hideMenu ? (
        <>
          <Header />
          <Sidebar />
          <AllRoutes />
        </>
      ) : (
        <>
          <Navbar />
          <AllRoutes />
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <SidebarProvider>
        <MainLayout />
      </SidebarProvider>
    </Router>
  );
};

export default App;