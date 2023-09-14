# Flixx

A simple CRUD RESTAPI 

## Live Preview

- [Flixx](https://flixx.cyclic.app/)


## Features

- CRUD operation on person(user) Create, Edit, update and delete a person

## Technologies Used
- NODEJS
- EXPRESS
- MONGODB
-Postman for testing

## Request
A personRoute.js file was created in route folder which has all the request endpoint

router
.get('/', controller.allPerson)
.post('/api', personValidation, controller.createPerson)
.get('/api/:user_id', controller.getSinglePerson)
.put('/api/:user_id', controller.updatePerson)
.delete('/api/:user_id', controller.deletePerson)

<br>
check the image below
<img src="/assets/personRoutes2.JPG" width="30px">

## CRUD
A personController.js file was created in the controllers folder that handles the CRUD operations
<br>

## Post / Create a person
-router.post('/api', personValidation, controller.createPerson)
-Express validator was used to verify the input of users, only strings is required.

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
<br>
<img src="/assets/createPerson.JPG" width="30px">

## Response to post request
-If an integer was the input from the user and not a string value, an error message will be returned : see image below
<img src="/assets/validation with an integer.JPG" width="30px">
<br>
-An empty field posted by a user will return an error message : see image below
<img src="/assets/Empty field validation.JPG" width="30px">

-If all the conditions are satisfied, the post request will create a new person or user : see image below with postman
<img src="/assets/Post person.JPG" width="30px">

-The created person stored in the database(mongoDB)
<img src="/assets/DB person posted.JPG">

## Get a single person
-router.get('/api/:user_id', controller.getSinglePerson)
-Get a single person through the id(user_id)
<br>

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

<img src="/assets/Get single person.JPG">

## Response to Get single person request
-If an invalid id is passed - an invalid id error message will be returned
<img src="/assets/Invalid ID.JPG">

-If the correct id is passed - the person details will be returned 
<img src="/assets/GetSIngle person.JPG">


## Update a single person
-router.put('/api/:user_id', controller.updatePerson) - PUT request

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

<img src="/assets/Update a person.JPG">

## Response to Get single person request
-If an invalid id is passed - an invalid id error message will be returned
<img src="/assets/Invalid ID.JPG">

-If the correct id is passed - the person details will be updated 
<img src="/assets/update paul2.JPG">

-The details will be updated in db too
<img src="/assets/updated paul in DB.JPG">
<br>

## Delete a single person
-router.delete('/api/:user_id', controller.deletePerson)

//Delete a person -- 
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

<img src="/assets/Delete single person.JPG">
<br>

## Response to Delete single person request
-Agian, if an invalid id is passed - an invalid id error message will be returned
<img src="/assets/Invalid ID.JPG">

-If the correct id is passed - the person details will be deleted and also deleted from the db 
<img src="/assets/deleted paul2.JPG">

<br>

## Added feature
## - Get all persons
-router.get('/', controller.allPerson)

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

<img src="/assets/Get all person.JPG">

## Response to Get all person

<img src="/assets/All person.JPG">
<br>

## Assumption
-Since mongoDB create an id by default the mongoDB created id was used.



