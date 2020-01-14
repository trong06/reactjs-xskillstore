import React from 'react';

function ErrorText(props) {
    const { children } = props;

    return (
        <small className="errortext"> { children } </small>
    )
}
export default ErrorText;