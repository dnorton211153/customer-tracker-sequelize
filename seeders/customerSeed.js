const { Customer } = require('../models');

module.exports = function() {
    return Customer.bulkCreate([ // Returning and thus passing a Promise here
        {
            "firstName": "Joe",
            "lastName": "Smith",
            "email": "joe@whatever.com"
        },
        {
            "firstName": "Dave",
            "lastName": "Norton",
            "email": "dave@whatever.com"
        },
    ]);
};