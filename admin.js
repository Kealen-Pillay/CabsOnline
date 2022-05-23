function searchBooking(bookingReferenceNumber) {
    if(bookingReferenceNumber == "") {
        
    } else if (/^BRN[0-9]+$/.test(bookingReferenceNumber)) {

    } else {
        alert("Please Provide A Booking Reference Number In The Correct Format (eg: BRN00001) Or Click 'Search' To Display All Bookings With A Pickup Time Within 2 Hours Of The Current Time!")
    }
}
