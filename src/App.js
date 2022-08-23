import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Product from './components/Product';
import { CartProvider } from "react-use-cart";

import Login from './components/Login';
import Registration from './components/Registration'

import WithoutNav from './components/Withoutnav';
import Withnav from './components/Withnav';
import User from './components/User';
import Profile from './components/Profile';
import Payment from './components/Payment';
import './App.css';
import Order_list from './components/Order_list';
import Order from './components/Order';
import Single_product from './components/Single_product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Men from './components/Men';
import Kids from './components/Kids';
import Women from './components/Women';




let role = localStorage.getItem('role');

function App() {
  return (
    <div className="App">
       <CartProvider>
      <Router>
    <Routes>
    <Route element={<WithoutNav />}>
      <Route exact path='/' element={< Login />} />
    </Route>
    <Route element={<WithoutNav />}>
      <Route exact path='/registration' element={< Registration />} />
    </Route>


    <Route element={<Withnav role={role}/>}>
      <Route exact path='/home' element={< Home />} />
    </Route>
    <Route element={<Withnav role={role}/>}>
      <Route exact path='/product' element={< Product />} />
    </Route>
    <Route element={<Withnav role={role}/>}>
      <Route exact path='/cart' element={< Cart />} />
    </Route>
    <Route element={<WithoutNav />}>
      <Route exact path='/checkout' element={< Checkout />} />
    </Route>
    <Route element={<Withnav role={role}/>}>
      <Route exact path='/userlist' element={< User />} />
    </Route>
    <Route element={<Withnav role={role}/>}>
      <Route exact path='/profile' element={< Profile />} />
    </Route>
    <Route element={<Withnav role={role}/>}>
      <Route exact path='/Single_product' element={< Single_product />} />
    </Route>
    <Route element={<Withnav role={role}/>}>
      <Route exact path='/men' element={< Men />} />
    </Route>

    <Route element={<Withnav role={role}/>}>
      <Route exact path='/women' element={< Women />} />
    </Route>

    <Route element={<Withnav role={role}/>}>
      <Route exact path='/kids' element={< Kids />} />
    </Route>

    <Route element={<Withnav role={role}/>}>
      <Route exact path='/payment' element={< Payment />} />
    </Route>
    <Route element={<Withnav role={role}/>}>
      <Route exact path='/order_list' element={< Order_list />} />
    </Route>
    <Route element={<Withnav role={role}/>}>
      <Route exact path='/order' element={< Order/>} />
    </Route>
   
   
    
{/* 
    <Route element={<Withnav />}>
      <Route exact path='/gallery' element={< Gallery />} /> 
    </Route>

    <Route element={<Withnav />}>
      <Route exact path='/image' element={< Image />} />
    </Route>
    <Route element={<Withnav />}>
      <Route exact path='/blogPage' element={< Blogpage />} />
    </Route>
    <Route element={<Withnav />}>
      <Route exact path='/contact' element={< Contact />} />
    </Route>
    <Route element={<Withnav />}>
      <Route exact path='/payment' element={< Payment />} />
    </Route> */}
   
      
    </Routes>
    </Router>
    </CartProvider>

    </div>
  );
}

export default App;
