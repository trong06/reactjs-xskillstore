import React from 'react'
import Carousel from '../components/element/Carousel';
import Banner from '../components/element/Banner';
import Layout_md from '../components/layout/LayoutMedium';
import CardInSideText from '../components/element/CardInSideText';
import Portfolio from '../components/element/Portfolio';
import PortfolioSlide from '../components/element/PortfolioSlide';
import Poster from '../components/element/Poster';
import CardNews from '../components/element/CardNews';
import Button from '../components/element/Button/Button';
import ModalImage from '../components/element/ModalImage';
import Store from '../components/layout/Common/Store';
import Axios from 'axios';
import MaintenanceIMG from '../images/maintenance-1.jpg'
import ThumbnailIMG from '../images/thumbnail.png'
import SaleIMG from '../images/sale.jpg'
import BannerIMG from '../images/banner.jpg'
import LoadingStore from '../components/element/Loading/LoadingStore';

function HomePageCategory(props) {
    const {title, shows} = props;
    return (
        <Portfolio title_portfolio={title} shows={shows}>
            <CardInSideText 
            style={{height: "250px"}} 
            url={`/product-list/gender=${0}`}
            title="GIÀY NAM" 
            // image="https://ananas.vn/wp-content/uploads/catalogy-1.jpg"
            image={ThumbnailIMG}
            // categories={[
            //     {url: "/", name: "New Arrivals"},
            //     {url: "/", name: "Best Seller"},
            //     {url: "/", name: "Sale Off"},
            // ]} 
            />
            <CardInSideText 
            style={{height: "250px"}}
            url={`/product-list`}
            title="Danh Mục" 
            image={ThumbnailIMG}
            // categories={[
            //     {url: "/", name: "Basas"},
            //     {url: "/", name: "Vintas"},
            //     {url: "/", name: "Urbas"},
            //     {url: "/", name: "Pattas"}
            // ]} 
            />
            <CardInSideText 
            style={{height: "250px"}}
            url={`/product-list/gender=${1}`}
            title="GIÀY Nữ" 
            // image="https://ananas.vn/wp-content/uploads/catalogy-2.jpg"
            image={ThumbnailIMG}
            // categories={[
            //     {url: "/", name: "New Arrivals"},
            //     {url: "/", name: "Best Seller"},
            //     {url: "/", name: "Sale Off"},
            // ]} 
            />
        </Portfolio>
    )
}

function HomepagePortfolioProduct(props) {

}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            PortfolioSlide_shows: 4,
            HomePageCategory_shows: 3,
            articles: [],
            products: [],
            loading: false
        }

        // this.carousel_content = [
        //     {url: "/", image: "https://ananas.vn/wp-content/uploads/desktop_home1.jpg"},
        //     {url: "/", image: "https://ananas.vn/wp-content/uploads/BF_banner-web-home.jpg"}
        // ]

        this.banner_carousel = [
            {
                url: "/", 
                image: ThumbnailIMG,
                title: "Lorem Ipsum is simply dummy text",
                paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            },
            {
                url: "/", 
                image: ThumbnailIMG,
                title: "Lorem Ipsum is simply dummy text",
                paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            },
            {
                url: "/", 
                image: ThumbnailIMG,
                title: "Lorem Ipsum is simply dummy text",
                paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            
            }
        ]

        this.onScroll = this.onScroll.bind(this);
    }

    onScroll() {
        if(window.innerWidth > 768) {
            this.setState({
                PortfolioSlide_shows: 4,
                HomePageCategory_shows: 3
            })
        }
        else if(window.innerWidth <= 768 && window.innerWidth > 425) {
            this.setState({
                PortfolioSlide_shows: 3,
                HomePageCategory_shows: 1
            })
        }
        else if(window.innerWidth <= 425) {
            this.setState({
                PortfolioSlide_shows: 2,
                HomePageCategory_shows: 1
            })
        }
        else {
            
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.onScroll, false);
        this.setState({loading: true}, () => {
            Axios.all([
                Axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_ENDPOINT}/api/articles`
                }),
                Axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_ENDPOINT}/api/products`
                })
            ]).then(Axios.spread((...response) => {
                const { articles } = response[0].data;
                const { products } = response[1].data;
                this.setState({
                    products: products,
                    articles: articles,
                    loading: false
                })
            })).catch(err => {
                window.alert(err);
                this.setState({
                    loading: false
                })
            }) 
        })
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false)
    }

    render() {
        const { articles, products, loading } = this.state;
        return (
            <Store>
                { loading && <LoadingStore /> }
                <div className="homepage">
                    {/* <NotificationCarousel content={this.carousel_notice_content} /> */}
                    <Carousel content={articles} />
                    <Layout_md>
                        <div className="homepage__banner">
                            <div>
                                <Carousel style={{height: "300px"}} content={this.banner_carousel} auto={false} detail/>
                            </div>
                            <Banner 
                            title="Ưu đãi lớn - Xem Ngay" 
                            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" 
                            image={SaleIMG}
                            url={"/maintenance"} />
                        </div>
                        <HomePageCategory title="Danh mục mua hàng" shows={this.state.HomePageCategory_shows} />
                        <PortfolioSlide title="sản phẩm mới nhất" shows={this.state.PortfolioSlide_shows} products={this.state.products} />
                    </Layout_md>
                    <Poster image={BannerIMG} url="/banner" />
                    <Layout_md>
                        <div className="homepage__detail">
                            <div className="homepage__detail__ins">
                                <Portfolio title_portfolio="Instagram (Đang cập nhật)" shows={3}>
                                    <ModalImage image={MaintenanceIMG} />
                                    <ModalImage image={MaintenanceIMG} />
                                    <ModalImage image={MaintenanceIMG} />
                                    <ModalImage image={MaintenanceIMG} />
                                    <ModalImage image={MaintenanceIMG} />
                                    <ModalImage image={MaintenanceIMG} />
                                </Portfolio>
                            </div>
                            <div className="homepage__detail__news">
                                <Portfolio title_portfolio="Tin tức & Bài viết" shows={2}>
                                    {
                                        articles && articles.map((e, i) => (
                                            <CardNews
                                            key={`${i}homepage-new-articles`}
                                            url={`/article/${e.url}`}
                                            title={e.title} 
                                            para={"Đang được cập nhật thêm"}
                                            image={e.thumbnail} />
                                        ))
                                    }
                                </Portfolio>
                            </div>
                        </div>
                    </Layout_md>
                    <div style={{textAlign: "center", marginBottom: "40px"}}>
                        <Button style={{width: "30%"}} name="Muốn xem thêm"/>
                    </div>
                </div>
            </Store>
        )
    }
}


export default HomePage;