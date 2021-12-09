const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pickUpLocation: {
      type: String,
      required: true,
    },
    pickUpDate: {
      type: String,
      required: true,
    },
    dropOffLocation: {
      type: String,
      required: true,
    },
    dropOffDate: {
      type: String,
      required: true,
    },
  },
  {
    //created/updaated field
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
