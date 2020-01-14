import React from 'react';
import Axios from 'axios';
import Store from '../components/layout/Common/Store';
import LayoutMedium from '../components/layout/LayoutMedium';
import Seperate from '../components/element/Seperate';
import Context from '../contexts/Context';
import BoxCart from '../components/element/Cart/BoxCart';
import CardProductPayment from '../components/element/Cart/CardProductPayment';
import Alert from '../components/element/Alert/Alert';
import Button from '../components/element/Button/Button';
import BoxO from '../components/element/Box/BoxO';
import Search from '../components/element/Form/Search';
import Input from '../components/element/Form/Input';
import InputGroup from '../components/element/Form/InputGroup';
import ErrorText from '../components/element/Text/ErrorText';
import Module from '../modules/Module';
import LoadingStore from '../components/element/Loading/LoadingStore';

class PaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coupon: "",
            promotion: null,
            errors: {
                promotion: "",
            },
            loading: false
        }

        this.onPromotionStateChange = this.onPromotionStateChange.bind(this);
        this.onCheckPromotion = this.onCheckPromotion.bind(this);
    }

    onPromotionStateChange(event) {
        this.setState({
            promotion: event.target.value ? event.target.value.toUpperCase() : null,
            errors: {
                ...this.state.errors,
                promotion: null
            }
        });
    }

    onCheckPromotion() {
        this.setState({loading: true},() => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/promotion/${this.state.promotion}`
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({
                        errors: {
                            ...this.state.errors,
                            promotion: data.msgVi
                        },
                        coupon: "",
                        loading: false
                    })
                }
                else {
                    const { promotion } = data;
                    this.setState({
                        coupon: promotion,
                        loading: false
                    })
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false})
            })
        })
    }

    render() {
        const { errors, coupon, loading } = this.state;
        return (
            <Store>
                <Context.Consumer>
                    {({stateCart, statePayments, stateTransportFee, FuncOnHandlingPayments, FuncDeleteAllCart, FuncDeleteOneCart}) => (
                        <LayoutMedium>
                            { loading && <LoadingStore /> }
                            <form onSubmit={FuncOnHandlingPayments(stateCart, statePayments, coupon, window.localStorage.getItem("access_token"))} className="payment-page">
                                <div style={{gridColumn: `${stateCart ? "inherit" : "1 / span 2"}`}} className="payment-page__cart">
                                    <h1 className="payment-page__cart__title">Giỏ hàng của bạn</h1>
                                    <Seperate/>
                                    {
                                        stateCart ? <div className="payment-page__cart__products">
                                            <BoxCart title="Giỏ hàng">
                                                <Alert danger> Hãy nhớ chọn <b>KÍCH THƯỚC</b> và <b>SỐ LƯỢNG</b> sản phẩm trước khi bấm thanh toán </Alert>
                                            {
                                                stateCart && stateCart.map((item, index) => (
                                                        <CardProductPayment
                                                        key={`${index}-paymentpage-productpayment`}
                                                        onDeleteOneCart={FuncDeleteOneCart}
                                                        id={item._id}
                                                        image={item.thumbnails[0]}
                                                        url={`/product/${item.url}`}
                                                        title={item.title}
                                                        price={Module.AddCommaToNumber(item.price)}
                                                        total_money={Module.AddCommaToNumber(item.price * item.amountSelected)}
                                                        amount={item.amountSelected}
                                                        size={item.sizeSelected}
                                                        status={item.status} />
                                                ))
                                            }
                                            </BoxCart>
                                            <div style={{display: "flex", justifyContent: "space-between", margin: "15px 0"}}>
                                                <Button onClick={FuncDeleteAllCart} style={{width: "25%"}}>
                                                    Xóa hết
                                                </Button>
                                                <Button 
                                                style={{width: "25%",display: "block", textDecoration: "none", textAlign: "center"}} 
                                                navlink>
                                                    Quay lại mua hàng
                                                </Button>
                                            </div>
                                        </div> : <p className="payment-page__cart__notice">Giỏ hàng của bạn trống, hãy chọn sản phẩm cho mình</p>
                                    }
                                </div>
                                <div className="payment-page__order">
                                    {
                                        stateCart && <BoxO title="đơn hàng" stickyTop>
                                            <div className="payment-page__order__coupon">
                                                <small style={{display: "block"}}> Mã khuyến mãi của bạn là gì ? </small>
                                                { errors.promotion && <ErrorText> {errors.promotion} </ErrorText> }
                                                <Input onChange={this.onPromotionStateChange} value={this.state.promotion} type="search" placeholder="Nhập mã khuyến mãi" square/>
                                                <Button onClick={this.onCheckPromotion} type="button" onChange={this.onCheckPromotion}>ÁP DỤNG</Button>
                                            </div>
                                            <Seperate dashed/>
                                            <div className="payment-page__order__info">
                                                <p className="payment-page__order__info__price">Đơn hàng: <span className="payment-page__order__info__price__child"> {Module.AddCommaToNumber(statePayments)} VND</span></p>
                                                <p className="payment-page__order__info__promotion">Giảm <span className="payment-page__order__info__promotion__child"> {coupon ? Module.AddCommaToNumber(Math.floor((statePayments * (coupon.percent))/100)) : 0} VND</span></p>
                                                <p className="payment-page__order__info__promotion">Phí vận chuyển <span className="payment-page__order__info__promotion__child"> {Module.AddCommaToNumber(stateTransportFee)} VND</span></p>
                                            </div>
                                            <Seperate dashed/>
                                            <p className="payment-page__order__total">Tạm tính <span className="payment-page__order__total__child"> {Module.AddCommaToNumber(stateTransportFee + statePayments - (coupon ? Math.round((statePayments * (coupon.percent))/100) : 0))} VND</span> </p>
                                            <Input type="submit" value="THANH TOÁN" padding="20px 15px" cursor={"pointer"} orange square/>
                                        </BoxO>
                                    }
                                </div>
                            </form>
                        </LayoutMedium>
                    )}
                </Context.Consumer>
            </Store>
        )
    }
}

export default PaymentPage;