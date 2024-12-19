import React, { useState, useEffect } from 'react'
import { fetchProductById, fetchCategoryById, fetchProductCategoryById } from "../../electronApi"
import { Link, useParams } from 'react-router-dom'
import { addToCart } from '../../Redux/basketAction';
import { useDispatch } from 'react-redux'
import "./product.css"

function RenderProduct({product}){
  const dispatch = useDispatch()

  return (
    <div className="cardProduct">
      <h2>{product.name}</h2>
      <div>
        <div>
          <p>{product.description}</p>
          <p>Price: {product.price}$</p>
          <input type="button" onClick={() => addToCart(dispatch, product.product_id, 1, product)} value="Buy" />
        </div>
      </div>
    </div>
  )
}

function RenderCategoryProduct({category, products}) {
  const { id } = useParams();
  const dispatch = useDispatch()
  const filteredProducts = products.filter((product) => product.product_id !== parseInt(id));

  return (
    <div className="containerProducts">
      <h2>Also see other - {category.name}</h2>
      {filteredProducts.map((product) => (
        <div key={product.product_id} className="cardsProduct">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <div>
            <Link to={`/product/${product.product_id}`} className='link'>
              <input type="button" value="More details" />
            </Link>
            <input type="button" onClick={() => addToCart(dispatch, product.product_id, 1, product)} value="Buy" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CreateProductPage() {
  const [product, setProduct] = useState("")
  const [category, setCategory] = useState("")
  const [products, setProducts] = useState([])
  const { id } = useParams();

  useEffect(() => {fetchProductById(id).then(result => setProduct(result))},[id]);
  
  useEffect(() => {
    const fetchProductsInCategory = async () => {
      if (product?.category_id) {
        const resultProductCategory = await fetchProductCategoryById(product.category_id);
        setProducts(resultProductCategory);
      }
    };

    const fetchCategoryDetails = async () => {
      if (product?.category_id) {
        const resultCategory = await fetchCategoryById(product.category_id);
        setCategory(resultCategory);
      }
    };

    fetchProductsInCategory();
    fetchCategoryDetails();
  }, [product])

  if (!product || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerInfo">
      <div className="divProduct">
        <RenderProduct product={product} />
      </div>
      <div className="divCategory">
        <RenderCategoryProduct category={category} products={products} />
      </div>
    </div>
  );
}