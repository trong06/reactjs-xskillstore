import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './scss/App.css'
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/element/Route/PrivateRoute';
import MainManagement from './pages/ManagermentSite';
import ProviderManagement from './components/Contexts/ProviderManagement';
// import context from './contexts/Context';
import SystemColorPage from './pages/ManagermentSite/Systems/SystemColorPage';
import ManageProductPage from './pages/ManagermentSite/Product/ManageProductPage';
import ProductCreatePage from './pages/ManagermentSite/Product/ProductCreatePage';
import ProductUpdatePage from './pages/ManagermentSite/Product/ProductUpdatePage';
import ManageTagPage from './pages/ManagermentSite/Tag/ManageTagPage';
import CreateTagPage from './pages/ManagermentSite/Tag/CreateTagPage';
import UpdateTagPage from './pages/ManagermentSite/Tag/UpdateTagPage';
import Error404Page from './pages/Error404Page';
import ManageArticlePage from './pages/ManagermentSite/Article/ManageArticlePage';
import CreateArticlePage from './pages/ManagermentSite/Article/CreateArticlePage';
import UpdateArticlePage from './pages/ManagermentSite/Article/UpdateArticlePage';
import ManageUserPage from './pages/ManagermentSite/User/ManageUserPage';
import CreateUserPage from './pages/ManagermentSite/User/CreateUserPage';
import ResetPassUserPage from './pages/ManagermentSite/User/ResetPassUserPage';
import UpdateUserPage from './pages/ManagermentSite/User/UpdateUserPage';
import ManagePromotionPage from './pages/ManagermentSite/Promotion/ManagePromotionPage';
import CreatePromotionPage from './pages/ManagermentSite/Promotion/CreatePromotionPage';
import UpdatePromotionPage from './pages/ManagermentSite/Promotion/UpdatePromotionPage';
import ManagePurchasedPage from './pages/ManagermentSite/Purchased/ManagePurchasedPage';
import DetailPurchasedPage from './pages/ManagermentSite/Purchased/DetailPurchasedPage';
import ArticlePage from './pages/ArticlePage';
import PaymentPage from './pages/PaymentPage';
import Logined from './components/element/Route/Logined';
import MaintenancePage from './pages/MaintenancePage';
import FindOrdersPage from './pages/FindOrdersPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterRoute: false
    }
    this.onMasterRoute = this.onMasterRoute.bind(this);
  }

  onMasterRoute() {
    const URL = window.location.pathname;
    let result = URL.indexOf("management-site") !== -1;
    if(result) {
        this.setState({masterRoute: true})
    }
    else {
        this.setState({masterRoute: false})
    }
  }

  componentDidMount() {
    this.onMasterRoute();
  }

  render() {
    return (
      <ProviderManagement>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/product-list" component={ProductListPage} />
              <Route path="/product/:id" component={ProductPage} />
              <Route path="/article/:id" component={ArticlePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/error404" component={Error404Page} />
              <Route path="/maintenance" component={MaintenancePage} />
              <Route path="/find-orders" component={FindOrdersPage} />
              <Logined path="/payment" component={PaymentPage} />
              <PrivateRoute path="/management-site" exact component={MainManagement} />
              <PrivateRoute path="/management-site/systemcolor" exact component={SystemColorPage} />
              <PrivateRoute path="/management-site/product" exact component={ManageProductPage} />
              <PrivateRoute path="/management-site/product/create" exact component={ProductCreatePage} />
              <PrivateRoute path="/management-site/product/edit/:id" exact component={ProductUpdatePage} />
              <PrivateRoute path="/management-site/tag/" exact component={ManageTagPage} />
              <PrivateRoute path="/management-site/tag/create" exact component={CreateTagPage} />
              <PrivateRoute path="/management-site/tag/edit/:id" exact component={UpdateTagPage} />
              <PrivateRoute path="/management-site/article" exact component={ManageArticlePage} />
              <PrivateRoute path="/management-site/article/create" exact component={CreateArticlePage} />
              <PrivateRoute path="/management-site/article/edit/:id" exact component={UpdateArticlePage} />
              <PrivateRoute path="/management-site/user" exact component={ManageUserPage} />
              <PrivateRoute path="/management-site/user/create" exact component={CreateUserPage} />
              <PrivateRoute path="/management-site/user/resetpass/:id" exact component={ResetPassUserPage} />
              <PrivateRoute path="/management-site/user/edit/:id" exact component={UpdateUserPage} />
              <PrivateRoute path="/management-site/promotion" exact component={ManagePromotionPage} />
              <PrivateRoute path="/management-site/promotion/create" exact component={CreatePromotionPage} />
              <PrivateRoute path="/management-site/promotion/edit/:id" exact component={UpdatePromotionPage} />
              <PrivateRoute path="/management-site/purchased/" exact component={ManagePurchasedPage} />
              <PrivateRoute path="/management-site/purchased/detail/:id" exact component={DetailPurchasedPage} />
              <Route path="*" component={Error404Page} />
            </Switch>
          </Router>
        </div>
      </ProviderManagement>
    );
  }
}

export default App;
