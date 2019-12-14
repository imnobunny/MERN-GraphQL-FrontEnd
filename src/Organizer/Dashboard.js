import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Swal from 'sweetalert2';
import compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import Swal from 'sweetalert2';

import { getRequestsQuery, getCustomerQuery } from '../graphql/queries'
import { updateStatusRequestMutation} from '../graphql/mutations';
import RequestsRow from './RequestsRow';

const Dashboard = (props) => {
console.log(props);
    
   const updateStatus = (id, statusId) => {
    //console.log(statusId)
    Swal.fire({
       title: "Approved this request?",
       icon: 'warning',
       html:
          `<input id="currentStatusId" type="hidden" class="swal2-input" value="${statusId}">` +
          `<input id="updatedStatusId" type="hidden" class="swal2-input" value=5dd28682b3e231234f675c2a">` ,
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, Approve it!',
       reverseButtons: true,
       inputAutoTrim: true,
       AllowEnterKey: true,
       preConfirm: () => {
          let newStatusId = document.querySelector("#updatedStatusId").value;
          
          if(newStatusId === ""){
             Swal.showValidationMessage("Please choose status");
          } else {
             return {
                id: id, 
                statusId: newStatusId
             }
          }
       }
    }).then(formData => {
       //console.log(formData.value < 0? "yes" : "no")
          if(formData.value){
             //console.log(formData)
             props.updateStatusRequestMutation({
                variables: formData.value,
                refetchQueries: [{
                   query: getRequestsQuery
                }]
             })
                .then(response => {
                   let result = response.data.updateStatusRequest;
                   console.log(result)
                   if(result){
                      Swal.fire({
                         title: "Request has been approved",
                         type: "info",
                         showConfirmButton: false,
                         timer: 3000
                      })
                   }
                })
          } 
    })
 }


    const getRequests = () => {
        if(!props.getRequestsQuery.loading)
        {
            let requests = props.getRequestsQuery.requests;
            
            return requests.map(request => {

                //console.log(request)
                return(
                    <RequestsRow id={request.id} statusId={request.statusId} type={request.type} 
                        description={request.description} numberOfVisitors={request.numberOfVisitors}
                        dateRequested={request.dateRequested} updateStatus={updateStatus}
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
    graphql(getRequestsQuery, {name: "getRequestsQuery"}),
    graphql(updateStatusRequestMutation, {name: "updateStatusRequestMutation"})
)(Dashboard);