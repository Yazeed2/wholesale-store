import axios from 'axios'
import React, {useEffect, useState, useContext} from 'react'
import link from '../../link'
import contextValue from '../../components/context/Context'
import Item from '../item/Item'
import Loading from '../loading/Loading'


export default function Items() {    
    const [loading, setLoading] = useState(true)
    const [context, setContext] =  useContext(contextValue)
    const [state, setState] = useState([])


    useEffect(() => {
        const getData = async() => { 
            const payload = await axios.get(link+'inventory/store/'+context.user.id)
            const inventories = payload.data.inventories
            setState(inventories)
            setLoading(false)
        }
        getData()
    }, [])
    return (
        <div>
            {state.map(inv => <Item item={inv} />)}
            <Loading loading={loading } /> 
        </div>
    )
}
