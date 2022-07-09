import { useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'
import Alerta from '../../components/Alerta/Alerta'
import axios from 'axios'
import AuthContext from '../../contexts/AuthContext'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const {setAuth, auth} = useContext(AuthContext);
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        if([username,password].includes('')){
            setAlerta({msg: 'Todos los campos son obligatorios', error: true})
            return;
        }

        const url = 'https://codealo-commerce-cms.onrender.com/auth/local'
        const config = {
            header: {
                'Content-Type': 'application/json',
            }
        }

        const formData = new FormData();
        formData.append('identifier', username);
        formData.append('password', password)

        try {
            const response = await axios.post(url, formData, config);
            if(response.status === 200){
                console.log(response.data)
                setAuth(response.data)
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/')
            }
            setUsername('')
            setPassword('')
        } catch (error) {
            setAlerta({msg: "Error al iniciar sesión", error: true})
        }
    }

    const {msg} = alerta;


    return ( 
       <div className="display">
            <div className="login">
                <div className="login-left">
                    <h1>Sign in to Account</h1>
                    <form onSubmit={handleSubmit} className='form-login'>
                        {msg && <Alerta
                            alerta={alerta}
                        />}
                        <div className="field">
                            <label htmlFor="">Username<span>*</span></label>
                            <input 
                                type="text"
                                placeholder='Your username'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="">Password<span>*</span></label>
                            <input 
                                type="password" 
                                placeholder='Your password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Log In" className='btn btn-primary'/>
                    </form>
                </div>
                <div className="login-right">
                   <h2>Hello, Friend!</h2>
                   <p>Aun no tienes una cuenta en CodealoEcommerce?</p>
                   <Link to='/registrar' className='btn'>Sign Up</Link>
                   <Link to='/' className='btn'>Home</Link>
                </div>
            </div>
       </div>
    )
}

export default Login