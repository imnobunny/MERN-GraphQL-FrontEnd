import React, { Fragment, useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import { storeCustomerMutation } from '../graphql/mutations';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Register = ({ storeCustomerMutation }) => {
 
  
  const [ email, setEmail] = useState("");
  const [ password, setPasword ] = useState("");
  const [ password2, setPassword2 ] = useState("")
  const [ lastname, setLastname ] = useState("");
  const [ firstname, setFirtsname ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ contact, setContact ] = useState("");
  const [ goToLogin, setGoToLogin ] = useState(false);


  useEffect(() => {
    return () => {
          // clean up
          setGoToLogin(false);
    }
  })

const register = e => {
  e.preventDefault();

  const Notification = (message, type="error") => {
    return (
      Swal.fire({
        title: "Registration",
        text: message,
        icon: type
      })
    )
  }

  //validations
  if(email === "" || password === ""|| lastname === "" || firstname === "" || address === "" || contact === "")  {

    return Notification('Please fill out all fields');

  } else if (password !== password2 ) {

    return Notification('Passwords are not matched');

  } else if (password.trim().length < 9) {

    return Notification('Password should at least 9 characters');

  } else {
    storeCustomerMutation({
      variables: {
        email, password, lastname, firstname, address, contact
      }
    })
    .then(response => {
        console.log(response)
        const { storeCustomer } = response.data;

        if(storeCustomer) {

          Swal.fire({
            title: "Registration Successful",
            text: "You will be redirected to login page",
            icon: "success",
          })
            .then(()=>{
              setGoToLogin(true)
            });

        } else {

          Swal.fire({
            title: "Registration Failed",
            text: "The server encountered an error",
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          })

        }
      })
  }

}

if(goToLogin){
  return <Redirect to="/login?register=true"/>
}

 return(
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <div class="card  mt-5">
            <div class="card-body">
                
              <form onSubmit={e => register(e)}>
                <div className="form-group">
                  <label htmlFor="last_name">Email Address</label>
                  <input type="Email" className="form-control" id="email" 
                  value={email}
                  onChange={e =>setEmail(e.target.value)}
                   />
                </div>
                <div className="form-group">
                  <label htmlFor="Password">Password</label>
                  <input type="password" className="form-control" id="Password" 
                    value={password}
                    onChange={e =>setPasword(e.target.value)}
                  />
                  <label htmlFor="last_name">Confirm Password</label>
                  <input type="password" className="form-control" id="Password1" 
                    value = {password2}
                    onChange={e => setPassword2(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" className="form-control" id="lastName" 
                    value={lastname}
                    onChange={e =>setLastname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">First Name</label>
                  <input type="text" className="form-control" id="firstName" 
                     value={firstname}
                    onChange={e =>setFirtsname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Address</label>
                  <input type="text" className="form-control" id="Address" 
                    value={address}
                    onChange={e =>setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Contact Number</label>
                  <input type="text" className="form-control" id="contact" 
                    value={contact}
                    onChange={e =>setContact(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-danger btn-block mb-5"
                >Submit</button>
              </form>

              </div>
            </div>
          </div>
        </div>
      </div>
  
 )
}



export default compose(
  graphql(storeCustomerMutation, {name: "storeCustomerMutation"})
)(Register);
