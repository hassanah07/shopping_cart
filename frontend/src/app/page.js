import React from "react";
import Products from "./components/Products";
import CartCount from "./components/CartCount";

const Home = () => {
  const cartId = 0;
  return (
    <div>
      <CartCount cartId={cartId} />
      <Products />
    </div>
  );
};

export default Home;
