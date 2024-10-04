import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Todos',
    //     to: '/dashboard/todos',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Today’s Data',
    //     to: '/dashboard/todays-data',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'City-wise Data',
    //     to: '/dashboard/city-wise',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Customers, Providers Count',
    //     to: '/dashboard/customers-providers',
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: 'Appointment Management',
    to: '/appointment-management',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'List of Appointments',
    //     to: '/appointments/list',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Appointment Details',
    //     to: '/appointments/details',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Reschedule',
    //     to: '/appointments/reschedule',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Reassign',
    //     to: '/appointments/reassign',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Cancel',
    //     to: '/appointments/cancel',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Refund',
    //     to: '/appointments/refund',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Raise Incident',
    //     to: '/appointments/incident',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Job Closed',
    //     to: '/appointments/closed',
    //   },
    // ],
  },
  {
    component: CNavItem,
    to: '/payouts',
    name: 'Payouts',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Payouts List',
    //     to: '/payouts/list',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Enter Payouts',
    //     to: '/payouts/enter',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Batch Payout',
    //     to: '/payouts/batch',
    //   },
    // ],
  },
  {
    component: CNavItem,
    to: '/ads-management',
    name: 'Ads Management',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Ad Banner Management',
    //     to: '/ads/banner',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Click Reports',
    //     to: '/ads/reports',
    //   },
    // ],
  },
  {
    component: CNavItem,
    to: '/push-otifications',
    name: 'Push Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Compose',
    //     to: '/notifications/compose',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Message',
    //     to: '/notifications/message',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Schedule or Send Now',
    //     to: '/notifications/schedule',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'History',
    //     to: '/notifications/history',
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: 'Customer Management',
    to: '/customer-management',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Search Customers',
    //     to: '/customers/search',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Customer Details',
    //     to: '/customers/details',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Appointments',
    //     to: '/customers/appointments',
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: 'Provider Management',
    to: '/provider-management',
 
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Search Providers',
    //     to: '/providers/search',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Provider Details',
    //     to: '/providers/details',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Provider Appointments',
    //     to: '/providers/appointments',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Earnings',
    //     to: '/providers/earnings',
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: 'Users/Roles',
    to: '/users-roles',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Incident Management',
    to: '/incident-management',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
