const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schedule = require('../../models/schedule');
const authFunc = require('../../functions/auth');

//create new Schedule
router.post('/', authFunc.checkAdminAuthenticated, (req, res) => {
    Schedule.init().then(() => {
        const id = new mongoose.Types.ObjectId();
        const newSchedule = new Schedule({
            _id: id,
            name: req.body.name,
            ownerName: req.body.ownerName,
            date: req.body.date,
            notes: req.body.notes
        }); 
        newSchedule.save(function(err) {
            if (err) return res.status(500).json({success: false, message: err.message});
            res.status(200).send(JSON.stringify({message: "Schedule is successfuly added!"}));
        });
    });
});

//read all Schedules
router.get('/', authFunc.checkAdminAuthenticated, (req, res) => {
    Schedule.find({}).sort({"date":1}).exec(function(err, Schedules) {
        if (err) return res.status(500).json({success: false, message: err.message});
        res.status(200).send(JSON.stringify({success: true, data: Schedules}));
    });
});

//read single Schedule by ID
router.get('/:id', authFunc.checkAdminAuthenticated, (req, res) => {
    Schedule.findById(req.params.id).exec(function(err, Schedule) {
        if (err) return res.status(500).json({success: false, message: err.message});
        res.status(200).send(JSON.stringify({success: true, data: Schedule}));
    });
});

//update single Schedule by ID
router.post('/:id', authFunc.checkAdminAuthenticated, (req, res) => {
    Schedule.init().then(() => {
        Schedule.findById(req.params.id).exec(function(err, Schedule) {
            if (err) return res.status(500).json({success: false, message: err.message});
    
            if(req.body.name){
                Schedule.name = req.body.name;
            }
            if(req.body.ownerName){
                Schedule.ownerName = req.body.ownerName;
            }
            if(req.body.date){
                Schedule.date = req.body.date;
            }
            if(req.body.notes){
                Schedule.notes = req.body.notes;
            }
            Schedule.dateUpdated = Date.now();
         
            Schedule.save(function(err) {
                if (err) return res.status(500).json({success: false, message: err.message});
                res.status(200).send(JSON.stringify({success: true, message: "Schedule is successfully updated"}));
            });
        });
    });
});

//delete single Schedule by ID
router.delete('/:id', authFunc.checkAdminAuthenticated, (req, res) => {
    Schedule.deleteOne({_id: req.params.id}).exec(function(err, Schedule) {
        if (err) return res.status(500).json({success: false, message: err.message});
        res.status(200).send(JSON.stringify({success: true, message: "Schedule is successfully deleted"}));
    });
});

module.exports = router;