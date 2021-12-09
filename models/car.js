const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  //Js Object
  make: {
    type: String,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
  urlImage: {
    type: String,
    required: true,
  },
  transmision: {
    type: String,
    required: true,
  },
  seats: {
    type: String,
    required: true,
  },

  luggage: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  airConditions: {
    type: String,
    required: true,
  },
  GPS: {
    type: String,
    required: true,
  },
  childSeat: {
    type: String,
    required: true,
  },
  music: {
    type: String,
    required: true,
  },
  seatBelts: {
    type: String,
    required: true,
  },
  sleepingBed: {
    type: String,
    required: true,
  },
  water: {
    type: String,
    required: true,
  },
  bluetooth: {
    type: String,
    required: true,
  },
  onBoardComputer: {
    type: String,
    required: true,
  },
  audioInput: {
    type: String,
    required: true,
  },
  carKit: {
    type: String,
    required: true,
  },
  remoteLocking: {
    type: String,
    required: true,
  },
  climateControl: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Car", carSchema);
