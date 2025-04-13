const { MongoClient } = require('mongodb');

    const uri = "mongodb://localhost:27017"
    const client = new MongoClient (uri);


const drivers = [
    {name: "John Doe",vehicleType: "Sedan", isAvailable: true, rating: 4.8 },
    {name: "Alice Smith", vehicleType: "SUV",isAvailable: false, rating: 4.5}, 
    {name: "Haris J", vehicleType: "honda", isAvailable: true, rating: 4.7}
];
// show the data in the console
console. log(drivers);

// TODO: show the all the drivers name in the console
console.log("Driver Names:");
drivers.forEach(driver => console.log (driver.name));

    
// TODO: add additional driver to the drivers array
drivers.push({ name: "Bob Johnson", vehicleType: "Truck", isAvailable: true, rating: 4.9});
    console.log("Driver Names:");
    drivers.forEach(driver => console.log (driver.name));
    console.log("Added new driver:", driver[drivers.lenght - 1]);


async function main() {
    try {
    await client. connect();
    console. log("Connected to MongoDB!");

    const db = client.db("testDB");
    const collection = db.collection ("users");

    // Insert drivers 
    await collection. insertMany(drivers); 
    console. log ("Drivers inserted!");

    // Query high-rated drivers 
    const highRatedDrivers = await drivercollection. find({
        rating: {$gte: 4.5}, available: true
     }).toArray();
    console. log("High Rated Available Drivers:", highRatedDrivers);
  
   //updates John Doe's rating 
   await drivercollection.updateOne(
    {name:" John Doe"},
    {$inc: { rating: 3.1}}
   );
console.log("update John Doe's rating 3.1");

//delete unavailable driver
await driverCollection.deleteMany({available: false});
console.log ("unavailable drivers deleted!");

    } catch (err){
        console.error(err);
    } finally {
     await client.close();
    }
}
    main ();