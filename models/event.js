const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  //Js Object
  numarInmatriculare: {
    type: String,
    required: true,
  },
  numarKilometri: {
    type: Number,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  detaliiMarca: {
    type: String,
    required: true,
  },
  clasa: {
    type: String,
    required: true,
  },
  urlImage: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  inchiriat: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Event", eventSchema);
