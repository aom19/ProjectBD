const Dataloader = require("dataloader");
const { dateToString } = require("../../helpers/date");
const Event = require("../../models/event");
const User = require("../../models/user");

const eventLoader = new Dataloader((eventIds) => {
  return events(eventIds);
});

const userLoader = new Dataloader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

//find a user by an id;
const user = async (userId) => {
  const user = await userLoader.load(userId.toString());
  try {
    return {
      ...user._doc,
      _id: user.id,
      email: user._doc.email,

      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

//fetch one event
const singleEvent = async (eventId) => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};

// find an array of events by ids , "$in" > mondodb operator
const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        //to fetch events on order based on eventIds
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
   
    creator: user.bind(this, event.creator),
  };
};
const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    // userEmail: user.bind(this, booking._doc.user.email),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    pickUpDate: dateToString(booking._doc.pickUpDate),
    dropOffDate: dateToString(booking._doc.dropOffDate),
  };
};

const transformBadUser = (badUser) => {
  return {
    ...badUser._doc,
    _id: badUser.id,
    user: user.bind(this, badUser._doc.user),
  };
};

// exports.user = user;
//  exports.events = events;
// exports.singleEvent = singleEvent;
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
exports.transformBadUser = transformBadUser;
