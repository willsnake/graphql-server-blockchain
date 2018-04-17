const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const bodyParser = require("body-parser");
const { ApolloEngine } = require("apollo-engine");

const { schema } = require("./data/schema");

const ENGINE_API_KEY = process.env.ENGINE_API_KEY || 'service:mdg-private-a-service:EB-LWSjPdZX0ph-Yyn2cxA';

const app = express();

app.post(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({
        schema,
        tracing: true,
        cacheControl: true,
    })
);

const gql = String.raw;

app.get(
    "/graphiql",
    graphiqlExpress({
        endpointURL: "/graphql"
    })
);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const engine = new ApolloEngine({
    apiKey: ENGINE_API_KEY,
    stores: [
        {
            name: "publicResponseCache",
            inMemory: {
                cacheSize: 10485760
            }
        }
    ],
    queryCache: {
        publicFullQueryStore: "publicResponseCache"
    }
});

// Start the app
engine.listen(
    {
        port: PORT,
        expressApp: app
    },
    () => {
        console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
    }
);