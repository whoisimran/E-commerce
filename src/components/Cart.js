import React from 'react'
import { useCart } from "react-use-cart";
import { Link,useNavigate } from 'react-router-dom';

const Cart = () => {
    
    const navigate = useNavigate();
    
    const {
        isEmpty,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    const changequantity = (id)=>{
        // console.log(e.target.value)
        let quantity = document.getElementById(id).value;
        console.log(id)
        updateItemQuantity(id,quantity)

    }

    const buy = (items)=>{
        navigate('/checkout', {state:{item:items,Total:cartTotal}})

    }
   

    if (isEmpty) 
    return (
        <>
     <h1 className="text-center" style={{marginTop:"100px"}}> Your cart is Empty </h1>
     <h4 align="center"><Link to="/profile">Continue Shopping</Link></h4>
     </>
    )
    return (
        
        <div className='container' style={{marginTop:"100px",marginBottom:"70px"}}>
            <h2 align="center">Your cart</h2>
            <p align="center"><Link to="/profile">Continue Shopping</Link></p>
            <table className='table table-striped mt-5'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>  
                </thead>
                <tbody>
                    {items.map((item,index)=>{
                        return(
                            <tr>
                                <td style={{display:"flex"}}>
                                    <img src={item.image} width="100" /><br /><br />
                                    <p>{item.title}
                                    </p>
                                         
                                </td>
                                <td>{item.price}</td>
                                <td><input style={{width:"50px"}} type="number" onChange={()=>changequantity(item.id)} id={item.id}  value={item.quantity}/></td>
                                <td>{item.itemTotal}</td>
                                <td><button title='Remove Item' onClick={() => removeItem(item.id)} className='btn'><i class='fa fa-trash-o' style={{fontSize:"30px",color:"red"}}></i></button></td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
            <button onClick={() => emptyCart()} className='btn btn-danger'>Clear cart</button>
            <h5 style={{float:"right"}}>Subtotal {cartTotal}</h5><br /><br />
            <button onClick={()=>buy(items)} style={{float:"right",background:"#1d5d70",color:"white"}} className='btn'>CHECK OUT</button>
  
            
        </div>
    )
}

export default Cart