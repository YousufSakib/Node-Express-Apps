const { MongoClient, ServerApiVersion } = require("mongodb");

const URI = process.env.URI || "mongodb://localhost:27017";
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
(async () => {
    try {
        //Connect the client to the server
        await client.connect();
        //Sent to ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged to the deployment, successfully connected to MongoDB!",
        );
    } catch (err) {
        console.error(err);
    }
})();

let db = client.db("tasks");

module.exports = db;
