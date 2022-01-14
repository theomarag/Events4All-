
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage';
import { Component } from 'react';
import { useMediaQuery } from 'react-responsive';
import EventsComponent from './pages/events/MainPage';
import EventInfo from './pages/events/EventInfo';
import FeaturedEvents from './pages/events/MainPage';
import CreateNewEvent from './pages/events/CreateNewEvent';
import ContactUs from './pages/contact/contactUs';
import FooterDiv from './components/Footer/Footer';
import UpButton from './components/UpButton/UpButton';
import Cart from './components/Cart/Cart';
import RegisterPage from './pages/register/Register';
import OrganizerEvents from './pages/events/EventsByOrganizer/OrganizerEvents';
import ReactDatePicker from 'react-datepicker';
import OrganizerEventInfo from './pages/events/EventsByOrganizer/EventInfoOrganizer';
import ReactDOM from "react-dom";
import React from 'react';

const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cartItems: JSON.parse(localStorage.getItem("cart")),
      userRole: ''
    }
  }




  addToCart = (p) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart;
    
    cartItems.map(item => {
      if(item.eventId == p.eventId && item.ticketCategory == p.ticketCategory){
        item.count++
        alreadyInCart=true;
      }
    });
    if(p.ticketPrice == 0){
      console.log(p.ticketPrice)
      alreadyInCart=true;
    }
    if(!alreadyInCart){
      cartItems.push({...p, count: 1});
    } 
    this.setState({cartItems})
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  addQuantity = (p) => {
    ++p.count;
    console.log(p.count);
    let cartStorage = JSON.parse(localStorage.getItem("cart"));
    cartStorage.map(pr => {
      console.log(pr)
      if(p.eventId==pr.eventId && p.ticketCategory == pr.ticketCategory){
        pr.count=p.count
      }
    });
    localStorage.setItem("cart", JSON.stringify(cartStorage));
    this.setState({cartItems: JSON.parse(localStorage.getItem("cart"))});
    
      
  }

  subtractQuantity = (p) => {
    if(p.count>1){
      --p.count;
      console.log(p.count);
      let cartStorage = JSON.parse(localStorage.getItem("cart"));
      cartStorage.map(pr => {
        console.log(pr +"ff");
        if(p.eventId==pr.eventId && p.ticketCategory == pr.ticketCategory){
          pr.count=p.count
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartStorage));
      this.setState({cartItems: JSON.parse(localStorage.getItem("cart"))});
    }
    
  }

  removeProduct = (p) =>{
    this.state.cartItems.splice(this.state.cartItems.indexOf(p),1);
    this.setState({cartItems: this.state.cartItems})
    localStorage.setItem("cart", JSON.stringify(this.state.cartItems));
  }

  emptyCart = () =>{
    this.setState({cartItems: []});
    localStorage.removeItem("cart")
  }
  
  render() {
    const attributes = {
      chosenproducts: this.state.cartItems,
      emptycart: this.emptyCart,
      addquantity: this.addQuantity,
      subtractquantity: this.subtractQuantity,
      removeproduct: this.removeProduct
    }

    return (
      <div className="customContainer">
        <NavigationBar {...attributes}/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events/mainpage" element={<FeaturedEvents addToCart={this.addToCart} />} />
          <Route path="/events/info/:id" element={<EventInfo addToCart={this.addToCart}/>} />
          <Route path="/createnewevent" element={<CreateNewEvent />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/myeventsorganizer" element={<OrganizerEvents />} />
          <Route path="/myeventsorganizer/info/:id" element={<OrganizerEventInfo />} />
        </Routes>
        <UpButton />
        <FooterDiv />
        <PayPalButton
        createOrder={(data, actions) => this.createOrder(data, actions)}
        onApprove={(data, actions) => this.onApprove(data, actions)}
      />
      </div>
    );
  }
}

export default App;
