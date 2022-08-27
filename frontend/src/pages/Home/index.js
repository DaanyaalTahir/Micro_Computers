import React, { useState, useEffect } from "react";
import Axios from "axios";

import Products from "../../components/Products";

import "./Home.scss";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/items/?featured_status=True`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log({ ...err });
      });
  }, []);

  return (
    <div className="Home">
      <div className="headline_cont background_grey">
        <div className="homepage_title ">
          <div className="homepage_title_words secondary_bg_color text_white">
            FINDING YOUR NEXT PC
          </div>
          <div className="homepage_title_words secondary_bg_color text_white">
            JUST GOT EASIER
          </div>
        </div>
      </div>
      <div className="home_content elements_container">
        <h1 className="text_light_grey_800">Featured Items</h1>
        <Products products={products} />
      </div>
    </div>
  );
}

export default Home;
