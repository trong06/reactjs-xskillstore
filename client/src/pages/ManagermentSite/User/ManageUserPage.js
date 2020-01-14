import React from 'react';
import Axios from 'axios';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Table from '../../../components/element/Table/Table';
import Button from '../../../components/element/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faKey } from '@fortawesome/free-solid-svg-icons';
import config from '../config/config';
import { goTo } from '../../../modules/GoTo';
import Pagination from '../../../components/element/Pagination/Pagination';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class ManageUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            pagination: {
                page: 0,
                onPage: 0,
                total: 0
            },
            loading: false
        }
        this.configHeaders = {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        };
        
        this.fields = [
            { name: "Username", width: "10%" },
            { name: "Firstname", width: "15%" },
            { name: "Lastname", width: "5%" },
            { name: "Address", width: "20%" },
            { name: "Email", width: "10%" },
            { name: "Number Phone", width: "10%" },
            { name: "Permission", width: "10%" },
            { name: "Tính năng", width: "20%" }
        ]

        this.onGetMoreData = this.onGetMoreData.bind(this);
    }

    onGetMoreData(page, onPage) {
        return () => {
            this.setState({loading: true}, () => {
                Axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_ENDPOINT}/api/users?page=${page}&onpage=${onPage}`,
                    headers: this.configHeaders
                }).then(res => {
                    const { data } = res;
                    if(data.status === "error") {
                        window.alert(data.msgVi || "Lỗi không lấy được dữ liệu người dùng từ máy chủ");
                        this.setState({loading: false});
                    }
                    else {
                        const { users, page, onPage, total } = data;
                        this.setState({
                            users: users,
                            pagination: {
                                page: Number(page),
                                onPage: Number(onPage),
                                total: Number(total)
                            },
                            loading: false
                        }, () => goTo(this.state.page, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`))
                    }
                }).catch(err => {
                    window.alert(err);
                    this.setState({loading: false})
                })
            })
        }
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/users${window.location.search}`,
                headers: this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi || "Lỗi không lấy được dữ liệu người dùng từ máy chủ");
                    this.setState({loading: false})
                }
                else {
                    const { users, page, onPage, total } = data;
                    this.setState({
                        users: users,
                        pagination: {
                            page: Number(page),
                            onPage: Number(onPage),
                            total: Number(total)
                        },
                        loading: false
                    }, () => goTo(this.state.page, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`))
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
                <Box title="Danh sách người dùng">
                    <Table>
                        <thead>
                            <tr>
                                {
                                    this.fields.map((field, index) => (
                                        <th style={{width: `${field.width}`}} key={`${index}-manageuserpage`}> { field.name } </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users && this.state.users.map((user, index) => (
                                    <tr key={`${index}-manageuserpage-list`}>
                                        <td> { user.username } </td>
                                        <td> { user.firstname } </td>
                                        <td> { user.lastname } </td>
                                        <td> { user.address } </td>
                                        <td> { user.email } </td>
                                        <td> { user.number_phone } </td>
                                        <td> { user.permission } </td>
                                        <td>
                                        <Button style={{color: "white"}} url={`/management-site/user/resetpass/${user._id}`} navlink><FontAwesomeIcon icon={faKey} /></Button>
                                            <Button 
                                            onClick={
                                                () => window.alert("Cảnh báo đây là thông tin cá nhân của người dùng")
                                            } 
                                            style={{color: "white"}} 
                                            url={`/management-site/user/edit/${user._id}`} 
                                            navlink>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                            <Button onClick={() => window.alert("Chưa được phát triển")}><FontAwesomeIcon icon={faTrash} /></Button> 
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

export default ManageUserPage;