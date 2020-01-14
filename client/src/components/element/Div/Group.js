import React from 'react';

class Group extends React.Component {
    render() {
        const { 
            className, 
            style, 
            children, 
            onChange, 
            onClick, 
            onKeyUp, 
            onKeyDown, 
            onKeyPress, 
            onMouseUp, 
            onMouseDown, 
            onMouseOut, 
            onMouseOver } = this.props;
        return (
            <div 
            onChange={onChange}
            onClick={onClick}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            className={className} 
            style={style} >
                { children }
            </div>
        )
    }
}

export default Group;