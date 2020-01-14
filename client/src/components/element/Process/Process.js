import React from 'react';

class Process extends React.Component {
    render() {
        let classNameCustom = "process";
        const {
            ratio,
            margin,
            padding,
            borderRadius,
            success, //status color
            danger, //status color
            children
        } = this.props;
        classNameCustom += borderRadius ? " process--borderRadius" : "";
        classNameCustom += success ? " process--success" : "";
        classNameCustom += danger ? " process--danger" : "";
        return (
            <div style={{width: `${ratio}%`, margin: margin, padding: padding}} className={classNameCustom}> {children} </div>
        )
    }
}

Process.defaultProps = {
    ratio: 100
}

export default Process;