import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Swal from 'sweetalert2';
import compose from 'lodash.flowright';
import { graphql } from 'react-apollo';

import { getRequestQuery } from '../graphql/queries';


const ShowRequest = (props) => {
    //console.log(props)

    const showRequest = () => {
        if(!props.getRequestQuery.loading){
            //request
            let type = props.getRequestQuery.request.type;
            let status = props.getRequestQuery.request.status.status;
            let description = props.getRequestQuery.request.description;
            let numberOfVisitors = props.getRequestQuery.request.numberOfVisitors;
            //customer details
            let lastname = props.getRequestQuery.request.customer.lastname;
            let firstname = props.getRequestQuery.request.customer.firstname;
            console.log(firstname)

            return (
                <Fragment>
                    <form>
                        <div className="form-groups">
                            <label>Event Type:</label>
                            <input type="text" className="form-control" defaultValue={type}></input>
                        </div>
                        <div className="form-groups">
                            <label>Status:</label>
                            <input type="text" className="form-control" defaultValue={status}></input>
                        </div>
                        <div className="form-groups">
                            <label>Description:</label>
                            <input type="text" className="form-control" defaultValue={description}></input>
                        </div>
                        <div className="form-groups">
                            <label>Number of Visitors:</label>
                            <input type="number" className="form-control" defaultValue={numberOfVisitors}></input>
                        </div>
                        <div className="form-groups">
                            <label>Full Name</label>
                            <input type="text" className="form-control" defaultValue={lastname +' ' + firstname}></input>
                        </div>
                    </form>
                </Fragment>
            )
        
        } else {
            console.log('tokwa loading pa')
        }
    }

    
    return(
        <Fragment>
           <div className="container">
               <div className="row">
               <div className="col-6 mt-5">
                    <h3>Event Details</h3>
                   </div>
                   <div className="col-6 mt-5">
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
    })
)(ShowRequest);

