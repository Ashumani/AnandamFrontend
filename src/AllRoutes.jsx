import {Routes,Route} from "react-router-dom"
import login from './components/pages/Auth/login'
import dashboard from './components/pages/dashboard'
import employer from './components/pages/registration/employer'
import employee from './components/pages/registration/employee'
import monthly from './components/pages/transaction/monthlyPf'
import summary from './components/pages/transaction/summary'
import ecr from './components/pages/formGeneration/ecrGeneration'
import form3A6A from './components/pages/formGeneration/form3A6AGeneration'
import from5A from './components/pages/formGeneration/form5AGeneration'
import kyc from './components/pages/formGeneration/kycGeneration'
import billing from './components/pages/biller/biller'
import billingMaster from './components/pages/biller/billMaster'
import bill from './components/pages/biller/BillComponent'
import standalone from "./components/pages/standaloneHome/standalone"
import standalone2 from "./components/pages/standaloneHome1/standalone"

import download from "./components/pages/download/download"
import testing from "./components/pages/testing/testing"
import salary from "./components/pages/transaction/salary"
import master from "./components/pages/master/master"
import esic from "./components/pages/transaction/esic"
import blogs from "./components/pages/admin/blogs"
import inquiries from "./components/pages/admin/inquiry"
import user from "./components/pages/admin/user"
import customiza from "./components/pages/admin/customizeForm"

const AllRoutes = () => {
  return (
    <Routes>
     <Route exact path='/' Component={standalone}/>
     <Route exact path='/home2' Component={standalone2}/>
        
        <Route exact path='/login' Component={login}/>
        <Route exact path='/auth/dashboard' Component={dashboard}/>
        <Route exact path='/auth/dashboard/employer' Component={employer}/>
        <Route exact path='/auth/dashboard/employee' Component={employee}/>
        <Route exact path='/auth/dashboard/monthlypf' Component={monthly}/>
        <Route exact path='/auth/dashboard/summary' Component={summary}/>
        <Route exact path='/auth/dashboard/ecr' Component={ecr}/>
        <Route exact path='/auth/dashboard/form3A6A' Component={form3A6A}/>
        <Route exact path='/auth/dashboard/form5A' Component={from5A}/>
        <Route exact path='/auth/dashboard/kyc' Component={kyc}/>
        <Route exact path='/auth/dashboard/bill/create' Component={billing}/>
        <Route exact path='/auth/dashboard/bill/billView' Component={billingMaster}/>
        <Route exact path='/auth/dashboard/form/download' Component={download}/>
        <Route exact path='/auth/dashboard/salary' Component={salary}/>
        <Route exact path='/auth/dashboard/master' Component={master}/>
        <Route exact path='/auth/dashboard/testing' Component={testing}/>
        <Route exact path='/auth/dashboard/bill/pdf' Component={bill}/>
        <Route exact path='/auth/dashboard/esic' Component={esic}/>
        <Route exact path='/auth/dashboard/blogs' Component={blogs}/>
        <Route exact path='/auth/dashboard/inquiries' Component={inquiries}/>
        <Route exact path='/auth/dashboard/user' Component={user}/>
        <Route exact path='/auth/dashboard/form' Component={customiza}/>
        
    </Routes>
    
  )
}

export default AllRoutes