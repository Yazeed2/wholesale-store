import axios from 'axios'
import React, {useState,useContext} from 'react'
import link from '../../link'
import {useHistory} from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import contextValue from '../../components/context/Context'
import Items from '../../components/items/Items'
import Stores from '../../components/stores/Stores'

export default function Home() {
    const [context, setContext] =  useContext(contextValue)
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    return (<>
{context.user  && context.user .userType === 'store'? 
<Items /> 
: <Stores />}
      </> 
    )
}
