import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CFormInput,
  CFormSelect,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react'

// Dummy Data
const providerData = {
  id: 1,
  fullname: 'Beetlejuice',
  dob: '20/10/2020',
  gender: 'male',
  fathersname: 'Ram',
  email: 'nea@gmail.com',
  mobileNumber: '9876543210',
  pincode: 500201,
  street: 'Nethaji',
  addressLine1: 'Nethaji Salai',
  addressLine2: 'Nethaji Salai',
  city: 'Hyderabad',
  state: 'Telangana',
  aadharCardNumber: '562321234512',
  aadharFrontSide:
    'https://www.shutterstock.com/image-vector/dummy-aadhar-card-unique-identity-260nw-1661857771.jpg',
  aadharBackSide:
    'https://th.bing.com/th/id/OIP.ztUEY0SMvbBb3OdlEByn-QHaFG?w=258&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
}

const qualificationDetails = {
  id: 1,
  role: 'Nurse',
  certification: 'BSc',
  institution: 'RMK Nursing College',
  specialization: 'Elder Care',
  yearOfPassing: 2020,
}

const experiencedetails = {
  id: 1,
  jobTitleRole: 'Nurse',
  organizationName: 'Nurse',
  yearsOfExperience: 2,
  startDate: '20/12/2025',
  endDate: '20/11/2027',
}

const bankaccountdetailsData = {
  accountholdername: 'Naveen',
  bankaccountnumber: '908067504920',
  confirmbankaccountnumber: '908067504920',
  bankname: 'India',
  IFSCcode: 'IDBC564345U46',
  pancardnumber: 'AUT901W45436',
}

const handleFileChange = (e) => {
  const { name, files } = e.target
  if (files && files[0]) {
    const reader = new FileReader()
    reader.onload = (upload) => {
      setEditedProvider((prev) => ({
        ...prev,
        [name]: upload.target.result, // Convert to base64 or use file path
      }))
    }
    reader.readAsDataURL(files[0]) // For image preview
  }
}

// Reusable Grid component for displaying provider details
const ProviderDetailsGrid = ({ data }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
      }}
    >
      {Object.entries(data).map(([key, value]) => (
        <p key={key} style={{ margin: 0 }}>
          <strong>{key}:</strong> {value}
        </p>
      ))}
    </div>
  )
}

