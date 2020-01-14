import React from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Table from '../../../components/element/Table/Table';
import Button from '../../../components/element/Button/Button';
import Pagination from '../../../components/element/Pagination/Pagination';
import { goTo } from '../../../modules/GoTo';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class ManagePromotionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promotions: [],
            pagination: {
                page: 0,
                onPage: 0,
                total: 0
            },
            loading: false
        }
        this.fields = [
            { name: "Mã khuyến mãi", width: "20%" },
            { name: "Phần Trăm %", width: "20%" },
            { name: "Ngày hết hạn", width: "20%" },
            { name: "Trạng thái", width: "20%" },
            { name: "Tính năng", width: "20%" }
        ]
        this.configHeaders = { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` };
        this.onGetMoreData = this.onGetMoreData.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onGetMoreData(page, onPage) {
        return () => {
            this.setState({loading: true}, () => {
                Axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_ENDPOINT}/api/promotion?page=${page}&onpage=${onPage}`
                }).then(res => {
                    const { data } = res;
                    if(data.status === "error" && data.code === 404) {
                        window.alert(data.msgVi); //Lỗi phân trang
                        this.setState({loading: false})
                    }
        
                    if(data.status === "error" && data.code !== 404) {
                        window.alert(data.msgVi || "Lấy dữ liệu thất bại"); //Lỗi lấy dữ liệu
                        this.setState({loading: false})
                    }
                    else {
                        this.setState({
                            promotions: data.promotions,
                            pagination: {
                                page: Number(data.page),
                                onPage: Number(data.onPage),
                                total: Number(data.total)
                            },
                            loading: false
                        }, () => goTo(this.state.pagination.page, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`))
                    }
                }).catch(err => {
                    window.alert(err);
                    this.setState({loading: false})
                })
            })
        }
    }

    onDelete(id) {
        return () => {
            let answer = window.confirm("Bạn chắc chắn muốn xóa mã khuyến mãi này");
            if(answer) {
                this.setState({loading: true}, () => {
                    Axios({
                        method: "DELETE",
                        url: `${process.env.REACT_APP_API_ENDPOINT}/api/promotion/${id}`,
                        headers: this.configHeaders
                    }).then(res => {
                        const { data } = res;
                        if(data.status === "error") {
                            window.alert(data.msgVi || "Mã khuyến mãi này không tồn tại để xóa hoặc xảy ra lỗi");
                            this.setState({loading: false})
                        }
                        else {
                            window.alert("Xóa thành công");
                            window.location.reload();
                            this.setState({loading: false})
                        }
                    }).catch(err => {
                        window.alert(err);
                        this.setState({loading: false})
                    })
                })
            }
        }
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/promotion${window.location.search}`
            }).then(res => {
                const { data } = res;
                if(data.status === "error" && data.code === 404) {
                    window.alert(data.msgVi); //Lỗi phân trang
                    this.setState({loading: false})
                }
                if(data.status === "error" && data.code !== 404) {
                    window.alert(data.msgVi || "Lấy dữ liệu thất bại"); //Lỗi lấy dữ liệu
                    this.setState({loading: false})
                }
                else {
                    this.setState({
                        promotions: data.promotions,
                        pagination: {
                            page: Number(data.page),
                            onPage: Number(data.onPage),
                            total: Number(data.total)
                        },
                        loading: false
                    }, () => goTo(this.state.pagination.page, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`))
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false})
            })
        })
    }

    render() {
        const { loading } = this.state;
        return (
            <Management>
                { loading && <LoadingStore /> }
                <Box title="Danh sách khuyến mãi đã tạo">
                    <Table>
                        <thead>
                            <tr>
                            {
                                this.fields.map((field, index) => (
                                    <th style={{width: `${field.width}`}} key={`${index}-managepromotionpage-field`}> {  field.name} </th>
                                ))
                            }
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.promotions && this.state.promotions.map((promotion, index) => (
                                <tr key={`${index}-managepromotionpage-value`}>
                                    <td> { promotion.name } </td>
                                    <td> { promotion.percent } %</td>
                                    <td> { promotion.expiry_date } </td>
                                    <td> { promotion.status ? "Đang sử dụng" : "Hết hạn" } </td>
                                    <td>
                                    <Button style={{color: "white"}} url={`/management-site/promotion/edit/${promotion._id}`} navlink><FontAwesomeIcon icon={faEdit} /></Button>
                                    <Button onClick={this.onDelete(promotion._id)}><FontAwesomeIcon icon={faTrash} /></Button> 
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    <div style={{textAlign: "right", marginTop: "15px"}}>
                        <Pagination
                        onClick={this.onGetMoreData}
                        page={this.state.pagination.page}
                        onPage={this.state.pagination.onPage}
                        total={this.state.pagination.total} />
                    </div>
                </Box>
            </Management>
        )
    }
}

export default ManagePromotionPage;