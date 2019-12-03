import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import compose from 'lodash.flowright';
import { graphql } from 'react-apollo';


//query
import { getCustomerQuery } from '../graphql/queries';
//mutation
import {updateCustomerMutation} from '../graphql/mutations';
const Profile = (props) => {
    console.log(props)

    //props.id, props.email, props.password, props.lastname, props.firstname, props.address, props.contact
    const updateCustomer =(id, email, password, lastname, firstname, address, contact) => {
         console.log(id)
        Swal.fire({
            title: "Update Personal Details",
            type: "info",
            html:
            `<label htmlFor="email">Email Address:</label>` +
            `<input type="text" id="nemail" value=${email} class="swal2-input" />` +
            `<label htmlFor="password">Password:</label>` +
            `<input type="password" id="npassword" value=${password} class="swal2-input" />` +
            `<label htmlFor="password">Re-type Password:</label>` +
            `<input type="password" id="password2" defaultValue={details.password} class="swal2-input" />` +
            `<label htmlFor="lastname">Last Name:</label>` +
            `<input type="text" id="nlastname" value=${lastname} class="swal2-input" />` +
            `<label htmlFor="firstname">First Name:</label>` +
            `<input type="text" id="nfirstname" value=${firstname}  class="swal2-input" />` +
           `<label htmlFor="Address">Address:</label>` +
           ` <input type="text" id="naddress" value=${address} class="swal2-input" />` +
           ` <label htmlFor="Address">Contact Number:</label>` +
           ` <input type="text" id="ncontact" value=${contact}  class="swal2-input" />`,
           showCancelButton: true,
           confirmButtonText: "update",
           confirmButtonColor: "#ffdd57",
           reverseButtons: true,
           inputAutoTrim: true,
           allowEnterKey: true,
           preConfirm: ()=>{
               let newEmail = document.querySelector('#nemail').value;
               let newPassword = document.querySelector('#npassword').value;
               let newLastName = document.querySelector('#nlastname').value;
               let newFirstName = document.querySelector('#nfirstname').value;
               let newAddress = document.querySelector('#naddress').value;
               let newContact = document.querySelector('#ncontact').value;

               if(newEmail === "" || newPassword === "" || newLastName === "" || newFirstName === "" ||
                newAddress === "" || newContact === ""
               ) {
                   Swal.showValidationMessage("Please fill out all fields");
               } else {
                   console.log(newLastName, newFirstName);
                   return {
                       id: id, 
                       email: newEmail,
                       password: newPassword, 
                       lastname: newLastName, 
                       firstname: newFirstName,
                       address: newAddress,
                       contact: newContact
                   }
               }
           }
        }).then(formData => {
            console.log(formData)
            console.log(formData.value);
            if(formData.value){
               props.updateCustomerMutation({
                   variables: formData.value,
                //    refetchQueries: [{
                //     query: getCustomerQuery,
                //     variables: { id: id}
                //    }]
               }).then(response => {
                   let result = response.data.updateCustomer;
                   if(result){
                       Swal.fire({
                        title: "Details Updated",
                        text: "You have successfully updated your details",
                        type: "success",
                        showConfirmButton: false,
                        timer: 3000
                       })
                   }
               })
            }
        })
    }
// onClick={()=> props.updateStatus(props.id, props.statusId)}
    const showUserDetails = () => {
        if(!props.getCustomerQuery.loading){
            let details = props.getCustomerQuery.customer;
            // console.log(details)
            return (
                <Fragment>
                    <label htmlFor="email">Email Address:</label>
                    <input type="text" defaultValue={details.email} className="form-control" readOnly/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" defaultValue={details.password} className="form-control" readOnly />
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" defaultValue={details.lastname} className="form-control" readOnly/>
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" defaultValue={details.firstname} className="form-control" readOnly />
                    <label htmlFor="Address">Address:</label>
                    <input type="text" defaultValue={details.address} className="form-control" readOnly />
                    <label htmlFor="Address">Contact Number:</label>
                    <input type="text" defaultValue={details.contact} className="form-control" readOnly/>
                    <input type="hidden"  defaultValue={details.id} className="form-control" />
                    <button type="button" className="btn btn-warning mt-3 btn-block" onClick={()=>updateCustomer(details.id, details.email, details.password, details.lastname, details.firstname, details.address, details.contact)}>Edit</button>
                </Fragment>
            )
        } else {
            return(
                <h2>Loading....</h2>
            )
        }
    }
    
 return (
    <Fragment>
         <div className="container mt-3">
             <div className="row">
                <div className="col-12">
                    <h2 className="text-left mt-4">Personal Details</h2>
                </div>
                <div className="col-12">
                    <form>
                        {showUserDetails()}
                        
                    </form>
                </div>
             </div>
         </div>
    </Fragment>
 )
}


//export default Profile;
export default compose(
    graphql(getCustomerQuery, {
        options: props => {
            return {
                variables: {
                    id: props.match.params.id
                }
            }
        }, name: "getCustomerQuery"
    }), 
    graphql(updateCustomerMutation, {name: "updateCustomerMutation"})
)(Profile);