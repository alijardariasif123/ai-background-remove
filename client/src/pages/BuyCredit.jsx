
import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/BuyCredit.css';

const BuyCredit = () => {
  const { backendUrl, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Payment for credits',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        const token = await getToken();
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verify-razor',
            response,
            { headers: { token } }
          );
          if (data.success) {
            loadCreditsData();
            navigate('/');
            toast.success('Credits added successfully');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + '/api/user/pay-razor',
        { planId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="buy-credit-container">
      <button className="our-plans-btn">Our Plans</button>
      <h1 className="title">Choose the plan that's right for you</h1>
      <div className="plans-container">
        {plans.map((item, index) => (
          <div className="plan-card" key={index}>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="plan-id">{item.id}</p>
            <p className="plan-desc">{item.desc}</p>
            <p className="plan-price">
              <span>${item.price}</span>/{item.credits} Credits
            </p>
            <button onClick={() => paymentRazorpay(item.id)} className="purchase-btn">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