const ProviderViewDetails = () => {
  const [activeTab, setActiveTab] = useState('basic')
  const [editMode, setEditMode] = useState(false)
  const [editedProvider, setEditedProvider] = useState(providerData)
  const [editedQualifier, setEditedQualifier] = useState(qualificationDetails)
  const [editedExperience, setEditedExperience] = useState(experiencedetails)

  const [editedBankdetails, setEditedBankdetails] = useState(bankaccountdetailsData)
  const [previewImage, setPreviewImage] = useState({})
  const [mobileError, setMobileError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleUpdateClick = () => {
    if (!validateMobile(editedProvider.mobileNumber)) {
      setMobileError('Please enter a valid 10-digit mobile number.')
      return
    } else {
      setMobileError('')
    }

    if (!validateEmail(editedProvider.email)) {
      setEmailError('Please enter a valid email address.')
      return
    } else {
      setEmailError('')
    }

    // Handle update logic here (e.g., send data to an API)
    setEditMode(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedProvider((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleQualifierChange = (e) => {
    const { name, value } = e.target
    setEditedQualifier((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleExperienceChange = (e) => {
    const { name, value } = e.target
    setEditedExperience((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBankDetails = (e) => {
    const { name, value } = e.target
    setEditedBankdetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateMobile = (number) => {
    return /^[0-9]{10}$/.test(number)
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  }

  const handleFileChange = (event, key) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage((prevState) => ({
          ...prevState,
          [key]: reader.result,
        }))
        setEditedProvider((prevState) => ({
          ...prevState,
          [key]: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <CCard>
        <CCardHeader>Provider Details</CCardHeader>
        <CCardBody>
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
                active={activeTab === 'appointments'}
                onClick={() => handleTabClick('appointments')}
              >
                Appointments
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#"
                active={activeTab === 'earnings'}
                onClick={() => handleTabClick('earnings')}
              >
                Earnings
              </CNavLink>
            </CNavItem>
          </CNav>
        </CCardBody>
      </CCard>

      <div>
        {activeTab === 'basic' && (
          <CAccordion className="mt-4" activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>Personal Information</CAccordionHeader>
              <CAccordionBody>
                {editMode ? (
                  <CButton color="primary" onClick={handleUpdateClick}>
                    Update
                  </CButton>
                ) : (
                  <CButton color="secondary" onClick={handleEditClick}>
                    Edit
                  </CButton>
                )}
                <div className="mt-4">
                  {/* Personal Information Section */}
                  <h5>Personal Information</h5>
                  <div style={gridStyle}>
                    {Object.entries(editedProvider)
                      .filter(([key]) => key !== 'aadharFrontSide' && key !== 'aadharBackSide') // Exclude document fields
                      .map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong>{' '}
                          {editMode && key !== 'id' ? (
                            <CFormInput name={key} value={value} onChange={handleInputChange} />
                          ) : (
                            value || 'NA'
                          )}
                        </p>
                      ))}
                  </div>
                  {mobileError && <p style={{ color: 'red' }}>{mobileError}</p>}
                  {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

                  {/* Documents Section */}
                  <h5 className="mt-4">Documents</h5>
                  <div style={gridStyle} className="mt-4">
                    {['aadharFrontSide', 'aadharBackSide'].map((key) => {
                      const value = editedProvider[key] // Get value from editedProvider

                      return (
                        <p key={key}  >
                          <strong>{key.replace(/([A-Z])/g, ' $1') }:</strong>
                          {editMode ? (
                            <>
                              <label htmlFor={key} className="btn btn-primary">
                                Choose File
                                <CFormInput
                                  id={key}
                                  name={key}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileChange(e, key)}
                                  style={{ display: 'none' }}
                                />
                              </label>
                              {previewImage[key] && (
                                <p className='mt-2'>
                                <a href={previewImage[key]} target='_blank'><img
                                    src={previewImage[key]} // Fix for preview rendering
                                    alt={`${key} Preview`}
                                    style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                                  /></a>
                                </p>
                              )}
                            </>
                          ) : value ? (
                            <p>
                              <img
                                src={value}
                                alt={key}
                                style={{ width: '100px', height: 'auto' }}
                              />
                            </p>
                          ) : (
                            <div>No Image Uploaded</div>
                          )}
                        </p>
                      )
                    })}
                  </div>
                </div>
              </CAccordionBody>
            </CAccordionItem>

            <CAccordionItem itemKey={2}>
              <CAccordionHeader>Qualification Details</CAccordionHeader>
              <CAccordionBody>
                {editMode ? (
                  <CButton color="primary" onClick={handleUpdateClick}>
                    Update
                  </CButton>
                ) : (
                  <CButton color="secondary" onClick={handleEditClick}>
                    Edit
                  </CButton>
                )}
                <div className="mt-4" style={gridStyle}>
                  {Object.entries(editedQualifier).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong>{' '}
                      {editMode && key !== 'id' ? (
                        <CFormInput name={key} value={value} onChange={handleQualifierChange} />
                      ) : (
                        value || 'NA'
                      )}
                    </p>
                  ))}
                </div>
              </CAccordionBody>
            </CAccordionItem>

            <CAccordionItem itemKey={3}>
              <CAccordionHeader>Experience Details</CAccordionHeader>
              <CAccordionBody>
                {editMode ? (
                  <CButton color="primary" onClick={handleUpdateClick}>
                    Update
                  </CButton>
                ) : (
                  <CButton color="secondary" onClick={handleEditClick}>
                    Edit
                  </CButton>
                )}
                <div className="mt-4" style={gridStyle}>
                  {Object.entries(editedExperience).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong>{' '}
                      {key === 'aadharFrontSide' || key === 'aadharBackSide' ? (
                        editMode ? (
                          <label htmlFor={key}>
                            Choose File
                            <input
                              id={key}
                              name={key}
                              type="file"
                              accept="image/*" // Restrict file types (optional)
                              onChange={handleFileChange}
                              style={{ display: 'none' }} // Hide file input visually
                            />
                          </label>
                        ) : value ? (
                          <p>
                            <img
                              src={value}
                              alt={`${key}`}
                              style={{ width: '100px', height: 'auto' }}
                            />
                          </p>
                        ) : (
                          <div>No File Uploaded</div>
                        )
                      ) : editMode && key !== 'id' ? (
                        <CFormInput name={key} value={value} onChange={handleInputChange} />
                      ) : (
                        value || 'NA'
                      )}
                    </p>
                  ))}
                </div>
              </CAccordionBody>
            </CAccordionItem>

            <CAccordionItem itemKey={4}>
              <CAccordionHeader>Bank Details Details</CAccordionHeader>
              <CAccordionBody>
                {editMode ? (
                  <CButton color="primary" onClick={handleUpdateClick}>
                    Update
                  </CButton>
                ) : (
                  <CButton color="secondary" onClick={handleEditClick}>
                    Edit
                  </CButton>
                )}
                <div className="mt-4" style={gridStyle}>
                  {Object.entries(editedBankdetails).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong>{' '}
                      {editMode && key !== 'id' ? (
                        <CFormInput name={key} value={value} onChange={handleBankDetails} />
                      ) : (
                        value || 'NA'
                      )}
                    </p>
                  ))}
                </div>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        )}

        {activeTab === 'appointments' && (
          <CAccordion className="mt-4" activeItemKey={2}>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>Appointments Information</CAccordionHeader>
              <CAccordionBody>
                <h1>Appointments Information</h1>
                {/* <ProviderDetailsGrid data={providerData} /> */}
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        )}

        {activeTab === 'earnings' && (
          <CAccordion className="mt-4" activeItemKey={3}>
            <CAccordionItem itemKey={3}>
              <CAccordionHeader>Earnings Information</CAccordionHeader>
              <CAccordionBody>
                <h1>Earnings Information</h1>
                {/* <ProviderDetailsGrid data={providerData} /> */}
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        )}
      </div>
    </div>
  )
}

export default ProviderViewDetails
