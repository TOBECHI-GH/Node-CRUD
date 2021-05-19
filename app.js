const express = require('express');
const app = express();
// const mongodb = require('mongodb');
// const { MongoClient } = mongodb;

const mongoose = require('mongoose');

const { Schema } = mongoose;
//const { getMaxListeners } = require('node:process');

//connection string usually has a port that the database is listening on (27017)
const connectionString = 'mongodb://localhost:27017/Biodata';

//middleware
app.use(express.json());

mongoose.connect(connectionString, 
    {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
    }, (err) => {
    if (err) {
        console.log({err})
    }
    else {
        console.log('Database connected')
    }
})

//Create POST add new
//Read GET find
//Update PUT update an existing
//Delete DELETE

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
    data:Object
});

const Bio = mongoose.model('Bio', biodataSchema); 

// Bio.create({
//     //message: "request was successful",
//     data: {
//         name: "Tobe",
//         email: "xyz@gmail.com",
//         country: "Nigeria"
//     }
// }, function(err, bio) {
//     if (err) {
//         console.log({err})
//     } else {
//         console.log({newBio:bio})
//     }
// })

// Bio.findOne({}, (err, bio) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(bio)
//     }
// })

// Bio.findOne({_id:"60a35146eeb00f4e64774de6"}, (err, bio) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(bio)
//     }
// })

// Bio.findByIdAndUpdate("60a35146eeb00f4e64774de6", {name: "Oscar"}, (err, bio) => {
//     if (err) {
//         console.log(err)
//     } else {
//         bio.save((err,done) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log("friends updated")
//             }
//         })
//     }
// })

//Create four routes
//Fetch all bio in the database

//app.use(express.json())


app.post('/bios', (req, res) => {
    //retrieve new bio from req body
    //please note that the bio in the req.body.bio is the name of the raw json coming in from the request on postman
    //const bioData = req.body.bio;
    //console.log(bioData);
    Bio.create({
            data: req.body.data,
        }, (err, newBio) => {
            if (err) {
                return res.status(500).json({message: err})
            } 
            else {
                //if there is no error, and status is 200, return the message "" and the newBio created
                return res.status(200).json({message: "new bio intern bio created", newBio})
            }
    })
})
//schema does not restrict the database but acts as a check between the application and database

//Get request to /books 
//note: theh result of .find method is an array of  objects 
app.get('/bios', (req,res) => {
    //fetch all books using mongoose query methods
    //send response to client
    //the empty curly bracket returns all the data and it is stored in the bio parameter
    Bio.find({}, (err, bio) => {
        if (err) { 
            return res.status(500).json({message: err})
        } 
        else {
            return res.status(200).json({bio})
        }
    })
})

app.get('/bios/:id', (req, res) => {
    Bio.findById(req.params.id, (err, bio) =>{
        if (err) { 
            return res.status(500).json({message: err})
        } 
        else if (!bio) {
            return res.status(404).json({message: "bio not found"})
        }
        else {
            return res.status(200).json({bio})
        }
    })
})

//findOne either returns a single document or undefined if none matches



//put request to /bios/:id to update a single bio

app.put('/bios/:id', (req,res) => {
    Bio.findByIdAndUpdate(req.params.id, {
        data: req.body.data
    }, (err, bio) => {
        if (err) {
            return res.status(500).json({message: err})
        } else if (!bio) {
            return res.status(404).json({message: "bio not found"})
        } else {
            bio.save((err, savedBio) => {
                if (err) {
                    return res.status(400).json({message: err})
                } else {
                    return res.status(200).json({message:"bio updated successfully"})
                }
            })
        }
    })
})
//if no err and book found, save method effects the change and saves the bio
//It (save) also takes a call back function just to be sure


//Delete an existing bio
app.delete('/books/:id', (req,res) => {
    Bio.findByIdAndDelete(req.params.id, (err, bio) => {
        if (err) {
            return res.status(500).json({message: err})
        } else if (!bio) {
            return res.status(404).json({message: "bio not found"})
        } else {
            return res.status(200).json ({message: "book deleted successfully"})
        }
    })
})



app.listen(5000, () => console.log('app connected'))