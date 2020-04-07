import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AuthRoute from './auth/AuthRoute'
import Login from './components/Login'
import Register from './components/Register'
import { RootContext } from './RootContext';

function AppRouter() {
  const { authenticated, setAuthenticated } = useContext(RootContext);
  const logout = _ => {
    setAuthenticated(false)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {authenticated 
            ? <li><Link onClick={logout}>Logout</Link></li> 
            : <>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            </>}
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <AuthRoute path="/dashboard" render={props => <Dashboard {...props} />} />
      </div>
    </Router>
  );
}

export default AppRouter;
