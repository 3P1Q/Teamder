import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import EditIcon from '@material-ui/icons/Edit';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const Menu = (props) => {
    return <div>
        <div className="menu">
            <ul>
                <li><PersonIcon className="icons"/> Profile </li>
                <li><GroupIcon className="icons"/> Connect</li>
                <li><EditIcon className="icons"/> Edit</li>
                <li><PowerSettingsNewIcon className="icons"/> Logout</li>
            </ul>
        </div>
    </div>
}

export default Menu;