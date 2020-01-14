import React from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Table from '../../../components/element/Table/Table';
import Button from '../../../components/element/Button/Button';
import { MyArray } from '../../../modules/ForArray';
import Pagination from '../../../components/element/Pagination/Pagination';
import { goTo } from '../../../modules/GoTo';
import LoadingCircle from '../../../components/element/Loading/LoadingCircle';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class ManageProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            loading: false,
            pagination: {
                page: 0,
                onPage: 0,
                total: 0
            }
        }

        this.fields = [
            {name: "Name", width: "20%"},
            {name: "Tags", width: "10%"},
            {name: "Price", width: "10%"},
            {name: "Size", width: "15%"},
            {name: "Gender", width: "5%"},
            {name: "Vendor", width: "10%"},
            {name: "Status", width: "10%"},
            {name: "Created", width: "5%"},
            {name: "Future", width: "20%"}
        ]

        this.configHeaders = {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        }

        this.onGetMoreData = this.onGetMoreData.bind(this);
    }

    onGetMoreData(page, onPage) {
        return () => {
            this.setState({loading: true, products: []}, () => {
                Axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_ENDPOINT}/api/products?page=${page}&onpage=${onPage}`
                }).then(res => {
                    const { data } = res;
                    if(data.status !== "error") {
                        data.products.map((product) => {
                            this.setState({
                                products: [...this.state.products, {
                                    title: product.title,
                                    price: product.price,
                                    url: product.url,
                                    gender: product.gender,
                                    vendor: product.vendor,
                                    size: product.size,
                                    tags: MyArray.JSONParse(product.tags),
                                    status: product.status,
                                    created: product.created
                                }]
                            })
                        });
                        this.setState({ 
                            pagination: { page: data.page, onPage: data.onPage, total: data.total },
                            loading: false
                        }, //setState
                            () => goTo(this.state.pagination.page, "pagination", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`) //Callback
                        )
                    }
                    else {
                        window.alert(data.error);
                    }
                }).catch(err => {
                    window.alert(err)
                })
            })
        }
    }

    onDeleteProduct(id) {
        return () => {
            let answer = window.confirm("Bạn chắc chắn muốn xóa chứ?");
            if(answer) {
                this.setState({loading: true}, () => {
                    Axios({
                        method: "DELETE",
                        url: `${process.env.REACT_APP_API_ENDPOINT}/api/products/${id}`,
                        headers: this.configHeaders
                    }).then(res => {
                        const { data } = res;
                        if(data.status === "error") {
                            window.alert(data.msgVi);
                            this.setState({loading: false})
                        }
                        else {
                            window.alert("Xóa thành công");
                            const { pagination } = this.state;
                            this.onGetMoreData(pagination.page, pagination.onPage)(); //callback get data
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
        let locationSearch = window.location.search.split("&");
        let page = Number(locationSearch[0].split("=")[1]);
        // let onPage = locationSearch.length >= 2 ? Number(locationSearch[1].split("=")[1]) : 9;
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/products${window.location.search}`
            }).then((res) => {
                const { data } = res;
                if(data.status !== "error") {
                    data.products.map((product) => {
                        this.setState({
                            products: [...this.state.products, {
                                title: product.title,
                                price: product.price,
                                url: product.url,
                                gender: product.gender,
                                vendor: product.vendor,
                                size: product.size,
                                tags: MyArray.JSONParse(product.tags),
                                status: product.status,
                                created: product.created
                            }],
                        })
                    });
                    this.setState({ pagination: { page: data.page, onPage: data.onPage, total: data.total }, loading: false }, 
                        () => goTo(this.state.pagination.page, "pagination", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`))
                }
                else {
                    window.alert(data.error);
                    this.setState({loading: false})
                }
            }).catch((err) => {
                window.alert(err);
                this.setState({loading: false})
            })
        })
    }
    
    render() {
        // console.log(this.state)
        return (
            <Management>
                {
                    this.state.loading ? <LoadingStore /> : <div className="management-product-page">
                        <Box title="Products">
                            <Table>
                                <thead>
                                    <tr>
                                        {
                                            this.fields.map((field, index) => (
                                                <th style={{width: `${field.width}`}} key={`${index}-table`} className="table__field__key__child">{ field.name }</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.products.map((product,index) => (
                                            <tr key={`${index}_tbproduct`}>
                                                <td> <NavLink to={`${window.location.pathname}/edit/${product.url}`}> { product.title } </NavLink> </td>
                                                <td> asdsad </td>
                                                <td> { product.price } </td>
                                                <td> { product.size.join(",") } </td>
                                                <td> { product.gender === 0 ? "Nam" : "Nữ" } </td>
                                                <td> { product.vendor } </td>
                                                <td> { product.status ? "Còn hàng" : "Hết" } </td>
                                                <td> { product.created } </td>
                                                <td> 
                                                    <Button style={{color: "white"}} url={`/management-site/product/edit/${product.url}`} navlink><FontAwesomeIcon icon={faEdit} /></Button>
                                                    <Button onClick={ this.onDeleteProduct(product.url) }><FontAwesomeIcon icon={faTrash} /></Button> 
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            <div style={{textAlign: "right", marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <div style={{color: "#8a8a8a"}}>
                                    Trang {this.state.pagination.page} trong { Math.ceil(this.state.pagination.total/this.state.pagination.onPage) }
                                </div>
                                <Pagination 
                                onClick={this.onGetMoreData}
                                page={this.state.pagination.page}
                                onPage={this.state.pagination.onPage}
                                total={this.state.pagination.total}></Pagination>
                            </div>
                        </Box>
                    </div>
                }
            </Management>
        )
    }
}

export default ManageProductPage;