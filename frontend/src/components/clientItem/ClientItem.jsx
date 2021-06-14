import React, {useState, useEffect, useContext} from 'react'
import contextValue from '../context/Context'

export default function ClientItem({item, cart}) {
    const [context, setContext] =  useContext(contextValue)
    const [state, setState] = useState({...item, QTY:item.minQtyPrice[0], pricePerUnit:(item.pricePerUnit >=0 ? item.pricePerUnit : item.pricePerQty[0])})
 
    const getPricePerUnit = (QTY) => {
        let pricing
        item.pricePerQty.forEach((price, i)=> { 
            if(QTY < item.maxQtyPrice[i] && QTY >= item.minQtyPrice[i]){
                pricing = price
            }
            
        })
        if(QTY > item.minQtyPrice[item.minQtyPrice.length -1]){ 
            pricing = item.pricePerQty[item.pricePerQty.length -1]
        }
        return pricing 
    }
    const handleChange = (e) => { 
        setState({...state, QTY: parseInt(e.target.value), pricePerUnit: getPricePerUnit(parseInt(e.target.value))})
        console.log(state)
    }
    const handleAddToCart = () => { 

        setContext(cont => { 
        if (!cont.cart) cont.cart = []
        let cartItem = cont.cart.find((el, i) => el.id == state.id)
        if(cartItem){ 
            let index = cont.cart.indexOf(cartItem)
            cont.cart[index].QTY = state.QTY
            return {...cont, cart:[...cont.cart]}

        }else{ 
            return {...cont, cart:[...cont.cart, state]}
        }
        })
    }
    return (
        <div className="item">
                        <img src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg" alt="" />
                        <div className="item-content">

                         <h4>{item.name}</h4>
<p> {state.pricePerUnit}/unit</p>
{cart? <>
<p> QTY: {item.QTY} </p>

</>
: 
<>
QTY <input className="item-qty" type="number" min={item.minQtyPrice[0]} max={item.maxQtyPrice[item.maxQtyPrice.length -1 ]} value={state.QTY} onChange={handleChange} />
<button onClick={handleAddToCart}>+ Add to cart</button>
</>
}
</div>

        </div>
    )
}
