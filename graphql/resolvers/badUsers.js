const { dateToString } = require("../../helpers/date");
const User = require("../../models/user");
const BadUser = require("../../models/badUser");

const { transformBadUser } = require("./merge");

module.exports = {
  //   bookings: async (args, req) => {
  //     if (!req.isAuth) {
  //       throw new Error("Unathenticathed");
  //     }
  //     try {
  //       const bookings = await Booking.find({ user: req.userId  });
  //       return bookings.map((booking) => {
  //         return transformBooking(booking);
  //       });
  //     } catch (err) {
  //       throw err;
  //     }
  //   },

  addToBlackList: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unathenticathed");
    }
    const fetchedUser = await User.findOne({ _id: args.userId });
    const badUser = new BadUser({
      user: fetchedUser,
    });
    const result = await badUser.save();
    console.log(result);
    return transformBadUser(result);
  },

  //   cancelBooking: async (args, req) => {
  //     if (!req.isAuth) {
  //       throw new Error("Unathenticathed");
  //     }
  //     try {
  //       const booking = await Booking.findById(args.bookingId).populate("event");
  //       const event = transformEvent(booking.event);
  //       await Booking.deleteOne({ _id: args.bookingId });
  //       return event;
  //     } catch (err) {
  //       throw err;
  //     }
  //   },
};
