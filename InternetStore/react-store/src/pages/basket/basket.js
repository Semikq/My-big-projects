import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, setItemCount, clearCart } from '../../Redux/basketAction';
import "./basket.css"
import { createOrder } from '../../electronApi';

function RenderBasket(){
    const basket = useSelector((state) => state.basket);
    console.log(basket)
    const user = useSelector((state) => state.auth.payload.userId);
    const [quantities, setQuantities] = useState({});
    const dispatch = useDispatch()

    const handleOrder = () => {
        const items = Object.values(basket).map(item => {
            if (item.goodInfo && item.goodInfo.product_id && item.count !== null && item.count > 0) {
                return {
                    product_id: item.goodInfo.product_id,
                    quantity: item.count,
                    price: parseFloat(item.goodInfo.price) || 0,
                    name: item.goodInfo.name || "Unknown"
                };
            } else {
                return null;
            }
        }).filter(item => item !== null); 
        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        createOrder(user, 1, totalPrice, items)
    }

    const handleQuantityChange = (productId, value) => {
      const newQuantity = Math.max(1, parseInt(value) || 1); 
      setQuantities((prevState) => ({
        ...prevState,
        [productId]: newQuantity,
      }));
      setItemCount(dispatch, productId, newQuantity);
    };
  
    return (
      <div className='basketField'>
          <h1>Your Basket</h1>
          <div className='basketGoodsField'>
              {Object.entries(basket)
                  .filter(([key]) => key !== "_persist")
                  .map(([key, item]) => {
                      if (!item.goodInfo || !item.goodInfo.product_id) {
                          return null;
                      }
                      return (
                          <div key={key} className='goodsInBasket'>
                              {console.log(item.goodInfo.product_id)}
                              <h2>{item.goodInfo.name}</h2>
                              <div>
                                  <p>Quantity: {item.count}</p>
                                  <p>Price: {item.count * item.goodInfo.price}$</p>
                              </div>
                              <div>
                                  <input
                                      type='number'
                                      value={quantities[item.goodInfo.product_id]}
                                      onChange={(e) => handleQuantityChange(item.goodInfo.product_id, e.target.value)}
                                      placeholder='How much product'
                                  />
                                  <input type='button' onClick={() => removeFromCart(dispatch, { _id: item.goodInfo.product_id })} value='Remove'/>
                              </div>
                          </div>
                      );
                  })}
          </div>
          <div className='actionsInBasket'>
              <input type='button' onClick={() => clearCart(dispatch)} value="Clear basket"></input>
              <input type='button' onClick={handleOrder} value="Order"></input>
          </div>
      </div>
  );
}

export function CreateBasketPage(){
    return (
        <div className='containerBasket'>
            <RenderBasket/>
        </div>
    )
}