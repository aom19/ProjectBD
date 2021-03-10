const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Event = require("./models/event");
const User = require("./models/user");

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

//one single endpoint /graphql ;  no get, post , put etc
// query for fetching data
//mutation for create, editing data
//[String!]! - an arrray of not null elements
//_id 'cause will be easier to work with MongoDb , and ID is special type offered by GraphQL
// ! null isn't available

// 2 types of declaration
//     title:String! , description :String!,  price:Float  ! , date: String!
//     input EventInput{title :String! description :String!price:Float!date:String! }

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id : ID!
            title :String!
            description :String!
            price:Float!
            date:String!  
        }

        type User{
            _id : ID!
            email:String!
            password :String
            
        }
        
        input EventInput{
            title :String!
            description :String!
            price:Float!
            date:String! 
        }
        input UserInput{
            email:String!
            password:String!
    
        }

        type RootQuery{
            events: [Event!]!
        }

        type RootMutation{
            createEvent(eventInput : EventInput):Event
            createUser(userInput : UserInput):User

        }

        schema {
            query:RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        //async function
        return Event.find()
          .then((events) => {
            return events.map((event) => {
              //to recieve just information we need , without metadataa , will distructuring this objects
              return { ...event._doc };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          //pass the ObjectId  of  the creator(user)
          creator: "6048d6956d0d3613f59fedea",
        });
        let createdEvent;
        //store in DATABAASE
        //save() return a kind of Promise , async
        return event
          .save()
          .then((result) => {
            //to recieve just information we need , without metadataa , will distructuring this objects
            //In mongo db , "id" it's a special type  to have access to it need to convert/destructuring
            createdEvent = { ...result._doc, password: null, _id: result.id };
            console.log(result);

            return User.findById("6048d60d774bdf4eee42deb4");
          })
          .then((user) => {
            if (!user) {
              throw new Error("User not found !");
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then((result) => {
            return createdEvent;
          })
          .catch((err) => {
            throw err;
          });
      },
      createUser: (args) => {
        // to not store 2 user with same email;
        //find one input - findOne where email from database = email from input
        return User.findOne({
          email: args.userInput.email,
        })
          .then((user) => {
            if (user) {
              throw new Error("User exists alreaady!");
            }
            //we won't store password as plain string
            // will use a package bcrypt to hashing password and salting = 12 ~ (12 levels )
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then((hashedPassword) => {
            //Async Function
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            //as at events to receive information and distructuring id
            // to not return the password , password will be null  when i will return from database
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch((err) => {
            throw err;
          });
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ku5rn.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Server start at port " + PORT);
    console.log("MongoDB is connected");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
