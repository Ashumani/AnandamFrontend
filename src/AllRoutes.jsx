import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

// Capitalized imports (PascalCase required for JSX elements)
import Login from './components/pages/Auth/login';
import Dashboard from './components/pages/dashboard';
import Employer from './components/pages/registration/employer';
import Employee from './components/pages/registration/employee';
import Monthly from './components/pages/transaction/monthlyPf';
import Summary from './components/pages/transaction/summary';
import Ecr from './components/pages/formGeneration/ecrGeneration';
import Form3A6A from './components/pages/formGeneration/form3A6AGeneration';
import Form5A from './components/pages/formGeneration/form5AGeneration';
import Kyc from './components/pages/formGeneration/kycGeneration';
import Billing from './components/pages/biller/biller';
import BillingMaster from './components/pages/biller/billMaster';
import Bill from './components/pages/biller/BillComponent';
import Standalone from "./components/pages/standaloneHome/standalone";
import Standalone2 from "./components/pages/standaloneHome1/standalone";

import Download from "./components/pages/download/download";
import Testing from "./components/pages/testing/testing";
import Salary from "./components/pages/transaction/salary";
import Master from "./components/pages/master/master";
import Esic from "./components/pages/transaction/esic";
import Blogs from "./components/pages/admin/blogs";
import Inquiries from "./components/pages/admin/inquiry";
import User from "./components/pages/admin/user";
import Customiza from "./components/pages/admin/customizeForm";
import SuperUser from "./components/pages/admin/superUser";
import Notification from "./components/pages/admin/notification";
import UserProfile from "./components/pages/user/userProfile";
import EpfWidget from "./components/pages/admin/EPFWidget";
import EpfWidgetMember from "./components/pages/admin/EPFMember";
import Calculator from "./components/pages/admin/Calculator";
import NeedHelp from "./components/pages/devInfo/NeedHelp";
import Test from "./components/pages/admin/AgentLayoutSet";

const AllRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path='/' element={<Standalone />} />
      <Route path='/home2' element={<Standalone2 />} />
      <Route path='/login' element={<Login />} />

      {/* PROTECTED ROUTES - Only accessible if logged in */}
      <Route element={<ProtectedRoute />}>
        <Route path='/auth/dashboard' element={<Dashboard />} />
        <Route path='/auth/dashboard/employer' element={<Employer />} />
        <Route path='/auth/dashboard/employee' element={<Employee />} />
        <Route path='/auth/dashboard/monthlypf' element={<Monthly />} />
        <Route path='/auth/dashboard/summary' element={<Summary />} />
        <Route path='/auth/dashboard/ecr' element={<Ecr />} />
        <Route path='/auth/dashboard/form3A6A' element={<Form3A6A />} />
        <Route path='/auth/dashboard/form5A' element={<Form5A />} />
        <Route path='/auth/dashboard/kyc' element={<Kyc />} />
        <Route path='/auth/dashboard/bill/create' element={<Billing />} />
        <Route path='/auth/dashboard/bill/create/:id' element={<Billing />} />
        <Route path='/auth/dashboard/bill/billView' element={<BillingMaster />} />
        <Route path='/auth/dashboard/form/download' element={<Download />} />
        <Route path='/auth/dashboard/salary' element={<Salary />} />
        <Route path='/auth/dashboard/master' element={<Master />} />
        <Route path='/auth/dashboard/testing' element={<Testing />} />
        <Route path='/auth/dashboard/bill/pdf' element={<Bill />} />
        <Route path='/auth/dashboard/esic' element={<Esic />} />
        <Route path='/auth/dashboard/blogs' element={<Blogs />} />
        <Route path='/auth/dashboard/inquiries' element={<Inquiries />} />
        <Route path='/auth/dashboard/user' element={<User />} />
        <Route path='/auth/dashboard/form' element={<Customiza />} />
        <Route path='/auth/dashboard/superUser' element={<SuperUser />} />
        <Route path='/auth/dashboard/notification' element={<Notification />} />
        <Route path='/auth/dashboard/userProfile' element={<UserProfile />} />
        <Route path="/auth/dashboard/EpfWidget" element={<EpfWidget />} />
        <Route path="/auth/dashboard/EpfMember" element={<EpfWidgetMember />} />
        <Route path="/auth/dashboard/Calculator" element={<Calculator />} />
        <Route path="/auth/dashboard/NeedHelp" element={<NeedHelp />} />
        <Route path="/auth/dashboard/agentLayout" element={<Test />} />
      </Route>

      {/* FALLBACK ROUTE */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AllRoutes;