import React from 'react';
import Axios from 'axios';
import Context from '../../contexts/Context';

class ProviderManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: JSON.parse(localStorage.getItem("cart")) || [],
            cartAmount: window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")).length : 0
        }
        //Authentication
        this.configHeaders =  { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` };
        //Create cart 
        window.localStorage.getItem("cart") || localStorage.setItem("cart", JSON.stringify([]));
        this.transportFee = 20000;
        //Bind
        this.AddToCart = this.AddToCart.bind(this);
        this.DeleteAllCart = this.DeleteAllCart.bind(this);
        this.DeleteOneCart = this.DeleteOneCart.bind(this);
        this.onHandlingPayments = this.onHandlingPayments.bind(this);
    }

    AddToCart(product) {
        return () => {
            //Get cart
            let cart = JSON.parse(localStorage.getItem("cart"));
            //Checking id
            let result = cart.find((item) => {
                return JSON.parse(item)._id === product._id;
            })
            if(result) {
                window.alert("Sản phẩm này đã tồn tại trong giỏ hàng, hãy chọn và thêm sản phẩm khác");
                return;
            }
            //Add to cart
            cart.push(JSON.stringify(product));
            //Push to localStorage from cart
            localStorage.setItem("cart", JSON.stringify(cart));
            //Count amount
            this.setState({
                cartAmount: JSON.parse(window.localStorage.getItem("cart")).length,
                cart: JSON.parse(localStorage.getItem("cart")) || []
            })
        }
    }

    DeleteAllCart() {
        //Restore cart
        window.localStorage.setItem("cart", JSON.stringify([]));
        //Restore state
        this.setState({
            cartAmount: JSON.parse(window.localStorage.getItem("cart")).length,
            cart: JSON.parse(localStorage.getItem("cart")) || []
        })
    }

    DeleteOneCart(id) {
        return () => {
            if(window.confirm("Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng ?")) {
                let cart;
                cart = 
                JSON.parse(window.localStorage.getItem("cart"))
                .map((e) => JSON.parse(e)) //JSON => Array[Object]
                .filter(e => e._id !== id) //Remove id === element._id
                .map(e => JSON.stringify(e));

                //Upload to localStorage and setState again
                window.localStorage.setItem("cart", JSON.stringify(cart));
                this.setState({
                    cart: cart,
                    cartAmount: cart.length
                });
            }
        }
    }

    onHandlingPayments(product, money, promotion, token) {
        return (event) => {
            event.preventDefault();
            const data = {
                products: product.map((e) =>  {
                    return {
                        id_product: e._id,
                        price: e.price,
                        amount: e.amountSelected
                    }
                }),
                promotion: promotion ? promotion.name : "",
                price: money - ((money * (promotion ? promotion.percent : 0)) / 100) + this.transportFee //transportFee
            }
            Axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/purchased`,
                data: data,
                headers: { Authorization: `Bearer ${token}` } || this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi);
                }
                else {
                    this.DeleteAllCart();
                    window.alert("Gửi đơn hàng thành công");
                }
            }).catch(err => {
                window.alert(err);
                console.log(err);
            })
        }
    }
    
    render() {
        let stateCart = [];
        let statePayments;
        let { cartAmount, cart } = this.state;
        stateCart = cart.length > 0 && cart.map(item => JSON.parse(item)); //Convert JSON => array[object]
        statePayments = stateCart ? stateCart.reduce((sum, item) => { return sum + (item.price * item.amountSelected) }, 0) : 0; // tính tiền //Counter money
        return (
            <Context.Provider value={{
                stateCartAmount: cartAmount, //state amount product on cart
                stateCart: stateCart, //state array cart from localStorage
                statePayments: statePayments, //state counter money //statePayments
                stateTransportFee: this.transportFee,

                FuncOnHandlingPayments: this.onHandlingPayments,
                FuncAddToCart: this.AddToCart, //Add a product to cart
                FuncDeleteAllCart: this.DeleteAllCart, //Delete all cart
                FuncDeleteOneCart: this.DeleteOneCart
            }}>
                {
                    this.props.children
                }
            </Context.Provider>
        )
    }
}

export default ProviderManagement;