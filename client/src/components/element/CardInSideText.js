import React from 'react'
import { NavLink } from 'react-router-dom'

class CardInSideText extends React.Component {
    render() {
        const {image, title, categories, url, style} = this.props;
        return (
            <div style={style} className="card-inside-text">
                <img className="card-inside-text__image" src={image} />
                <div className="card-inside-text__category">
                    <h2 className="card-inside-text__category__title"> 
                        <NavLink className="card-inside-text__category__title__child" to={url}>
                            {title}
                        </NavLink>
                    </h2>
                    {
                        categories.map((item,index) => (
                            <NavLink key={`${index}-cardinside`} className="card-inside-text__category__text" to={item.url}>
                                {item.name}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        )
    }
}

CardInSideText.defaultProps = {
    categories: [],
    image: "https://ananas.vn/wp-content/uploads/catalogy-1.jpg",
    title: "Danh mục",
    url: "/"
}

export default CardInSideText;