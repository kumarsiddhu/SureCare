import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink } from '@coreui/react'

const CustomerViewDetails = () => {
  const { id } = useParams() // Get the customer ID from the URL
  const [customer, setCustomer] = useState(null)
  const [activeTab, setActiveTab] = useState('basic') // Set the default active tab to 'basic'

  // Simulated customer data
  const customerData = {
    1: { id: 1, fullname: 'Beetlejuice', mobileNumber: '7856452178', email: 'nea@gmail.com' },
    2: { id: 2, fullname: 'Ghostbusters', mobileNumber: '9876543210', email: 'ghostbusters@gmail.com' },
    3: { id: 3, fullname: 'Inception', mobileNumber: '1234567890', email: 'inception@gmail.com' },
  }

  useEffect(() => {
    // Convert id to number before accessing customerData
    const selectedCustomer = customerData[Number(id)]
    setCustomer(selectedCustomer)
  }, [id])

  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div>
      {customer ? (
        <CCard>
          <CCardHeader>Customer Details</CCardHeader>
          <CCardBody>
            {/* Navigation Tabs */}
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink
                  href="#"
                  active={activeTab === 'basic'}
                  onClick={() => handleTabClick('basic')}
                >
                  Basic Details
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="#"
                  active={activeTab === 'address'}
                  onClick={() => handleTabClick('address')}
                >
                  Address
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="#"
                  active={activeTab === 'health'}
                  onClick={() => handleTabClick('health')}
                >
                  Health Care
                </CNavLink>
              </CNavItem>
            </CNav>

            {/* Conditionally render based on active tab */}
            {activeTab === 'basic' && (
              <div>
                <p>
                  <strong>ID:</strong> {customer.id}
                </p>
                <p>
                  <strong>Name:</strong> {customer.fullname}
                </p>
                <p>
                  <strong>Mobile Number:</strong> {customer.mobileNumber}
                </p>
                <p>
                  <strong>Email:</strong> {customer.email}
                </p>
              </div>
            )}

            {activeTab === 'address' && (
              <div>
                <p>See the Address</p>
              </div>
            )}

            {activeTab === 'health' && (
              <div>
                <p>Health Care Profile</p>
              </div>
            )}
          </CCardBody>
        </CCard>
      ) : (
        <p>Loading customer details...</p>
      )}
    </div>
  )
}

export default CustomerViewDetails
