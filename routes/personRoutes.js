const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt')
const upload = require('./../uploadMiddleware')

//signuo API
router.post('/person/signup', upload, async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            data.image = req.file.path; // Store image path in the database
        }
        const newPerson = new Person(data);
        const response = await newPerson.save();
        const payload = { id: response.id, username: response.username };
        const token = generateToken(payload);
        res.status(201).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//login API
router.post('/person/login', async(req,res)=>{
    try{
        const {username, password} = req.body;
        const user = await Person.findOne({username: username})

        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({error: "Invalid username or password"});                
        }
        //token generate
        const payload = {
           id: user.id,
            username: user.username
        } 
        const token = generateToken(payload)
        res.json({token})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// profile API
router.get('/person/profile',jwtAuthMiddleware, async(req,res)=>{
    try{
        const userData = req.user;
        console.log("User Data: ", userData);
        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get('/person',jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data Succed:', data);
        res.status(200).json(data);                   
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
        res.status(200).json(data);                   
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

router.get('/personWork/:workType', async (req, res) => {
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