import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const CustomerViewDetails = () => {
  const { id } = useParams() // Get the customer ID from the URL
  const [customer, setCustomer] = useState(null)

  // Simulated customer data
  const customerData = {
    1: { id: 1, fullname: 'Beetlejuice', mobileNumber: '7856452178', email: 'nea@gmail.com' },
    2: { id: 2, fullname: 'Ghostbusters', mobileNumber: '9876543210', email: 'ghostbusters@gmail.com' },
    3: { id: 3, fullname: 'Inception', mobileNumber: '1234567890', email: 'inception@gmail.com' },
  }

  useEffect(() => {
    // Simulate fetching customer data
    const selectedCustomer = customerData[id]
    setCustomer(selectedCustomer)
  }, [id]) // This effect runs every time the ID changes

  return (
    <div>
      {customer ? (
        <CCard>
          <CCardHeader>Customer Details</CCardHeader>
          <CCardBody>
            <p><strong>ID:</strong> {customer.id}</p>
            <p><strong>Name:</strong> {customer.fullname}</p>
            <p><strong>Mobile Number:</strong> {customer.mobileNumber}</p>
            <p><strong>Email:</strong> {customer.email}</p>
          </CCardBody>
        </CCard>
      ) : (
        <p>Loading customer details...</p>
      )}
    </div>
  )
}

export default CustomerViewDetails
