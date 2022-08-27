import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import Products from "../../components/Products";

import "./SearchResults.scss";

function SearchResults() {
  const params = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(
      `http://localhost:8000/api/items/search_results/?query=${params.searchQuery}`
    )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log({ ...err });
      });
  }, [params.searchQuery]);

  return (
    <div className="SearchResults_Cont">
      <h1 className="text_light_grey_800">
        Search results for: "{params.searchQuery}"
      </h1>
      <Products products={products} />
    </div>
  );
}

export default SearchResults;
