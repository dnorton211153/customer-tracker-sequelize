const express = require('express');
const router = express.Router();

const CompanyController = require('../controllers/companyController')

router.route('/:id')
    .delete(CompanyController.deleteCompany)
    .post(CompanyController.updateCompany)
    
router.route('/')
    .get(CompanyController.getCompanies)
    .post(CompanyController.addCompany)



module.exports = router;