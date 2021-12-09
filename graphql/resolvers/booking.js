const { dateToString } = require("../../helpers/date");
const Event = require("../../models/event");
const Booking = require("../../models/booking");

const { transformBooking, transformEvent } = require("./merge");
const user = require("../../models/user");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unathenticathed");
    }
    try {
      const bookings = await Booking.find({ user: req.userId });
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  allBookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unathenticathed");
    }

    try {
      const allBookings = await Booking.find();

      return allBookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unathenticathed");
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    console.log(args);
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent,
      pickUpLocation: args.bookingInput.pickUpLocation,
      pickUpDate: new Date(args.bookingInput.pickUpDate),
      dropOffLocation: args.bookingInput.dropOffLocation,
      dropOffDate: new Date(args.bookingInput.dropOffDate),
    });
    const result = await booking.save();
    return transformBooking(result);
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unathenticathed");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      console.log(args.bookingId);
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
