import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
export default function AuthProtected({ children, authentication = true }) {
    const [loader, setLoader] = React.useState(false)
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.authReducer.status)
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
    return (
        loader ? <h1>Loading...</h1> : <div>{children}</div>
    )
}
