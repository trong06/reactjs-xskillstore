import React from 'react';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Input from '../../../components/element/Form/Input';
import Module from '../../../modules/Module';
import Table from '../../../components/element/Table/Table';
import Axios from 'axios';
import Button from '../../../components/element/Button/Button';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorText from '../../../components/element/Text/ErrorText';
import { Redirect } from 'react-router-dom';
import Pagination from '../../../components/element/Pagination/Pagination';
import { goTo } from '../../../modules/GoTo';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class ManageTagPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            url: "",
            description: "",
            tags: [],
            errors: {},
            pagination: {
                page: 0,
                onPage: 0,
                total: 0
            },
            created: false,
            loading: false
        }

        this.fields = [
            { name: "Tên [Name]", width: "25%" },
            { name: "Đường dẫn [URL]", width: "25%" },
            { name: "Miêu tả [DESCRIPTION]", width: "25%" },
            { name: "Tính năng [FUTURE]", width: "25%" },
        ]

        this.configHeaders = {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        }

        this.onTitleStateChange = this.onTitleStateChange.bind(this);
        this.onUrlStateChange = this.onUrlStateChange.bind(this);
        this.onDescriptionStateChange = this.onDescriptionStateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onGetMoreTags = this.onGetMoreTags.bind(this);
    }

    onTitleStateChange(event) {
        this.setState({
            name: event.target.value,
            url: Module.ConvertURL(event.target.value)
        })
    }
    onUrlStateChange(event) {
        this.setState({
            url: Module.ConvertURL(event.target.value)
        })
    }
    onDescriptionStateChange(event) {
        this.setState({
            description: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({loading: true}, () => {
            Axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/tags`,
                data: {
                    name: this.state.name,
                    url: this.state.url,
                    description: this.state.description
                },
                headers: this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({
                        errors: data.errors,
                        loading: false
                    });
                }
                else {
                    window.alert("Tạo thành công");
                    this.setState({
                        name: "",
                        url: "",
                        description: "",
                        created: true,
                        loading: false
                    });
                    window.location.reload();
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false});
            })
        })
    }

    onDelete(id) {
        return () => {
            let answer = window.confirm("Bạn chắc chắn muốn xóa thể loại này ?");
            if(answer) {
                this.setState({loading: true}, () => {
                    Axios({
                        method: "DELETE",
                        url: `${process.env.REACT_APP_API_ENDPOINT}/api/tags/${id}`,
                        headers: this.configHeaders
                    }).then(res => {
                        const { data } = res;
                        if(data.status === "error") {
                            window.alert(data.msgVi);
                            this.setState({loading: false})
                        }
                        else {
                            window.alert("Xóa thành công");
                            this.setState({loading: false})
                            window.location.reload(); //Gửi request lại bằng componentDidMount
                        }
                    }).catch(err => {
                        window.alert(err);
                        this.setState({loading: false})
                    })
                })
            }
        }
    }

    onGetMoreTags(page, onPage) {
        return () => {
            this.setState({loading: true}, () => {
                Axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_ENDPOINT}/api/tags?page=${page}&onpage=${onPage}`
                }).then(res => {
                    const { data } = res;
                    if(data.status === "error") {
                        window.alert(data.msgVi) || window.alert("Lỗi không thể lấy dữ liệu từ thể loại");
                        this.setState({loading: false});
                    }
                    else {
                        this.setState({
                            tags: data.tags,
                            pagination: {
                                page: Number(data.page),
                                onPage: Number(data.onPage),
                                total: Number(data.total_tags)
                            },
                            loading: false
                        }, () => goTo(this.state.page || 1, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`))
                    }
                }).catch(err => {
                    window.alert(err);
                    this.setState({loading: false});
                })
            })
        }
    }

    componentDidMount() {
        let { page, onPage } = this.state.pagination;
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/tags${window.location.search}`
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi) || window.alert("Lỗi không thể lấy dữ liệu từ thể loại");
                    this.setState({loading: false})
                }
                else {
                    this.setState({
                        tags: data.tags,
                        pagination: {
                            page: Number(data.page),
                            onPage: Number(data.onPage),
                            total: Number(data.total_tags)
                        },
                        loading: false
                    }, () => goTo(this.state.page || 1, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`))
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false});
            })
        })
    }

    render() {
        const { loading } = this.state;
        return (
            <Management>
                {
                    // this.state.created && <Redirect to={`/management-site/tag/edit/${this.state.url}`} />
                }
                { loading && <LoadingStore /> }
                <div className="manage-tag-page">
                    <form onSubmit={this.onSubmit} className="manage-tag-page__header">
                        <div>
                            <Box title="Quick create">
                                <Input onChange={this.onTitleStateChange} value={this.state.name} type="text" placeholder="Tên tiêu đề thể loại" square />
                                <ErrorText> {(this.state.errors && this.state.errors.name) && this.state.errors.name.msgVi} </ErrorText>
                                <Input onChange={this.onUrlStateChange} value={this.state.url} type="text" placeholder="Đường dẫn thể loại" square />
                                <ErrorText> {(this.state.errors && this.state.errors.url) && this.state.errors.url.msgVi} </ErrorText>
                                <Input onChange={this.onDescriptionStateChange} value={this.state.description} type="text" placeholder="Miêu tả thể loại" square />
                                <Input type="submit" value="Tạo Thể loại" violet style={{cursor: "pointer"}} square />
                            </Box>
                        </div>
                        <div>
                            <Box title="Bản xem trước">
                                <p><b style={{color: "#4e73df"}}>Tiêu đề: </b> {this.state.title} </p>
                                <p><b style={{color: "#4e73df"}}>Đường dẫn: </b> {this.state.url} </p>
                                <p><b style={{color: "#4e73df"}}>Miêu tả: </b> {this.state.description} </p>
                            </Box>
                        </div>
                    </form>
                    <div className="manage-tag-page__main">
                        <Box title="Danh sách thể loại">
                            <Table>
                                <thead>
                                    <tr>
                                    {
                                        this.fields.map((field, index) => (
                                            <th key={`${index}-tb-manage-tag-page`} style={{width: `${field.width}`}} > {field.name} </th>
                                        ))
                                    }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tags && this.state.tags.map((tag, index) => (
                                            <tr>
                                                <td> {tag.name} </td>
                                                <td> {tag.url} </td>
                                                <td> {tag.description} </td>
                                                <td>
                                                    <Button style={{color: "white"}} url={`/management-site/tag/edit/${tag.url}`} navlink><FontAwesomeIcon icon={faEdit} /></Button>
                                                    <Button onClick={this.onDelete(tag.url)}><FontAwesomeIcon icon={faTrash} /></Button> 
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            <div style={{color: "#8a8a8a"}}> Hiển thị ({this.state.pagination.onPage}) Trang {this.state.pagination.page} / Tổng {Math.ceil(this.state.pagination.page/this.state.pagination.total)} </div>
                            <div style={{textAlign: "center", marginTop: "20px"}}>
                                <Pagination 
                                onClick={this.onGetMoreTags} 
                                page={this.state.pagination.page} 
                                onPage={this.state.pagination.onPage}  
                                total={this.state.pagination.total}/>
                            </div>
                        </Box>
                    </div>
                </div>
            </Management>
        )
    }
}

export default ManageTagPage;