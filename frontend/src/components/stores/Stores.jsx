import React, {useEffect, useState, } from 'react'
import link from '../../link'
import axios from 'axios'
import Loading from '../loading/Loading'
import { useHistory } from 'react-router-dom'


export default function Stores() {
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState([])
    const history = useHistory()
    useEffect(() => {
        const getData = async() => { 
            const payload = await axios.get(link+'store')
            const stores = payload.data.stores
            setState(stores)
            setLoading(false)
        }
        getData()
    }, [])

    const handleStoreClick = (storeId) => { 
        history.push('store/'+ storeId)
    }
    return (
        <div>
            <h1 className="page_title">list of Stores</h1>
            {state.length ? state.map(store => <div className={'store-container'} onClick={() =>handleStoreClick(store.id) }>
                <img src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg" alt="" /> 
        <h4>store name: {store.username}</h4>
                    </div>) : "no store available"}
        
                 <Loading loading={loading } /> 
       
        </div>
    )
}
