import {useState} from 'react'
import {Link} from 'react-router-dom'
import './Register.css'
import Alerta from '../../components/Alerta/Alerta'
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([username,email,password].includes('')){
            setAlerta({msg: 'Todos los campos son obligatorios', error: true})
            return;
        }

        const url = 'https://codealo-commerce-cms.onrender.com/auth/local/register'
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post(url, {username, email, password}, config);
            if(response.status === 200){
                setAlerta({msg: 'Usuario Registrado correctamente'})
            }else{
                setAlerta({msg: 'Error al registrar usuario', error: true})
            }
            setUsername('')
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }

    const {msg} = alerta;

    return (
        <div className="display">
            <div className="register">
                <div className="register-left">
                    <h1>Create your Account</h1>
                    <form onSubmit={handleSubmit} className='form-register'>
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
                            <label htmlFor="">Email<span>*</span></label>
                            <input 
                                type="text"
                                placeholder='Your username'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
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
                        <input type="submit" value="Register" className='btn btn-primary'/>
                    </form>
                </div>
                <div className="register-right">
                   <h2>Hello, Friend!</h2>
                   <p>Ya tienes una cuenta en CodealoEcommerce?</p>
                   <Link to='/login' className='btn'>Sign In</Link>
                   <Link to='/' className='btn'>Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Register