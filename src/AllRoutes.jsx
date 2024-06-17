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
import standalone from "./components/pages/standaloneHome/standalone"

const AllRoutes = () => {
  return (
    <Routes>
     <Route exact path='/' Component={standalone}/>
        <Route exact path='/auth/login' Component={login}/>
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
    </Routes>
  )
}

export default AllRoutes