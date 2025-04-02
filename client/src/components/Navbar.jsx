

import React, { useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/appContext';
import '../styles/Navbar.css'; // CSS file import की है

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  return (
    <div className="navbar">
      <Link to={'/'}>
        <img className="logo" src={assets.logo} alt="logo" />
      </Link>

      {isSignedIn ? (
        <div className="user-section">
          <button onClick={() => navigate('/buy')} className="credit-btn">
            <img className="credit-icon" src={assets.credit_icon} alt="" />
            <p>Credits: {credit}</p>
          </button>
          <p className="user-name">Hi, {user.fullName}</p>
          <UserButton />
        </div>
      ) : (
        <button onClick={() => openSignIn({})} className="get-started-btn">
          Get Started <img className="arrow-icon" src={assets.arrow_icon} alt="arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
