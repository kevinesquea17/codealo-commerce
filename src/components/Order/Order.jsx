import React from 'react'
import { useContext, useState } from 'react'
import StoreContext from '../../contexts/StoreContext'
import {BiArrowBack} from 'react-icons/bi'
import {Link, useNavigate} from 'react-router-dom'
import './Order.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import Spinner from '../Spinner/Spinner'

const Order = () => {

    const navigate = useNavigate();
    const [showSpinner, setShowSpinner] = useState(false);
    const {cartUI} = useContext(StoreContext);
    const total =  cartUI.reduce((gasto, producto) => gasto + (producto.product.price * producto.quantity), 0) || 0;

    const pagar = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const url = 'https://codealo-commerce-cms.onrender.com/orders'
        const cart_id = localStorage.getItem('cart_id')
        console.log(cart_id)
        try {
            setShowSpinner(true);
            setTimeout(() => {
                setShowSpinner(false)
            }, 3000)
            const response = await axios.post(url, {'cart': cart_id}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.jwt}`
                }
            })
            setTimeout(()  => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Pago exitoso',
                    text: "Gracias por comprar en nuestra tienda",
                    showConfirmButton: false,
                    timer: 3000
                })
            }, 3000)
            setTimeout(() => {
                navigate('/')
            }, 6000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="order">
            <h1>Your Order</h1>

            <div className="contenedor">
                <div className="order-details">
                    <div className="orders-left">
                        <h4>Product</h4>
                    </div>
                    <div className="orders-right">
                        <h4>Quantity</h4>
                        <h4>Price</h4>
                    </div>
                </div>
                <div className="products-order">
                    {cartUI.map(product => (
                        <div className="product-order" key={product.product.id}>
                            <div className="product-orders-left">
                                <img src={`https://codealo-commerce-cms.onrender.com${product.product.image.url}`} alt="" />
                                <p>{product.product.title}</p>
                            </div>
                            <div className="product-order-right">
                                <p>{product.quantity}</p>
                                <p>${product.product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="info">
                    <Link className='continue' to='/'>
                        <BiArrowBack className='continue-icon'/>
                        Continue Shopping
                    </Link>
                    <div className="total-subtotal">
                        <div className="total">
                            <h4>Total</h4>
                            <h4>{total.toString().slice(0,4)}</h4>
                        </div>
                        <div className="total">
                            <h4>Subtotal</h4>
                            <h4>{total.toString().slice(0,4)}</h4>
                        </div>
                    </div>
                </div>
                <div className="pagar">
                    <div></div>
                    <button className='btn' onClick={pagar}>Pagar</button>
                </div>
                {showSpinner && <div className="place-spinner">
                    <Spinner/>
                </div> }
            </div>
        </div>
    )
}

export default Order