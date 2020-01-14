import React from 'react';

class LayoutMedium extends React.Component {
    render() {
        const { className } = this.props;
        return (
            <div style={this.props.style} className={`layout-medium${className ? ` ${className}` : ""}`}>
                {
                    this.props.children
                }
            </div>
        )
    }
}

export default LayoutMedium;