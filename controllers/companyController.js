
const { Customer, Company } = require('../models');

// create new company
exports.addCompany = async (req,res,next) => {
    
    try {
        const { name } = req.body;
        const company = await Company.create(req.body);
        return res.status(201).json({
            success: true,
            data: company
        });
    } catch (err) {
        if (err.name == 'ValidationError') {
            const messages = Object.values(err.errors).map(val=> val.message);
            res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }
}

exports.getCompanies = async (req,res,next) => {

    try {
        const companies = await Company.findAll({
            include: [
              {
                model: Customer,
                as: "customers",
                attributes: ["id", "firstName", "lastName", "email"],
                through: {
                  attributes: [],
                }
              },
            ],
          });
        return res.status(200).json({
            success: true,
            count: companies.length,
            data: companies
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.getCompanyById = async (req,res,next) => {
    try {
        const company = await Company.findByPk(req.params.id, {
            include: [
              {
                model: Customer,
                as: "customers",
                attributes: ["id", "firstName", "lastName", "email"],
                through: {
                  attributes: [],
                }
              },
            ],
          });
        if (!company) {
            return res.status(404).json({
                success: false,
                error: 'No company found'
            })
        } else {

            return res.status(200).json(company);
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })        
    }
}

exports.deleteCompany = async (req,res,next) => {
    try {
        const company = await Company.findByPk(req.params.id);
        if (!company) {
            return res.status(404).json({
                success: false,
                error: 'No company found'
            })
        } else {
            await company.destroy();
            return res.status(200).json({
                success: true,
                data: {}
            })
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })        
    }
}

exports.updateCompany = async (req,res,next) => {
    try {
        const company = await Company.findByPk(req.params.id);
        if (!company) {
            return res.status(404).json({
                success: false,
                error: 'No company found'
            })
        } else {

            Object.entries(req.body).forEach(([key,value]) => {
                company[key] = value;
            })

            await company.save();
            return res.status(200).json({
                success: true,
                data: company
            })
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })        
    }
}

// link company to customer
exports.linkCompanyToCustomer = async (req,res,next) => {
    try {
        const company = await Company.findByPk(req.body.company_id);
        if (!company) {
            return res.status(404).json({
                success: false,
                error: 'No company found'
            })
        } else {
            const customer = await Customer.findByPk(req.body.customer_id);
            if (!customer) {
                return res.status(404).json({
                    success: false,
                    error: 'No customer found'
                })
            } else {
                await company.addCustomer(customer);
                return res.status(200).json({
                    success: true,
                    data: company
                })
            }
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })        
    }
}
