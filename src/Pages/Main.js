import React, {Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Main = () => {
    return(
       <Fragment>
           {/* <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
               <div className="carousel-inner">
                <div class="carousel-item active">
                    <img className="d-block w-100" src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?" alt="First slide" />
                </div>
               <div className="carousel-item">
                    <img className="d-block w-100" src="https://images.pexels.com/photos/2337777/pexels-photo-2337777.jpeg?" alt="Second slide" />
               </div>
            </div>
           </div> */}

           <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block w-100" src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg" alt="First slide" />
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://images.pexels.com/photos/2337777/pexels-photo-2337777.jpeg?" alt="Second slide" />
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="..." alt="Third slide" />
                </div>
            </div>
            </div>
       </Fragment>
    )
}

export default Main;