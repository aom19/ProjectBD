const mongoose = require("mongoose");
const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      //async function
      //populaate give us extradata like email/ password  of creator
      const events = await Event.find();
      //populate give all extra data , find specific creator id
      // .populate("creator")

      return events.map((event) => {
        //to recieve just information we need , without metadataa , will distructuring this objects
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args, req) => {
    console.log(req.isAuth);
    if (!req.isAuth) {
      throw new Error("Unathenticathed");
    }

    const event = new Event({
      make: args.eventInput.make,
      model: args.eventInput.model,
      description: args.eventInput.description,
      airConditions: args.eventInput.airConditions,
      mileage: args.eventInput.mileage,
      transmision: args.eventInput.transmision,
      seats: args.eventInput.seats,
      luggage: args.eventInput.luggage,
      fuel: args.eventInput.fuel,
      GPS: args.eventInput.GPS,
      childSeat: args.eventInput.childSeat,
      music: args.eventInput.music,
      seatBelts: args.eventInput.seatBelts,
      sleepingBed: args.eventInput.sleepingBed,
      water: args.eventInput.water,
      bluetooth: args.eventInput.bluetooth,
      onBoardComputer: args.eventInput.onBoardComputer,
      audioInput: args.eventInput.audioInput,
      carKit: args.eventInput.carKit,
      remoteLocking: args.eventInput.remoteLocking,
      climateControl: args.eventInput.climateControl,
      urlImage: args.eventInput.urlImage,
      description: args.eventInput.description,

      price: +args.eventInput.price,

      //pass the ObjectId  of  the creator(user)
      creator: req.userId,
    });
    let createdEvent;
    //store in DATABAASE
    //save() return a kind of Promise , async
    try {
      const result = await event.save();
      //to recieve just information we need , without metadataa , will distructuring this objects
      //In mongo db , "id" it's a special type  to have access to it need to convert/destructuring
      createdEvent = transformEvent(result);
      // console.log(result);

      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found !");
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unathenticathed");
    }
    

    try {
      const user = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.userId) },
        { $pull: { createdEvents: mongoose.Types.ObjectId(args.eventId) } },
        { multi: false },
        function (err, result) {
          console.log(result);
        }
      );
      const event = await Event.findById(args.eventId);
      await Event.deleteOne({ _id: args.eventId });
      await user.save();
      return event;
    } catch (err) {
      throw err;
    }
  },
};
