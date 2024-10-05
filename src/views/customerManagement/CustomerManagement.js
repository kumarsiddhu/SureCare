import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CForm, CFormInput, CInputGroup, CInputGroupText, CButton } from '@coreui/react'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import axios from 'axios'

const CustomerManagement = () => {
  const navigate = useNavigate() // Initialize useNavigate
  const [searchQuery, setSearchQuery] = useState('') // For search input
  const [customerData, setCustomerData] = useState([]) // State to store customer data
  const [loading, setLoading] = useState(false) // State to handle loading state

  // Define columns for DataTable
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
      name: 'Status',
      selector: (row) => row.status,
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

  // Fetch customer data from API on component mount
  useEffect(() => {
    setLoading(true)
    axios
      .get('https://api-generator.retool.com/uqkjI8/data')
      .then((response) => {
        setCustomerData(response.data) // Store the fetched data in state
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error)
        setLoading(false)
      })
  }, [])

  // Filter the data based on search query
  const filteredData = customerData.filter(
    (item) =>
      item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobileNumber.includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Navigate to customer details page
  const handleCustomerViewDetails = (id) => {
    navigate(`/customer-management/${id}`) // Navigate to details page with the customer ID
  }

  return (
    <>
      {/* Search Form */}
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

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        progressPending={loading} // Show a loading indicator while fetching data
      />
    </>
  )
}

export default React.memo(CustomerManagement)
