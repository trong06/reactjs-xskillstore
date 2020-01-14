import React from 'react'
import { NavLink } from 'react-router-dom'
import CartShop from '../../images/icon_gio_hang.svg'
import CartProduct from './CartProduct';
import Button from './Button/Button';
import Context from '../../contexts/Context';
import Module from '../../modules/Module';

class CartSide extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }

        this.onToggle = this.onToggle.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onToggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    onKeyUp(event) {
        if(event.keyCode === 27) {
            this.setState({toggle: !this.state.toggle})
        }
    }

    componentDidMount() {
        window.addEventListener("keyup", this.onKeyUp, false)
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.onKeyUp, false)
    }

    render() {
        const {top, left, right, bottom} = this.props;
        return (
            <Context.Consumer>
                {({stateCartAmount, stateCart, statePayments, FuncDeleteAllCart}) => (
                    <div className="cart-side">
                        <div onClick={this.onToggle} style={{top: `${top}`, left: `${left}`, right: `${right}`, bottom: `${bottom}`}} className="cart-side__info">
                            <span className="cart-side__info__count"> {stateCartAmount} </span>
                            <img className="cart-side__info__image" src={CartShop} />
                        </div>
                        <div className={`cart-side__detail ${this.state.toggle ? "cart-side--active" : ""}`}>
                            <h4 className="cart-side__detail__title"> Giỏ hàng ({stateCartAmount}) </h4>
                            {
                                stateCart.length > 0 && <CartProduct 
                                image={`${stateCart[0].thumbnails[0]}`} 
                                title={`${stateCart[0].title}`} 
                                price={`${Module.AddCommaToNumber(stateCart[0].price)}`}
                                amount={`${stateCart[0].amountSelected}`}
                                size={`${stateCart[0].sizeSelected}`}
                                url={`/product/${stateCart[0].url}`} />
                            }
                            {
                                stateCart.length > 1 && <CartProduct 
                                image={`${stateCart[1].thumbnails[0]}`} 
                                title={`${stateCart[1].title}`} 
                                price={`${Module.AddCommaToNumber(stateCart[1].price)}`}
                                amount={`${stateCart[1].amountSelected}`}
                                size={`${stateCart[1].sizeSelected}`}
                                url={`/product/${stateCart[0].url}`} />
                            }
                            {
                                stateCart.length > 2 && <CartProduct 
                                image={`${stateCart[2].thumbnails[0]}`} 
                                title={`${stateCart[2].title}`} 
                                price={`${Module.AddCommaToNumber(stateCart[2].price)}`}
                                amount={`${stateCart[2].amountSelected}`}
                                size={`${stateCart[2].sizeSelected}`}
                                url={`/product/${stateCart[2].url}`} />
                            }
                            <div className="cart-side__total">
                                Tổng cộng <span>{`${Module.AddCommaToNumber(statePayments)} VND`}</span>
                            </div>
                            <div className="cart-side__direction">
                                <Button className="cart-side__direction" to="/payment" url="/payment" navlink orange>
                                    Thanh Toán
                                </Button>
                                <Button className="cart-side__direction" to="/payment" url="/sada" navlink>
                                    Thêm vào yêu thích
                                </Button>
                                <Button style={{width: "100%"}} onClick={FuncDeleteAllCart} className="cart-side__direction" button>
                                    Xóa giỏ hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

CartSide.defaultProps = {
    top: "30%",
    left: "auto",
    bottom: "auto",
    right: "0px"
}


export default CartSide;