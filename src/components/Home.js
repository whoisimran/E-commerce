import React, { useState, useEffect } from 'react'

const Home = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getroom();
  }, [])

  const getroom = async () => {
    let response = await fetch('http://localhost:8080/api/product');
    let res = await response.json();
    setdata(res.message);
    // console.log(res)
  }

  return (
    <div className='container-fluid' style={{marginTop:"100px"}}>

      <table className='table table-bordered mt-5'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Collection</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.title}</td>
                <td>RS {value.price}</td>
                <td>{value.collections}</td>
                <td><img src={value.image} width="200" /></td>


              </tr>

            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
