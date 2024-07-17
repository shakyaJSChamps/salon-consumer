import Booking from "@/components/booking/booking"

function BookingAt({params}) {
  return (
    <div>
      <Booking serviceAt={params.bookingAt} />
    </div>

  )
}

export default BookingAt
