import React, { useEffect, useState } from 'react'
import { getUserOrderItems } from '../../electronApi'

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

function RenderOrdersUser(){
    const [userOrders, setUserOrders] = useState([]);
    
    useEffect(() => {
        const fetchGetUserOrderItems = async () => {
            const result = await getUserOrderItems(2);
            setUserOrders(result || [])
        };

        fetchGetUserOrderItems()
    }, []); 

    return (
        <div className='UsersField'>
            {userOrders.map((order) =>(
                <div key={order.order_id} className='user'>
                    <h1>Id замовлення:  {order.order_id}</h1>
                    <h1>Загальна сума: {order.total_price}$</h1>
                    <h1>Статус замовлення: {order.order_status_name}</h1>
                    {formatDate(order.created_at)}
                </div>
            ))}
        </div>
    )
}

export function CreatePageOrdersUser(){
    return (
        <div className='containerEditingUsers'>
            <RenderOrdersUser />
        </div>
    )
}