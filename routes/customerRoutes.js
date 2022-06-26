const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/customerController')

router.route('/:id')
    .get(CustomerController.getCustomerById)
    .delete(CustomerController.deleteCustomer)
    .post(CustomerController.updateCustomer)


router.route('/')
    .get(CustomerController.getCustomers)
    .post(CustomerController.addCustomer)



module.exports = router;