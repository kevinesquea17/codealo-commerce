import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import StoreContext from '../../contexts/StoreContext';
import Alerta from '../Alerta/Alerta';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner';
import './productList.css';

const ProductList = () => {

  const {listProducts, alerta, loading} = useContext(StoreContext);


  const {msg} = alerta

  return (
    <>
      {msg && <Alerta/>}
      <section className='products container'>
        <div className="heading">
            <div className="heading__left">
                <h4>New Arrival</h4>
                <h2>Featured Products</h2>
            </div>
            <div className="heading__right">
                <Link to="/productos" className='btn btn-primary'>see all products</Link>
            </div>
        </div>

        <div className="product-list">
          {listProducts.slice(0,3).map(product => (
            <Product
              key={product.id}
              product= {product}
            />
          ))}
        </div>
        
      </section>
    </>
   
  )
}

export default ProductList