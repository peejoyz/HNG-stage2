const express = require('express')
const mongoose = require('mongoose');
const Person = require('../model/Person')
const { validationResult } = require('express-validator');

//Get all persons
exports.allPerson = async (req, res) => {
    try {
        const persons =  await Person.find({})
        if(persons) {
            res.json({
                message: "All Person",
                persons: persons
            })
        } else {
            res.json({
                message: "No Person found!"
            })
        }
        
    } catch (err) {
        console.log(err)
    }
}

//Create a person
exports.createPerson = async (req, res) => {
    try {
        let name = req.body.name
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        } 
        let person = new Person({
            name: name
        })

        person.save().then((person) => {
            res.json({person})
        }).catch((err) => {
            console.log(err)
        })   
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

//Get a single person : id
exports.getSinglePerson = async(req, res) => {
    try {
        const user_id = req.params.user_id
        if(!mongoose.Types.ObjectId.isValid(user_id)){
			return res.status(400).send({
		  		message:'Invalid person id',
		  		data:{}
		  	});
		} 
            const person = await Person.findOne({_id: user_id})
            if(person) {
                res.json({
                    message: "Person Found!",
                    person: person
                })
            } 
            else {
                res.status(404).json({
                    message: "Person not found"
                })
            }
        
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

//Update a person
exports.updatePerson = async (req, res) => {
    try {
        let user_id = req.params.user_id
        if(!mongoose.Types.ObjectId.isValid(user_id)){
			return res.status(400).send({
		  		message:'Invalid person id',
		  		data:{}
		  	});
		}
        const person = await Person.findOne({_id: user_id})
        if(person){
            let name = req.body.name
            let newPerson = await Person.updateOne({_id: user_id}, {
                $set: {
                    name: name
                }}, {new : true}
            )
            res.status(200).json({
                message: "Person Updated Successfully",
                data: newPerson
            })
        } else {
            res.status(404).json({
                message: "Person not found"
            })
        }
        
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

//Delete a person
exports.deletePerson = async (req, res) => {
    try {
        let user_id = req.params.user_id
        if(!mongoose.Types.ObjectId.isValid(user_id)){
			return res.status(400).send({
		  		message:'Invalid person id',
		  		data:{}
		  	});
		}
        const person = await Person.deleteOne({_id: user_id})
        if(person) {
            return res.status(200).send({
                message:'Person successfully deleted',
                data:{}
            });
        } else {
            res.status(404).json({
                message: "Person not found"
            })
        }
        
    } catch (err) {
        res.status(400).json({ message: err });
    }
}