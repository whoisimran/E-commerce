import React,{useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import Carditem from './Carditem';
// import Cart from './Cart';


const Single_product = () => {


  const location = useLocation();
  let id = location.state.id;

  const [data, setdata] = useState({});
  useEffect(() => {
    getproduct();
  }, [])

  const getproduct = async () => {
    let response = await fetch(`http://localhost:8080/api/product/${id}`);
    let res = await response.json();
    setdata(res.message); 
  }


  
  return (
    <>
  {/* <button style={{marginTop:"150px"}} type="button"  className="btn btn-demo" data-toggle="modal" data-target="#myModal2">
    Right Sidebar Modal
  </button>
    <div className="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
  
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">JUST ADDED TO YOUR CART</h4>
          </div>
  
          <div className="modal-body">
            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </p>
          </div>
  
        </div>
      </div>
    </div> */}
  
        <Carditem item={data} />
 

        </>
        
 
  )
}

export default Single_product