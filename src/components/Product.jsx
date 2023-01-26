import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import * as APIService from "../services/api";

const Product = () => {
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState();
  const [data,setData]=useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setData(data);
    }
    fetchData();
  }, []);

  const postProduct = async (e) => {
    e.preventDefault();
    const response = await APIService.getData(product);
    if (response.ok) {
      setMessage("Posted Successfully!");
    }
  };

  return (
    <div className="login-container">
      <span role="name">{!data ? "Loading..." : data?.name}</span>
      <input
        placeholder="enter product name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <button onClick={postProduct}>Post Product</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Product;
