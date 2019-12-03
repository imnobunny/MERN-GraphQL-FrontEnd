import React, { Fragment, useState } from 'react';
//import 'bulma-react-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

//import components
import Requests from '../Components/Requests';
//import graphql
import { storeRequestMutation,
      updateRequestMutation,
      updateStatusRequestMutation
} from '../graphql/mutations';
import { getCustomerQuery, getRequestQuery } from '../graphql/queries';


const Home = (props) => {

   //console.log(props)
   let data;
   
   const { userId } = props.currentUser;
  
   //decons...
   // Adding a REquest
   const [ type, setType ] = useState("");
   const [ description, setDescription ] = useState("");
   const [ numberOfVisitors, setNumberOfVisitors ] = useState("");
   const [ customerId, setCustomerId ] = useState(userId); 
   const [ statusId, setStatusId ] = useState("5dd28682b3e231234f675c29"); //default is pending
   const [ dateRequested, setDateRequested ] = useState(new Date());



   //update the status of request 

   const updateStatus = (id, statusId) => {
      //console.log(statusId)
      Swal.fire({
         title: "Are you sure do you want to cancel your booking?",
         icon: 'warning',
         html:
            `<input id="currentStatusId" type="hidden" class="swal2-input" value="${statusId}">` +
            `<input id="updatedStatusId" type="hidden" class="swal2-input" value="5dda47db3f02611e14827d9b">` ,
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, Cancel it!',
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
                     query: getCustomerQuery,
                     variables: {id: props.currentUser.userId}
                  }]
               })
                  .then(response => {
                     let result = response.data.updateStatusRequest;
                     console.log(result)
                     if(result){
                        Swal.fire({
                           title: "Request has been cancelled",
                           type: "info",
                           showConfirmButton: false,
                           timer: 3000
                        })
                     }
                  })
            } 
      })
   }


   const addRequest = e => {
      e.preventDefault();
      props.storeRequestMutation({
         variables: {
            type, description, numberOfVisitors, customerId, statusId, dateRequested
         },refetchQueries: [{ 
            query: getCustomerQuery,
            variables: { id: props.currentUser.userId }
          }]
      })
      .then(response => {
         //console.log(response.data)
         const newRequest = response.data;

         if(newRequest){
            Swal.fire({
               title: "Request Event",
               text: "Your request has been successfuly added. Kindly wait for the Event Organizer to approved",
               icon: "info"
            })
               .then(()=>{
                  setType("");
                  setDescription("");
                  setNumberOfVisitors("");
                  setDateRequested(new Date());
               })
         } else {
            Swal.fire({
               title: "Adding Request Failed",
               text: "The server encountered error",
               icon: "error"
            })
         }
      })
   }


   //updating request

   const updateRequest = (id, type, description, numberOfVisitors, customerId, statusId, dateRequested) => {
         //console.log(statusId)
         Swal.fire({
            title: "Update Request",
            type: "info",
            html: 
            `<label>Event Type</label>` +
            `<input id="type" class="swal2-input" value="${type}">` +
            `<label>Event Description</label>` +
            `<input id="description" class="swal2-input" value="${description}">` +
            `<label>Estimated Number of Visitors</label>` +
            `<input id="numberOfVisitors" class="swal2-input" value="${numberOfVisitors}">` +
            `<input id="customerId" type="hidden" class="swal2-input" value="${customerId}">` +
            `<input id="statusId" type="hidden" class="swal2-input" value="${statusId}">` +
            `<label>Date Requested</label>` +
            `<input id="dateRequested" class="swal2-input" value="${dateRequested}">`,
               showCancelButton: true,
               confirmButtonText: "Update",
               confirmButtonColor: "#ffdd57",
               reverseButtons: true,
               inputAutoTrim: true,
               AllowEnterKey: true,
               preConfirm: () =>{
                  let newType = document.querySelector('#type').value;
                  let newDescription = document.querySelector('#description').value;
                  let newNumberOfVisitors = document.querySelector('#numberOfVisitors').value;
                  let newCustomerId = document.querySelector('#customerId').value;
                  let newStatusId = document.querySelector('#statusId').value;
                  let newDateRequested = document.querySelector('#dateRequested').value;

                  if(newType === "" || newDescription === "" || newNumberOfVisitors === ""
                  || newCustomerId === "" || newStatusId === "" || newDateRequested === ""
                  ) {
                     Swal.showValidationMessage("Please fill out all fields");
                  } else {
                     return  {
                        id: id,
                        type: newType,
                        description: newDescription,
                        numberOfVisitors: newNumberOfVisitors,
                        customerId: newCustomerId,
                        statusId: newStatusId,
                        dateRequested: newDateRequested
                     }
                  }
               }
         })
         .then(formData => {
            if(formData.value){
               props.updateRequestMutation({
                  variables: formData.value,
                  refetchQueries:[{ query: getCustomerQuery }]
               }).then(response => {
                  let result = response.data.updateRequest;
                  if(result){
                     Swal.fire({
                        title: "Request Updated",
                        text: "The Request has been updated",
                        type: "success",
                        showConfirmButton: false,
                        timer: 3000
                     })
                  }
               })
            }
         })
   }

   //console.log(props)
   const userRequests = () => {
      if(!props.getCustomerQuery.loading){
         
         let requestsLen = props.getCustomerQuery.customer.requests.length;
         if(requestsLen > 0){
            let requests = props.getCustomerQuery.customer.requests;
            //console.log(requests)
            return requests.map(request =>{
               //console.log(request.id)
              return (
               <Requests key={request.id} id={request.id} type={request.type} description={request.description} customerId= {request.customerId} 
               dateRequested={request.dateRequested} statusId={request.statusId} numberOfVisitors={request.numberOfVisitors}
                  updateRequest={updateRequest} updateStatus={updateStatus}
               />

              )
           })
         } else {
           return (
            <tr>
            <td colSpan="5"><p className="text-center">No request found</p></td>
         </tr>
           )
         }
        
      }
   }

 
  
    return(
        <Fragment>
           <div className="container">
               <div className="row">
                   <div className="col-4 mt-3">
                       <h3>Request Event</h3>
                       <form onSubmit={e => addRequest(e)}>
                          <div className="form-group">
                             <label htmlFor="type">Event Type</label>
                             <input type="text" className="form-control" 
                                 value={type}
                                 onChange={e =>setType(e.target.value)}
                             />
                          </div>
                          <div className="form-group">
                              <label htmlFor="description">Event Description</label>
                          </div>
                          <div className="form-group">
                             <textarea placeholder="write your event description here.." className="form-control" cols="60"
                                 value={description}
                                 onChange={e =>setDescription(e.target.value)}
                             ></textarea>
                          </div>
                          <div className="form-group">
                             <label htmlFor=""></label>
                          </div>
                          <div className="form-group">
                             <label htmlFor="numberOfVisitors">Number of Visitors</label>
                             <input type="number" className="form-control" min="1"
                                 value={numberOfVisitors}
                                 onChange={e =>setNumberOfVisitors(e.target.value)}
                             ></input>
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
                          {/* HIDE INPUT TEXTS */}
                          <div className="form-group">
                             
                              <input type="hidden" className="form-control" readOnly 
                                value={userId}
                                 onChange={e =>setCustomerId(e.target.value)}
                             />
                             <input type="hidden" className="form-control" readOnly 
                                value="5dd28682b3e231234f675c29"
                                onChange={e =>setStatusId(e.target.value)}
                             />
                             <input type="hidden" className="form-control" readOnly 
                                value="5dd28682b3e231234f675c29"
                                onChange={e =>setStatusId(e.target.value)}
                             />
                             {/* <input type="text" className="form-control" readOnly
                                value={new Date()}
                                onChange={e =>setCreatedAt(e.target.value)}
                             /> */}
                          </div>
                          <div className="form-group">
                             <button type="submit" className="btn btn-danger btn-block">Book</button>
                          </div>
                       </form>
                       
                  </div>
                  
                   <div className="col-8 mt-3">
                   <table className="table table-bordered mt-5">
                     <thead>
                        <tr>
                           <th scope="col">Type</th>
                           <th scope="col"># of Visitors</th>
                           <th scope="col">Date Requested</th>
                           <th scope="col">Status</th>
                           <th scope="col" colSpan="2">Manage</th>
                             
                        </tr>
                     </thead>
                     <tbody>
                      {userRequests()}
                     </tbody>
                     </table>  
                   </div>
               </div>
           </div>
        </Fragment>
    )
}

// export default Home;

export default compose(
   graphql(storeRequestMutation, {name: "storeRequestMutation"}),
   graphql(getCustomerQuery, {
      options: props => {
         return {
            variables: {
               //id: "5dd938357c41dc9f011282ee"
               id: props.currentUser.userId
            }
         }
      }, name: "getCustomerQuery"
   }),
   graphql(updateRequestMutation, {name: "updateRequestMutation"}),
   graphql(updateStatusRequestMutation, {name: "updateStatusRequestMutation"})
)(Home); 