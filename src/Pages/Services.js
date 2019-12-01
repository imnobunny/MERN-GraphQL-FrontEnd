import React, {Fragment } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
//import { Columns, Heading } from 'react-bulma-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Services = () => {
    return(
        <Fragment>
           <div className="container">
               <div className="row">
                   <div className="col-12 mt-5">
                       <h3 className="title is-3 mt-4 text-center">About CBK</h3>
                   </div>
                   <div className="col-12 mt-2">
                        <p className="text-center">
                            We are CBK and we offer services for full event styling, event planning / coordination, designed backdrop,
                            Styro Backdrop, Balloon decorations, Catering, Photobooth, Photoshoot Coverage. 
                            And also, tarpaulin, Souvenirs and Invitations.<br />
                        </p>
                        <p className="mt3 text-center">Login and book your event with us now and we will make it extra special</p>
                        <div className="text-center">
                            <button className="btn btn-danger">Login & Book</button>
                        </div>
                   </div>
                   <div className="col-12">
                       <div className="container">
                           <div className="row"></div>
                       </div>
                   </div>
               </div>
           </div>
        </Fragment>
    )
}

export default Services;