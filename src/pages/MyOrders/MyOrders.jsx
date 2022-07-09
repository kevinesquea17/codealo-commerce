import React from 'react'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/Header/Header'
import './MyOrders.css'
import Spinner from '../../components/Spinner/Spinner'
import Cart from '../../components/Cart/Cart'


const MyOrders = () => {

    const [orders, setOrders] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const getOrders = async () => {
            const url = 'https://codealo-commerce-cms.onrender.com/orders'
            const user = JSON.parse(localStorage.getItem('user'));
            try {
                const response = await axios(url, {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`
                    }
                })
                console.log(response)
                setOrders(response.data)
                setCargando(false)
            } catch (error) {
                console.log(error);
            }
        }

        getOrders();
    }, [])

    return (
        <>
            <Header/>
            <div className="my-orders container">
                <div className="encabezado">
                    <span>Order #</span>
                    <span>Fecha</span>
                    <span>Enviado a</span>
                    <span>Total</span>
                    <span>Products</span>
                </div>
                <div className="my-orders-details">
                    {cargando && <Spinner/>}
                    {!cargando && orders.map(order => {
                        return (
                            <div key={order.id} className='my-order'>
                                <span>{order.id}</span>
                                <span>{order.created_at.slice(0,10)}</span>
                                <span>{order.customer.username}</span>
                                <span>{order.total}</span>
                                <div className="imgs">
                                    {order.products.map(product => (
                                        <img src={`https://codealo-commerce-cms.onrender.com${product.product.image.url}`} alt="" />
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                    {orders.length === 0 && !cargando && <div className='msge'>
                        Aun no has realizado ordenes.
                    </div> 
                    }
                </div>
            </div>
            <Cart/>
        </>
    )
}

export default MyOrders