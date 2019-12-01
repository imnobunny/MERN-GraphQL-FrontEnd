import React, { useState, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import verifyToken from './jwt-verify';
import AppNavbar from './Partials/AppNavbar';
//Pages
import Services from './Pages/Services';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Request from './Components/Request';
import Requests from './Components/Requests';
import EditRequestForm from './Forms/EditRequestForm';
const App = () => {

    //get the token in saved local storage
    const [ token, setToken ] = useState(localStorage.getItem("token"));

    const decoded = verifyToken(token);
    //console.log(verifyToken);
    //console.log(decoded); // -> id, email and iat and exp.
    const [ userId, setUserId ] = useState( decoded? decoded._id : null);
    const [userEmail, setUserEmail] = useState( decoded ? decoded.email : null);

    //if eventOrganizer
    //const [isAdmin, setIsAdmin] = useState(decoded ? decoded.isAdmin : null);
  
    
    const Authroute = ({token, ...props})=> {
      if (verifyToken(token)) {
        // return <Redirect to="/Home" />
      
        return (
         
         <Fragment>
          
            <Home {...props} token={token} currentUser={currentUser()}/>
           
         </Fragment>
        )
      } else {
      
        return <Redirect to="/Login" />
      }
    }

    // const updateSession = () => {
    //   setToken(token);
    //   setUserEmail(decoded.email);
    //   setUserId(decoded.id);
    // }

    const currentUser = () => {
      return { userEmail, userId, token }
    };
  
  // Log out 
    const Logout = (props) => {
    localStorage.clear();
    //updateSession();
    window.location = "/login";
  }



  //console.log(token);
  //const login = (props) => <Login {...props} token={token} />
  return (
    <div className="App">
    <BrowserRouter>
    <Route>
         <AppNavbar currentUser={currentUser()} token={token}/>
      </Route>
    <Switch>
      <Route component={Register} exact path="/Register"/>
      <Route component={Services} exact path="/Services"/>
      <Route component={Login} exact path="/Login"/>
      <Route component={Logout} exact path="/Logout"/>
      <Authroute component={Home} token={token} exact path="/Home"/>
      <Route component={Request} exact path="/Request/:id/" />
      <Route component={EditRequestForm} exact path="/Request/edit/:id/" />
      </Switch>
    </BrowserRouter>
  
    </div>
  )
}


export default App;
