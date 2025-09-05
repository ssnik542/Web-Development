import './Login.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isPending } = useLogin();
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)
    }
    return (
        <>
            <div className="container">
                <div className="screen">
                    <div class="screen__content">
                        <form className="login" onSubmit={handleSubmit}>
                            <div className="login__field">
                                <i className="login__icon">
                                    <FontAwesomeIcon icon={faUser} />
                                </i>
                                <input
                                    type="email"
                                    className="login__input"
                                    placeholder="Email" required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email} />
                            </div>
                            <div className="login__field">
                                <i className="login__icon">
                                    <FontAwesomeIcon icon={faLock} />
                                </i>
                                <input type="password" className="login__input" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                            {!isPending &&
                                <button className="button login__submit" >
                                    <span className="button__text">Login In Now</span>
                                    <i className="button__icon">
                                        <FontAwesomeIcon icon={faChevronCircleRight} />
                                    </i>
                                </button>
                            }
                            {isPending && <button className="button login__submit" disabled>
                                <span className="button__text">Loading...</span>
                                <i className="button__icon">
                                    <FontAwesomeIcon icon={faChevronCircleRight} />
                                </i>
                            </button>}
                            {error && <p variant="danger">{error}</p>}
                        </form>
                        <div className="social-login">
                            <h3>log in via</h3>
                            <div className="social-icons">
                                <a href="#" className="social-login__icon">
                                    <img src="https://img.icons8.com/material-outlined/24/000000/instagram-new--v1.png" />
                                </a>
                                <a href="#" className="social-login__icon">
                                    <img src="https://img.icons8.com/material-outlined/24/000000/facebook-new.png" />
                                </a>
                                <a href="#" className="social-login__icon">
                                    <img src="https://img.icons8.com/material-outlined/24/000000/twitter.png" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </>
    )
}
