import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applications from './pages/Applications'
import ApplyJobs from './pages/ApplyJobs'
import RecuiterLogin from './components/RecuiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJobs from './pages/AddJobs'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'


const App = () => {
  const {showRecuiterLogin}=useContext(AppContext)
  return (
    <div className=''>
      {
        showRecuiterLogin && <RecuiterLogin/>
      }
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/applications' element={<Applications/>}/>
        <Route path='/apply-job/:id' element={<ApplyJobs/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='add-job' element={<AddJobs/>}/>
            <Route path='manage-jobs' element={<ManageJobs/>}/>
            <Route path='view-applications' element={<ViewApplications/>}/>
        </Route>
    
      </Routes>
    </div>
  )
}

export default App