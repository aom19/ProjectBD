const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const badUserSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    //created/updaated field
    timestamps: true,
  }
);

module.exports = mongoose.model("BadUser", badUserSchema);
