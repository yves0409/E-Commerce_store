import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";
import Cartscreen from "./screens/Cartscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Profilescreen from "./screens/Profilescreen";
import Shippingscreen from "./screens/Shippingscreen";
import Paymentscreen from "./screens/Paymentscreen";
import PlaceOrderscreen from "./screens/PlaceOrderscreen";
import Orderscreen from "./screens/Orderscreen";
import UserListscreen from "./screens/UserListscreen";
import UserEditscreen from "./screens/UserEditscreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/shipping" component={Shippingscreen} />
          <Route path="/payment" component={Paymentscreen} />
          <Route path="/placeorder" component={PlaceOrderscreen} />
          <Route path="/order/:id" component={Orderscreen} />
          <Route path="/login" component={Loginscreen} />
          <Route path="/register" component={Registerscreen} />
          <Route path="/profile" component={Profilescreen} />
          <Route path="/product/:id" component={Productscreen} />
          <Route path="/cart/:id?" component={Cartscreen} />
          <Route path="/admin/userlist" component={UserListscreen} />
          <Route path="/admin/user/:id/edit" component={UserEditscreen} />
          <Route path="/" component={Homescreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
