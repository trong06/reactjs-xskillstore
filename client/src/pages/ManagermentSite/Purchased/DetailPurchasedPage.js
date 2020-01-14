import React from 'react';
import Axios from 'axios';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Module from '../../../modules/Module';
import Alert from '../../../components/element/Alert/Alert';
import Table from '../../../components/element/Table/Table';
import { NavLink, Redirect } from 'react-router-dom';
import Input from '../../../components/element/Form/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faRecycle } from '@fortawesome/free-solid-svg-icons';
import InputGroup from '../../../components/element/Form/InputGroup';

class DetailPurchasedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            verify: false,
            cancel: false,
            created: "",
            user: {},
            message: "",
            price: 0,
            promotion: "",
            got: true,
            updated: false
        }

        this.detailFields = [
            {name: "Mã sản phẩm", width: "10%"},
            {name: "Số lượng", width: "10%"},
            {name: "Đơn giá sản phẩm", width: "10%"},
            {name: "Tổng tiền sản phẩm", width: "10%"}
        ]

        this.ID_PURCHASED = this.props.match.params.id;
        this.configHeaders = { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` };

        this.onVerifyStateChange = this.onVerifyStateChange.bind(this);
        this.onCancelStateChange = this.onCancelStateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onVerifyStateChange(){
        this.setState({verify: true, cancel: false})
    }

    onCancelStateChange() {
        this.setState({verify: false, cancel: true})
    }

    onSubmit(event) {
        event.preventDefault();
        Axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/purchased/${this.ID_PURCHASED}`,
            headers: this.configHeaders,
            data: {
                verify: this.state.verify,
                cancel: this.state.cancel
            }
        }).then(res => {
            const { data } = res;
            if(data.status === "error") {
                window.alert(data.msgVi || "Không thể gửi xác nhận đơn hàng, vui lòng kiểm tra lại");
            }
            else {
                window.alert("Phê duyệt đơn hàng thành công");
                this.setState({
                    updated: true
                })
            }
        }).catch(err => {
            window.alert(err);
        })
    }

    componentDidMount() {
        Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/purchased/${this.ID_PURCHASED}`
        }).then(res => {
            const { data } = res;
            if(data.status === "error") {
                window.alert(data.msgVi || "Đơn hàng này không tồn tại");
                this.setState({got: false});
            }
            else {
                let { products, user, promotion, price, verify, cancel } = data.purchased;
                this.setState({
                    products: products,
                    user: JSON.parse(user),
                    promotion: promotion ? JSON.parse(promotion) : promotion,
                    price: price,
                    verify: verify,
                    cancel: cancel
                })
            }
        }).catch(err => {
            window.alert(err);
            this.setState({got: false});
        })
    }

    render() {
        let total_money = 0;
        const { user, products, promotion, price, verify, cancel } = this.state;
        products.map((product) => {
            total_money += (product.price * product.amount);
        })
        return (
            <Management>
                { this.state.updated && <Redirect to="/management-site/purchased" /> }
                { !this.state.got && <Redirect to="/error404" /> }
                <Box title="Phê duyệt đơn hàng">
                    <form onSubmit={this.onSubmit} className="detail-purchased-page">
                        <InputGroup group>
                            <div>
                                <FontAwesomeIcon onClick={this.onVerifyStateChange} className={`detail-purchased-page__icon ${verify && !cancel ? "detail-purchased-page--checked" : "" }`} icon={faCheck} />
                            </div>
                            <div>
                                <FontAwesomeIcon onClick={this.onCancelStateChange} className={`detail-purchased-page__icon ${!verify && cancel ? "detail-purchased-page--checked" : "" }`} icon={faRecycle} />
                            </div>
                        </InputGroup>
                        <Input type="submit" value="Xác nhận" violet square/>
                    </form>
                </Box>
                <Box title={`Chi tiết đơn hàng [${this.ID_PURCHASED}]`} margin="15px 0">
                    <Table>
                        <thead>
                        {
                            <tr>
                            {
                                this.detailFields.map((detail, index) => (
                                    <th style={{width: `${detail.width}`}} key={`${index}-detailpurchasedpage-fielddetail`}> { detail.name } </th>
                                ))
                            }
                            </tr>
                        }
                        </thead>
                        <tbody>
                        {
                            products.map((product, index) => (
                                <tr key={`${index}-detailpurchasedpage-valuedetail`}>
                                    <td> <NavLink to={`/product/${product.id_product}`}>{ product.id_product }</NavLink> </td>
                                    <td> {product.amount} </td>
                                    <td> {product.price} VNĐ</td>
                                    <td> {product.amount * product.price} VNĐ</td>
                                </tr>
                            ))
                        }
                        </tbody>
                        <thead>
                        {
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Coupon: { promotion ? `${promotion.name} - ${promotion.percent}%` : "Không có" } </th>
                                <th>Tổng tiền: {price} VND {promotion && <sub>({total_money} * ({promotion.percent}%/100%))</sub>}</th>
                            </tr>
                        }
                        </thead>
                    </Table>
                </Box>
                <Box title="Thông tin khách hàng" margin="15px 0">
                    <Alert warning> <b>Chú ý:</b> Nhân viên ghi đúng chính xác thông tin khi giao hàng khi gửi đi</Alert>
                    <p><b>Mã khách hàng: </b> {user._id} </p>
                    <p><b>Tên khách hàng: </b> {`${user.firstname} ${user.lastname}`} </p>
                    <p><b>Email: </b> {user.email} </p>
                    <p><b>Phone: </b> {user.number_phone} </p>
                    <p><b>Address: </b> {user.address} </p>
                </Box>
            </Management>
        )
    }
}

export default DetailPurchasedPage;