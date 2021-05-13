const app = require('express')();
// const mongodb = require('mongodb');
// const { MongoClient } = mongodb;

const mongoose = require('mongoose');
const { getMaxListeners } = require('node:process');

//connection string usually has a port that the database is listening on (27017)
const connectionString = 'mongodb://localhost:27017/Biodata';

mongoose.connect(connectionString, 
    {
    useUnifiedTopology: true,
    useNewUrlParser: true
    }, (err) => {
    if (err) {
        console.log({err})
    }
    else {
        console.log('Database connected')
    }
})

//Schema declares how data should look like


//create a function that connects to the database
// async function connectToDB(str) {
//     const client = new MongoClient(str, 
//         {
//         useUnifiedTopology: true,
//         useNewUrlParser: true
//         }  
//     );
//     try {
//         await client.connect();
//         return client.db();
//     } catch (error) {
//         console.log(error)
//     }
// }

// connectToDB(connectionString)
//  .then(db => {
//      console.log('database connected')
//  })
//  .catch(err => {
//      console.log(err)
//  })

const biodataSchema = new Schema({
    message: String,
    data: {
        name: String,
        email: String,
        country: String
    }
});

const Bio = mongoose.model('Bio', biodataSchema); 

Bio.create({
    message: "request was successful",
    data: {
        name: Tobe,
        email: xyz,
        country: Nigeria
    }
})

app.listen(5000, () => console.log('app connected'))