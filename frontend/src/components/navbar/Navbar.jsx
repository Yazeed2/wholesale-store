import React, {useContext}from 'react'
import contextState from '../context/Context'
import {Link} from 'react-router-dom'
export default function Navbar() {
    const [context, setContext] = useContext(contextState)
    const logout = () => { 
        localStorage.removeItem('token')
        window.location.reload()

    }
    return (
        <div className={'navbar'}>
            <ul>
                {context.user? <>
                    <li>{context.user.username}</li>
                    <li onClick={logout}>logout</li>
                </>:
                <>
                <Link to={'/login'}>login</Link>   
                <Link to={'/register'}>register</Link>
                </>}
            </ul>
        </div>
    )
}
