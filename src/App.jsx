// import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar'
import AllRoutes from "./AllRoutes"
import Header from './components/header';
import Sidebar from './components/sidebar';
import { useState, useEffect } from 'react';
import { SidebarProvider } from './components/SidebarContext';


const App = () => {

  let url = window.location.href;
  let urlSplit = url.split('/');
  const [hideMenu, showMenu] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
     
      if (urlSplit[3] === "auth") {
        showMenu(true)
      }
    
    };
      fetchData();

  }, [urlSplit]);

  return (
    <Router>
       <SidebarProvider>
     {hideMenu ? (
        <><Header /><Sidebar /> <AllRoutes /></>
      ) : (
        <><Navbar /> 
            <AllRoutes /></>
      )}
      </SidebarProvider>
    </Router>
  )
};

export default App