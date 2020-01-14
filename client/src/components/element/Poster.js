import React from 'react'
import { NavLink } from 'react-router-dom'

class Poster extends React.Component {
    render() {
        const {image, url} = this.props;
        return (
            // style={{backgroundImage: `url(${image})`, backgroundPosition: "center", backgroundAttachment: "fixed"}}
            <div className="poster">
                <NavLink to={url}>
                    <img className="poster__image" src={image} />
                </NavLink>
            </div>
        )
    }
}

export default Poster;