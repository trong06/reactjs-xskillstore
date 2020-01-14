import React from 'react'

class MasterRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        }
    }

    componentDidMount() {
        const URL = window.location.pathname;

    }

    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}

export default MasterRoute;