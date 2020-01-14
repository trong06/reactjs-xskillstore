import React from 'react'
import { NavLink } from 'react-router-dom'

class CartProduct extends React.Component {
    render() {
        const { title, price, size, amount, image, url } = this.props;
        return (
            <div className="cart-products">
                <img className="cart-products__image" src={image} />
                <div className={`cart-products__content`}>
                    <h5 className="cart-products__content__title"> 
                        <a className="cart-products__content__title__child" href={url}>
                            {title}
                        </a>
                    </h5>
                    <span className="cart-products__content__price">{`${price} VND`}</span>
                    <span className="cart-products__content__size">
                        Size: <span style={{float: "right"}}> {size} </span>
                    </span>
                    <span className="cart-products__content__amount">
                        Số lượng: <span style={{float: "right"}}> {amount} </span>
                    </span>
                </div>
            </div>
        )
    }
}

CartProduct.defaultProps = {
    image: "https://via.placeholder.com/400",
    title: "Không có tiêu đề",
    price: "999.000",
    size: "XXX",
    amount: 0
}

export default CartProduct;