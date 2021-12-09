class Booking {
  constructor(_id, pickUpLocation, dropOffLocation, pickUpDate, dropOffDate) {
    this._id = _id;
    this.pickUpLocation = pickUpLocation;
    this.pickUpDate = pickUpDate;
    this.dropOffLocation = dropOffLocation;
    this.dropOffDate = dropOffDate;
  }
}

export default Booking;
