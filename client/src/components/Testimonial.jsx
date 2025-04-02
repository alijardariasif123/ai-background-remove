

import React from 'react';
import { testimonialsData } from '../assets/assets';
import '../styles/Testimonial.css';

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h1 className="testimonials-heading">
        Customer Testimonials
      </h1>
      <div className="testimonials-wrapper">
        {testimonialsData.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <span className="testimonial-quote">”</span>
            <p className="testimonial-text">{item.text}</p>
            <div className="testimonial-profile">
              <img className="testimonial-img" src={item.image} alt="Profile" />
              <div>
                <p className="testimonial-author">{item.author}</p>
                <p className="testimonial-job">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
