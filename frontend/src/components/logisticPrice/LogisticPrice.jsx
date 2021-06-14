import React from 'react'

export default function LogisticPrice({range, i, setState, ranges}) {
    const {minQtyPrice, maxQtyPrice, pricePerQty} = range 
    const handleChange = (e) => { 
        setState(state => {
            state[i] = {...state[i], [e.target.name]: e.target.value}
            return[... state]
        })
    }
    return (
        <tr>
        <th><input name="minQtyPrice" type="number" onChange={handleChange} value={minQtyPrice}/>{i == ranges.length -1 ? '+': <>-<input name="maxQtyPrice" type="number" onChange={handleChange} value={maxQtyPrice}/></>}</th>
        <th><input name="pricePerQty" type="number" onChange={handleChange} value={pricePerQty}/></th> 
      </tr>
    )
}
