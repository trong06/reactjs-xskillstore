import React from 'react';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Table from '../../../components/element/Table/Table';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import Pagination from '../../../components/element/Pagination/Pagination';
import { goTo } from '../../../modules/GoTo';

class ManagePurchasedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchased: [],
            pagination: {
                page: 0,
                onPage: 0,
                total: 0
            }
        }

        this.fields = [
            { name: "Mã đơn hàng", width:"10%" },
            { name: "Đơn hàng", width: "10%" },
            { name: "Tình trạng đơn hàng", width: "10%" },
            { name: "Ngày tạo đơn", width: "10%" },
            { name: "Khách hàng", width: "10%" },
            { name: "Giá", width: "10%" },
        ]
        this.configHeaders = { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` };
        this.onPagination = this.onPagination.bind(this);
    }

    onPagination(page, onPage) {
        return () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/purchased?page=${page}&onpage=${onPage}`,
                headers: this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi);
                }
                else {
                    this.setState({
                        purchased: data.purchased,
                        pagination: {
                            page: Number(data.page),
                            onPage: Number(data.onPage),
                            total: Number(data.total)
                        }
                    }, () => goTo(this.state.pagination.page, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`))
                }
            }).catch(err => {
                //Alert error to screen
                window.alert(err);
            })
        }
    }

    componentDidMount() {
        Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/purchased${window.location.search}`,
            headers: this.configHeaders
        }).then(res => {
            const { data } = res;
            if(data.status === "error") {
                window.alert(data.msgVi);
            }
            else {
                this.setState({
                    purchased: data.purchased,
                    pagination: {
                        page: Number(data.page),
                        onPage: Number(data.onPage),
                        total: Number(data.total)
                    }
                }, () => goTo(this.state.pagination.page, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`))
            }
        }).catch(err => {
            //Alert error to screen
            window.alert(err);
        })
    }
    
    render() {
        const { pagination } = this.state;
        return (
            <Management>
                <Box title="Danh sách đơn hàng yêu cầu">
                    <Table>
                        <thead>
                            <tr>
                                {
                                    this.fields.map((field, index) => (
                                        <th style={{width: `${field.width}`}} key={`${index}-managepurchasedpage-field`}> {field.name} </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.purchased && this.state.purchased.map((purchase, index) => (
                                    <tr key={`${index}-managepurchasedpage-value`}>
                                        <td> { purchase._id } </td>
                                        <td> <NavLink to={`/management-site/purchased/detail/${purchase._id}`}>Xem chi tiết đơn hàng</NavLink> </td>
                                        <td> { !purchase.verify && !purchase.cancel ? "Chưa xác nhận" : purchase.verify && !purchase.cancel ? "Đã xác nhận đơn hàng" : !purchase.verify && purchase.cancel ? "Đơn hàng bị hủy bỏ" : "" } </td>
                                        <td> { purchase.created.split("T")[0].split("-").reverse().join("-") + " - " + purchase.created.split("T")[1] } </td>
                                        <td> <NavLink to={`/management-site/purchased/detail/${purchase._id}`}>Xem thông tin khách hàng</NavLink> </td>
                                        <td> {purchase.price} VNĐ </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <div>
                        <Pagination 
                        onPage={pagination.onPage} 
                        page={pagination.page} 
                        total={pagination.total} 
                        onClick={this.onPagination} />
                    </div>
                </Box>
                <Box title="Danh sách đơn hàng đã xác nhận ở trang hiện tại" margin="15px 0">
                    <Table>
                        <thead>
                            <tr>
                                {
                                    this.fields.map((field, index) => (
                                        <th style={{width: `${field.width}`}} key={`${index}-managepurchasedpage-field`}> {field.name} </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.purchased && this.state.purchased.map((purchase, index) => (
                                    (purchase.verify && !purchase.cancel) && 
                                    <tr key={`${index}-managepurchasedpage-value`}>
                                        <td> { purchase._id } </td>
                                        <td> <NavLink to={`/management-site/purchased/detail/${purchase._id}`}>Xem chi tiết đơn hàng</NavLink> </td>
                                        <td> { !purchase.verify && !purchase.cancel ? "Chưa xác nhận" : purchase.verify && !purchase.cancel ? "Đã xác nhận đơn hàng" : !purchase.verify && purchase.cancel ? "Đơn hàng bị hủy bỏ" : "" } </td>
                                        <td> { purchase.created.split("T")[0].split("-").reverse().join("-") + " - " + purchase.created.split("T")[1] } </td>
                                        <td> <NavLink to={`/management-site/purchased/detail/${purchase._id}`}>Xem thông tin khách hàng</NavLink> </td>
                                        <td> {purchase.price} VNĐ </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Box>
                <Box title="Danh sách đơn hàng đã hủy ở trang hiện tại" margin="15px 0">
                    <Table>
                        <thead>
                            <tr>
                                {
                                    this.fields.map((field, index) => (
                                        <th style={{width: `${field.width}`}} key={`${index}-managepurchasedpage-field`}> {field.name} </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.purchased && this.state.purchased.map((purchase, index) => (
                                    (!purchase.verify && purchase.cancel) && 
                                    <tr key={`${index}-managepurchasedpage-value`}>
                                        <td> { purchase._id } </td>
                                        <td> <NavLink to={`/management-site/purchased/detail/${purchase._id}`}>Xem chi tiết đơn hàng</NavLink> </td>
                                        <td> { !purchase.verify && !purchase.cancel ? "Chưa xác nhận" : purchase.verify && !purchase.cancel ? "Đã xác nhận đơn hàng" : !purchase.verify && purchase.cancel ? "Đơn hàng bị hủy bỏ" : "" } </td>
                                        <td> { purchase.created.split("T")[0].split("-").reverse().join("-") + " - " + purchase.created.split("T")[1] } </td>
                                        <td> <NavLink to={`/management-site/purchased/detail/${purchase._id}`}>Xem thông tin khách hàng</NavLink> </td>
                                        <td> {purchase.price} VNĐ </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Box>
            </Management>
        )
    }
}

export default ManagePurchasedPage;