import React from 'react';
import Header from './../header';
import Sidebar from './../sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="main-content">
          <Outlet /> {/* Renders active dashboard sub-route */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;