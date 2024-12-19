import React, { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '../../electronApi'
import './orders.css'

function formatDate(rawDate) {
    const date = new Date(rawDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${hours}:${minutes}/${day}.${month}.${year}`;
    return <h1>Час створення: {formattedDate}</h1>;
}

function RenderOrders(){
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllOrders();
                setOrders(result)
                console.log(result);
            } catch (err) {
                console.error("Помилка при отриманні замовлень:", err);
            }
        };

        fetchData()
    }, []); 

    const handelUpdateStatus = async (orderId, newStatusId) =>{
        await updateOrderStatus(orderId, newStatusId);
    }

    return (
        <div className='OrdersField'>
            {orders.map((order) =>(
                <div key={order.order_id} className='user'>
                    <div>
                        <h1>Id замовлення:  {order.order_id}</h1>
                        <h1>Загальна сума: {order.total_price}$</h1>
                    </div>
                    <div>
                        <h1>Статус замовлення: {order.order_status_name}</h1>
                        {formatDate(order.created_at)}
                    </div>
                    <div className='containerInputs'>
                        <input type='button' onClick={() => handelUpdateStatus(order.order_id, 3)} value='Відхилити замовленя'></input>
                        <input type='button' onClick={() => handelUpdateStatus(order.order_id, 2)} value='Прийняти замовленя'></input>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function CreatePageOrders(){
    return (
        <div className='containerEditingUsers'>
            <RenderOrders />
        </div>
    )
}