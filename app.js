const {
  MongoClient
} = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'fruitsDB';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('fruits');

  // the following code examples can be pasted here...

  //Insert a Document
  const insertResult = await collection.insertMany([{
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "orange",
      score: 6,
      review: "Great stuff"
    }
  ]);
  console.log('Inserted documents =>', insertResult);

  //Find Documents with a Query Filter
  const filteredDocs = await collection.find({ }).toArray();
  console.log('Found documents =>', filteredDocs);

  return 'done.';
}


main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
