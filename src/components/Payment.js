import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

// import { getratingbyid } from '../../server/api/service';


const Payment = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem('id');
  
  const location = useLocation();
  let id = location.state.id;

  const [data, setdata] = useState({});
  const [facility, setfacility] = useState([]);
  const [user, setUser] = useState({})
  const [allrating, setAllrating] = useState([])

  useEffect(() => {
    getroom();
    getuser();
    getreview();
  }, [])

  const getroom = async () => {
    let response = await fetch(`http://localhost:8080/api/room/${id}`);
    let res = await response.json();
    setdata(res.message);
    let obj = JSON.parse(res.message.facility);
    setfacility(obj)
    // console.log(res)
  }

  // Get User here

  const getuser = async () => {
    let response = await fetch(`http://localhost:8080/api/user/${user_id}`);
    let res = await response.json();
    setUser(res.message)
  }

  // Get rating code here ...

  const getreview = async () => {
    let response = await fetch(`http://localhost:8080/api/rating/${id}`);
    let res = await response.json();

    setAllrating(res.message);
  }

  const onToken = async (token, addresses) => {
    document.getElementById('loader').style.display = "block";
    document.getElementsByClassName('loader_content')[0].style.display = "block";
    document.getElementsByClassName('App')[0].style.background = "rgba(0,0,0,0.3)";


    let json_data = JSON.stringify(data)

    let response = await fetch(`http://localhost:8080/checkout`, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token, product: data })
    });

    let res = await response.json();
    //   console.log(res)

    let response2 = await fetch(`http://localhost:8080/api/booking`, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ room_id: data._id, user_id: user_id, room_details: json_data, payment: res.message.status, receipt_url: res.message.receipt_url })
    });

    let res2 = await response2.json();
    console.log('booking', res2)
    if (res2.success) {

      let response3 = await fetch(`http://localhost:8080/api/room/${data._id}`, {
        method: "PATCH",
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: "Booked" })
      });
      let res3 = await response3.json();
      if (res3.success) {
        document.getElementById('loader').style.display = "none";
        document.getElementsByClassName('loader_content')[0].style.display = "none";
        document.getElementsByClassName('App')[0].style.background = "white";


        navigate('/booking')
      } else {
        alert('something went wrong!')
      }
    } else {
      alert('Something went wrong!')
    }
  }

  const review_submit = async () => {
    var radios = document.getElementsByName('rating');
    for (var radio of radios) {
      if (radio.checked) {
        let rating_value = radio.value;
        let comment = document.getElementById('comment').value;
        let response = await fetch(`http://localhost:8080/api/rating`, {
          method: "POST",
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ room_id: id, user_id: user._id, user_name: user.name, review: comment, rating: rating_value })
        });
        let res = await response.json();
        console.log(res)
        if(res.success){
          getreview();
        }
      }
    }
  }

  return (
    <div className='container'>
      <div id="loader"></div>
      <p className='loader_content'>Please Wait While we Booking Your Room...</p>

      <div className="card2 mb-3 mt-5" style={{ maxWidth: "740px" }}>
        <div className="row no-gutters">
          <div className="col-md-12">
            <img src={data.image} className="card-img" alt="..." />
          </div>
          <div className="col-md-12">
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">{data.description}</p>

              <p className="card-text" style={{ fontWeight: "bold" }}> &nbsp; &nbsp; &nbsp; &nbsp; Price: {data.price} Per Night</p>
              <StripeCheckout
                token={onToken}
                className="float-right"
                stripeKey="pk_test_51JtRscSJHOjmNjIW2goelMNiHDQG1jpS4dIWamP0t7dM4zrWal0cDvtUS3U5MnlyKmgJPOcckI2pT2uWAQBXXfIJ00hVhziG7I"
                amount={data.price}
                name={data.title}
                billingAddress
              /><br /><br />
              <p className="card-text" style={{ fontWeight: "bold" }}>Room Facilities</p>
              <ul className='wrap_list'>
                {facility.map((fact) => {
                  return <li className='facility'>{fact.label}</li>
                })}
              </ul>


            </div>
          </div>
        </div>
      </div>
      <fieldset>
        <legend>Rating Our Hote:</legend>
        <div class="star-rating mt-2 mb-1">
          <input type="radio" id="5-stars" name="rating" value="5" />
          <label for="5-stars" class="star">&#9733;</label>
          <input type="radio" id="4-stars" name="rating" value="4" />
          <label for="4-stars" class="star">&#9733;</label>
          <input type="radio" id="3-stars" name="rating" value="3" />
          <label for="3-stars" class="star">&#9733;</label>
          <input type="radio" id="2-stars" name="rating" value="2" />
          <label for="2-stars" class="star">&#9733;</label>
          <input type="radio" id="1-star" name="rating" value="1" />
          <label for="1-star" class="star">&#9733;</label>
        </div>
        <input type="text" id="comment" className='form-control' style={{ width: "480px" }} placeholder="Write a review" />
        <button onClick={review_submit} className='btn btn-primary mt-2'>Submit</button>
      </fieldset>

      <article className='mt-3 mb-2' style={{height:'400px',overflowY:'scroll'}}>
      <h3>Display All Rating</h3>
        {allrating.map((value, index) => {
          setTimeout(()=>{
          document.querySelector(`input[name='${index}'][value='${value.rating}']`).checked = true 

          },1000)
          return (
            <div key={index} className='wrap_field'>
            <p>{value.user_name}</p>  
              <div class="star-rating2" key={index}>   
              <input type="radio" disabled id="5-stars2" name={index} value="5" />
              <label for="5-stars2" class="star">&#9733;</label>
              <input type="radio" disabled  id="4-stars2" name={index} value="4" />
              <label for="4-stars2" class="star">&#9733;</label>
              <input type="radio" disabled id="3-stars2" name={index}  value="3" />
              <label for="3-stars2" class="star">&#9733;</label>
              <input type="radio" disabled id="2-stars2" name={index}  value="2" />
              <label for="2-stars2" class="star">&#9733;</label>
              <input type="radio" disabled id="1-star2" name={index}  value="1" />
              <label for="1-star2" class="star">&#9733;</label>
            </div>
            <p>{value.review}</p>
          
            
            </div>
            
          )
          
          
           
          
        })}
      </article>

    </div>
  )

}

export default Payment