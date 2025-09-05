import styles from './Navbar.module.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>My Money 💵</li>
                {!user && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                            <Link to='/signup'>Singup</Link>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>Hello {user.displayName} 😀</li>
                        <li>
                            <button className='btn' onClick={logout}>Logout</button>
                        </li>
                    </>

                )}
            </ul>

        </nav>
    )
}
