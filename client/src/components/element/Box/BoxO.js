import React from 'react';

class BoxO extends React.Component {
    render() {
        const { title, children, stickyTop } = this.props;
        return (
            <div className={`box-o${stickyTop ? " box-o--sticky-top" : ""}`}>
                <h1 className="box-o__title"> {title} </h1>
                {
                    children
                }
            </div>
        )
    }
}

export default BoxO;