import {createContext, useReducer, useState, useEffect} from 'react'
import axios from 'axios'


const StoreContext = createContext();


const StoreProvider = ({children}) => {

    const [listProducts, setListProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState({products_in_cart: []});
    const [showCart, setShowCart] = useState(false);
    const [alerta, setAlerta] = useState({})
    const [productActive, setProductActive] = useState(null);
    const [cartUI, setCartUI] = useState([])

   
   
    useEffect(() => {
        const getProducts = async () => {
          const url = 'https://codealo-commerce-cms.onrender.com/products';
          try {
            const response = await axios(url);
            setListProducts(response.data)
            setLoading(false)
          } catch (error) {
            console.log(error)
          }
        }
    
        getProducts();
    }, [])


    return (
        <StoreContext.Provider value = {{
            listProducts,
            setListProducts,
            cart,
            setCart,
            showCart,
            setShowCart,
            setAlerta,
            alerta,
            productActive,
            setProductActive,
            cartUI,
            setCartUI,
            loading
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export {
    StoreProvider
}

export default StoreContext