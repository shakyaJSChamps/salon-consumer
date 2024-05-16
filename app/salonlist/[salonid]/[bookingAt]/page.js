import Booking from "@/components/booking/booking"

function BookingAt({params}) {
console.log("papapap",params.bookingAt) 
  return (
    <div>
      <Booking serviceAt={params.bookingAt} />
    </div>

  )
}

export default BookingAt
