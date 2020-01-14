import React from 'react';
import ErrorText from '../Text/ErrorText';
import SuccessText from '../Text/SuccessText';

class Box extends React.Component {
    render() {
        const { title, children, style, widthBox, margin, errorText, successText } = this.props;
        return (
            <div className="box" style={{width: `${widthBox}`, margin: margin}}>
                <h1 className="box__title"> { title } <ErrorText>{ errorText && errorText }</ErrorText> <SuccessText>{ successText && successText }</SuccessText> </h1>
                <div className="box__content" style={style}>
                    { children }
                </div>
            </div>
        )
    }
}

Box.defaultProps = {
    title: "Something title"
}

export default Box;