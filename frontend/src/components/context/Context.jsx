import React, {createContext,useState,useMemo, useEffect} from 'react'
import axios from 'axios'
import link from '../../link'
const Context = createContext() 

export function ContextProvider({children}) {
    const [state, setState] = useState({}) 
    const stateValue = useMemo(() => [state, setState], [state, setState])
    useEffect(() => {
        const checkToken = async () => { 

            const token = localStorage.getItem('token')
            if(token){ 
            try{ 
                const payload = await axios.get(link+'auth',{ headers: { Authorization: token }})
                const user = payload.data.user

                setState({...state, user, token})

            }catch (err) { 
                localStorage.removeItem('token')
            }
            }
        }
        checkToken()
    }, [])
    return (
    <Context.Provider value={stateValue}> 
            {children }
    </Context.Provider>
    
    )
}

export default Context 
