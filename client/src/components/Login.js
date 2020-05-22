import React, { useState, useContext } from 'react'
import { RootContext } from '../RootContext'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

export default function Login(props) {
    const url = 'http://localhost:1389/api/auth'
    const { setAuthenticated, setToken, setUser, user } = useContext(RootContext);

    const [authInfo, setAuthInfo] = useState({
        email: "",
        password: ""
    })

    const [errDeets, setErrorDeets] = useState({
        message: "",
        error: false
    })
    const [validated, setValidated] = useState(false);

    const handleChange = e => {
        props.passOnly ?
            setAuthInfo({
                ...authInfo,
                email: user.email,
                [e.target.name]: e.target.value
            })
        :
            setAuthInfo({
                ...authInfo,
                [e.target.name]: e.target.value   
            })
    }

    const handleSubmit = e => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)

        e.preventDefault()
        fetch(url, {method: 'POST', body: JSON.stringify(authInfo), headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                setErrorDeets({
                    message: res.message,
                    error: res.error
                })
            }
            else if(!res.error) {
                setErrorDeets({message: res.message})
                setAuthenticated(true)
                setToken(res.token)
                setUser(res.user)
                if(props.location) { props.history.push('/') }
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row className="justify-content-center align-items-center">
                <Col md={12} className="text-center">
                <h1>{props.title}</h1>
                <p>{props.subText}</p>
                </Col>
                <Col md={10}>
                    <Form noValidate onSubmit={handleSubmit} validated={validated}>
                        {errDeets.error ? <Col md={12}><Alert variant="danger">{errDeets.message}</Alert></Col> : <></>}
                        {props.passOnly ? 
                            <></>
                        : 
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    required
                                    name="email"
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={authInfo.email}
                                    onChange={handleChange}
                                    /> 
                                <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
                            </Form.Group> 
                        }
            
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                name="password"
                                type="password" 
                                placeholder="Password"
                                value={authInfo.password}
                                onChange={handleChange} 
                            />
                            <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
                        </Form.Group>

                        {props.passOnly ? <Button variant="dark" type="submit">Confirm</Button> : <Button variant="dark" type="submit">Log In</Button>}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
