import axios from 'axios'
import React, {useState,useContext} from 'react'
import link from '../../link'
import {useHistory} from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import contextValue from '../../components/context/Context'

export default function Register() {
    const [context, setContext] =  useContext(contextValue)
    const [state, setState] = useState({userType:'client'})
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const handleChange = (e) => { 
        setState({...state, [e.target.name]: e.target.value})
    }
    const toggleType = (e,type) => { 
        e.preventDefault() 
        setState({...state, userType:type})
    }
    const handleSubmit = async(e) => { 
        e.preventDefault() 
        const {username, userType, password} = state
        if(username  && userType && password ){
            try{ 
                setLoading(true)
                const payload = await axios.post(link+'auth/register', {username, userType, password})
                const {token, user} = payload.data 
                setContext({...context, token, user})
                localStorage.setItem('token', token)
                history.push('/')
                setLoading(false)


            }catch(err) { 
                setLoading(false)

                if(err.response){
                    console.log(err.response)
                if(err.response.status === 401){ 
                    alert('Try another username this one is used :))')
                }
                else{ 
                    alert('something went wrong please try again latter')
                }
            }   else{ 
                alert('something went wrong please try again latter')
            }

            }

        }else{ 
            alert('please fill all of the inputs ')
        }
    }
    return (
        <div>
            <h1 className="page_title">Register</h1>
            <form onSubmit={handleSubmit} className="auth" >
                <input className="auth-input" placeholder="username" type="text" name="username" onChange={handleChange} />
                <input className="auth-input" placeholder="password" type="password" name="password" onChange={handleChange} />
                <button onClick={(e) => toggleType(e,'client')} className={"auth-userType " + (state.userType == 'client'? 'active':'')} >Client</button>
                <button onClick={(e) => toggleType(e, 'store')} className={"auth-userType " + (state.userType == 'store'? 'active':'')} >Store</button>
                <input className="auth-submit" type="submit" />
            </form>
            <Loading loading={loading}/>
        </div>
    )
}
