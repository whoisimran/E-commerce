import React, { useState, useEffect } from 'react'
// import { getpayment } from '../../server/api/service'

const Payment_list = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getpayment();

    }, [])

    const getpayment = async () => {
        let response = await fetch(`http://localhost:8080/api/payment`);
        let res = await response.json();
        setData(res.message)
    }
    return (
        <div className='container'>
            <h1 align="center">Payment List</h1>
            <table className='table table-bordered mt-5'>
                <thead>
                    <tr>
                        <th>Token Id</th>
                        <th>Room Id</th>
                        <th>Status</th>
                        <th>Recipt Url</th>
                    </tr>
                </thead>
                <tbody>

                    {data && data.map((value, index) => {


                        return (
                            <tr key={index}>
                                <td>{value.token_id}</td>
                                <td>{value.room_id}</td>
                                <td>{value.status}</td>
                                <td><a href={value.receipt_url} target="_blank">Click Here</a></td>

                            </tr>
                        )


                    })}


                </tbody>
            </table>
        </div>
    )
}

export default Payment_list