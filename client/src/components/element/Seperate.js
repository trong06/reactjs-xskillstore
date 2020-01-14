import React from 'react'

class Seperate extends React.Component {
    render() {
        const { dashed, style } = this.props;
        return (
            <div style={style} className={`seperate ${dashed ? "seperate--dashed" : "seperate--solid"}`}></div>
        )
    }
}

export default Seperate;