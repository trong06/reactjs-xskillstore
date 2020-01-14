import React from 'react'
import LayoutMedium from '../components/layout/LayoutMedium'
import {CollapseText, CollapseTextElement} from '../components/element/Collapse/CollapseText'
import TextOption from '../components/element/TextOption';
import PosterImg from '../images/desktop_productlist.jpg';
import CardProduct from '../components/element/CardProduct';
import Store from '../components/layout/Common/Store';
import Axios from 'axios';
import Module from '../modules/Module';
import { goTo } from '../modules/GoTo';
import Input from '../components/element/Form/Input';
import InputGroup from '../components/element/Form/InputGroup';
import Group from '../components/element/Div/Group';
import Button from '../components/element/Button/Button';
import PaginationCustom from '../components/element/Pagination/PaginationCustom';
import Alert from '../components/element/Alert/Alert';
import LoadingStore from '../components/element/Loading/LoadingStore';
import BannerProductListIMG from '../images/banner-productlist.png';

class ProductListPage extends React.Component {
    constructor(props) {
        super(props);

        this.collapse_data = {
            status: [
                {id: 1, title: "Còn hàng", changed: true},
                {id: 0, title: "Hết hàng"}
            ],
            data_size: [
                {id: 32, title: 32},
                {id: 33, title: 33},
                {id: 34, title: 34},
                {id: 35, title: 35},
                {id: 36, title: 36},
                {id: 37, title: 37},
                {id: 38, title: 38},
                {id: 39, title: 39},
                {id: 40, title: 40},
                {id: 41, title: 41},
                {id: 42, title: 42},
                {id: 43, title: 43},
            ]
        }

        this.state = {
            products: [],
            pagination: {
                page: 0,
                onPage: 0,
                total: 0
            },
            filter: {
                gender: [0,1],
                min_price: 0,
                max_price: 90000000,
                size: [], //32,33,34,35,36,37,38,39,40,41,42,43 ...this.collapse_data.data_size.map(e => e.id)
                status: [0,1],
                tags: []
            },
            gender: {
                all: true,
                male: false,
                female: false
            },
            query: window.location.search,
            loading: false
        }

        this.onPagination = this.onPagination.bind(this);
        this.onActivedGenderChange = this.onActivedGenderChange.bind(this);
        this.onMinPriceStateChange = this.onMinPriceStateChange.bind(this);
        this.onMaxPriceStateChange = this.onMaxPriceStateChange.bind(this);
        this.onApplyPriceToFilter = this.onApplyPriceToFilter.bind(this);
        this.onFilters = this.onFilters.bind(this);
    }

