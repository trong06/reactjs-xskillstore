import React from 'react';
import Store from '../components/layout/Common/Store';
import LayoutMedium from '../components/layout/LayoutMedium';
import Input from '../components/element/Form/Input';
import InputGroup from '../components/element/Form/InputGroup';
import Button from '../components/element/Button/Button';
import Box from '../components/element/Box/Box';
import Process from '../components/element/Process/Process';
import Axios from 'axios';
import Module from '../modules/Module';
import { NavLink } from 'react-router-dom';
import CardProduct from '../components/element/CardProduct';
import {goTo} from '../modules/GoTo';

class FindOrdersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codeOrders: null,
            purchased: null,
            productsSelected: []
        }

        this.onFindOrders = this.onFindOrders.bind(this);
        this.onCodeOrdersStateChange = this.onCodeOrdersStateChange.bind(this);
    }

    onCodeOrdersStateChange(event) {
        this.setState({codeOrders: event.target.value === "" ? null : event.target.value});
    }

    onFindOrders(id) {
        return () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/purchased/${id}`
            }).then(res => {
                //Response data
                const { data } = res;
                //Check status response
                if(data.status === "error") {
                    window.alert(data.msgVi || "Không tìm thấy đơn hàng này");
                    this.setState({purchased: null, productsSelected: []});
                    goTo("product", "product", `/find-orders`)
                }
                else {
                    //Get purchased now
                    this.setState({
                        purchased: data.purchased
                    }, () => {
                        goTo("product", "product", `?${this.state.purchased._id}`);
                        const { products } = this.state.purchased;
                        //Reset productsSelected before new products was add
                        this.setState({productsSelected: []}, () => {
                            //Filter product selected of purchased (orders) and setState to Show
                            products.map((e) => {
                                //Request get list product of purchased
                                Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/products/${e.id_product}`)
                                .then(res => {
                                    if(res.data.status !== "error") {
                                        this.setState({
                                            productsSelected: [...this.state.productsSelected, res.data.product]
                                        })
                                    }
                                    else {
                                        this.setState({
                                            productsSelected: [...this.state.productsSelected, null]
                                        })
                                    }
                                })
                                .catch(err => {
                                    this.setState({
                                        productsSelected: [...this.state.productsSelected, null]
                                    })
                                })
                            })
                        })
                    })
                }
            }).catch(err => {
                window.alert(err);
            })
        }
    }

    componentDidMount() {
        let id = window.location.search.split("?")[1];
        if(id) {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/purchased/${id}`
            }).then(res => {
                //Response data
                const { data } = res;
                //Check status response
                if(data.status === "error") {
                    window.alert(data.msgVi || "Không tìm thấy đơn hàng này");
                    this.setState({purchased: null, productsSelected: []})
                }
                else {
                    //Get purchased now
                    this.setState({
                        purchased: data.purchased
                    }, () => {
                        const { products } = this.state.purchased;
                        //Reset productsSelected before new products was add
                        this.setState({productsSelected: []}, () => {
                            //Filter product selected of purchased (orders) and setState to Show
                            products.map((e) => {
                                //Request get list product of purchased
                                Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/products/${e.id_product}`)
                                .then(res => {
                                    if(res.data.status !== "error") {
                                        this.setState({
                                            productsSelected: [...this.state.productsSelected, res.data.product]
                                        })
                                    }
                                    else {
                                        this.setState({
                                            productsSelected: [...this.state.productsSelected, null]
                                        })
                                    }
                                })
                                .catch(err => {
                                    this.setState({
                                        productsSelected: [...this.state.productsSelected, null]
                                    })
                                })
                            })
                        })
                    })
                }
            }).catch(err => {
                window.alert(err);
            })
        }
    }

    render() {
        //Get state
        const { codeOrders, purchased, productsSelected } = this.state;
        return (
            <Store>
                <LayoutMedium className="find-orders-page">
                    <div className="find-orders-page__box">
                        <h1 className="find-orders-page__box__title">Kiểm tra đơn hàng của bạn</h1>
                        <InputGroup>
                            <Input onChange={this.onCodeOrdersStateChange} value={codeOrders} width="100%" type="text" placeholder="Nhập mã đơn hàng của bạn" square/>
                            <Button onClick={this.onFindOrders(codeOrders)} style={{width: "100%"}} type="submit">Tìm kiếm ngay</Button>
                        </InputGroup>
                        <div className="find-orders-page__box__status">
                            <div>
                                <h3 className="find-orders-page__box__status__title">1. Quá trình xác nhận đơn hàng</h3>
                                <Process 
                                    ratio={purchased && purchased !== null ? 
                                        !purchased.verify && !purchased.cancel ? 50 :
                                        purchased.verify && !purchased.cancel ? 100 :
                                        !purchased.verify && purchased.cancel ? 100 : 
                                        20 : 20
                                    } 
                                    margin="5px 0"
                                    danger= {purchased && purchased !== null ? !purchased.verify && purchased.cancel ? true : false : false}
                                    success= {purchased && purchased !== null ? purchased.verify && !purchased.cancel ? true : false : false}
                                        >
                                    <small>
                                    { 
                                        purchased && purchased !== null ? 
                                        !purchased.verify && !purchased.cancel ? "Đang chờ xác nhận" :
                                        purchased.verify && !purchased.cancel ? "Đơn hàng đã được xác nhận, đang giao" :
                                        !purchased.verify && purchased.cancel ? "Đơn hàng bị từ chối, sẽ được liên hệ lý do" : 
                                        "Chưa xác nhận" : "Chưa tìm thấy đơn hàng"
                                    }
                                    </small>
                                </Process>
                                <h5>
                                    a. Mã đơn hàng: 
                                    { purchased && purchased !== null ? ` ${purchased._id}` : "" } 
                                </h5>
                                <h5>
                                    b. Mã mặt hàng đã đặt: 
                                    {purchased && purchased !== null ?
                                    purchased.products.map((item, i) => (
                                        <NavLink target="_blank" to={`/product/${item.id_product}`} key={`${i}-findOrdersPage-product`}> {item.id_product} </NavLink>
                                    ))
                                    : ""} 
                                </h5>
                                <h5>c. Tổng giá: {purchased && purchased !== null ? Module.AddCommaToNumber(purchased.price) : "0"} VND </h5>
                                <h5>d. Khuyến mãi: {purchased && purchased !== null ? purchased.promotion !== "" ? JSON.parse(purchased.promotion).name : "" : "Không có"} </h5>
                            </div>
                            <div>
                                <h3 className="find-orders-page__box__status__title">2. Mặt hàng đã đặt</h3>
                                <div className="find-orders-page__box__status__products">
                                    {
                                        productsSelected && productsSelected.length > 0 && productsSelected.map((item, i) => (
                                            item !== null && <CardProduct
                                            key={`${i}-findOrdersPage-product-found`}
                                            title={`${item.title}`}
                                            price={null} 
                                            dropPrice={null} 
                                            name_color={""}
                                            images={item.thumbnails}
                                            url={`/product/${item.url}`} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutMedium>
            </Store>
        )
    }
}

export default FindOrdersPage;