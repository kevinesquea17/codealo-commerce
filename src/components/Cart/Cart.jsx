import React, { useContext } from 'react'
import StoreContext from '../../contexts/StoreContext';
import {RiDeleteBin5Line} from 'react-icons/ri';
import './Cart.css';
import {Link} from 'react-router-dom';
import axios from 'axios'


const Cart = () => {

    const {showCart, setShowCart, cartUI, cart, setCart, setCartUI} = useContext(StoreContext);

    const handleDelete = async (product) => {
        try {
            const cart_id = localStorage.getItem('cart_id');
            const url = `https://codealo-commerce-cms.onrender.com/carts/${cart_id}`
            const response = await axios.put(url, {products_in_cart: cart.products_in_cart.filter(productAdd => productAdd.product.id !== product.product.id)})
            setCart({products_in_cart: cart.products_in_cart.filter(productAdd => productAdd.product.id !== product.product.id)})
            setCartUI(response.data.products_in_cart)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`cart ${showCart ? 'active' : ''}`}>

            <div className="title">
                <h2>Cart</h2>
                <span onClick={() => setShowCart(false)}>X</span>
            </div>

            {cartUI.length == 0 && 
                <p>No products in the cart</p>
            }

            {cartUI.map(product => (
                <div className="product-cart" key={product.product.id}>
                    <div className="product-image-cart">
                        <img src={`https://codealo-commerce-cms.onrender.com${product.product.image.url}`} alt="" />
                    </div>
                    <div className="product-detalles">
                        <p>{product.product.title}</p>
                        <h3 className='price'>${product.product.price}</h3>
                        <span>x{product.quantity}</span>
                    </div>
                    <div>
                        <RiDeleteBin5Line 
                            className='icon-delete-cart'
                            onClick={() => handleDelete(product)}
                        />
                    </div>
                </div>
            ))}

            {cart.products_in_cart.length  && 
                <div className='btns'>
                    <Link to='/checkout' className='btn btn-primary'>Checkout</Link>
                </div>
            }
        </div>
    )
}

export default Cart