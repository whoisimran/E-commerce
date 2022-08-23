import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const PreBooking = () => {
    const user_id = localStorage.getItem('id');
    const [data, setdata] = useState([]);
    const [found, setfound] = useState(null)
    // const [room, setRoom] = useState([]);
    useEffect(() => {
        getbooking();
    }, [])


    const getbooking = async () => {
        let response = await fetch(`http://localhost:8080/api/booking/${user_id}`);
        let res = await response.json();
        setdata(res.message);
        let result = res.message;

        let found2 = result.find((item) => {
            if (item.status == 'checkOut') {
                return true
            } else {
                return false
            }
        })

        setfound(found2);

    }
    console.log('data', data);

    return (
        <div className='container-fluid'>
            {found ? (
                <div className='wrap_table'>
                    <h1 align="center">Prevoius Booking</h1>
                    <table className='table table-bordered mt-5'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Payment-Status</th>
                                <th>Status</th>
                                <th>Recipt Url</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data && data.map((value, index) => {
                                let room = JSON.parse(value.room_details)
                                if (value.status == 'checkOut') {
                                    return (
                                        <tr key={index}>
                                            <td>{room.title}</td>
                                            <td>{room.price}</td>
                                            <td>{value.payment}</td>
                                            <td>{value.status}</td>
                                            <td><a href={value.receipt_url} target="_blank">Click Here</a></td>
                                            <td><img src={room.image} width="150" /></td>



                                        </tr>
                                    )

                                }

                            })}


                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='wrap_empty text-center'>
                    <h3>Currently, There are no any Prevoius Booking</h3>
                    <Link to='/profile'>Book Now</Link>
                </div>
            )
            }
        </div>
    )
}

export default PreBooking