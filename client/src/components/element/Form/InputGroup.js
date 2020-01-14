import React from 'react';

class InputGroup extends React.Component {
    render() {
        let classNameCustom = "input-group";
        const { group, multigroup, children } = this.props;
        group ? classNameCustom += " input-group--grid input-group--group" : classNameCustom = classNameCustom;
        multigroup ? classNameCustom += " input-group--grid input-group--multigroup" : classNameCustom = classNameCustom;
        return (
            <div className={classNameCustom}>
                { children }
            </div>
        )
    }
}

export default InputGroup;