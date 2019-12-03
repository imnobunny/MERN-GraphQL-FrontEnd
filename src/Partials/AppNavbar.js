import React, { Fragment } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppNavbar = (props) => {
  //console.log(props.currentUser)



let userId = props.currentUser.userId;

 
  let startNav = "";
  let endNav ="";

  if(props.token && props.currentUser.isAdmin === undefined) {
    endNav = (
      <Fragment>
        <Link className="navbar-item has-text-white" to="/Logout">Logout</Link>
      </Fragment>
    )
    startNav = (
      <Fragment>
        <Link className="navbar-item has-text-white" to="/Home">Home</Link>
        <Link className="navbar-item has-text-white" to={`/Profile/${userId}`}>Profile</Link>
      </Fragment>
    )

  } else if (props.currentUser.isAdmin === true && props.token) {
    endNav = (
      <Fragment>
        <Link className="navbar-item has-text-white" to="/Logout">Logout</Link>
      </Fragment>
    )
    startNav = (
      <Fragment>
        <Link className="navbar-item has-text-white" to="/Dashboard">Dashboard</Link>
        <Link className="navbar-item has-text-white" to="">Schedules</Link>
      </Fragment>
    )

  } else {
    endNav = (
      <Fragment>
        <Link className="navbar-item has-text-white" to="/Login">Login</Link>
        <Link className="navbar-item has-text-white" to="/Register">Register</Link>
      </Fragment>
    )
  }

    return (

    <Navbar className='is-black'>
      <Navbar.Brand>
      <Link className="navbar-item" to="/">
	        	<strong>CBK</strong>
	        </Link>
      <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
    
      <Navbar.Container>{ startNav }</Navbar.Container>
      <Navbar.Container position="end">{ endNav }</Navbar.Container>
      
      </Navbar.Menu>
    </Navbar>

    )
}
export default AppNavbar;