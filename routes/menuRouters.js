const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/menu', async (req, res) => {
    try {
        const data = req.body;
        console.log('Data received:', data);
        const menu = new MenuItem(data);
        const response = await menu.save();
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/menu', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Menu Data:', data);
        res.status(200).json(data);                   
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/menu/:id', async (req, res) => {
    try {
        const data = await MenuItem.findByIdAndDelete(req.params.id);
        console.log('Data delete', data);
        res.status(200).json(data);                   // Use status 201 for successful creation
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/menu/:id', async (req, res) => {
    try {
        const data = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/menu/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
            const response = await MenuItem.find({ taste: tasteType});
            console.log('Data fetched:', response);
            res.status(200).json(response); 
        } else {
            res.status(404).json({ error: "Invalid taste Type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

 module.exports = router;
