const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");
const badUserResolver = require("./badUsers");

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...badUserResolver
};

module.exports = rootResolver;
