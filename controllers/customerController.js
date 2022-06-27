
const { Customer, Company } = require('../models');

// create new customer
exports.addCustomer = async (req,res,next) => {
    
    try {
        const { firstName, lastName, email } = req.body;
        const customer = await Customer.create({ firstName, lastName, email });
        return res.status(201).json({
            success: true,
            data: customer
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

exports.getCustomers = async (req,res,next) => {

    try {
        const customers = await Customer.findAll({
            include: [
              {
                model: Company,
                as: "companies",
                attributes: ["id", "name"],
                through: {
                  attributes: [],
                }
              },
            ],
          });
        return res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.getCustomerById = async (req,res,next) => {
    try {
        const customer = await Customer.findByPk(req.params.id, {
            include: [
              {
                model: Company,
                as: "companies",
                attributes: ["id", "name"],
                through: {
                  attributes: [],
                }
              },
            ],
          });
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'No customer found'
            })
        } else {
            return res.status(200).json(customer);
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })        
    }
}

exports.deleteCustomer = async (req,res,next) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'No customer found'
            })
        } else {
            await customer.destroy();
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

exports.updateCustomer = async (req,res,next) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'No customer found'
            })
        } else {
            for (const [key, value] of Object.entries(req.body)) {
                    customer[key] = value;
            }

            await customer.save();
            return res.status(200).json({
                success: true,
                data: customer
            })
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })        
    }
}

// link customer to company
exports.linkCustomerToCompany = async (req,res,next) => {
    try {
        const customer = await Customer.findByPk(req.params.customer_id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'No customer found'
            })
        } else {
            const company = await Company.findByPk(req.params.company_id);
            if (!company) {
                return res.status(404).json({
                    success: false,
                    error: 'No company found'
                })
            } else {
                await customer.setCompany(company);
                return res.status(200).json({
                    success: true,
                    data: customer
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