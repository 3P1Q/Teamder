import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './Profile.css';
import Navbar from './Navbar'
import Login from './Login'
import Register from './Register'
import ProfilePage from '../screens/ProfilePage/profilePage'
import SearchResults from './searchresults'
// import Search Bar Component
import HorizontalLinearStepper from "./SearchBar";
// import Tags from './Tags';
import Edit from './Edit';

// import Test from './Test';


const App = () => {
  // constructor(){
    // this.state = {
    //   id: "",
    //   techStack: [],
    //   projects: [],
    //   bio: ""
    // }
  // }
  const [userData, setUserData] = useState({
    _id: "",
    techStack: [],
    projects: [],
    bio: ""
  })

    // data();
    return (
      <Router>
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/profile">Profile</Link> */}
        <Navbar />
        <Switch>
        
          <Route path="/profile">
            <ProfilePage />
            {/* <Tags /> */}
          </Route>

          <Route path='/' exact>
            <h1>Welcome to Teamder's</h1>
            <Edit />
            <HorizontalLinearStepper/>
            <SearchResults userData={userData}/>
          </Route>

          <Route 
            path="/login" 
            exact 
            render={
              () => <Login setUserData={setUserData}/>
            } />

          <Route 
            path="/register" 
            exact 
            render={
              () => <Register setUserData={setUserData}/>
            } />
          {/* <Route path="/getalldata" exact component={Test} /> */}

        </Switch>
      </Router>
    );
}

export default App;
