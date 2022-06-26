const { Company } = require('../models');

module.exports = function() {
    return Company.bulkCreate([ // Returning and thus passing a Promise here
        {
            "name": "ABC Corporation"
        },
        {
            "name": "DEF Corporation" 
        },
    ]);
};