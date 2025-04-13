const { MongoClient } = require('mongodb');

    const uri = "mongodb://localhost:27017"
    const client = new MongoClient (uri);


const drivers = [
    {name: "John Doe",vehicleType: "Sedan", isAvailable: true, rating: 4.8 },
    {name: "Alice Smith", vehicleType: "SUV",isAvailable: false, rating: 4.5}, 
    {name: "Haris J", vehicleType: "honda", isAvailable: true, rating: 4.7}
];

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
        await client.connect();
        const db = client.db("testDB");

        const driverCollection = db.collection("drivers");

    //insert drivers 
        await collection.insertMany(drivers);
        console.log("Drivers inserted successfully");
    
    // Query high-rated drivers
    const highRatedDrivers = await driverCollection.find({
        rating :{ $gte: 4.5}, available : true
    }).toarray();
    console.log("High Rated Available Drivers:",highRatedDrivers);

    //updated John Doe's rating
    await driverCollection.updateOne(
        {name : "John Doe"}, 
        {$inc: {rating: 0.1}}
    );
    console.log("Updated John Doe's by 0.1"); 

    //Delete 
    await  driverCollection.deleteMany({ available : false});
    console.log("Deleted unavailable drivers");

}catch (err){
 console.error(err);
} finally {
 await client.close();
}
}

main();