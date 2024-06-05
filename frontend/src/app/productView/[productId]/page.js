import React from "react";

const ProductView = async ({ params }) => {
  let response = await fetch(
    `https://fakestoreapi.com/products/${decodeURIComponent(params.productId)}`
  );
  response = await response.json();
  console.log(response);
  return (
    <div className="py-28">
      Product Id: {response.title}
      <img src={`${response.image}`} alt={`${response.title}`} className="w-52" />
    </div>
  );
};

export default ProductView;
