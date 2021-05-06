import './components/App.css'
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/products/ProductDetails";
import Cart from "./components/products/Cart";
import LogIn from "./components/authentication/LogIn";
import Register from "./components/users/Register";
import Profile from "./components/users/Profile";
import UpdateProfile from "./components/users/UpdateProfile";
import Shipping from "./components/products/Shipping";
import Payment from "./components/products/Payment";
import PlaceOrder from "./components/products/PlaceOrder";
import OrderDetails from "./components/orders/OrderDetails";
import AdminHome from "./components/admin/AdminHome";
import DeleteUser from "./components/admin/DeleteUser";
import EditUser from "./components/admin/EditUser";
import Products from "./components/admin/Products";
import CreateProduct from "./components/admin/CreateProduct";
import DeleteProduct from "./components/admin/DeleteProduct";
import EditProduct from "./components/admin/EditProduct";
import Orders from "./components/admin/Orders";
import OrderDeliver from "./components/admin/OrderDeliver";
import AddReview from "./components/products/AddReviews";



const App = () => {
  return (
      <Router history={history}>
          <Header />
          <main className="pushDown">
              <Switch>
                  <Route path="/" component={HomePage} exact />
                  <Route path="/products/:id" component={ProductDetails} exact />
                  <Route path="/cart" component={Cart} exact />
                  <Route path="/checkout/shipping" component={Shipping} exact />
                  <Route path="/checkout/payment" component={Payment} exact />
                  <Route path="/checkout/placeorder" component={PlaceOrder} exact />
                  <Route path="/orders/:id" component={OrderDetails} exact />
                  <Route path="/admin/users/:id/delete" component={DeleteUser} exact />
                  <Route path="/admin/products/:id/delete" component={DeleteProduct} exact />
                  <Route path="/admin/users/:id/edit" component={EditUser} exact />
                  <Route path="/admin/products/:id/edit" component={EditProduct} exact />
                  <Route path="/users/register" component={Register} exact />
                  <Route path="/users/login" component={LogIn} exact />
                  <Route path="/users/:id" component={Profile} exact />
                  <Route path="/users/update/profile" component={UpdateProfile} exact />
                  <Route path="/admin" component={AdminHome} exact />
                  <Route path="/admin/products/create" component={CreateProduct} exact />
                  <Route path="/admin/products" component={Products} exact />
                  <Route path="/admin/orders" component={Orders} exact />
                  <Route path="/admin/orders/:id/deliver" component={OrderDeliver} exact />
                  <Route path="/products/:id/review" component={AddReview} exact />
              </Switch>
          </main>
          <Footer />
      </Router>
  )
};

export default App;
