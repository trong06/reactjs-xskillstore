import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        const { icon, path, title } = this.props;
        return (
            <NavLink className="nav" to={path}>
                <FontAwesomeIcon className="nav__icon" icon={icon} />
                { title }
            </NavLink>
        )
    }
}

export default Nav;