import React, { useContext } from 'react';
// import Edit from './Edit';
import Edit from './Edit1';
import {Link} from 'react-router-dom';
import {userDataContext} from './profilePage';
import NewChat from './NewChat';
import SERVER_URL from '../../utils/constants';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Menu = (props) => {
    const [data, setData] = useContext(userDataContext);

    function handleLogout(){
        axios.get(`${SERVER_URL}/logout`);
        window.location = "/";
    }

    return <>
        <div className="menu">
            <ul>
                {data.username !== localStorage.getItem("username") ? (
                    <li><NewChat user={data.username}/></li>
                ) : (
                    <li><Link to="/chats" style={{textDecoration:"none", color:"inherit"}}>Chats</Link></li>
                )}
                {data.username !== localStorage.getItem("username") ? (
                    ""
                ) : (
                    <li><Link to="/connect" style={{textDecoration:"none", color:"inherit"}}>Explore</Link></li>
                )}
                <li><Link to="/profile" style={{textDecoration:"none", color:"inherit"}}>Search a User</Link></li>
                {data.username===localStorage.getItem("username") && <li><Link to="/hackathons" style={{textDecoration:"none", color:"inherit"}}>Hackathons</Link></li>}
                {data.username===localStorage.getItem("username") && <li><Edit/></li>}                
                {data.username===localStorage.getItem("username") && (
                <li onClick={handleLogout}>Logout</li>) }
            </ul>
        </div>
    </>
}

export default Menu;