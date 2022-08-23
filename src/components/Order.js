import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const Order = () => {
    const user_id = localStorage.getItem('id');
    const [data, setdata] = useState([]);
    const [found, setfound] = useState(false)

    // const [room, setRoom] = useState([]);
    useEffect(() => {
        getorder();
    }, [])

    const getorder = async () => {
        let response = await fetch(`http://localhost:8080/api/order/${user_id}`);
        let res = await response.json();
        console.log(res)
        if(res.success){
            setdata(res.message.reverse());
            if(res.message.length == 0){
                setfound(false);
            }else{
                setfound(true);
            }
        }else{
            console.log('something went wrong!')
        }
        
    }

   
   

    return (
        <div className='container-fluid mt-5'>
            {found ? (
                <div className='wrap_table'>
                    <h1 align="center">Current Order</h1>
                    <table className='table table-bordered mt-5'>
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Total Price</th>
                                <th>Financial_Status</th>
                                <th>Fulfillment_Status</th>
                                <th>Shipping_Address</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {data && data.map((value, index) => {
                                let orders = JSON.parse(value.order); 
                                let line_item = orders.line_items;
                                let shipping = orders.shipping_address;  
                                let shipped = "fa fa-check";
                                let delivered = "fa fa-check";
                                let shipped2 = "marker";
                                let delivered2 = "marker";
                                let deliver_msg = "";
                                if(value.fulfillment_status == 'Shipped' || value.fulfillment_status == 'Fulfilled'){
                                    shipped = "fa fa-check active";
                                    shipped2 = "marker active";
                                }
                                if(value.fulfillment_status == 'Fulfilled'){
                                    delivered = "fa fa-check active";
                                    delivered2 = "marker active";
                                    deliver_msg = "Your item has been delivered";
                                }
                               
                                return (
                                    <tr key={index}>
                                        <td>{orders.id}</td>
                                                   
                                                <td>
                                                {line_item.map((item,key)=>{
                                               return <li><a href={item.image} target="_blank">Mockup</a></li>
                                                })}
                                                </td>
                                               
                                                <td>
                                                {line_item.map((item,key)=>{
                                               return <li>{item.title}</li>
                                                })}
                                                </td>   
                                        
                                       
                                        <td>{orders.total_price}</td>
                                        <td>{orders.financial_status}</td>
                                        <td> 
                                            <div className="container2">
                                                  <div className="timeline-block timeline-block-right">
                                                <div className="marker active"><i className="fa fa-check active" aria-hidden="true"></i></div>
                                                <div className="timeline-content">
                                                    <h3>Order Placed</h3>
                                                    
                                                    
                                                </div>
                                            </div>

                                            <div className="timeline-block timeline-block-left">
                                                <div className={shipped2}><i className={shipped} aria-hidden="true"></i></div>
                                                <div className="timeline-content">
                                                    <h3>Shipped</h3>
                                                    
                                                    
                                                </div>
                                            </div>

                                            <div className="timeline-block timeline-block-right active">
                                                <div className={delivered2}><i className={delivered} aria-hidden="true"></i></div>
                                                <div className="timeline-content">
                                                    <h3>Delivered</h3>
                                                    <span>{deliver_msg}</span> 
                                                    
                                                    
                                                </div>
                                            </div>
   
                                            </div>
                                        </td>
                                        <td>
                                        <ul>
                                    
                                        <li>{shipping.name}</li>
                                        <li>{shipping.address}</li>
                                        <li>{shipping.phone}</li>
                                        <li>{shipping.city}</li>
                                        <li>{shipping.city}</li>
                                        <li>{shipping.zip}</li>
                                        <li>{shipping.state}</li>
                                        <li>{shipping.country}</li>

                                            </ul>
                                        </td>


                                    </tr>
                                )
                             

                            })}


                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='wrap_empty text-center' style={{marginTop:"100px"}}>
                    <h3>Currently, There are no any Order</h3>
                    <Link to='/profile'>Browse Products</Link>
                </div>
            )
            }
        </div>
    )
}

export default Order