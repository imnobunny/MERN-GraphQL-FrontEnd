import React, { Fragment } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppNavbar = (props) => {
//console.log(props)

  let endNav = "";
  let startNav = "";

  if(props.token) {
    endNav = (
      <Fragment>
        <Link className="navbar-item has-text-white" to="/Logout">Logout</Link>
      </Fragment>
    )
    startNav = (
      <Fragment>
        <Link className="navbar-item has-text-white" to="/Home">Home</Link>
        <Link className="navbar-item has-text-white" to="/Profile">Profie</Link>
      </Fragment>
    )
  } else {
    endNav = (
      <Fragment>
        <Link className="navbar-item" to="/Login">Login</Link>
        <Link className="navbar-item has-text-white" to="/Register">Register</Link>
      </Fragment>
    )
  }

    return (
    //   <Navbar className='is-danger'>
    //   <Navbar.Brand>
    //     <Link className="navbar-item brand-name" to="/">
    //       <strong>CBK | For All Occasions</strong>  
    //     </Link>
    //     <Navbar.Burger />
    //   </Navbar.Brand>
    //   <Navbar.Menu>
    //    {/* <Navbar.Container>Start</Navbar.Container> */}
    //     <Navbar.Container position='end'>
    //       <Link className="navbar-item" to="/Login">Login</Link>
    //       <Link className="navbar-item has-text-white" to="/Register">Register</Link>
    //       <Link className="navbar-item has-text-white" to="/Services">Services</Link>
    //       <Link className="navbar-item has-text-white" to="/Logout">Logout</Link>
    //     </Navbar.Container>
    //   </Navbar.Menu>
    // </Navbar>

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