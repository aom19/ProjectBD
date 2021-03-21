const bcrypt = require("bcryptjs");
const Event = require("../../models/event");
const User = require("../../models/user");

//find a user by an id;
const user = async (userId) => {
  const user = await User.findById(userId);
  try {
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

// find an array of events by ids , "$in" > mondodb operator
const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator),
      };
    });
    return events;
  } catch (err) {
    throw err;
  }
};
//find a user by an id;

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
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      //pass the ObjectId  of  the creator(user)
      creator: "605709b2eb1306bb48b1c2a8",
    });
    let createdEvent;
    //store in DATABAASE
    //save() return a kind of Promise , async
    try {
      const result = await event.save();
      //to recieve just information we need , without metadataa , will distructuring this objects
      //In mongo db , "id" it's a special type  to have access to it need to convert/destructuring
      createdEvent = {
        ...result._doc,
        password: null,
        _id: result.id.toString(),
        date: new Date(result._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };
      // console.log(result);

      const creator = await User.findById("605709b2eb1306bb48b1c2a8");

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
  createUser: async (args) => {
    // to not store 2 user with same email;
    //find one input - findOne where email from database = email from input
    try {
      const existingUser = await User.findOne({
        email: args.userInput.email,
      });

      if (existingUser) {
        throw new Error("User exists alreaady!");
      }
      //we won't store password as plain string
      // will use a package bcrypt to hashing password and salting = 12 ~ (12 levels )
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();

      //as at events to receive information and distructuring id
      // to not return the password , password will be null  when i will return from database
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
