import React from 'react'

function SuccessText(props) {
    const { children } = props;

    return (
        <small className="success-text"> { children } </small>
    )
}

export default SuccessText;