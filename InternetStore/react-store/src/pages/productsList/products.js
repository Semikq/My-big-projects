import { fetchProducts, fetchProductCategoryById } from '../../electronApi';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../../Redux/basketAction';
import "./productsList.css"

function RenderProduct({products}) {
  const dispatch = useDispatch()

  return (
    <div className="containerProducts">
      {products.map((product) => (
        <div key={product.product_id} className="cardsProduct">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}$</p>
          <div>
            <Link to={`/product/${product.product_id}`} className='link'>
              <input type="button" value="More details" />
            </Link>
            <input type="button" value="Buy" onClick={() => addToCart(dispatch, product.product_id, 1, product)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CreateProductsPage() {
  const [products, setProduct] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    if(id){
      fetchProductCategoryById(id).then(result => setProduct(result))
    }else fetchProducts().then(result => setProduct(result))
  }, [id]);

  return (
    <RenderProduct products={products} />
  );
}