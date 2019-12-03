import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import { loginOrganizerMutation } from '../graphql/mutations';

const OrganizerLogin = (props) => {
    console.log(props)

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const attemptLogin = () => {
        props.loginOrganizerMutation({
            variables: {
                email, password
            }
        }).then(response => {
            let organizer = response.data.loginOrganizer;

            if(organizer !== null){
                localStorage.setItem("token", organizer.token);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                        return window.location = "/Dashboard";
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                }).then(()=>{
                    return window.location = "/Dashboard";
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

    return (
        <Fragment>
           <div className="container">
               <div className="row">
                   <div className="col-6">
                    <h3 className="text-right mt-3">CBK-Organizer Login</h3>
                   </div>
                   <div className="col-6 mt-4">
                       <form>
                           <div className="form-groups">
                               <input type="email" className="form-control" placeholder="Enter Email address"
                                onChange={(e)=> {
                                    setEmail(e.target.value);
                                }}
                               ></input>
                           </div>
                           <div className="form-groups">
                               <input type="password" className="form-control mt-3" placeholder="Enter Password"
                                onChange={(e)=> {
                                    setPassword(e.target.value);
                                }}
                               ></input>
                           </div>
                           <div className="form-groups">
                               <button className="btn btn-danger mt-2 btn-block" onClick={ attemptLogin }>Login</button>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
        </Fragment>
    )
}

export default compose(
    graphql(loginOrganizerMutation, 
        {name: "loginOrganizerMutation"}))(OrganizerLogin);
