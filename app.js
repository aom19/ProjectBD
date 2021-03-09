const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const Event = require("./models/event");

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
        
        input EventInput{
            title :String!
            description :String!
            price:Float!
            date:String! 
        }

        type RootQuery{
            events: [Event!]!
        }

        type RootMutation{
            createEvent(eventInput : EventInput):Event

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
        });
        //store in DATABAASE
        //save() return a kind of Promise , async
        return event
          .save()
          .then((result) => {
            console.log(result);
            //to recieve just information we need , without metadataa , will distructuring this objects
            //In mongo db , "id" it's a special type  to have access to it need to convert/destructuring   
            return { ...result._doc, _id: event.id };
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
