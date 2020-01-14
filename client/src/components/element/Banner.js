import React from 'react'
import { NavLink } from 'react-router-dom'
class Banner extends React.Component {
    render() {
        const { title, image, para, heightImg, url } = this.props;
        return (
            <div className="banner">
                <div style={{height: `${heightImg}`}} className="banner__image">
                    <img className="banner__image__child" src={image} />
                </div>
                <h3 className="banner__title">
                    <NavLink className="banner__title__child" to={url}>
                    { title }
                    </NavLink>
                </h3>
                <p className="banner__para">
                    { para }
                </p>
            </div>
        )
    }
}

// Banner.defaultProps = {
//     title: "",
//     image: "",
//     para: "",
//     height: ""
// }

export default Banner;