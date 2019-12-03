import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Swal from 'sweetalert2';
import compose from 'lodash.flowright';
import { graphql } from 'react-apollo';


import { getRequestsQuery } from '../graphql/queries'
import RequestsRow from './RequestsRow';

const Dashboard = (props) => {


    const getRequests = () => {
        if(!props.getRequestsQuery.loading)
        {
            let requests = props.getRequestsQuery.requests;
            
            return requests.map(request => {

                console.log(request)
                return(
                    <RequestsRow id={request.id} statusId={request.statusId} type={request.type} 
                        description={request.description} numberOfVisitors={request.numberOfVisitors}
                        dateRequested={request.dateRequested}
                    />
                )
            })
            } //end of if
       } //end of getRequest

    return(
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-5">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Event Type</th>
                            <th scope="col">Estimated Visitors</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date Request </th>
                            </tr>
                        </thead>
                        <tbody>
                        {getRequests()}
                        </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

//export default Dashboard;

export default compose(
    graphql(getRequestsQuery, {name: "getRequestsQuery"})
)(Dashboard);