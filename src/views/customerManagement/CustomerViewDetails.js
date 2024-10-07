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
  CFormSelect,
} from '@coreui/react'
import { useParams } from 'react-router-dom' // To get customer ID from URL params
import axios from 'axios'
import { getCustomerDataByID, updateCustomerData } from '../../APIs/CustomerAPI'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const CustomerViewDetails = () => {
  const { id } = useParams() // Get the customer ID from the URL params
  const [customer, setCustomer] = useState(null)
  const [editedCustomer, setEditedCustomer] = useState(null) // For storing edited customer details
  const [editMode, setEditMode] = useState(false) // Toggle between view and edit mode
  const [activeTab, setActiveTab] = useState('basic') // Default active tab
  const [mobileError, setMobileError] = useState('')
  const [emailError, setEmailError] = useState('')
  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      const customerData = await getCustomerDataByID(id)
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

    // mobile validation
    if (name === 'mobileNumber') {
      if (value.length < 10 || value.length > 10 || value.length === 0) {
        setMobileError('Mobile number must be 10 digits long.')
      } else {
        setMobileError('')
      }
    }

    // email vaidation
    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/ // Regex to validate Gmail format
      if (!emailRegex.test(value)) {
        setEmailError('Please enter a valid Gmail address.')
      } else {
        setEmailError('')
      }
    }
  }

  // Update customer data
  const handleUpdateClick = async () => {
    // mobile
    if (mobileError) {
      toast.error('Please fix the errors before updating the customer.', {
        position: 'top-right',
      })
      return
    }

    // email
    if (emailError) {
      toast.error('Please fix the errors before updating the customer.', {
        position: 'top-right',
      })
      return
    }
    const updatedCustomer = await updateCustomerData(editedCustomer.id, editedCustomer)
    setCustomer(updatedCustomer)
    setEditMode(false)
    toast.success('Customer Details updated successfully!', {
      position: 'top-right',
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: false, // Show progress bar
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
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

  // style
  const centeredMessageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px', // Adjust height as needed
    fontSize: '1.5rem',
    color: '#808080', // Red color for error message
  }

  return (
    <div>
      <ToastContainer />
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
          {/* Customer Information */}
          {activeTab === 'basic' && (
            <CAccordion className="mt-4" activeItemKey={1}>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  {' '}
                  <span>Personal Information</span>
                  <span
                    style={{
                      marginLeft: '10px', // Spacing between text and indicator
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%', // Makes it a circle
                      display: 'inline-block',
                      backgroundColor:
                        customer.status === 'active'
                          ? 'green'
                          : customer.status === 'inactive'
                            ? 'orange'
                            : customer.status === 'suspended'
                              ? 'red'
                              : 'gray', // Default color for unknown status
                    }}
                  />
                </CAccordionHeader>
                <CAccordionBody>
                  <>
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
                          <>
                            <CFormInput
                              name="mobileNumber"
                              value={editedCustomer.mobileNumber}
                              onChange={handleInputChange}
                              maxLength={10} // Maximum length set to 10
                              placeholder="Enter mobile number"
                            />
                            {mobileError && <p style={{ color: 'red' }}>{mobileError}</p>}{' '}
                            {/* Display error message */}
                          </>
                        ) : (
                          customer.mobileNumber || 'NA'
                        )}
                      </p>
                      <p>
                        <strong>Email:</strong>{' '}
                        {editMode ? (
                          <>
                            <CFormInput
                              name="email"
                              value={editedCustomer.email}
                              onChange={handleInputChange}
                              placeholder="Enter Gmail address"
                            />
                            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}{' '}
                            {/* Display error message */}
                          </>
                        ) : (
                          customer.email || 'NA'
                        )}
                      </p>
                      <p>
                        <strong>Gender:</strong>{' '}
                        {editMode ? (
                          <CFormSelect
                            name="gender"
                            value={editedCustomer.gender}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Gender</option> {/* Default option */}
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </CFormSelect>
                        ) : (
                          customer.gender || 'NA'
                        )}
                      </p>
                      <p>
                        <strong>Blood Group:</strong>{' '}
                        {editMode ? (
                          <CFormSelect
                            name="bloodgroup"
                            value={editedCustomer.bloodgroup}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Blood Group</option> {/* Default option */}
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </CFormSelect>
                        ) : (
                          customer.bloodgroup || 'NA'
                        )}
                      </p>
                      <p>
                        <strong>Age:</strong>{' '}
                        {editMode ? (
                          <CFormInput
                            name="age"
                            type="number"
                            value={editedCustomer.age}
                            onChange={handleInputChange}
                          />
                        ) : (
                          customer.age + ' ' + 'Years' || 'NA'
                        )}
                      </p>
                      <p>
                        <strong>Status:</strong>{' '}
                        {editMode ? (
                          <CFormSelect
                            name="status"
                            value={editedCustomer.status}
                            onChange={handleInputChange}
                            style={{
                              color:
                                editedCustomer.status === 'active'
                                  ? 'green'
                                  : editedCustomer.status === 'inactive'
                                    ? 'orange'
                                    : editedCustomer.status === 'suspended'
                                      ? 'red'
                                      : 'white', // Default color
                            }}
                          >
                            <option value="">Select Status</option> {/* Default option */}
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                          </CFormSelect>
                        ) : (
                          <span
                            style={{
                              color:
                                customer.status === 'active'
                                  ? 'green'
                                  : customer.status === 'inactive'
                                    ? 'orange'
                                    : customer.status === 'suspended'
                                      ? 'red'
                                      : 'white', // Default color
                            }}
                          >
                            {customer.status || 'NA'}
                          </span>
                        )}
                      </p>
                    </div>
                  </>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          )}

          {/* Customer Address */}
          {activeTab === 'address' && (
            <CAccordion className="mt-4" activeItemKey={1}>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>Customer Information</CAccordionHeader>
                <CAccordionBody>
                  <>
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
                    <h1>Customer Information</h1>
                  </>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          )}
          {/* Customer Health */}
          {activeTab === 'health' && (
            <CAccordion className="mt-4" activeItemKey={1}>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>Health Care Information</CAccordionHeader>
                <CAccordionBody>
                  <>
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
                    <h1>Health Care Information</h1>
                  </>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          )}
        </>
      ) : (
        <p style={centeredMessageStyle}>Loading customer details...</p>
      )}
    </div>
  )
}

export default CustomerViewDetails
