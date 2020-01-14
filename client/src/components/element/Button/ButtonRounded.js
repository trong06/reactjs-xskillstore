import React from 'react'
import { NavLink } from 'react-router-dom'

function ButtonRounded(props) {
    const { 
        display,
        link, //Button dạng đường dẫn
        path, //Đường dẫn cho button dạng link
        children, //Nội dung
        width, //Width
        height, //Height
        bgColor, //Background color
        type, //type cho button
        dark, //Color
        orange, //Color
        margin, //Margin
        onChange, //Function
        onClick //Function
    } = props;
    return (
        link ? 
        <NavLink 
        onClick={onClick} 
        onChange={onChange} 
        to={path} 
        style={{display: display, width: width, height: height, backgroundColor: bgColor, margin: margin}} 
        className={`button-rounded ${
            dark ? "button-rounded--dark" : orange ? "button-rounded--orange" : ""
        }`}>{ children }</NavLink> :
        <button 
        onClick={onClick} 
        onChange={onChange} 
        type={type} 
        style={{display: display, width: width, height: height, backgroundColor: bgColor, margin: margin}} 
        className={`button-rounded ${
            dark ? "button-rounded--dark" : orange ? "button-rounded--orange" : ""
        }`}>{ children }</button>
        
    )
}

ButtonRounded.defaultProps = {
    path: "/",
    children: "Button",
    width: "100%",
    type: "button"
}

export default ButtonRounded;