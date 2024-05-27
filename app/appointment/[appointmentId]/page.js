import AppointmentDetailPage from '@/components/appointmentDetailPage/AppointmentDetailPage'
import React from 'react'

function AppointmentDetailsPage(params) {
   const appointmentId=params.params.appointmentId
  return (
    <div>
      <AppointmentDetailPage appointmentId={appointmentId} />
    </div>
  )
}

export default AppointmentDetailsPage
