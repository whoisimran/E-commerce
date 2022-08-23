import React,{useState} from 'react'
import { useCart } from "react-use-cart";
import { useLocation,Link,useNavigate } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';

const Checkout = () => {
    const navigate = useNavigate();

   let location = useLocation();
   let items = location.state.item;
   let total_price = location.state.Total;
  
   const {
    emptyCart
} = useCart();
    // console.log(items)
   let user_id = localStorage.getItem('id');

   const [hide,setHide] = useState(false)

    const placeorder = async ()=>{
        let newDate = new Date();
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let country = document.getElementById('country').value;
        let address = document.getElementById('address').value;
        let landmark = document.getElementById('landmark').value;
        let city = document.getElementById('city').value;
        let state = document.getElementById('state').value;
        let pincode = document.getElementById('pincode').value;
        let phone = document.getElementById('phone').value;

        const ship_address = {
            name: name,
            address: address,
            phone: phone,
            city: city,
            zip: pincode,
            state: state,
            country: country
        }

        let datee = Date.now()
        let orders = {
            id: datee,
            created_at:newDate,
            currency: "INR",
            email:email,
            name:name,
            line_items: items,
            shipping_address:ship_address,
            total_price: total_price,
            financial_status: "Cash On Delivery",
            
        }
        

        let final_arr = JSON.stringify(orders);
        let response = await fetch(`http://localhost:8080/api/order`,{
            method:"POST",
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({user_id:user_id,order:final_arr,fulfillment_status: "Unfulfilled"})
        });

        let res = await response.json();
        if(res.success){
            setHide(true)
        }
    }

    const hideAlert = ()=>{
        setHide(false);
        emptyCart();
        navigate('/profile')
    }

  return (
    <div className='container' style={{marginTop:"50px",marginBottom:"70px"}}> 
    <SweetAlert
        show={hide}
        success
        title="Wow!"
        onConfirm={hideAlert}
    >
        Order Placed Successfully!
    </SweetAlert>

    <h5 className="mb-5"><Link to="/cart">Return to cart</Link></h5>

        <div className='row'>
            <div className='col-md-6'>
          
             <div className='card2'>
             <div className='form-group'>
                    <label>Contact information</label>
                    <input className="form-control" type="text" placeholder="Enter Email" id="email" />
                </div><br /><hr />
                <h4 align="center">Shipping Address</h4>
                <div className='form-group'>
                    <label>Enter Country</label>
                    <input className="form-control" type="text" placeholder="Enter Country" id="country" />
                </div>
                <div className='form-group'>
                    <label>Enter Name</label>
                    <input className="form-control" type="text" placeholder="Enter Name" id="name" />
                </div>
                <div className='form-group'>
                    <label>Enter Address</label>
                    <input className="form-control" type="text" placeholder="Enter Address" id="address" />
                </div>
                <div className='form-group'>
                    <label>Enter Landmark</label>
                    <input className="form-control" type="text" placeholder="Enter Landmark" id="landmark" />
                </div>
                <div className="row">
                    <div className="col-md-4">  
                        <label>Enter City</label>
                        <input className="form-control" type="text" placeholder="Enter City" id="city" />   
                    </div>
                    <div className="col-md-4">   
                        <label>Enter State</label>
                        <input className="form-control" type="text" placeholder="Enter State" id="state" />   
                    </div>
                    <div className="col-md-4">     
                        <label>Enter Pincode</label>
                        <input className="form-control" type="text" placeholder="Enter Pincode" id="pincode" />     
                    </div>
                </div>

                <div className="form-group">
                    <label>Enter Phone</label>
                    <input type="text" className="form-control" id="phone" placeholder="Enter Phone" />
                </div>

                <div className="form-group">
                    <button onClick={placeorder} className="btn btn-info">Place Order</button>
                </div>

            </div>   
            </div>
            <div className='col-md-2'>

            </div>
            <div className='col-md-4'>
                <div className="wrap_table" style={{height:"250px", overflowY: "scroll"}}>
                    <table className="table">
                        <thead>
                            {items.map((item,index)=>{
                                return (
                                    <tr>
                                        <th><span style={{background:"lightgray",borderRadius:"55%",padding:"4px"}}>{item.quantity}</span><img src={item.image} width="70" alt="thumb" /></th>
                                        <th>{item.title}</th>
                                        <th>{item.itemTotal}</th>

                                    </tr>
                                )
                            })}
                        </thead>
                    </table>
                </div>
                <br /><br />    
            <hr />
            <span>
                <p style={{float:"left"}}>Total</p>
                <p style={{float:"right"}}>INR ₹{total_price}</p>
            </span>
            </div>
        </div>
    </div>
  )
}

export default Checkout