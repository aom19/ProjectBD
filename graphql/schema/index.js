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
    inchiriat : String!
    creator : User!

}

type User{
    _id : ID!
    email:String!
    password :String!
    nume:String!
    prenume:String!
    telefon:String!
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
    numarInmatriculare: String!
    numarKilometri: String!
    date: String!
    marca: String!
    detaliiMarca: String!
    clasa:String!
    price: String!
    urlImage: String!
    description: String!
    inchiriat : String!
}
input UserInput{
    email:String!
    password:String!
    nume:String!
    prenume:String!
    telefon:String!
    address:String!

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
    bookEvent(eventId : ID!):Booking!
    cancelBooking(bookingId : ID!): Event!
    addToBlackList(userId:ID!) : BadUser!
    

}

schema {
    query:RootQuery
    mutation: RootMutation
}
`);
