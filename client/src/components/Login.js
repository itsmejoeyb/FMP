import React, { useState, useContext } from 'react'
import { RootContext } from '../RootContext';
import { Link } from 'react-router-dom'

export default function Login(props) {
    const url = 'http://localhost:1389/api/auth'
    const { setAuthenticated, setToken, setUser } = useContext(RootContext);

    const [authInfo, setAuthInfo] = useState({
        email: "",
        password: ""
    })
    const [errDeets, setErrorDeets] = useState({
        message: "",
        data: ""
    })

    const handleChange = e => {
        setAuthInfo({
            ...authInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(authInfo)
        fetch(url, {method: 'POST', body: JSON.stringify(authInfo), headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                setErrorDeets({
                    message: res.message
                })
            }
            else if(!res.error) {
                setErrorDeets({message: res.message})
                setAuthenticated(true)
                setToken(res.token)
                setUser(res.user)
                props.history.push('/dashboard')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Login</h1>
            {errDeets.message ? <p>{errDeets.message}</p> : <div></div>}
            <form onSubmit={handleSubmit} style={{width: '500px'}}>
                <label htmlFor="email">Email</label>
                <input style={{ width: '100%', padding: '12px 20px', margin: '8px 0', display: 'inline-block', boxSizing: 'border-box' }}
                    name="email"
                    placeholder="email@example.com"
                    value={authInfo.email}
                    onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input style={{ width: '100%', padding: '12px 20px', margin: '8px 0', display: 'inline-block', boxSizing: 'border-box' }}
                    name="password"
                    placeholder="Case Sensitive"
                    type="password"
                    value={authInfo.password}
                    onChange={handleChange} />
                <button type="submit" style={{ width: '100%', padding: '14px 20px', margin: '8px auto', boxSizing: 'border-box' }}>Log In</button>
            </form>
            {errDeets.message ? <p>Or <Link autocomplete="off" to="/register">Register</Link> instead.</p> : <div></div> }
        </div>
    )
}
