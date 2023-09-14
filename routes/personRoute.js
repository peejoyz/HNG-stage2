const router = require('express').Router()
const controller = require('../controllers/personController')
const { personValidation } = require('../middleware/validation')

router
.get('/', controller.allPerson)
.post('/api', personValidation, controller.createPerson)
.get('/api/:user_id', controller.getSinglePerson)
.put('/api/:user_id', controller.updatePerson)
.delete('/api/:user_id', controller.deletePerson)

module.exports = router

