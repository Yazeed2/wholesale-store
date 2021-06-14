import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import LogisticPrice from '../logisticPrice/LogisticPrice'
import contextValue from '../context/Context'
import link from '../../link'
import Loading from '../loading/Loading'

export default function Item({item}) {
    const [ranges, setRanges ] = useState([])
    const [context, setContext] =  useContext(contextValue)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const arr = []

        for(let i=0; i < item.pricePerQty.length; i++){ 
            arr.push({pricePerQty: item.pricePerQty[i],minQtyPrice: item.minQtyPrice[i],maxQtyPrice: item.maxQtyPrice[i]})
        }
       
        setRanges(arr)
    }, [])
    const handleAddRange =() => { 
        setRanges(state => [...state, {
            pricePerQty:0,
            minQtyPrice:0,
            maxQtyPrice:0
        }])
    }
    const handleSave = async()=> { 
        let pricePerQty = []
        let minQtyPrice = []
        let maxQtyPrice = []
        for(let price of ranges){ 
            pricePerQty.push(price.pricePerQty)
            minQtyPrice.push(price.minQtyPrice)
            maxQtyPrice.push(price.maxQtyPrice)
        }
        setLoading(true)
        try{

        await axios({
            method: 'put',
            url:link +'inventory/'+item.id,
            data:{pricePerQty,minQtyPrice,maxQtyPrice},
            headers: {
                Authorization:context.token 
            }    
        })
        setLoading(false)
        alert('updated successful')
    }catch(err){ 
        alert('something went wrong')
    }

    }
 
    return (
        <div>
            <img src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg" alt="" /> <h4>{item.name}</h4>
            <button onClick={handleAddRange} >+ Add range</button>

            <table>
            <tr>
    <th>qty range</th>
    <th>Cost per unit</th> 
    <button onClick={handleSave}>Save</button>
  </tr>

  {ranges.map((range, i) =>  <LogisticPrice range={range}  i={i} setState={setRanges} />  )}  
   </table>
   <Loading loading={loading} /> 
        </div>
    )
}
