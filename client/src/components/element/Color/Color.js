import React from 'react';

class Color extends React.Component {
    render() {
        const { colorName, colorCode } = this.props;
        return (
            <div className="color" style={{background: `${colorCode}`}} >
                <span className="color__name"> { colorName } </span>
                <small className="color__code"> { colorCode } </small>
            </div>
        )
    }
}

export default Color;