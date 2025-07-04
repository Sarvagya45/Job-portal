import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import ApplyJob from "./pages/ApplyJob"
import Application from "./pages/Application"
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './components/Dashboard'
import AddJob from './components/AddJob'
import ManageJob from './components/ManageJob'
import ViewApplication from './components/ViewApplication'
import 'quill/dist/quill.snow.css'

const App = () => {

  const {showRecruiterLogin} = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/apply-job/:id" element={<ApplyJob/>} />
        <Route path="/application" element={<Application/>} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path='add-job' element={<AddJob />}></Route>
          <Route path='manage-job' element={<ManageJob />}></Route>
          <Route path='view-application' element={<ViewApplication />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
