import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import link from '../../link'
import ClientItem from '../../components/clientItem/ClientItem'

export default function Store() {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)

    const [state, setState] = useState([])
    useEffect(() => {
        const getData = async() => { 
            const payload = await axios.get(link+'inventory/store/'+id)
            const inventories = payload.data.inventories
            setState(inventories)
            setLoading(false)
        }
        getData()
    }, [])
    return (
        <div className="store-page">
{state.map(item =><ClientItem item={item} />)}
        </div>
    )
}
