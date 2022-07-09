import React, { useContext, useState } from 'react'
import {Link, useNavigate, Navigate} from 'react-router-dom'
import {FiSearch} from 'react-icons/fi';
import {BsCart3} from 'react-icons/bs';
import {HiMenu} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import './header.css';
import StoreContext from '../../contexts/StoreContext';
import AuthContext from '../../contexts/AuthContext';

const Header = () => {

    const [showMenu, setShowMenu] = useState(false);
    const {cartUI, setCartUI, setShowCart} = useContext(StoreContext);
    const total =  cartUI.reduce((gasto, producto) => gasto + (producto.product.price * producto.quantity), 0) || 0;
    const quantity = cartUI.reduce((total, product) => total + product.quantity, 0) || 0;
    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    
    return (
        <header>
            <div className="container container__header">
                <div className="header__left">
                    <Link className='logo' to='/'>Codealo<span>Ecommerce</span></Link>
                    <nav className={`navegation ${showMenu ? 'active' : ''}`}>
                        <Link to= "/">Home</Link>
                        <Link to="/productos">Products</Link>
                        {auth && <Link to='/myorders'>My Orders</Link>}
                        {!auth && <Link to="/registrar">Register</Link>}
                    </nav>
                    <div className="menu-mobile">
                        {!showMenu ? 
                            <HiMenu className='icon-menu' onClick={() => setShowMenu(true)}/>
                            : <AiOutlineClose  className='icon-menu-close' onClick={() => setShowMenu(false)}/>
                        }   
                    </div>
                </div>
                <div className="header__right">
                    <div className="cta">
                        {auth && <div className='icon-search'>
                            {
                                auth.user.username.charAt(0)
                            }
                        </div>}
                        {auth ? <button className='btn btn-primary' onClick={() => { setAuth(null); localStorage.removeItem('user'); setCartUI([]); navigate('/')} }>Logout</button> : <Link to='/login' className='btn btn-primary'>Login</Link>}
                        <button href="#" className='btn btn-primary' onClick={() => setShowCart(true)}>
                            ${total.toString().slice(0,4)}
                            <BsCart3 className='icon'/>
                            <span className="cart-elements">{quantity}</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header