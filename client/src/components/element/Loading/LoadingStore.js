import React from 'react';

class LoadingStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress : 0
        }
        this.loop = "";
    }

    componentDidMount() {
        this.loop = setInterval(() => {
            this.setState({
                progress: this.state.progress < 94 ? this.state.progress + 5 : this.state.progress
            })
        },20)
    }

    componentWillUnmount() {
        clearInterval(this.loop)
    }

    render() {
        return (
            <div style={{width: `${this.state.progress}%`}} className="loading-store">
                <div className="loading-store__loading">
                    <div></div>
                </div>
            </div>
        )
    }
}

export default LoadingStore;