import React, { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
//Components
import Product from "../components/Product";
import Spinners from "../components/Spinners";
import Notification from "../components/Notification";
//bootstrap
import { Row, Col } from "react-bootstrap";

const Homescreen = () => {
  const dispatch = useDispatch();

  //productList is defined in the redux store
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Spinners />
      ) : error ? (
        <Notification variant="danger">{error}</Notification>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homescreen;
