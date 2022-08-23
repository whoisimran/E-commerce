import React from "react";
import { useCart } from "react-use-cart";
const Carditem = (props) => {
  const { addItem } = useCart();
  let data = props.item;
  data.id = data._id;
  return (
    
    <div className='container-fluid'>
        <div className='row mt-5'>
            <div className='col-md-4'>
                <img className="mt-5" style={{width:"700px"}} src={data.image} alt="product-Image" />

            </div>
            <div className='col-md-2'>

            </div>
            <div className='col-md-6' style={{marginTop:"120px"}}>
         
            <h4>{data.title}</h4><br />
            <h5>RS {data.price}</h5><br />
            <p>{data.description}</p>
            <button onClick={() => addItem(data)} className='btn btn-dark'>Add to cart</button>
           
            </div>
        </div>
    </div>
  )
}

export default Carditem
