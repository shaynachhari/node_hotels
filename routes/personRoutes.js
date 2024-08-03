const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


router.post('/person', async (req, res) => {
    try {
        const data = req.body;                       // Correctly access req.body
        console.log('Data received:', data);         // Log the data received
        const newPerson = new Person(data);
        const response = await newPerson.save();
        // console.log("Data Saved:", response);            // Log the saved data
        res.status(201).json(response);                   // Use status 201 for successful creation
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data Succed:', data);
        res.status(200).json(data);                   // Use status 201 for successful creation
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/person_find/:id', async (req, res) => {
    try {
        const data = await Person.findById(req.params.id);
        console.log('Person Data find with id', data);
        res.status(200).json(data);                   // Use status 201 for successful creation
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/person/:id', async (req, res) => {
    try {
        const data = await Person.findByIdAndDelete(req.params.id);
        console.log('Data delete', data);
        res.status(200).json(data);                   // Use status 201 for successful creation
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/person/:id', async (req, res) => {
    try {
        const data = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        console.log('Requested workType:', workType);
        if (workType == "chef" || workType == "waiter" || workType == "manager") {
            const response = await Person.find({work: workType});
            console.log('Data fetched:', response);
            res.status(200).json(response); 
        } else {
            res.status(404).json({ error: "Invalid workType" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;