import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import './ProductDetails.css'
import Header from '../../components/Header/Header'
import Cart from '../../components/Cart/Cart'
import StoreContext from '../../contexts/StoreContext'
import Alerta from '../../components/Alerta/Alerta'
import Spinner from '../../components/Spinner/Spinner'


const ProductDetails = () => {

    const {setProductActive, productActive, cart, setCart, setCartUI} = useContext(StoreContext)
    const params = useParams();
    const {slug} = params;
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        const getInfo = async () => {
            const url = `https://codealo-commerce-cms.onrender.com/products/${slug}`
            try {
                const response = await axios(url);
                setProductActive(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        getInfo();
    }, [])

    const addToCart = async (e) => {
        const config = {
          header: {
            'Content-Type': 'application-json'
          }
        }
        if(cart.products_in_cart.length === 0){
          try {
            const url = 'https://codealo-commerce-cms.onrender.com/carts';
            const response = await axios.post(url, {products_in_cart:[...cart.products_in_cart, {product: {id: productActive.id}, quantity: quantity}]}, config);
            console.log(response)
            setAlerta({msg: 'Added'})
            setTimeout(() => {
              setAlerta({})
            }, 3000)
            setCart({products_in_cart: [...cart.products_in_cart, {product: {id: productActive.id}, quantity: quantity}]})
            setCartUI(response.data.products_in_cart)
            localStorage.setItem('cart_id', response.data.id)
          } catch (error) {
            console.log(error);
          }
        }
        else{
          const cart_id = localStorage.getItem('cart_id');
          const url = `https://codealo-commerce-cms.onrender.com/carts/${cart_id}`
          if(cart.products_in_cart.some(productAdd => productAdd.product.id === productActive.id)){
            const newCart = cart.products_in_cart.map(productAdd => {
              if(productAdd.product.id === productActive.id){
                return {...productAdd, quantity: parseInt(productAdd.quantity) + parseInt(quantity)}
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
              const response = await axios.put(url, {products_in_cart: [...cart.products_in_cart, {product: {id: productActive.id}, quantity: quantity}]}, config)
              setCart({products_in_cart: [...cart.products_in_cart, {product: {id: productActive.id}, quantity: quantity}]})
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
        <>
            <Header/>
            <div className="product-details container">
                {loading && <Spinner/>}
                <div className="details-image">
                    <img src={`https://codealo-commerce-cms.onrender.com${productActive?.image?.url}`} alt="" />
                </div>
                <div className="more-info">
                    <div className="route">
                        <Link to='/' className='route-children'>Home</Link>
                        <span className='route-children'>/</span>
                        <Link to='/' className='route-children'>{productActive?.categories[0].name}</Link>
                        <span className='route-children'>/</span>
                        <a className='route-children'>{productActive?.title}</a>
                    </div>
                    <h1>{productActive?.title}</h1>
                    <h3>Price:<span>{productActive?.price}</span></h3>
                    <div className="description">
                        <h3>Description</h3>
                        <p>{productActive?.description}</p>
                    </div>
                    <div className="form">
                        <input 
                            type="Number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value) } 
                        />
                        <button className='btn btn-primary' onClick={addToCart}>Add to cart</button>
                    </div>
                    {msg && <Alerta alerta={alerta}/>}
                </div>
            </div>
            <Cart/>
        </>
    )
}

export default ProductDetails