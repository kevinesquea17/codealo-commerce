import React from 'react'
import './alerta.css'

const Alerta = ({alerta}) => {

    return (
        <div className={`${alerta.error ? 'error' : 'success'} alerta`}>{alerta.msg}</div>
    )
}

export default Alerta