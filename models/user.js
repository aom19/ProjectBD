const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nume: {
    type: String,
    required: true,
  },
  prenume: {
    type: String,
    required: true,
  },
  telefon: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  //to knnow which user create which event(booking) || relations ( user - events(booking));
  createdEvents: [
    //   //store a list//array of id;
    //   //ref to event model
    //   //describe one single element of this array;
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
