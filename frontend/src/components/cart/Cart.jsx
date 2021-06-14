import React, {useState, useContext, useEffect} from 'react'
import contextValue from '../context/Context'
import ClientItem from '../clientItem/ClientItem'

export default function Cart() {
    const [context, setContext] =  useContext(contextValue)
    const [state, setState] = useState({total:0})
    useEffect(() => {
        let total = 0
        if(context.cart ){
            console.log('hrere')
            context.cart.forEach(item => {
                console.log(item);
               total += item.QTY * item.pricePerUnit
           });
        }
        setState({...state, total })
    }, [context])
    return (
        <div className="cart">
            <h1 className="page_title">

            cart 
            </h1>

            {context.cart && context.cart.length?
            context.cart.map(item => <ClientItem item={item} cart />) 
             :"There are no items in the cart"}


             <h1>Total: {state.total} </h1>
        </div>
    )
}
