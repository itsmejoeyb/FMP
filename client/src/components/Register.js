import React, { useState, useContext } from 'react'
import { RootContext } from '../RootContext';

export default function Register(props) {
    const url = 'http://localhost:1389/api/users/register'
    const { setAuthenticated, setUser } = useContext(RootContext);

    const [registerInfo, setRegisterInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [errDeets, setErrorDeets] = useState({
        message: "",
        data: ""
    })

    const handleChange = e => {
        setRegisterInfo({
            ...registerInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(url, { method: 'POST', body: JSON.stringify(registerInfo), headers: { 'Content-Type': 'application/json' } })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setErrorDeets({
                        message: res.message
                    })
                }
                else if (!res.error) {
                    setErrorDeets({ message: res.message })
                    setAuthenticated(true)
                    setUser(res.user)
                    window.localStorage.setItem('token', res.token)
                    props.history.push('/dashboard')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Register</h1>
            {errDeets.message ? <p>{errDeets.message}</p> : <div></div>}
            <form onSubmit={handleSubmit} style={{width: '500px'}}>
                <label htmlFor="firstName">First Name</label>
                <input style={{ width: '100%', padding: '12px 20px', margin: '8px 0', display: 'inline-block', boxSizing: 'border-box' }}
                    name="firstName"
                    placeholder="John"
                    value={registerInfo.firstName}
                    onChange={handleChange} />
                <label htmlFor="lastName">Last Name</label>
                <input style={{ width: '100%', padding: '12px 20px', margin: '8px 0', display: 'inline-block', boxSizing: 'border-box' }}
                    name="lastName"
                    placeholder="Doe"
                    value={registerInfo.lastName}
                    onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input style={{ width: '100%', padding: '12px 20px', margin: '8px 0', display: 'inline-block', boxSizing: 'border-box' }}
                    name="email"
                    placeholder="email@example.com"
                    value={registerInfo.email}
                    onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input style={{ width: '100%', padding: '12px 20px', margin: '8px 0', display: 'inline-block', boxSizing: 'border-box' }}
                    name="password"
                    placeholder="Min 5 Characters"
                    type="password"
                    value={registerInfo.password}
                    onChange={handleChange} />
                <button type="submit" style={{ width: '100%', padding: '14px 20px', margin: '8px 0', boxSizing: 'border-box' }}>Register</button>
            </form>
        </div>
    )
}