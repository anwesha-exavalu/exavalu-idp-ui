import React from 'react';
import {PublicHeaderstyled} from '../../styles/components/Header'
import strlogo from '../../assets/images/logo.png'

const PublicHeader = () => {
  return (
    <PublicHeaderstyled>
    <div className="public-header">
      <img
        src={strlogo}
        alt="Logo"
        className="public-logo"
      />
    </div>
    </PublicHeaderstyled>
  );
};

export default PublicHeader;
