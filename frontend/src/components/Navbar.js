import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/main-logo.png'
import api from '../services/api'


export default function Navbar(props) {
    const [admin, setAdmin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignIn = async (event) => {
        event.preventDefault()

        if (email.length === 0 || password.length === 0) {
            return alert('Fill in the form correctly!')
        }

        if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i.test(email)) {
            return alert('Fill in the email correctly!')
        }

        if (!/[0-9a-zA-Z$*&@#]{8,}/.test(password)) {
            return alert('Your password must have 8 characters')
        }

        const response = await api.post('/signin', { email, password })
        if (response.data === true) {
            setAdmin(false)
            props.handleAuthentication(response.data)
        } else {
            setError(response.data.errorMsg)
        }
    }

    const handleSignOut = () => {
        api.post('/signout', { signout: true })
        props.handleAuthentication()
    }

    return (
        <>
            <nav className="navabar navbar-expand-sm navbar-dark px-sm-5 main-nav">
                <Link to="/">
                    <img src={logo} alt="Logo Mr. Robot" />
                </Link>
                <Link to="/">
                    <span>Products</span>
                </Link>
                <Link to="/cart">
                    <span><i className="fas fa-cart-plus"></i> Cart</span>
                </Link>
                {props.isAuthenticated &&
                    <Link to="/admin" className="d-none d-md-block">
                        <div>
                            <span><i className="fas fa-user-shield"></i> Admin</span>
                        </div>
                    </Link>
                }
                {
                    props.isAuthenticated ? (
                        <div onClick={() => handleSignOut()} className="btn">
                            <span><i className="fas fa-sign-out-alt"></i> Sign out</span>
                        </div>
                    ) : (
                            <div onClick={() => setAdmin(!admin)} className="btn d-none d-sm-block">
                                <span><i className="fas fa-user-lock"></i> Sign in</span>
                            </div>
                        )
                }
            </nav>
            {admin &&
                (
                    <form className="card col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 text-center form-absolute" onSubmit={handleSignIn}>
                        <h3 className="mt-2 text-muted">Sign in</h3>
                        {error && <p className="alert alert-danger">{error}</p>}
                        <input
                            type="email"
                            placeholder="Your e-mail here..."
                            className="form-control"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Your password here..."
                            className="form-control mt-2"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                        />
                        <button className="btn my-2 btn-outline-danger btn-color">Enter</button>
                    </form>
                )
            }
        </>
    )
}
