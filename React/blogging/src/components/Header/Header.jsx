import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import { useNavigate, useResolvedPath } from 'react-router-dom'
import { Menu, ArrowDown, ArrowUp } from 'lucide-react'
export default function Header() {

    const authStatus = useSelector(state => state.authReducer.status)
    const name = useSelector(state => state.authReducer.user?.name)
    const [toggleMenu, setToggleMenu] = useState(false)
    const [onhoverAcc, setOnhovAcc] = useState(false)
    const navigate = useNavigate()
    const path = useResolvedPath();

    useEffect(() => { setOnhovAcc(false) }, [path])

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Singup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        },
    ]

    const handleToggle = () => {
        setToggleMenu(false)
        setOnhovAcc(false)
    }
    return (
        <div className='bg-[#F8F0E3] w-full py-2 text-[#333333] font-semibold'>
            <div className='flex justify-between items-center px-2'>
                <img src="https://th.bing.com/th/id/R.a0099a4b1217bb327b8bdda1fa8218e4?rik=0ZGk0VFbazCOuA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_24762.png&ehk=XBUZdc9M55C3M%2fhOI1Zvn9goc2SgWTMrUjph14iv0LI%3d&risl=&pid=ImgRaw&r=0" alt="logo" className='w-8 hover:bg-emerald-400 cursor-pointer rounded-[50%] transition-all' onClick={() => { navigate('/'); handleToggle() }} />
                <nav className='w-1/2 hidden sm:block'>
                    <ul className="flex justify-around items-center">
                        {navItems.map((item) => item.active && <li className='cursor-pointer hover:text-[#B91354]' key={item.name} onClick={() => navigate(item.slug)}>{item.name}</li>)}
                        {authStatus && <li className='cursor-pointer flex gap-1 hover:text-[#B91354]' onClick={() => { setOnhovAcc(prev => !prev) }}>
                            {name?.toUpperCase()}
                            {onhoverAcc ? <ArrowUp className='w-4 pt-1' /> : <ArrowDown className='w-4 pt-1' />}
                        </li>
                        }
                    </ul>

                    {authStatus && <div className={`absolute top-10 border border-black shadow-lg right-10 bg-white rounded-md ${onhoverAcc ? 'flex' : 'hidden'} flex-col p-4 z-20 justify-center items-center gap-2`}>
                        <h4 className={`cursor-pointer hover:text-[#B91354]`} onClick={() => navigate('/account')}>Account</h4>
                        <span className='bg-[#333] w-full h-[1px]'></span>
                        <LogoutBtn />
                    </div>
                    }

                </nav>
                <nav className='sm:hidden'>
                    <div onClick={() => setToggleMenu(prev => !prev)} className='cursor-pointer'><Menu /></div>
                    <div className={`absolute left-0 w-full z-10 ${toggleMenu ? 'navclass' : 'laut'} -translate-y-96`}>
                        <ul className="flex  flex-col bg-white items-center py-4 gap-6 text-black text-lg rounded-br-md rounded-bl-md bg-opacity-95">
                            {navItems.map((item) => item.active &&
                                <>
                                    <li className='cursor-pointer hover:text-[#B91354]' key={item.name} onClick={() => { navigate(item.slug); handleToggle() }}>
                                        {item.name}
                                    </li>
                                    {/* <span className='bg-[#333] w-1/2 h-[1px]'></span> */}
                                </>
                            )}
                            {authStatus && <li className='cursor-pointer flex gap-1 hover:text-[#B91354]' onClick={() => { navigate('/account'); setToggleMenu(false) }}>Account
                            </li>
                            }
                            {authStatus && <>
                                <span className='bg-[#333] w-1/2 h-[1px]'></span>
                                <LogoutBtn handleToggle={handleToggle} />
                            </>}
                        </ul>
                    </div>

                </nav>
            </div>
        </div>

    )
}
