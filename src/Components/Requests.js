import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
//import Request from './Request';

const Requests = (props) => {
//console.log(props)
    let requestId = props.id;


 return (
    <Fragment>
         <tr key={props.id}>
            <td>
                 {props.type}   
            </td>
            <td>
                 {props.numberOfVisitors}   
            </td>
            <td>
                 {props.dateRequested}   
            </td>
            <td>
               {props.statusId === "5dd28682b3e231234f675c29"? "Pending" : props.statusId==="5dd28682b3e231234f675c2a" ? "Approved" : "Cancelled"} 
            </td>
            <td>
               <Link to={`/Request/${requestId}`} className="btn btn-primary">
                    view
               </Link>
            </td>
            <td>
               <button className="btn btn-info"
                    onClick={()=>props.updateRequest(props.id, props.type, props.description, props.numberOfVisitors,  props.customerId, props.statusId, props.dateRequested)}
               >Edit</button>
            </td>
           <td>
                <button className="btn btn-danger" onClick={()=> props.updateStatus(props.id, props.statusId)}>
                     Cancel
                </button>
           </td>
            
        </tr>
    </Fragment>
 )
}

export default Requests;