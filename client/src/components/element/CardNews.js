import React from 'react'
import { NavLink } from 'react-router-dom'

class CardNews extends React.Component {
    render() {
        const { image, title, para, url } = this.props;
        return (
            <div className="cardNews">
                <NavLink to={url}>
                    <img className="cardNews__image" src={image} />
                </NavLink>
                <NavLink className="cardNews__title" to={url}>
                    <h1 className="cardNews__title__child">
                        {title}
                    </h1>
                </NavLink>
                <p className="cardNews__para"> {para.slice(0,170) + "..."} </p>
                <NavLink to={url} className="cardNews__readmore">
                    Đọc thêm
                </NavLink>
            </div>
        )
    }
}

export default CardNews;