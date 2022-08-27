import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ListingCard from "./components/ListingCard";

function Products({ products }) {
  console.log(products);
  return (
    <div>
      {products.length != 0 && (
        <Container>
          <Row>
            {products.map((product) => {
              return (
                <Col xs={6} md={3}>
                  <ListingCard product={product} />
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Products;
