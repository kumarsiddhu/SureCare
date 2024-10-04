import React, { useState } from 'react'
import { CForm, CFormInput, CInputGroup, CInputGroupText, CButton } from '@coreui/react' // Import necessary CoreUI components
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react' // Ensure this is imported correctly
import { cilSearch } from '@coreui/icons' // Import the search icon
import Alerts from '../notifications/alerts/Alerts'

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleView = (index) => {
    alert(index)
    history.push(`/provider-management/${index}`)
  }

  const columns = [
    {
      name: 'Full Name',
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: 'Mobile Number',
      selector: (row) => row.mobileNumber,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Actions',
      selector: (row) => row.actions,
      cell: (row) => (
        <div>
          {/* <CButton color="primary" onClick={() =>history.push(`/providerDetail/${(row.id)}` )}> */}
          <CButton color="primary" onClick={() => handleView(row.id)}>
            View
          </CButton>
        </div>
      ),
    },
  ]

  const data = [
    { id: 1, fullname: 'Beetlejuice', mobileNumber: '7856452178', email: 'nea@gmail.com' },
    {
      id: 2,
      fullname: 'Ghostbusters',
      mobileNumber: '9876543210',
      email: 'ghostbusters@gmail.com',
    },
    { id: 3, fullname: 'Inception', mobileNumber: '1234567890', email: 'inception@gmail.com' },
  ]

  // Filter data based on search query
  const filteredData = data.filter(
    (item) =>
      item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) || // Corrected key
      item.mobileNumber.includes(searchQuery) || // Added check for mobile number
      item.email.toLowerCase().includes(searchQuery.toLowerCase()), // Added check for email
  )

  return (
    <>
      <CForm className="d-flex justify-content-end">
        <CInputGroup className="mb-3 w-25">
          {' '}
          {/* Ensure proper order */}
          <CInputGroupText>
            <CIcon icon={cilSearch} />
          </CInputGroupText>
          <CFormInput
            type="text"
            id="search-input"
            placeholder="Search by full name, mobile, or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </CInputGroup>
      </CForm>
      <DataTable columns={columns} data={filteredData} pagination />
    </>
  )
}

export default React.memo(CustomerManagement)
