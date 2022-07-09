import React from 'react'
import { useContext } from 'react';
import {Navigate} from 'react-router-dom'
import Cart from '../../components/Cart/Cart';
import Header from '../../components/Header/Header';
import Order from '../../components/Order/Order';
import AuthContext from '../../contexts/AuthContext';
import './Checkout.css'


const Checkout = () => {

    const {auth} = useContext(AuthContext);

    return (
        <>
            <Header/>
            <main className='container'>
                {auth ? 
                    <Order/>
                    : <div>Debes Iniciar Sesión</div>
                }
            </main>
            <Cart/>
        </>
    )
}

export default Checkout