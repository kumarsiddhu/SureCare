// apiService.js
import axios from 'axios'
import { baseUrl } from './baseUrl'

const endPoint = 'data'

export const getCustomerData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/${endPoint}`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}
// Function to handle GET requests
export const getCustomerDataByID = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${endPoint}/${id}`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// Function to handle PUT requests (update customer data)
export const updateCustomerData = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${endPoint}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// General error handling function
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('Error Response:', error.response.data)
    alert(`Error: ${error.response.data.message || 'Something went wrong'}`)
  } else if (error.request) {
    // No response was received
    console.error('Error Request:', error.request)
    alert('No response from the server. Please try again later.')
  } else {
    // Something else went wrong
    console.error('Error', error.message)
    alert(`Error: ${error.message}`)
  }
}
