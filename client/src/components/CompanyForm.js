import React, { useContext, useState } from 'react'
import { RootContext } from '../RootContext'
import { Form, Row, Col, Button, Alert } from 'react-bootstrap'

export default function CompanyForm(props) {
    const { user, token, update, setUpdate } = useContext(RootContext);

    const [companyInfo, setCompanyInfo] = useState({
        userId: user.id,
        name: "",
        email: "",
        description: ""
    })

    const [message, setMessage] = useState({
        message: "",
        error: false
    })
    const [validated, setValidated] = useState(false);

    const handleChange = e => {
        setCompanyInfo({
            ...companyInfo,
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
        fetch('http://localhost:1389/api/companies/new', { method: 'POST', body: JSON.stringify(companyInfo), headers: { 'Content-Type': 'application/json', 'x-auth-token': token } })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setMessage({
                        message: res.message,
                        error: res.error
                    })
                }
                else if (!res.error) {
                    setMessage({ message: res.message })
                    // setCompanies(...companies, res.company)
                    setUpdate(!update)
                    // console.log(companies)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Row className="justify-content-center align-items-center pb-5 pt-3">
                <Col md={12} className="text-center">
                    <h2>New Company</h2>
                    <p>{props.subText}</p>
                </Col>
                <Col md={6}>
                    <Form noValidate onSubmit={handleSubmit} validated={validated}>
                        {message.error ? <Col md={12}><Alert variant="danger">{message.message}</Alert></Col> : <></>}
                        {message.message ? <Col md={12}><Alert variant="success">{message.message}</Alert></Col> : <></>}
                        <Form.Group controlId="name">
                            <Form.Label>Company name</Form.Label>
                            <Form.Control
                                required
                                name="name"
                                type="text"
                                placeholder="Enter name"
                                value={companyInfo.name}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a name.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                value={companyInfo.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3"
                                name="description"
                                type="text"
                                placeholder="Short description..."
                                value={companyInfo.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="dark" type="submit">Add Company</Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
