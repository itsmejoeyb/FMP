import React, {useContext, useEffect} from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AuthRoute from './auth/AuthRoute'
import Login from './components/Login'
import Register from './components/Register'
import Company from './components/Company'
import { RootContext } from './RootContext'
import './App.css'

function AppRouter() {
  const { authenticated, setAuthenticated, setToken, setUser } = useContext(RootContext);
  const logout = _ => {
    setAuthenticated(false)
    setToken(null)
    setUser('')
  }

  return (
    <Router>
      <div style={{ paddingTop: '56px' }}>
        <Navbar id="nav" fixed="top" bg="dark" expand="md" variant="dark">
          <Link to={authenticated ? '/' : '/login'}><Navbar.Brand as="span">Feature Manager Pro</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              {authenticated ?
                <>
                  <Link to="/"><Nav.Link as="span">Dashboard</Nav.Link></Link>
                  <Nav.Link onClick={logout} as="span">Logout</Nav.Link>
                </>
              : <>
                  <Link to="/login"><Nav.Link as="span">Login</Nav.Link></Link>
                  <Link to="/register"><Nav.Link as="span" >Register</Nav.Link></Link>
              </>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/login" render={props => <Login title="Login" location="login" {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <AuthRoute path="/" exact render={props => <Dashboard logout={logout} {...props} />} />
        <AuthRoute path="/company" render={props => <Company {...props} /> } />
      </div>
    </Router>
  )
}

export default AppRouter;
