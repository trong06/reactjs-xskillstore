import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faArchive, faTags, faNewspaper, faUsers, faPercentage, faWallet, faCode, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Seperate from '../../element/Seperate';
import Dropdown from '../../element/Dropdowns/Dropdown';
import BoxDropdown from '../../element/Dropdowns/BoxDropdown';
import ManagementMenu from '../Menu/ManagementMenu';
import Nav from '../../element/Nav/Nav';

class Management extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoHeight: false
        }

        this.managementSide = {
            production: {
                titleDropdown: "Production",
                titleContent: "Chi tiết sản phẩm",
                icon: faArchive,
                content: [
                    {
                        name: "Xem",
                        url: "/management-site/product"
                    },
                    {
                        name: "Tạo",
                        url: "/management-site/product/create"
                    }
                    
                ]
            },
            tag: {
                titleDropdown: "Tag",
                titleContent: "Chi tiết thể loại",
                icon: faTags,
                content: [
                    {
                        name: "Xem",
                        url: "/management-site/tag"
                    },
                    {
                        name: "Tạo",
                        url: "/management-site/tag/create"
                    }
                ]
            },
            promotion: {
                titleDropdown: "Promotion",
                titleContent: "Chi tiết khuyến mãi",
                icon: faPercentage,
                content: [
                    {
                        name: "Xem",
                        url: "/management-site/promotion"
                    },
                    {
                        name: "Tạo",
                        url: "/management-site/promotion/create"
                    }
                    
                ]
            },
            article: {
                titleDropdown: "Article",
                titleContent: "Chi tiết bài viết",
                icon: faNewspaper,
                content: [
                    {
                        name: "Xem",
                        url: "/management-site/article"
                    },
                    {
                        name: "Tạo",
                        url: "/management-site/article/create"
                    }
                    
                ]
            },
            purchased: {
                titleDropdown: "Purchased",
                titleContent: "Chi tiết đơn hàng",
                icon: faWallet,
                content: [
                    {
                        name: "Xem",
                        url: "/management-site/purchased"
                    }
                    
                ]
            },
            user: {
                titleDropdown: "Users",
                titleContent: "Chi tiết người dùng",
                icon: faUsers,
                content: [
                    {
                        name: "Xem",
                        url: "/management-site/user"
                    },
                    {
                        name: "Tạo",
                        url: "/management-site/user/create"
                    }
                    
                ]
            },
        }
    }

    componentDidMount() {
        const ManagementSideID = document.getElementById("managementSide");
        if(ManagementSideID.clientHeight >= document.body.clientHeight) {
            this.setState({autoHeight: false})
        }
        else {
            this.setState({autoHeight: true})
        }
    }

    render() {
        const { children } = this.props;
        return (
            <div className="management">
                <div style={{height: `${this.state.autoHeight ? "inherit" : "100vh"}`}} id="managementSide" className="management__side">
                    <h2 className="management__side__logo management--center">SB Ananas</h2>
                    <Nav path={`/`} icon={ faSignOutAlt } title="Store" />
                    <Seperate style={{borderColor: "rgba(255,255,255,.4)", borderWidth: "0.5px", margin: "15px 0"}} />
                    <Nav path={`/management-site`} icon={faTachometerAlt} title="Dashboard" />
                    <Seperate style={{borderColor: "rgba(255,255,255,.4)", borderWidth: "0.5px", margin: "15px 0"}} />
                    <BoxDropdown title="Interface">
                        <Dropdown 
                        titleDropdown={this.managementSide.production.titleDropdown} 
                        titleContent={this.managementSide.production.titleContent} 
                        dropdowns={this.managementSide.production.content} 
                        icon={this.managementSide.production.icon} />
                        <Dropdown 
                        titleDropdown={this.managementSide.tag.titleDropdown} 
                        titleContent={this.managementSide.tag.titleContent} 
                        dropdowns={this.managementSide.tag.content} 
                        icon={this.managementSide.tag.icon} />
                        <Dropdown 
                        titleDropdown={this.managementSide.article.titleDropdown} 
                        titleContent={this.managementSide.article.titleContent} 
                        dropdowns={this.managementSide.article.content} 
                        icon={this.managementSide.article.icon} />
                        <Dropdown 
                        titleDropdown={this.managementSide.user.titleDropdown} 
                        titleContent={this.managementSide.user.titleContent} 
                        dropdowns={this.managementSide.user.content} 
                        icon={this.managementSide.user.icon} />
                        <Dropdown 
                        titleDropdown={this.managementSide.promotion.titleDropdown} 
                        titleContent={this.managementSide.promotion.titleContent} 
                        dropdowns={this.managementSide.promotion.content} 
                        icon={this.managementSide.promotion.icon} />
                        <Dropdown 
                        titleDropdown={this.managementSide.purchased.titleDropdown} 
                        titleContent={this.managementSide.purchased.titleContent} 
                        dropdowns={this.managementSide.purchased.content} 
                        icon={this.managementSide.purchased.icon} />
                    </BoxDropdown>
                    <BoxDropdown title="Settings">
                        <Nav path={`/management-site/systemcolor`} icon={faCode} title="Color Code" />
                    </BoxDropdown>
                </div>
                <div className="management__main">
                    <ManagementMenu />
                    <div className="management__main__app">
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Management;