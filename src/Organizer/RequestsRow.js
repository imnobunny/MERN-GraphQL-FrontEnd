import React, { Fragment } from 'react';

const RequestsRow = (props)=> {
   //console.log(props); 
   
  
    return (
        <Fragment>
            <tr key={props.id}>
                <td>{props.type}</td>
                <td>{props.numberOfVisitors}</td>
                <td>{props.statusId === "5dd28682b3e231234f675c29"? "Pending" : props.statusId==="5dd28682b3e231234f675c2a" ? "Approved" : "Cancelled" } </td>
                <td>{props.dateRequested} </td>
                <td>
                    <button className="btn btn-info">
                        View
                    </button>
                </td>
                <td>
                    <button className="btn btn-warning">
                        Approved
                    </button>
                </td>
                <td>
                    <button className="btn btn-danger">
                        Cancelled
                    </button>
                </td>
            </tr>
        </Fragment>
    )
}

export default RequestsRow;