import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CForm, CFormInput, CInputGroup, CInputGroupText, CButton } from '@coreui/react'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { getCustomerData } from '../../APIs/CustomerAPI'

const CustomerManagement = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [customerData, setCustomerData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
      cell: (row) => (
        <span style={{ color: getStatusColor(row.status) }}>
          {`${row.status.charAt(0).toUpperCase()}${row.status.slice(1).toLowerCase()}`}{' '}
          {/* Capitalize first letter and lowercase the rest */}
        </span>
      ),
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
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green'
      case 'inactive':
        return 'orange' // You can use 'warning' if you prefer that term
      case 'suspended':
        return 'red'
      default:
        return 'black' // Default color if status is not recognized
    }
  }

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true)
      try {
        const data = await getCustomerData()
        console.log('Fetched Customer Data:', data) // Log the fetched data
        setCustomerData(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching customer data:', error)
        setError('Failed to fetch customer data')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [])

  // Filter the data based on search query
  const filteredData = searchQuery
    ? customerData.filter(
        (item) =>
          item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.mobileNumber.includes(searchQuery) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : customerData // Return all data if search query is empty

  const handleCustomerViewDetails = (id) => {
    navigate(`/provider-management/${id}`)
  }

  const centeredMessageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    fontSize: '1.5rem',
    color: '#808080',
  }

  return (
    <>
      <CForm className="d-flex justify-content-end">
        <CInputGroup className="mb-3 w-50">
          <CFormInput
            type="text"
            id="search-input"
            placeholder="Search by full name, mobile, or email"
            value={searchQuery}
            onChange={(e) => {
              console.log('Search Query:', e.target.value)
              setSearchQuery(e.target.value)
            }}
          />
          <CInputGroupText>
            <CIcon icon={cilSearch} />
          </CInputGroupText>
        </CInputGroup>
      </CForm>

      {loading ? (
        <div style={centeredMessageStyle}>Loading...</div>
      ) : error ? (
        <div style={centeredMessageStyle}>{error}</div>
      ) : filteredData.length === 0 ? ( // Check if no data is available after filtering
        <div style={centeredMessageStyle}>There are no records to display</div>
      ) : (
        <DataTable columns={columns} data={filteredData} pagination striped />
      )}
    </>
  )
}

export default React.memo(CustomerManagement)
