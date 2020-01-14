import React from 'react'
import { NavLink } from 'react-router-dom'

class Button extends React.Component {
    render() {
        const {
            name,
            style, 
            orange, 
            violet, 
            navlink, 
            url, 
            className, 
            children, 
            onClick, 
            onChange, 
            type } = this.props;
        return (
            <React.Fragment>
                {
                    !navlink ? <button type={type} onClick={onClick} onChange={onChange} style={style} className={`button ${className} ${orange ? "button--orange" : violet ? "button--violet" : ""}`}>
                        {name || children}
                    </button> : <NavLink onClick={onClick} onChange={onChange} to={url} style={style} className={`button ${className} ${orange ? "button--orange" : violet ? "button--violet" : ""}`}>
                        {name || children}
                    </NavLink>
                }
            </React.Fragment>
        )
    }
}

Button.defaultProps = {
    style: {},
    className: "",
    orange: false,
    children: "Button",
    url: "/",
    navlink: false,
}

export default Button;