import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const Order_list = () => {
    const user_id = localStorage.getItem('id');
    const [data, setdata] = useState([]);
    const [found, setfound] = useState(false)

    // const [room, setRoom] = useState([]);
    useEffect(() => {
        getorder();
    }, [])

    const getorder = async () => {
        let response = await fetch(`http://localhost:8080/api/order`);
        let res = await response.json();
        console.log(res)
        if(res.success){
            setdata(res.message.reverse());
            if(res.message.length == 0){
                console.log('inside')
                setfound(false);
            }else{
                setfound(true);
            }
        }else{
            console.log('something went wrong!')
        }
        
       
        
    }
   
    const changehandler = async (e,id)=>{
        let f_status = e.target.value;
        console.log(id,f_status)
       
        let response = await fetch(`http://localhost:8080/api/order/${id}`,{
            method : "PATCH",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fulfillment_status:f_status})
        });
        let res = await response.json();
        if(res.success){

            let response2 = await fetch('http://localhost:8080/api/sendmail',{
                method : "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from:'imran.techinfini@gmail.com',to:'imranul.haque@techinfini.in',msg:f_status})
            });
            let result = await response2.json();
            if(result.success){
                alert(result.message)
            }else{
                alert('somethings went wrong!')
            }

        }else{
            alert('something went wrong!')
        }
}

    return (
        <div className='container-fluid' style={{margintop:"100px"}}>
            {found ? (
                <div className='wrap_table'>
                    <h1 align="center mt-5">All Orders</h1>
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
                                let all_select = "";
                                if(value.fulfillment_status == 'Unfulfilled'){
                                    all_select += `<option value="Unfulfilled" disabled selected>Unfulfilled</option>`;
                                    all_select += `<option value="Shipped">Shipped</option>`;
                                    all_select += `<option value="Fulfilled">Fulfilled</option>`;

                                }else if(value.fulfillment_status == 'Shipped'){
                                    all_select += `<option value="Shipped" selected disabled>Shipped</option>`;
                                    all_select += `<option value="Fulfilled">Fulfilled</option>`;
                                    all_select += `<option value="Unfulfilled" disabled>Unfulfilled</option>`;
                                }else{
                                    all_select += `<option value="Fulfilled" selected>Fulfilled</option>`;
                                    all_select += `<option value="Shipped" disabled>Shipped</option>`;
                                    all_select += `<option value="Unfulfilled" disabled>Unfulfilled</option>`;
                                }
                               
                                return (
                                    <tr key={index}>
                                        <td>{orders.id}</td>
                                                   
                                                <td>
                                                {line_item.map((item,key)=>{
                                                 return(
                                                  <li><a href={item.image} target="_blank">Mockup</a></li>

                                                 )
                                                })}
                                                </td>
                                               
                                                <td>
                                                {line_item.map((item,key)=>{
                                               return <li>{item.title}</li>
                                                })}
                                                </td>   
                                        
                                       
                                        <td>{orders.total_price}</td>
                                        <td>{orders.financial_status}</td>
                                        <td><select className='form-control' onChange={(e)=>changehandler(e,value._id)} dangerouslySetInnerHTML={{__html: all_select}}>
                                            </select></td>
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

export default Order_list