    onPagination(page, onPage) {
        return () => {
            let query = "";
            let { filter } = this.state;
            query += `?page=${page}&onpage=${onPage}`;
            query += `&min_price=${filter.min_price}&max_price=${filter.max_price}`;
            query += `&gender=${filter.gender.length > 1 ? filter.gender.join(",") : filter.gender.length !== 0 ? filter.gender[0] : ""}`;
            query += `&size=${filter.size.length > 1 ? filter.size.join(",") : filter.size.length !== 0 ? filter.size[0] : ""}`;
            query +=`&status=${filter.status.length > 1 ? filter.status.join(",") : filter.status.length !== 0 ? filter.status[0] : ""}`
            this.setState({loading: true}, () => {
                Axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_ENDPOINT}/api/products${query}`
                }).then(res => {
                    const { data } = res;
                    if(data.status === "error") {
                        window.alert(data.msgVi || "Không lấy được dữ liệu");
                        this.setState({loading: false})
                    }
                    else {
                        const { products, onPage, page, total, found } = data;
                        this.setState({
                            products: products,
                            query: query,
                            pagination: {
                                page: Number(page),
                                onPage: Number(onPage),
                                total: Number(found)
                            },
                            loading: false
                        }, goTo(query, "query", query));
                    }
                }).catch(err => {
                    window.alert(err);
                    this.setState({loading: false});
                })
            })
        }
    }

    onActivedGenderChange(id, callback) {
        //1 = all
        //2 = male
        //3 = female
        return() => {
            this.setState({
                gender: 
                id === 1 ? {all: true, male: false, female: false} : 
                id === 2 ? {all: false, male: true, female: false } :
                id === 3 ? {all: false, male: false, female: true} : { all: true, male: false, female: false }
            }, callback)
        }
    }

    onMinPriceStateChange(event) {
        this.setState({
            filter: {...this.state.filter, min_price: Number(event.target.value)}
        });
    }

    onMaxPriceStateChange(event) {
        this.setState({
            filter: {...this.state.filter, max_price: Number(event.target.value)}
        });
    }

    onApplyPriceToFilter() {
        const { min_price, max_price, gender, size, status} = this.state.filter;
        this.onFilters(min_price, max_price, gender, size, status, "price")();
    }

    onFilters(min, max, gender, size, status, special) {
        return (event) => {
            var conditions = this.state.filter;
            const { filter } = this.state;
            //Check min
            if(special === "price") {
                if(min && min >= 0 && min < filter.max_price) {
                    conditions.min_price = min;
                }
                else {
                    conditions.min_price = min;
                }
            }
            else {
                conditions.min_price = filter.min_price
            }
            //Check max
            if(special === "price") {
                if(max && max <= filter.max_price && max > min) {
                    conditions.max_price = max;
                }
                else {
                    conditions.max_price = min;
                }
            }
            else {
                conditions.max_price = filter.max_price
            }
            //Check gender
            if(special === "gender") {
                if(typeof gender === "string") {
                    let temp = gender.split(",").map(e => Number(e));
                    if((temp[0] === 0 || temp[0] === 1) && (temp[1] === 0 || temp[1] === 1)) {
                        conditions.gender = gender;
                    }
                }
                else if(typeof gender === "number" && Number(gender) !== "NaN") {
                    if(gender === 0) {
                        conditions.gender = [gender];
                    }
                    if(gender === 1) {
                        conditions.gender = [gender];
                    }
                }
                else {
                    conditions.gender = [0,1]
                }
            }
            else {
                conditions.gender = filter.gender;
            }
            //check size
            if(special === "size") {
                if(size) {
                    conditions.size = [...filter.size].indexOf(Number(size)) === -1 ? //Conditions add or move
                    [...filter.size, size] :  //Add
                    [...filter.size].filter(e => e !== size); //Remove
                }
                else {
                    conditions.size = size;
                }
            }
            else {
                conditions.size = filter.size
            }
            //check status
            if(special === "status") {
                if(status === 0 || status === 1) {
                    conditions.status = [...filter.status].indexOf(Number(status)) === -1 ?
                    [...filter.status, status] :  //Add
                    [...filter.status].filter(e => e !== status) //Remove
                }
                else {
                    conditions.status = status;
                }
            }
            else {
                conditions.status = filter.status
            }
            this.setState({
                filter: conditions
            }, () => {
                let query = "";
                let { filter } = this.state;
                query += `?page=${this.state.pagination.page}&onpage=${this.state.pagination.onPage}`;
                query += `&min_price=${filter.min_price}&max_price=${filter.max_price}`;
                query += `&gender=${filter.gender.length > 1 ? filter.gender.join(",") : filter.gender.length !== 0 ? filter.gender[0] : ""}`;
                query += `&size=${filter.size.length > 1 ? filter.size.join(",") : filter.size.length !== 0 ? filter.size[0] : ""}`;
                query +=`&status=${filter.status.length > 1 ? filter.status.join(",") : filter.status.length !== 0 ? filter.status[0] : ""}`
                this.setState({loading: true}, () => {
                    Axios({
                        method: "GET",
                        url: `${process.env.REACT_APP_API_ENDPOINT}/api/products${query}`
                    }).then(res => {
                        const { data } = res;
                        if(data.status === "error") {
                            window.alert(data.msgVi || "Không lấy được dữ liệu");
                            this.setState({loading: false});
                        }
                        else {
                            const { products, page, onPage, found } = data;
                            this.setState({
                                products: products,
                                query: query,
                                pagination: {
                                    page: Number(page),
                                    onPage: Number(onPage),
                                    total: Number(found)
                                },
                                loading: false
                            }, goTo(query, "query", query));
                        }
                    }).catch(err => {
                        window.alert(err);
                        this.setState({loading: false});
                    })
                })
            });
        }
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/products${this.state.query}`
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi || "Lấy dữ liệu thất bại");
                    this.setState({loading: false})
                }
                else {
                    const { products, page, onPage, total, found, status, size, gender, min_price, max_price } = data;
                    this.setState({
                        products: products,
                        pagination: {
                            page: Number(page),
                            onPage: Number(onPage),
                            total: Number(found) //Filterd
                        },
                        filter: {
                            gender: gender,
                            min_price: min_price,
                            max_price: max_price,
                            size: size, //32,33,34,35,36,37,38,39,40,41,42,43 ...this.collapse_data.data_size.map(e => e.id)
                            status: status,
                            tags: []
                        },
                        gender: {
                            all: gender.filter(e => e === 0 || e === 1).length === [0,1].length ? true : false,
                            male: gender.length > 0 && gender.length < 2 && gender[0] === 0 ? true : false,
                            female: gender.length > 0 && gender.length < 2 && gender[0] === 1 ? true : false
                        },
                        query: window.location.search,
                        loading: false
                    })
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false})
            });
        })
    }

    render() {
        const { filter, pagination, products, loading } = this.state;
        return (
            <Store>
                { loading && <LoadingStore /> }
                <LayoutMedium className="product-list">
                    <div className="product-list__side">
                        <div className="product-list__side__option">
                            <TextOption filter={filter} onClick={this.onActivedGenderChange(1, this.onFilters(filter.min_price, filter.max_price, [0,1], filter.size, filter.status, "gender"))} actived={this.state.gender.all}>Tất cả</TextOption>
                            <TextOption filter={filter} onClick={this.onActivedGenderChange(2, this.onFilters(filter.min_price, filter.max_price, 0, filter.size, filter.status, "gender"))} actived={this.state.gender.male}>Nam</TextOption>
                            <TextOption filter={filter} onClick={this.onActivedGenderChange(3, this.onFilters(filter.min_price, filter.max_price, 1, filter.size, filter.status, "gender"))} actived={this.state.gender.female}>Nữ</TextOption>
                        </div>
                        <div className="product-list--separate"></div>
                        <CollapseText 
                        title="Trạng thái"
                        >
                            {
                                this.collapse_data.status.map((item,i) => (
                                    <CollapseTextElement 
                                    onFilters={
                                        this.onFilters(
                                            filter.min_price, 
                                            filter.max_price, 
                                            filter.gender, 
                                            filter.size, 
                                            item.id,
                                            "status")
                                    }
                                    key={`${i}-collapse-text`} 
                                    inline={false} 
                                    color={item.color ? item.color : null}
                                    active={filter.status.find(e => e === item.id) === 0 || filter.status.find(e => e === item.id) === 1 ? true : false}> 
                                        {item.title} 
                                    </CollapseTextElement>
                                ))
                            }
                        </CollapseText>
                        <div className="product-list--separate"></div>
                        <CollapseText 
                        title="kích thước" inline>
                            {
                                this.collapse_data.data_size.map((item, i) => (
                                    <CollapseTextElement 
                                    onFilters={
                                        this.onFilters(
                                            filter.min_price,
                                            filter.max_price,
                                            filter.gender,
                                            item.id,
                                            filter.status,
                                            "size")}
                                    key={`${i}-collapse-text`} 
                                    inline={true} 
                                    color={item.color ? item.color : null}
                                    active={filter.size.find(e => e === item.id) ? true : false}> 
                                        {item.title} 
                                    </CollapseTextElement>
                                ))
                            }
                        </CollapseText>
                        <div className="product-list--separate"></div>
                        <CollapseText title="giá">
                            <InputGroup group>
                                <Group>
                                    <label><small>Từ: </small> {Module.AddCommaToNumber(filter.min_price)} </label>
                                    <Input onChange={this.onMinPriceStateChange} type="range" min="0" max="20000000" value={filter.min_price} step="10000" square/>
                                </Group>
                                <Group>
                                    <label><small>Đến: </small> {Module.AddCommaToNumber(filter.max_price)} </label>
                                    <Input onChange={this.onMaxPriceStateChange} type="range" min="50000000" max="90000000" value={filter.max_price} step="10000" square/>
                                </Group>
                            </InputGroup>
                            <Button type="button" onClick={this.onApplyPriceToFilter} style={{display: "block",width: "100%"}}>Áp dụng</Button>
                        </CollapseText>
                    </div>
                    <div className="product-list__main">
                        <img src={BannerProductListIMG} className="product-list__main__image" />
                        <div className="product-list__main__products">
                            {
                                products.length > 0 ? products.map((item,index) => (
                                    <CardProduct key={`${index}productlist`} 
                                    title={item.title} 
                                    price={Module.AddCommaToNumber(item.price)} 
                                    status="New Arrivals"
                                    dropPrice={Module.AddCommaToNumber(item.dropPrice)}
                                    images={item.thumbnails}
                                    url={`/product/${item.url}`}
                                    favorite >Mua Ngay</CardProduct>
                                )) : <Alert style={{gridColumn: "1 / span 3", textAlign: "center"}} danger> KHÔNG TÌM THẤY BÀI VIẾT NÀO </Alert>
                            }
                        </div>
                        {
                            products.length !== 0 && <PaginationCustom 
                            onClick={this.onPagination} 
                            onPage={pagination.onPage} 
                            page={pagination.page} 
                            total={pagination.total} />
                        }
                    </div>
                </LayoutMedium>
            </Store>
        )
    }
}

export default ProductListPage;