const { dateToString } = require("../../helpers/date");
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
    if (!req.isAuth) {
      throw new Error("Unathenticathed");
    }

    const event = new Event({
      numarInmatriculare: args.eventInput.numarInmatriculare,
      numarKilometri: args.eventInput.numarKilometri,
      marca: args.eventInput.marca,
      detaliiMarca: args.eventInput.detaliiMarca,
      clasa: args.eventInput.clasa,
      urlImage: args.eventInput.urlImage,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
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
      const event = await Event.findById(args.eventId);
      await Event.deleteOne({ _id: args.eventId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
