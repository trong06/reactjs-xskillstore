import React from 'react'
import { NavLink } from 'react-router-dom'
import DefaultImage from '../../images/default.png'
import FavoriteYesImage from '../../images/favorite-heart-button.svg'
import FavoriteNoImage from '../../images/heart.svg'

class CardProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favorite: false
        }
        
        this.onChangeFavorite = this.onChangeFavorite.bind(this);
    }

    onChangeFavorite = () => this.setState({favorite: !this.state.favorite})

    render() {
        const { images, url, title, name_color, price, status, dropPrice, favorite, heightImage, onClick } = this.props;
        return (
            <div onClick={onClick} className={`${images.length >= 2 ? "card-product--cus" : "card-product"}`}>
                <NavLink to={url}>
                    {
                        //Nếu images truyền vào là một mảng thì hiển thị là 2 ảnh, nếu không hiển thị 1 ảnh 
                        Array.isArray(images) ? images.map((image, index) => (
                            <img key={`${index}-cardproduct`} style={{height: heightImage}} className={`${images.length >= 2 ? "card-product--cus__image" : "card-product__image"}`} src={image} />
                        )) : <img style={{height: heightImage}} className={`card-product__image`} src={images} />
                    }
                </NavLink>
                {
                    status !== null && <h4 className="card-product__status"> {status} </h4>
                }
                {
                    favorite && <img onClick={this.onChangeFavorite} className="card-product__favorite" src={this.state.favorite ? FavoriteYesImage : FavoriteNoImage} />
                }
                {
                    title && <NavLink className="card-product__title" to={url}>
                        <h1 className="card-product__title__child"> { title } </h1>
                    </NavLink>
                }
                <span className="card-product__color"> {name_color} </span>
                {
                    price !== null || dropPrice !== null ? <p className="card-product__price"> 
                        {`${price} VND`}
                        <span className="card-product__price__drop">
                            { `${dropPrice ? dropPrice : ""} VND` }
                        </span> 
                    </p> : ""
                }
            </div>
        )
    }
}

CardProduct.defaultProps = {
    images: [DefaultImage, DefaultImage],
    url: "/",
    title: "Không có tiêu đề bài viết",
    name_color: "Black",
    price: "999.000",
    status: null,
    dropPrice: null,
    favorite: false
}

export default CardProduct;