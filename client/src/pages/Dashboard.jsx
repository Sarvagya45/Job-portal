import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

    const navigate = useNavigate()

    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

    const logout = () =>{
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate("/")
    }

    useEffect(()=>{
        if(companyData){
            navigate("/dashboard/manage-jobs")
        }
    },[companyData])

    return (
        <div className='min-h-screen'>

            {/* Navbar for Recruiter Panel*/}
            <div className='shadow py-4'>
                <div className='flex items-center px-5 justify-between'>
                    <img onClick={() => navigate("/")} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
                    {companyData && (

                        <div className='flex items-center gap-3'>
                            <p className='max-sm:hidden'>Welcome, {companyData.name}</p>
                            <div className='realtive group'>
                                <img className='w-8 border border-none rounded-full ' src={companyData.image} alt="" />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-14'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border border-none text-sm'>
                                        <li onClick={()=>{logout()}} className='py-1 px-2 cursor-pointer pr-10 border-2 border-gray-200 rounded-md'>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>

            <div className='flex items-start'>

                {/*Left Sidebar*/}
                <div className='inline-block min-h-screen border-r-2 border-gray-400'>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-200 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add job</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-200 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Managejob</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-200 border-r-4 border-blue-500'}`} to={'/dashboard/view-application'}>
                            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>
                <div className='flex-1 h-full p-2 sm:p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard