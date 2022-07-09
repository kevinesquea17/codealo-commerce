import React, { useContext, useState } from 'react'
import StoreContext from '../../contexts/StoreContext';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './product.css';
import Alerta from '../Alerta/Alerta';

const Product = ({product}) => {

  const {setCart, cart, setCartUI} = useContext(StoreContext);
  const navigate = useNavigate()
  const [alerta, setAlerta] = useState({})

  const handleClick = (e) => {
    navigate(`/producto/${product.slug}`)
  }
  

  const addToCart = async (e) => {
    const config = {
      header: {
        'Content-Type': 'application-json'
      }
    }
    if(cart.products_in_cart.length === 0){
      try {
        const url = 'https://codealo-commerce-cms.onrender.com/carts';
        const response = await axios.post(url, {products_in_cart:[...cart.products_in_cart, {product: {id: product.id}, quantity: 1}]}, config);
        console.log(response)
        setAlerta({msg: 'Added'})
        setTimeout(() => {
          setAlerta({})
        }, 3000)
        setCart({products_in_cart: [...cart.products_in_cart, {product: {id: product.id}, quantity: 1}]})
        setCartUI(response.data.products_in_cart)
        localStorage.setItem('cart_id', response.data.id)
      } catch (error) {
        console.log(error);
      }
    }
    else{
      const cart_id = localStorage.getItem('cart_id');
      const url = `https://codealo-commerce-cms.onrender.com/carts/${cart_id}`
      if(cart.products_in_cart.some(productAdd => productAdd.product.id === product.id)){
        const newCart = cart.products_in_cart.map(productAdd => {
          if(productAdd.product.id === product.id){
            return {...productAdd, quantity: productAdd.quantity + 1}
          }else{
            return productAdd
          }
        })
        try {
          const response = await axios.put(url, {products_in_cart: newCart}, config);
          setCart({products_in_cart: newCart})
          setCartUI(response.data.products_in_cart)
          setAlerta({msg: 'Added'})
          setTimeout(() => {
            setAlerta({})
          }, 3000)
        } catch (error) {
          console.log(error);
        }
      }else{
        try {
          console.log([...cart.products_in_cart, {"product": {"id": product.id}, "quantity": 1}])
          const response = await axios.put(url, {products_in_cart: [...cart.products_in_cart, {product: {id: product.id}, quantity: 1}]}, config)
          setCart({products_in_cart: [...cart.products_in_cart, {product: {id: product.id}, quantity: 1}]})
          setCartUI(response.data.products_in_cart)
          setAlerta({msg: 'Added'})
          setTimeout(() => {
            setAlerta({})
          }, 3000)
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  const {msg} = alerta;

  return (
    <div className="product">
          {msg && 
            <Alerta alerta={alerta}/>
          }
          <div className="product-image">
              <img src={`https://codealo-commerce-cms.onrender.com${product.image.url}`} alt="" />
          </div>
          <h3>{product.title}</h3>
          <h4>${product.price}</h4>
          <div className="btns">
            <button
              className="btn"
              onClick = {() => {
                addToCart()
              }}
            >Add to cart</button>
            <button 
              className='btn btn-secondary'
              onClick={handleClick}
            >See Details</button>
          </div>
    </div>
  )
}

export default Product