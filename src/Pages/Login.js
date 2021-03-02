import React, { Fragment, useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import Swal from 'sweetalert2';

import { Button } from 'react-bulma-components';
import 'react-bulma-components/dist/react-bulma-components.min.css';

//import props
import { loginMutation } from '../graphql/mutations'

const Login = (props) => {
    const testapp = () =>{
        console.log('useEffect')
    }
    useEffect(() => {
        testapp();
    }, []);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);

 
    const attemptLogin = () => {
       if (email && password) {
        setLoading(true)
        props.loginMutation({
            variables: {
                email, password                                                         
            }
        }).then(response => {
            const { loginUser } = response.data;
            console.log(loginUser)
            if(loginUser !== null){
                localStorage.setItem("token", loginUser.token);
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
            setLoading(false)
        })
       }
    }
    
   return(
    <Fragment>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 mt-5">
                    <div className="card mt-5">
                        <div className="card-body">
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
                                    <Button type="button" className={loading? 'button is-primary is-loading' : 'button is-primary mt-3'} disabled={loading} onClick={ attemptLogin }>Login</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
   )
}

export default compose(
    graphql(loginMutation, {name: "loginMutation"})
)(Login);