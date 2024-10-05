import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CButton,
  CFormInput,
} from '@coreui/react'
import { useParams } from 'react-router-dom' // To get customer ID from URL params
import axios from 'axios'
import { getCustomerData, updateCustomerData } from '../../APIs/CustomerAPI'
const CustomerViewDetails = () => {
  const { id } = useParams() // Get the customer ID from the URL params
  const [customer, setCustomer] = useState(null)
  const [editedCustomer, setEditedCustomer] = useState(null) // For storing edited customer details
  const [editMode, setEditMode] = useState(false) // Toggle between view and edit mode
  const [activeTab, setActiveTab] = useState('basic') // Default active tab

  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      const customerData = await getCustomerData(id)
      setCustomer(customerData)
      setEditedCustomer(customerData)
    }

    if (id) {
      fetchCustomer()
    }
  }, [id])

  // Toggle edit mode
  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedCustomer({ ...editedCustomer, [name]: value })
  }

  // Update customer data
  const handleUpdateClick = async () => {
    const updatedCustomer = await updateCustomerData(editedCustomer.id, editedCustomer)
    setCustomer(updatedCustomer)
    setEditMode(false)
    alert('Customer updated successfully!')
  }

  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  }

  return (
    <div>
      {customer ? (
        <>
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
            </CCardBody>
          </CCard>

          <CAccordion className="mt-4" activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>Personal Information</CAccordionHeader>
              <CAccordionBody>
                <div className="mt-3 ">
                  {/* Edit or Update Button */}
                  {editMode ? (
                    <CButton color="primary" onClick={handleUpdateClick}>
                      Update
                    </CButton>
                  ) : (
                    <CButton color="secondary" onClick={handleEditClick}>
                      Edit
                    </CButton>
                  )}
                </div>
                {activeTab === 'basic' && (
                  <div className="customer-details-grid mt-4" style={gridStyle}>
                    <p>
                      <strong>ID:</strong>{' '}
                      {editMode ? (
                        <CFormInput
                          name="id"
                          value={editedCustomer.id}
                          onChange={handleInputChange}
                          disabled // ID should not be editable
                        />
                      ) : (
                        customer.id || 'NA'
                      )}
                    </p>
                    <p>
                      <strong>Full Name:</strong>{' '}
                      {editMode ? (
                        <CFormInput
                          name="fullname"
                          value={editedCustomer.fullname}
                          onChange={handleInputChange}
                        />
                      ) : (
                        customer.fullname || 'NA'
                      )}
                    </p>
                    <p>
                      <strong>Mobile Number:</strong>{' '}
                      {editMode ? (
                        <CFormInput
                          name="mobileNumber"
                          value={editedCustomer.mobileNumber}
                          onChange={handleInputChange}
                        />
                      ) : (
                        customer.mobileNumber || 'NA'
                      )}
                    </p>
                    <p>
                      <strong>Email:</strong>{' '}
                      {editMode ? (
                        <CFormInput
                          name="email"
                          value={editedCustomer.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        customer.email || 'NA'
                      )}
                    </p>
                    <p>
                      <strong>Gender:</strong>{' '}
                      {editMode ? (
                        <CFormInput
                          name="gender"
                          value={editedCustomer.gender}
                          onChange={handleInputChange}
                        />
                      ) : (
                        customer.gender || 'NA'
                      )}
                    </p>
                    <p>
                      <strong>Blood Group:</strong>{' '}
                      {editMode ? (
                        <CFormInput
                          name="bloodgroup"
                          value={editedCustomer.bloodgroup}
                          onChange={handleInputChange}
                        />
                      ) : (
                        customer.bloodgroup || 'NA'
                      )}
                    </p>
                    <p>
                      <strong>Age:</strong>{' '}
                      {editMode ? (
                        <CFormInput
                          name="age"
                          value={editedCustomer.age}
                          onChange={handleInputChange}
                        />
                      ) : (
                        customer.age || 'NA'
                      )}
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      {editMode ? (
                        <CFormInput
                          name="status"
                          value={editedCustomer.status}
                          onChange={handleInputChange}
                        />
                      ) : (
                        customer.status || 'NA'
                      )}
                    </p>
                  </div>
                )}
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </>
      ) : (
        <p>Loading customer details...</p>
      )}
    </div>
  )
}

export default CustomerViewDetails
