import React, { useState, useContext } from 'react'
import { RootContext } from '../RootContext';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

export default function Register(props) {
    const url = `http://fmp-server.herokuapp.com/api/users/register`
    const { setAuthenticated, setUser, setToken } = useContext(RootContext);

    const [registerInfo, setRegisterInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [errDeets, setErrorDeets] = useState({
        message: "",
        data: "",
        error: false
    })
    const [validated, setValidated] = useState(false)

    const handleChange = e => {
        setRegisterInfo({
            ...registerInfo,
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
        fetch(url, { method: 'POST', body: JSON.stringify(registerInfo), headers: { 'Content-Type': 'application/json' } })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setErrorDeets({
                        message: res.message,
                        error: true
                    })
                }
                else if (!res.error) {
                    setErrorDeets({ message: res.message })
                    setAuthenticated(true)
                    setUser(res.user)
                    setToken(res.token)
                    props.history.push('/dashboard')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12} className="text-center">
                    <h1>Register</h1>
                </Col>
                <Col md={6}>
                    <Form noValidate onSubmit={handleSubmit} validated={validated}>
                        {errDeets.error ? <Col md={12}><Alert variant="danger">{errDeets.message}</Alert></Col> : <></>}
                        <Form.Row>
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={registerInfo.firstName}
                                    onChange={handleChange}
                                />
                                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                <Form.Control.Feedback type="invalid">Please enter your first name.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={registerInfo.lastName}
                                    onChange={handleChange}
                                />
                                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                <Form.Control.Feedback type="invalid">Please enter your last name.</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                required
                                name="email"
                                type="email" 
                                placeholder="Enter email" 
                                value={registerInfo.email}
                                onChange={handleChange}
                            />
                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                            <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                name='password'
                                type="password"
                                placeholder="Password"
                                value={registerInfo.password}
                                onChange={handleChange}
                            />
                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                            {<Form.Control.Feedback type="invalid">Please choose a password.</Form.Control.Feedback>}
                        </Form.Group>

                        <Button variant="dark" type="submit" className="justify-self-center">Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}