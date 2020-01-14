import React from 'react'
import LayoutMedium from '../components/layout/LayoutMedium'
import PortfolioSlideImage from '../components/element/PortfolioSlideImage';
import Seperate from '../components/element/Seperate';
import Button from '../components/element/Button/Button';
import FavoriteImg from '../images/favorite-heart-button.svg'
import {CollapseText} from '../components/element/Collapse/CollapseText';
import Store from '../components/layout/Common/Store';
import Axios from 'axios';
import Context from '../contexts/Context';
import InputGroup from '../components/element/Form/InputGroup';
import Group from '../components/element/Div/Group';
import Input from '../components/element/Form/Input';
import ErrorText from '../components/element/Text/ErrorText';
import Module from '../modules/Module';
import { Redirect } from 'react-router-dom';
import LoadingStore from '../components/element/Loading/LoadingStore';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            amount: 1,
            size: 32,
            errors: {
                amount: false,
                size: false
            },
            got: true,
            loading: false
        
        }

        this.ID_PRODUCT = this.props.match.params.id;
        this.onAmountStateChange = this.onAmountStateChange.bind(this);
        this.onSizeStateChange = this.onSizeStateChange.bind(this);
    }

    onAmountStateChange(event) {
        if(Number(event.target.value) > 15) {
            this.setState({errors : { amount: true, size: this.state.errors.size }})
            return;
        }
        this.setState({
            amount: Number(event.target.value),
            errors : { amount: false, size: this.state.errors.size }
        })
    }
    onSizeStateChange(event) {
        if(Number(event.target.value) > 43 || Number(event.target.value) < 32) {
            this.setState({errors : { amount: this.state.errors.amount, size: true }})
            return;
        }
        this.setState({
            size: Number(event.target.value),
            errors : { amount: this.state.errors.amount, size: false }
        })
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/products/${this.ID_PRODUCT}`
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi || "Sản phẩm không còn tồn tại");
                    this.setState({got: false, loading: false})
                }
                else {
                    const { product } = data;
                    this.setState({
                        product: product,
                        loading: false
                    }, () => {
                        document.getElementById("description-js").innerHTML = product.description
                        document.getElementById("information_product-js").innerHTML = product.infomation_production
                    })
                }
            }).catch(err => {
                window.alert(err);
                this.setState({
                    got: false,
                    loading: false
                })
            })
        })
    }

    render() {
        const { got, product, errors, size, amount, loading } = this.state;
        return (
            <Store>
                {
                    !got && <Redirect to="/error404" />
                }
                { loading && <LoadingStore /> }
                <Context.Consumer>
                    {({ FuncAddToCart }) => (
                        <LayoutMedium className="product-page">
                            <div className="product-page__images">
                                <PortfolioSlideImage images={product.images_detail} image={product.images_detail && product.images_detail[0]} />
                            </div>
                            <div className="product-page__detail">
                                <h1 className="product-page__detail__title"> {product.title} </h1>
                                <p className="product-page__detail__species">
                                    <span className="product-page__detail__species__code">Mã sản phẩm: <b> { product._id } </b></span>
                                    <span className="product-page__detail__species__status">Tình trạng: <b> {product.status ? "Còn hàng" : "Hết hàng"} </b></span>
                                </p>
                                <p className="product-page__detail__price"> {Module.AddCommaToNumber(product.price)} VND</p>
                                <Seperate  dashed/>
                                <p id="description-js" className="product-page__detail__para">
                                { product.description }
                                </p>
                                <Seperate dashed />
                                <br/>
                                <InputGroup group>
                                    <Group>
                                        <label><small>Số lượng</small> { errors.amount && <ErrorText> Không được vượt quá giới hạn </ErrorText> } </label>
                                        <Input onChange={this.onAmountStateChange} type="number" min="1" max="15" value={this.state.amount} square/>
                                    </Group>
                                    <Group>
                                        <label><small>Size</small> { errors.size && <ErrorText> Không được vượt quá giới hạn </ErrorText> } </label>
                                        {/* <Input onChange={this.onSizeStateChange} type="number" min="32" max="43" value={this.state.size} square/> */}
                                        <select onChange={this.onSizeStateChange} style={{width:"100%", padding: "9px", borderRadius: "5px", margin: "10px 0"}}>
                                            {
                                                product.size && product.size.map((e, i) => (
                                                    <React.Fragment key={`${i}-productpage-selecte-size`}>
                                                        <option> {e}</option>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </select>
                                    </Group>
                                </InputGroup>
                                <br />
                                <Seperate  dashed/>
                                <div className="product-page__detail__btn">
                                    <Button onClick={FuncAddToCart({...product, sizeSelected: size, amountSelected: amount})} style={{padding: "20px", width: "70%", marginRight: "5%"}}>Thêm vào giỏ hàng</Button>
                                    <Button style={{padding: "20px", width: "25%"}}>
                                        <img src={FavoriteImg} style={{width: "15px"}} />
                                    </Button>
                                    <Button
                                    url={`/payment`}
                                    style={{padding: "20px", width: "100%", marginTop: "30px", display: "block", textDecoration: "none", textAlign: "center"}} 
                                    navlink 
                                    orange>Mua ngay</Button>
                                </div>
                                <CollapseText id="information_product-js" title="thông tin sản phẩm">
                                    Thông tin sản phẩm
                                </CollapseText>
                                <Seperate  dashed/>
                                <CollapseText title="Bảo hành sản phẩm">
                                {
                                    product.guarantee
                                }
                                </CollapseText>
                                <Seperate  dashed/>
                            </div>
                        </LayoutMedium>
                    )}
                </Context.Consumer>
            </Store>
        )
    }
}

export default ProductPage;