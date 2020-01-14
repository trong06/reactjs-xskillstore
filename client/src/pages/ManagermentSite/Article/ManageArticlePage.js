import React from 'react';
import Management from '../../../components/layout/Common/Management';
import Table from '../../../components/element/Table/Table';
import Box from '../../../components/element/Box/Box';
import Axios from 'axios';
import { goTo } from '../../../modules/GoTo';
import Button from '../../../components/element/Button/Button';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Pagination from '../../../components/element/Pagination/Pagination';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class ManageArticlePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            pagination: {
                page: 0,
                onPage: 0,
                total: 0
            },
            loading: false
        }

        this.configHeaders = {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        }

        this.fields = [
            { name: "Tên bài viết", width: "30%" },
            { name: "Đường dẫn", width: "20%" },
            { name: "Ảnh đại diện", width: "10%" },
            { name: "Thể loại", width: "20%" },
            { name: "Tính năng", width: "20%" },
            
        ]

        this.onDelete = this.onDelete.bind(this);
        this.onPagination = this.onPagination.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/articles${window.location.search}`
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi || "Không thể lấy được dữ liệu");
                    this.setState({loading: false});
                }
                else {
                    this.setState({
                        articles: data.articles,
                        pagination: {
                            page: Number(data.page),
                            onPage: Number(data.onPage),
                            total: Number(data.total)
                        },
                        loading: false
                    }, 
                    () => goTo( this.state.pagination.page, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}` ))
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false});
            })
        })
    }

    onPagination(page, onPage) {
        return () => {
            this.setState({loading: true}, () => {
                Axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_ENDPOINT}/api/articles?page=${page}&onpage=${onPage}`
                }).then(res => {
                    const { data } = res;
                    if(data.status === "error") {
                        window.alert(data.msgVi || "Không thể lấy được dữ liệu");
                        this.setState({loading: false});
                    }
                    else {
                        this.setState({
                            articles: data.articles,
                            pagination: {
                                page: Number(data.page),
                                onPage: Number(data.onPage),
                                total: Number(data.total)
                            },
                            loading: false
                        }, 
                        () => goTo( this.state.pagination.page, "page", `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}` ))
                    }
                }).catch(err => {
                    window.alert(err);
                    this.setState({loading: false});
                })
            })
        }
    }

    onDelete(id) {
        return () => {
            let answer = window.confirm("Bạn chắc chắn muốn xóa ?");
            if(answer) {
                this.setState({loading: true}, () => {
                    Axios({
                        method: "DELETE",
                        url: `${process.env.REACT_APP_API_ENDPOINT}/api/articles/${id}`,
                        headers: this.configHeaders
                    }).then(res => {
                        const { data } = res;
                        if(data.status === "error") {
                            window.alert(data.msgVi);
                            this.setState({loading: false})
                        }
                        else {
                            window.alert(data.msgVi);
                            this.setState({loading: false})
                            window.location.reload();
                        }
                    }).catch(err => {
                        window.alert(`Xóa thất bại ${err}`);
                        this.setState({loading: false})
                    })
                })
            }
        }
    }

    render() {
        const { page, onPage, total } = this.state.pagination;
        const { loading } = this.state;
        return (
            <Management>
                { loading && <LoadingStore /> }
                <Box title="Danh sách bài viết">
                    <Table>
                        <thead>
                            <tr>
                                {
                                    this.fields.map((field, index) => (
                                        <th key={`${index}-managearticlepage`} style={{width: `${field.width}`}}>
                                            { field.name }
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    this.state.articles && this.state.articles.map((article, index) => (
                                        <tr key={`${index}managearticlepage-article`}>
                                            <td>
                                                <NavLink to={`/management-site/article/edit/${article.url}`}>{ article.title }</NavLink>
                                            </td>
                                            <td> { article.url } </td>
                                            <td> <img style={{width: "30px", height: "30px"}} src={ article.thumbnail } /></td>
                                            <td> #{ article.tags } </td>
                                            <td>
                                                <Button style={{color: "white"}} url={`/management-site/article/edit/${article.url}`} navlink><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button onClick={this.onDelete(article.url)}><FontAwesomeIcon icon={faTrash} /></Button> 
                                            </td>
                                        </tr>
                                    ))
                                }
                        </tbody>
                    </Table>
                    <div>
                        <Pagination page={page} onPage={onPage} total={total} onClick={this.onPagination} />
                    </div>
                </Box>
            </Management>
        )
    }
}

export default ManageArticlePage;