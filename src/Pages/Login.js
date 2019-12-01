import React, { Fragment, useState } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


//import props
import { loginMutation } from '../graphql/mutations'

const Login = (props) => {
    console.log("Login page");

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // const login = e => {
    //     e.preventDefault();
    // }
    const attemptLogin = () => {
        // console.log(email, password);
        props.loginMutation({
            variables: {
                email, password                                                         
            }
        }).then(response => {
            let customer = response.data.loginUser;
            
            if(customer !== null){
                localStorage.setItem("token", customer.token);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                        return window.location = "/Home";
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                }).then(()=> {
                    return window.location = "/home";
                })
            } else {
                Swal.fire({
                    title: "Login Failed",
                    text: "Please enter valid credentials",
                    icon: "error"
                })
            }
        })
    }
    
   return(
    <Fragment>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    
                </div>
                <div className="col-6 mt-5">
                    <form>
                        <label htmlFor="last_name">Email Address</label>
                        <input type="Email" className="form-control" id="Email_address"
                            onChange = {(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <label htmlFor="last_name">Password</label>
                        <input type="password" className="form-control" id="Email_address" 
                            onChange = {(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <div className="form-groups">
                            <button type="button" className="btn btn-info mt-2"
                                onClick={ attemptLogin }
                            >Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>
   )
}

export default compose(
    graphql(loginMutation, {name: "loginMutation"})
)(Login);