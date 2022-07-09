import {createContext, useState, useEffect} from 'react'


const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(null)

    useEffect(() => {
        const getUser = () => {
            setAuth(JSON.parse(localStorage.getItem('user'))) 
        }
        
        getUser()
    }, [])

   
    return (
        <AuthContext.Provider value = {{
            auth,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext;