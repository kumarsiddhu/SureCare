import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import { CForm, CFormInput, CInputGroup, CInputGroupText, CButton } from '@coreui/react'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const CustomerManagement = () => {
  const navigate = useNavigate() // Initialize useNavigate
  const [searchQuery, setSearchQuery] = useState('')

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
      cell: (row) => (
        <CButton color="primary" onClick={() => handleCustomerViewDetails(row.id)}>
          View
        </CButton>
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

  const filteredData = data.filter(
    (item) =>
      item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobileNumber.includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCustomerViewDetails = (id) => {
    navigate(`/customer-management/${id}`) // Navigate to the details page with the ID
  }

  return (
    <>
      <CForm className="d-flex justify-content-end">
        <CInputGroup className="mb-3 w-25">
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
