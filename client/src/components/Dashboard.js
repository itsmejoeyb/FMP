import React, { useContext , useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RootContext } from '../RootContext'
import Login from './Login'
import CompanyCard from './CompanyCard'
import CompanyForm from './CompanyForm'
import AddNew from '../assets/svgs/plus.svg'
import { Container, Row, Col, Button, Modal, Tabs, Tab, Card } from 'react-bootstrap'
import { asyncFetch } from './API'

export default function Dashboard(props) {
    const { user, token, companies, setCompanies, update } = useContext(RootContext)
    const [expired, setExpired ] = useState(false)
    const [show, setShow] = useState(false)
    const [companyShow, setCompanyShow] = useState(false)

    const handleClose = () => {
        expired ? setShow(true) : setShow(false)
    }
    const handleCompanyClose = () => {
        setCompanyShow(false)
    }

    const handleAddNew = () => {
        setCompanyShow(true)
    }

    useEffect(() => {
        ( async () => {
            await asyncFetch('http://localhost:1389/api/companies','GET', token, 'user', user)
            .then(data => {
                if(data.error) {
                    setExpired(true)
                    setShow(true)
                } else {     
                    setShow(false)
                    setCompanies(data)
                }
            })
            .catch(err => console.log(err))
            
        })()
    },[token, update])
    
    return (
        <>
            <Container>
                <Row className="justify-content-between align-items-end pb-3 pt-3">
                    <Col md={4} >
                        <h1 style={{ textTransform: 'uppercase' }}>Dashboard</h1>
                    </Col>
                    <Col md={4}>
                        <h2>Hey there, {user.firstName}!</h2>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="companies" id="companies-tabs">
                    <Tab eventKey="companies" title="Companies">
                        <Row className="justify-content-center">
                            {companies.length > 0 ? companies.map((company, i) => (
                                <Col md={4} key={i} className="justify-content-center pt-5"><CompanyCard name={company.name} id={company.id} desc={company.description} imageUrl={`https://unsplash.it/250/15${i}`} /></Col>
                            )) : <Col md={12} className="text-center pt-5"><h2>Looks like you haven't added any companies yet... Add one now!</h2></Col>}
                            
                            {/* <Col md={4} className="text-center pt-5">
                                <img style={{cursor: 'pointer'}} onClick={handleAddNew} height="100px" width="100px" src={AddNew} alt="Add new company" />
                            </Col> */}

                            <Col md={4} className="text-center pt-5">
                                <Card onClick={handleAddNew} id="company-card" className="m-auto" style={{ width: '18rem', cursor: 'pointer' }}>
                                    <Card.Img variant="top" src={AddNew} height="100px" width="100px" className="mt-5" />
                                    <Card.Body>
                                        <Card.Title>Add New</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>

                            
                            
                        </Row>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                    </Tab>
                </Tabs>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Login title={`Hey, ${user.firstName}!`} subText="Are you still there?" passOnly />
                </Modal.Body>
                <Modal.Footer>
                    <p>Not {user.firstName}?</p>
                    <Button variant="dark" onClick={props.logout}>Log out</Button>
                    <Link to="/register"><Button variant="dark">Register</Button></Link>
                </Modal.Footer>
            </Modal>

            <Modal size="lg" centered show={companyShow} onHide={handleCompanyClose}>
                <Modal.Body>
                    <CompanyForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleCompanyClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
