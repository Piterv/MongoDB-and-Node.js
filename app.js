// Using Node.js `require()`

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');
  console.log("Success conection to DB");

  //Mongoose Fruit Schema
  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please check your data entry, no name specified"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
  });
  //compiling fruis schema into a Model.
  const Fruit = mongoose.model("Fruit", fruitSchema);

  const apple = new Fruit({
    name: "apple",
    rating: 10,
    review: "Yami"
  });

    await apple.save();

  //Mongoose Person Schema
  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruite: fruitSchema
  });
  //Compiling Person schema into a Model.
  const Person = mongoose.model("Person", personSchema);

  const person = new Person({
    name: "Amy",
    rating: 37,
    favouriteFruite: apple
  });

  // await person.save();

  //Update colection.
  Person.updateOne({_id: "62a8d557f9a56c13bc7f8e20"},{favouriteFruite: apple}, (err)=>{
    if (err) {
      console.log(err);
    }else{
      console.log("Successfully updated the document");

  }})

  // Delete one documetn.
  Fruit.deleteOne({name: "Pitch"}, err=>{
    if (err) {
      console.log(err);
    }else{
      console.log("Successfully deleted the document.");
    }
  });

// Delete many documents
Fruit.deleteMany({__V: "0"}, err=>{
  if (err) {
    console.log(err);
  }else{
    console.log("Deleted all documents");
  }
});

  // Find colection in DB
  Fruit.find((err, fruits) => {
    if (err) {
      console.log(err);
    } else {

      mongoose.connection.close();

      fruits.forEach((fruit) => {
        console.log(fruit.name);
      });
    }
  });


}
