// import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar'
import AllRoutes from "./AllRoutes"
const App = () => {
  return (
    <Router>
      <Navbar/>
      <AllRoutes/>
    </Router>
  )
};

export default App