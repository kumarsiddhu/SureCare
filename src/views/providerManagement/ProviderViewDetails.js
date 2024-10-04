// src/components/CustomerDetail.js

import React from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';
import { useHistory } from 'react-router-dom'; // Assuming you are using react-router

const CustomerDetail = ({ customer }) => {
  const history = useHistory(); // Get history object for navigation

  return (
    <CCard className="m-4">
      <CCardBody>
        <CCardTitle className="text-center">Customer Details</CCardTitle>
        <CCardText>
          <strong>Full Name:</strong> {customer.fullname}
        </CCardText>
        <CCardText>
          <strong>Mobile Number:</strong> {customer.mobileNumber}
        </CCardText>
        <CCardText>
          <strong>Email:</strong> {customer.email}
        </CCardText>
  
        <CButton color="primary" onClick={() => history.push('/provider-management')}>
          Back to List
        </CButton>
      </CCardBody>
    </CCard>
  );
};

export default CustomerDetail;
