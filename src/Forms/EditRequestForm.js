import React, { Fragment, useState } from "react";
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
//query
import "react-datepicker/dist/react-datepicker.css";
//mutatiom
import { updateRequestMutation } from '../graphql/mutations';
import Swal from "sweetalert2";
import {  getRequestQuery } from '../graphql/queries';

const EditRequestForm = (props) => {
    //console.log(props.getRequestQuery.request)
    
    const [ type, setType ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ numberOfVisitors, setNumberOfVisitors ] = useState("");
    const [ customerId, setCustomerId ] = useState("");  //readOnly
    const [ statusId, setStatusId ] = useState(""); 
    const [ dateRequested, setDateRequested ] = useState(new Date());


    const updateRequest = (id, newType, newDescription, newCustomerId, newStatusId, newDateRequested) => {
        if(type === "" || description === "", customerId === "", statusId === "", dateRequested === ""){
            Swal.showValidationMessage("Please fill out all fields");
        } else {
            return {
                id: id,
                type: newType,
                description: newDescription,
                customerId: newCustomerId,
                statusId: newStatusId,
                dateRequested: newDateRequested
            }

        }
    }

    const editRequest = e => {
        e.preventDefault();
        props.updateRequestMutation({
            variables: {
                
                type, description, numberOfVisitors, customerId, statusId, dateRequested
            }
        }).then(response => {
            const updatedRequest = response.data;
            if(updatedRequest){
                Swal.fire({
                    title: "Requested Event",
                    text: "Your request has been successfully updated",
                    icon: "info"
                }).then(()=>{
                    console.log("done")

                })
            } else {
                Swal.fire({
                    title: "Updating Request Failed",
                    text: "The server encountered an error",
                    icon: "error"
                })
            }
        })
    }


    const showRequest = () => {
        if(!props.getRequestQuery.loading) {
            let request = props.getRequestQuery.request;
            //console.log(request.type)
            return(
             <Fragment>
                <form onSubmit={e => editRequest(e)}>
                    <div className="form-group mt-2">
                        <label>Event Type</label>
                        <input type="text" defaultValue={request.type} className="form-control"
                            onChange={e=>setType(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Event Description</label>
                        <textarea className="form-control" cols="30" 
                         onChange={e=>setDescription(e.target.value)}
                         defaultValue={request.description}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Estimated Visitors</label>
                        <input type="numbers" defaultValue={request.numberOfVisitors} min="1" className="form-control"
                            onChange={e=>setNumberOfVisitors(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>CustomerID</label>
                        <input type="text" defaultValue={request.customerId} className="form-control"
                            onChange={e=>setCustomerId(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>StatusId</label>
                        <input type="text" defaultValue={request.status.status} className="form-control"
                             onChange={e=>setStatusId(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                             <label htmlFor="dateRequested" className="mr-3">Date of Event</label>
                            <DatePicker 
                               selected={dateRequested}
                               onSelect={date => {
                                  setDateRequested(date);
                                  
                               }}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-danger btn-block">Save Update</button>
                    </div>
                </form>
             </Fragment>
            )
        } else {
            return (
                <h3 className="text-center">Loading</h3>
            )
        }
    }

    
    return(
        <Fragment>
           <div className="container">
               <div className="row">
                   <div className="col-12 mt-3">
                   <h3>Edit Request</h3>
                       {/* <form onSubmit={e =>editRequest(e)}>
                            <div className="form-groups">
                                <input type="text" value="" 
                                onChange={e => setType(e.target.value)} />
                            </div>
                       </form> */}
                       {showRequest()}
                   </div>
               </div>
           </div>
        </Fragment>
    )
}



export default compose(
    graphql(getRequestQuery, {
        options: props => {
            return {
                variables: {
                    id: props.match.params.id
                }
            }
        }, name: "getRequestQuery"
    }),
    graphql(updateRequestMutation, {name: "updateRequestMutation"})
)(EditRequestForm)



