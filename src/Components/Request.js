import React, { Fragment } from "react";
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getRequestQuery } from '../graphql/queries';
import { Link } from 'react-router-dom';
//import Swal from 'sweetalert2';
const Request = (props) => {
//console.log(props)

    const getRequest = () => {
        if(!props.getRequestQuery.loading){
            let request = props.getRequestQuery.request
            //console.log(request.type)
            return(
               <Fragment>
                    <form>
                        <div className="form-groups">
                            <label>Event Type</label>
                            <input type="text" value={request.type} className="form-control" readOnly/>
                        </div>
                        <div className="form-groups">
                            <label>Event Description</label>
                            <textarea className="form-control" cols="60" readOnly>{request.description}</textarea>
                        </div>
                        <div className="form-groups">
                            <label>Estimated Number of Visitors</label>
                            <input type="text" value={request.numberOfVisitors} className="form-control" readOnly/>
                        </div>
                        <div className="form-groups">
                            <label>Request Status</label>
                            <input type="text" value={request.status.status} className="form-control" readOnly/>
                        </div>
                        <div className="form-groups">
                            <label>Request Status</label>
                            <input type="text" value={request.dateRequested} className="form-control " readOnly/>
                        </div>
                        <div className="form-groups">
                        <Link to={`/Request/edit/${request.id}`} className="btn btn-danger btn-block mt-4" >
                            Edit Request
                        </Link>
                        </div>
                    </form>
               </Fragment>
            )
        } else {
            return(
                <h3>Loading...</h3>
            )
        }
    }


    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="mt-5 mb-3">Request Details</h3>
                    </div>
                    <div className="col-12">
                        {getRequest()}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


//export default Request;
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
)(Request)

