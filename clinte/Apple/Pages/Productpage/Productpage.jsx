import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Productpage() {
  const { pid } = useParams();
  const [product, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/iphones")
      .then((res) => res.json())
      .then((data) => {
        const productList= data.products;
        
        const singleProduct = productList.filter(
          (product) => product.Id === pid
          );
        console.log(singleProduct)
          setProducts(singleProduct);
        
      });
  }, [pid]);
  console.log(product)

  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          {product.map((product) => (
            <div key={product.product_url} className="bottom-100">
              <div className="row justify-content-center text-center bottom-50">
                <div className="col-12">
                  <div className="title-wraper bold">{product.product_name}</div>
                  <div className="brief-description">{product.product_brief_description}</div>
                </div>
              </div>

              <div className="row justify-content-center text-center product-holder h-100">
                <div className={`col-sm-12 col-md-6 my-auto`}>
                  <div className="starting-price">{`Starting at ${product.starting_price}`}</div>
                  <div className="monthly-price">{product.price_range}</div>
                  <div className="product-details">{product.product_description}</div>
                </div>

                <div className={`col-sm-12 col-md-6`}>
                  <div className="prodict-image">
                    <img src={product.product_img} alt={product.product_name} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Productpage;
