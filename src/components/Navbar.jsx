import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router'
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
    let dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-yellow-950 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
            <span className="font-semibold text-xl tracking-tight">Coffee & Bread</span>
        </div>
        <div className="w-full block lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
                <Link to='/' className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-orange-300 mr-4">
                    Home
                </Link>
                {!user && 
                    <>
                        <Link to='/register' className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-orange-300 mr-4">
                        Register
                        </Link>
                        <Link to='/login' className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-orange-300">
                            Login
                        </Link>
                    </>           
                }
                {!!user && 
                    <>  

                       <Link to='/register' className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-orange-300 mr-2">
                            <img src="https://img.freepik.com/premium-photo/cartoon-girl-with-long-black-hair-wearing-blue-dress-sneakers_1034043-113815.jpg?semt=ais_user_personalization&w=740&q=80" alt="" className='w-10 h-10 rounded-full'/>
                        </Link>
                        <Link to='/login' className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-orange-300  mr-4">
                            {user.username}
                        </Link>
                        <button onClick={() => dispatch(logout())} className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-orange-300">
                            Logout
                        </button> 
                    </>
                }
            </div>
        </div>
    </nav>
  )
}
