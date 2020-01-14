import React from 'react';

class Alert extends React.Component {
    render() {
        let classNameCustom;
        const { 
            content,
            children,
            style,
            success,
            dark,
            secondary,
            danger,
            warning,
            lightBs4,
            primary,
            violet
        } = this.props;

        classNameCustom = `alert ${success ? "alert--success" : violet ? "alert--violet" : dark ? "alert--dark" : secondary ? "alert--secondary" : danger ? "alert--danger" : warning ? "alert--warning" : lightBs4 ? "alert--light-bs4" : primary ? "alert--primary" : ""}`
        return (
            <div style={style} className={classNameCustom}>
                { content || children }
            </div>
        )
    }
}

Alert.defaultProps = {
    // content: "Something Content",
    // children: "Something content"
}

export default Alert;