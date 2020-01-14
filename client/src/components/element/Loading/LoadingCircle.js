import React from 'react';
import Loading from '../../../images/loading-2.gif';

class LoadingCircle extends React.Component {
    //test
    render() {
        return (
            <div style={{
                width: "100%",
                height: "100vh",
                position: "absolute",
                background: "rgba(255,255,255, 0.8)",
                top: "0",
                left: "0",
                zIndex: "10"
            }} >
                <img style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-10%, -50%)"
                }} src={Loading} />
            </div>
        )
    }
}

export default LoadingCircle;