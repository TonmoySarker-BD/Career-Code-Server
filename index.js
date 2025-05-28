const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gz4c6b3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const jobsCollection = client.db("career-code").collection("jobs");

    // API endpoint to get all jobs
    app.get('/jobs', async (req, res) => {
      const query = {};
      const cursor = jobsCollection.find(query);
      const jobs = await cursor.toArray();
      res.send(jobs);
    });





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
