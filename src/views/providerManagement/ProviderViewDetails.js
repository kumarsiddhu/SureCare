import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react'

const ProviderViewDetails = () => {
  const { id } = useParams() // Get the provider ID from the URL
  const [provider, setProvider] = useState(null)
  const [qualifier, setQualifier] = useState(null)
  const [experience, setExperience] = useState(null)
  const [bankaccountdetails, setBankaccountdetails] = useState(null)
  const [activeTab, setActiveTab] = useState('basic') // Set the default active tab to 'basic'

  // Simulated provider data with unique keys
  const providerData = {
    1: {
      id: 1,
      fullname: 'Beetlejuice',
      dob: '20/10/2020',
      gender: 'male',
      fathersname: 'Ram',
      email: 'nea@gmail.com',
      pincode: 500201,
      street: 'Nethaji',
      addressLine1: 'Nethaji Salai',
      addressLine2: 'Nethaji Salai',
      city: 'Hyderabad',
      state: 'Telangana',
      adharCardNumber: '562321234512',
    },
  }

  const qualificationdetails = {
    1: {
      id: 1,
      role: 'Nurse',
      certification: 'BSc',
      institution: 'RMK Nursing College',
      specialization: 'Elder Care',
      yearOfPassing: 2020,
    },
  }

  const experiencedetails = {
    1: {
      id: 1,
      jobTitleRole: 'Nurse',
      organizationName: 'Nurse',
      yearsOfExperience: 2,
      startDate: '20/12/2025',
      endDate: '20/11/2027',
    },
  }

  const bankaccountdetailsData = {
    1: {
      accountholdername: 'Naveen',
      bankaccountnumber: '908067504920',
      confirmbankaccountnumber: '908067504920',
      bankname: 'India',
      IFSCcode: 'IDBC564345U46',
      pancardnumber: 'AUT901W45436',
    },
  }

  useEffect(() => {
    const selectedProvider = providerData[Number(id)]
    setProvider(selectedProvider)

    const selectedQualification = qualificationdetails[Number(id)]
    setQualifier(selectedQualification)

    const selectedExperience = experiencedetails[Number(id)]
    setExperience(selectedExperience)

    const selectedBankAccountDetails = bankaccountdetailsData[Number(id)]
    setBankaccountdetails(selectedBankAccountDetails)
  }, [id])

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
      {provider ? (
        <CCard>
          <CCardHeader>Provider Details</CCardHeader>
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

            {/* Conditionally render based on active tab */}
            <CCol className="mt-4">
              {activeTab === 'basic' && (
                <CAccordion>
                  <CAccordionItem itemKey={1}>
                    <CAccordionHeader>Personal Information</CAccordionHeader>
                    <CAccordionBody>
                      <div className="provider-details-grid mt-4" style={gridStyle}>
                        <p style={{ margin: 0 }}>
                          <strong>ID:</strong> {provider.id}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Full Name:</strong> {provider.fullname}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>DOB:</strong> {provider.dob}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Gender:</strong> {provider.gender}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Father's Name:</strong> {provider.fathersname}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Email:</strong> {provider.email}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Pincode:</strong> {provider.pincode}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Street:</strong> {provider.street}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Address Line 1:</strong> {provider.addressLine1}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Address Line 2:</strong> {provider.addressLine2}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>City:</strong> {provider.city}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>State:</strong> {provider.state}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Adhar Card Number:</strong> {provider.adharCardNumber}
                        </p>
                      </div>
                    </CAccordionBody>
                  </CAccordionItem>
                  <CAccordionItem itemKey={2}>
                    <CAccordionHeader>Qualification Information</CAccordionHeader>
                    <CAccordionBody>
                      <div className="provider-details-grid mt-4" style={gridStyle}>
                        <p style={{ margin: 0 }}>
                          <strong>ID:</strong> {qualifier.id}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Role:</strong> {qualifier.role}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Certification:</strong> {qualifier.certification}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Institution:</strong> {qualifier.institution}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Specialization:</strong> {qualifier.specialization}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Year of Passing:</strong> {qualifier.yearOfPassing}
                        </p>
                      </div>
                    </CAccordionBody>
                  </CAccordionItem>
                  <CAccordionItem itemKey={3}>
                    <CAccordionHeader>Experience Details</CAccordionHeader>
                    <CAccordionBody>
                      <div className="provider-details-grid mt-4" style={gridStyle}>
                        <p style={{ margin: 0 }}>
                          <strong>ID:</strong> {experience.id}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Job Title/Role:</strong> {experience.jobTitleRole}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Organization Name:</strong> {experience.organizationName}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Years of Experience:</strong> {experience.yearsOfExperience}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Start Date:</strong> {experience.startDate}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>End Date:</strong> {experience.endDate}
                        </p>
                      </div>
                    </CAccordionBody>
                  </CAccordionItem>
                  <CAccordionItem itemKey={4}>
                    <CAccordionHeader>Bank Account Details</CAccordionHeader>
                    <CAccordionBody>
                      <div className="provider-details-grid mt-4" style={gridStyle}>
                        <p style={{ margin: 0 }}>
                          <strong>Account Holder Name:</strong>{' '}
                          {bankaccountdetails.accountholdername}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Bank Account Number:</strong>{' '}
                          {bankaccountdetails.bankaccountnumber}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Confirm Bank Account Number:</strong>{' '}
                          {bankaccountdetails.confirmbankaccountnumber}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Bank Name:</strong> {bankaccountdetails.bankname}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>IFSC Code:</strong> {bankaccountdetails.IFSCcode}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>PAN Card Number:</strong> {bankaccountdetails.pancardnumber}
                        </p>
                      </div>
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>
              )}

              {/* Future implementation for other tabs */}
              {activeTab === 'appointments' && (
                <div>
                  <h4>Appointments will be displayed here.</h4>
                </div>
              )}
              {activeTab === 'earnings' && (
                <div>
                  <h4>Earnings information will be displayed here.</h4>
                </div>
              )}
            </CCol>
          </CCardBody>
        </CCard>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProviderViewDetails
