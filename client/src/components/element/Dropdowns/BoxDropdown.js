import React from 'react';

function BoxDropdown(props) {
    const { title, children } = props;
    return (
        <div className="box-dropdown">
            <small className="box-dropdown__title"> { title } </small>
            { children }
        </div>
    )
}

export default BoxDropdown;