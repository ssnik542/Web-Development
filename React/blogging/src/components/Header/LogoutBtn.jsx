import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
export default function LogoutBtn({ handleToggle }) {
    const logoutHandler = () => {
        authService.logout().then(() => dispatch(logout()))
        handleToggle()
    }
    const dispatch = useDispatch();
    return (
        <button onClick={logoutHandler} className='aiBtn  text-white'>Logout</button>
    )
}
