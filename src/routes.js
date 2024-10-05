import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))

const CustomerManagement = React.lazy(() => import('./views/customerManagement/CustomerManagement'))
const CustomerViewDetails = React.lazy(
  () => import('./views/customerManagement/CustomerViewDetails'),
)
// import CustomerViewDetails from './views/customer-management/CustomerViewDetails';
const ProviderManagement = React.lazy(() => import('./views/providerManagement/ProviderManagement'))
const ProviderViewDetails = React.lazy(
  () => import('./views/providerManagement/ProviderViewDetails'),
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/customer-management', name: 'customer-management', element: CustomerManagement },
  { path: '/provider-management', name: 'provider-management', element: ProviderManagement },

  { path: '/provider-management/:id', name: 'ProviderViewDetails', element: ProviderViewDetails },
  { path: '/customer-management/:id', name: 'Customer Details', element: CustomerViewDetails },
  //  ProviderViewDetails
]

export default routes
