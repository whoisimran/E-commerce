import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Women = () => {
    const navigate = useNavigate();
    const [data, setdata] = useState([]);


    useEffect(() => {
        getroom();
    }, [])
   

    const getroom = async () => {
        let response = await fetch('http://localhost:8080/api/product');
        let res = await response.json();
        setdata(res.message);
        console.log(res)
    }

 
    const single_page = (id) => {
        navigate('/Single_product', { state: { id: id } })
    }


    return (
        <div className='container' style={{marginTop:"70px"}}>
            <div className='row'>
                {data.map( (value, index) => {
                    if(value.collections == 'Women'){

                        return (
                            <div key={index} className='col-md-4'>
                                <div onClick={()=>single_page(value._id)} className="card2 mb-3 mt-5" style={{ maxWidth: "740px", height:"600px",cursor:"pointer" }}>
                                    <div className="row no-gutters">
                                        <div className="col-md-12">
                                            <img src={value.image} className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-12">
                                            <div className="card-body">
                                                <h5 className="card-title">{value.title}</h5>
                                                
                                                <p className="card-text" style={{ fontWeight: "bold" }}> RS: {value.price} </p>
                                  

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }    
                    
                 })}
            </div>
        </div>
    )
}

export default Women