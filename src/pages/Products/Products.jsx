import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import Cart from '../../components/Cart/Cart'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import StoreContext from '../../contexts/StoreContext'
import './Products.css'
import axios from 'axios'

const Products = () => {

    const {listProducts} = useContext(StoreContext);
    const [categories, setCategories] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [categoryActive, setCategoryActive] = useState(0)

    useEffect(() => {
        const getCategories = async () => {
            const url = 'https://codealo-commerce-cms.onrender.com/categories';
            try {
                const response = await axios(url);
                setCategories(response.data)
                setCargando(false)
            } catch (error) {
                console.log(error)
            }
        }
        getCategories()
    }, [])

    return (
        <>
            <Header/>
            {!cargando &&  <div className="container">
                <div className="categories">
                    <span onClick={() => setCategoryActive(0)} className={categoryActive === 0 ? 'active' : ''}>All</span>
                    {categories.map(category => (
                        <span 
                            key={category.id} 
                            className={categoryActive == category.id ? 'active' : ''} 
                            onClick= {() => setCategoryActive(category.id)}>
                            {category.name}
                        </span>
                    ))}
                </div>
            </div>}
            <div className="all-products container">
                <div className="product-list">
                    {categoryActive === 0 && listProducts.map(product => (
                        <Product
                            key={product.id}
                            product={product}
                        />
                    ))}
                   {categoryActive && listProducts.filter(product =>  product.categories.map(category => category.id).includes(categoryActive)).map(product => (
                        <Product
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
            <Cart/>
        </>
    )
}

export default Products