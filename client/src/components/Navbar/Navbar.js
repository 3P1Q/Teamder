import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import {userLoggedInContext} from '../App';
import './Nav.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 0,
    marginBottom: "5%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0.95,
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    marginLeft: "30px",
  },
}));

function Navbar() {
  const [loggedIn] = useContext(userLoggedInContext);
  const [show,setShow] = useState(false);

  function menuClicked(e){
    document.getElementById("res-menu-items").classList.toggle("res-menu-items-display");
    setShow(prev => (prev?false:true) );
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background: '#4D4C7D'}} >
        <Toolbar>
          <img src="/images/logo.png" alt="logo" style={{height:"3.5rem"}}/>
          <h1 style={{fontSize:"1.5rem", paddingLeft:"0.5rem"}}>Hackanect</h1>
          
          <Typography className={classes.title}>
          </Typography>
          <div className="menu-items">
            <Link to='/' className={classes.link}>HOME</Link>
            {loggedIn
            ?<Link to={`/profile/`+localStorage.getItem("username")} className={classes.link}>PROFILE</Link>
            :<Link to='/login' className={classes.link}>LOGIN</Link>}
            {loggedIn
            ?<Link to='/chats' className={classes.link}>CHATS</Link>
            :<Link to='/register' className={classes.link}>REGISTER</Link>}
          </div>
          
          <IconButton edge="end" className="nav-menu" color="inherit" aria-label="menu" onClick={menuClicked}>
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
        <Fade bottom when={show}>
        <div className="res-menu-items" id="res-menu-items">
            <Link to='/' className={classes.link}>HOME</Link>
            {loggedIn
            ?<Link to={`/profile/`+localStorage.getItem("username")} className={classes.link}>PROFILE</Link>
            :<Link to='/login' className={classes.link}>LOGIN</Link>}
            {loggedIn
            ?<Link to='/chats' className={classes.link}>CHATS</Link>
            :<Link to='/register' className={classes.link}>REGISTER</Link>}
          </div>
        </Fade>
      </AppBar>
    </div>
  );
}

export default Navbar;
