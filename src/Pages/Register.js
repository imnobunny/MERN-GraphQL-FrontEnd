import React, { Fragment, useState } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

import { storeCustomerMutation } from '../graphql/mutations';

const Register = (props) => {
  //console.log(props);

  const [ email, setEmail] = useState("");
  const [ password, setPasword ] = useState("");
  const [ password2, setPassword2 ] = useState("")
  const [ lastname, setLastname ] = useState("");
  const [ firstname, setFirtsname ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ contact, setContact ] = useState("");
  const [ goToLogin, setGoToLogin ] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(true);

const register = e => {
  e.preventDefault();

  //validation
  if(email === "" || password === ""|| lastname === "" || firstname === "" || address === "" ||
    contact === ""
  )  {
    //console.log("Please fill out all fields.")
    Swal.fire({
      title: "Registration",
      text: "Please fill out all fields",
      icon: "error"
    })
  } 

  //is Password and Password2 matched?

  if(!password === password2 || password.length < 9 || password2.length < 9){
    Swal.fire({
      title: "Registration",
      text: "Passwords not matched",
      icon: "error"
    })
  }

  props.storeCustomerMutation({
    variables: {
      email, password, lastname, firstname, address, contact
    }
  })


    .then(response => {
      //console.log(response.data);
      const newCustomer = response.data;

      if(newCustomer) {
        Swal.fire({
          title: "Registration Successful",
          text: "You will be redirected to login page",
          icon: "success",
        })
          .then(()=>{
            setGoToLogin(true)
          })
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

if(goToLogin){
  return <Redirect to="/login?register=true"/>
}

 return(
   <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-6 mt-3">
             <h3 className="title is-3 mt-5 mr-auto">Register</h3>
          </div>
          <div className="col-6 mt-5">

              <form onSubmit={e => register(e)}>
                <div className="form-group">
                  <label htmlFor="last_name">Email Address</label>
                  <input type="Email" className="form-control" id="email" 
                  value={email}
                  onChange={e =>setEmail(e.target.value)}
                   />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Password</label>
                  <input type="password" className="form-control" id="password" 
                     value={password}
                  onChange={e =>setPasword(e.target.value)}
                  />
                  <label htmlFor="last_name">Re-Type Password</label>
                  <input type="password" className="form-control" id="password1" 
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
   </Fragment>
 )
}



export default compose(
  graphql(storeCustomerMutation, {name: "storeCustomerMutation"})
)(Register);
