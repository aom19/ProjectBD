const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Booking{
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
    pickUpLocation:String!
    pickUpDate:String!
    dropOffLocation:String!
    dropOffDate:String!
}

type Event {
    _id : ID!
    make: String!
    model: String!
    description: String
    mileage: String!
    transmision:String!
    seats: String!
    luggage: String!
    fuel: String!
    airConditions: String!
    GPS: String!
    childSeat: String!
    music: String!
    seatBelts: String!
    sleepingBed: String!
    water: String!
    bluetooth: String!
    onBoardComputer: String!
    audioInput: String!
    carKit: String!
    remoteLocking: String!
    climateControl: String!
    price: String!
    urlImage: String!
    
    
    creator : User!
}

type User{
    _id : ID!
    email:String!
    password :String!
    firstName:String!
    lastName:String!
    phoneNumber:String!
    address:String!
    createdEvents : [Event]

}
type AuthData{
    userId: ID!
    token : String!
    tokenExpiration : Int!
    isAdmin:String!
    email:String!
}

type BadUser{
    _id :ID!
    userId : ID!

}


 input EventInput{
    make: String!
    model: String!
    description: String
    mileage: String!
    transmision:String!
    seats: String!
    luggage: String!
    fuel: String!
    airConditions: String!
    GPS: String!
    childSeat: String!
    music: String!
    seatBelts: String!
    sleepingBed: String!
    water: String!
    bluetooth: String!
    onBoardComputer: String!
    audioInput: String!
    carKit: String!
    remoteLocking: String!
    climateControl: String!
    price: String!
    urlImage: String!
   
    
}
input UserInput{
    email:String!
    password:String!
    firstName:String!
    lastName:String!
    phoneNumber:String!
    address:String!

}
input BookingInput{
    pickUpLocation:String!
    pickUpDate:String!
    dropOffLocation:String!
    dropOffDate:String!
}

type RootQuery{
    events: [Event!]!
    bookings : [Booking!]!
    allBookings : [Booking!]!

    login(email :String! , password :String! ) : AuthData!
    badUsers : [BadUser!]!
    
}

type RootMutation{
    createEvent(eventInput : EventInput):Event
    deleteEvent(eventId:ID!):Event!
    createUser(userInput : UserInput):User
    bookEvent(eventId : ID!, bookingInput :BookingInput):Booking
    cancelBooking(bookingId : ID!): Event!
    addToBlackList(userId:ID!) : BadUser!
    

}

schema {
    query:RootQuery
    mutation: RootMutation
}
`);
