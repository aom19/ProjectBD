const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Booking{
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
    _id : ID!
    numarInmatriculare: String!
    numarKilometri: String!
    date: String!
    marca: String!
    detaliiMarca: String!
    clasa:String!
    price: String!
    urlImage: String!
    description: String!
    creator : User!

}

type User{
    _id : ID!
    email:String!
    password :String
    createdEvents : [Event!]
}
type AuthData{
    userId: ID!
    token : String!
    tokenExpiration : Int!
}

 input EventInput{
    numarInmatriculare: String!
    numarKilometri: String!
    date: String!
    marca: String!
    detaliiMarca: String!
    clasa:String!
    price: String!
    urlImage: String!
    description: String!
}
input UserInput{
    email:String!
    password:String!

}

type RootQuery{
    events: [Event!]!
    bookings : [Booking!]!
    login(email :String! , password :String!) : AuthData!
}

type RootMutation{
    createEvent(eventInput : EventInput):Event
    createUser(userInput : UserInput):User
    bookEvent(eventId : ID!):Booking!
    cancelBooking(bookingId : ID!): Event!

}

schema {
    query:RootQuery
    mutation: RootMutation
}
`);
