import React from 'react';

function Input(props) {
    const {
        id,
        name,
        onChange,
        onKeyUp,
        value,
        type,
        disabled,
        placeholder,
        step,
        width,
        height,
        padding,
        min,
        max,
        orange,
        dark,
        violet,
        btn,
        cursor,
        rounded,
        square,
        className
    } = props;
    return (
        <input
        id={id}
        name={name}
        style={{width: width, height: height, padding: padding, cursor: cursor}}
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value} 
        className={
            `textBox ${className} ${square ? "textBox--square" : ""} ${rounded ? "textBox--rounded" : ""} ${orange ? "textBox--orange" : dark ? "textBox--dark" : ""} ${violet ? "textBox--violet" : ""}`
        } 
        type={type} 
        placeholder={placeholder} 
        disabled={disabled}
        min={min}
        max={max}
        step={step} />
    )
}

Input.defaultProps = {
    disabled: false,
    className: "",
    placeholder: "Hãy nhập gì đó",
    btn: false,
    rounded: true,
    square: false
}

export default Input;