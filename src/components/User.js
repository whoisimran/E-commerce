import React,{useState,useEffect} from 'react'

const User = () => {
  const [data,setdata] = useState([]);

  useEffect(()=>{
      getuser();
  },[])

  const getuser = async () => {
    let response = await fetch('http://localhost:8080/api/user');
    let res = await response.json();
    setdata(res.message);
    console.log(res)
  }

    return (
        <div className='container-fluid'>
            <h1 align="center">User List...</h1>
            <table className='table table-bordered mt-5'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((value, index) => {
                        if (value.role == 'user') {
                            return (
                                <tr key={index}>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.mobile}</td>
                                </tr>

                            )

                        }

                    })}
                </tbody>
            </table>
        </div>
    )
}

export default User
