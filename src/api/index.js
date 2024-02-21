const express = require('express');
const { createErrorResponse } = require('./helpers/response');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

// Define routes in the routes folder
app.use('/', require('../routes'));

// TEST TEMPORARY MONGODB SETUP STARTS

const testSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please enter a username"] },
    password: { type: String, required: [true, "Please enter a password"] },
    clients: { type: [String], required: false, }
  },
  { timestamps: true }
)

const testData = mongoose.model('testData', testSchema);

// TEST TEMPORARY ROUTE FOR MONGODB CRUD OPERATIONS
// Testing CREATE operation (creates one object and saves to database)
app.post('/mongoTest', async(req, res) => {
  try {
    const data = await testData.create(req.body);
    res.status(200).json(data);
  } catch {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})
// Testing READ operation (fetches all objects saved to database)
app.get('/mongoTest', async(req, res) => {
  try {
    const data = await testData.find({});
    res.status(200).json(data);
  } catch {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})
// Testing READ operation (fetches one object based on ID)
app.get('/mongoTest/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const data = await testData.findById(id);
    if (!data) {
      return res.status(404).json({message: `Cannot find object with ID ${id}`});
    }
    res.status(200).json(data);
  } catch {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})
// Testing UPDATE operation (updates one object based on ID)
app.put('/mongoTest/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const data = await testData.findByIdAndUpdate(id, req.body);
    // if no object with that ID exists
    if (!data) {
      return res.status(404).json({message: `Cannot find object with ID ${id}`});
    }
    const updatedData = await testData.findById(id);
    res.status(200).json(updatedData);
  } catch {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})
// Testing DELETE operation (deletes one object based on ID)
app.delete('/mongoTest/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const data = await testData.findByIdAndDelete(id);
    // if no object with that ID exists
    if (!data) {
      return res.status(404).json({message: `Cannot find any object with ID ${id}`})
    }
    res.status(200).json({message: `Deleted object with ID ${id}`});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

// TEST TEMPORARY MONGODB SETUP ENDS


app.use((req, res) => {
  res.status(404).json(createErrorResponse(404, 'not found'));
});

module.exports = app;
