import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { error, isPending, signup } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName)
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
                  type="etext"
                  className="login__input"
                  placeholder="User Name" required
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName} />
              </div>
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
                  <span className="button__text">Sign In Now</span>
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
