var express = require('express');
var router = express.Router();

var monk = require('monk');
var custDB = monk('localhost:27017/video-store/customers');



router.get('/customers', function(req, res) {
    var Custcollection = custDB.get('customers');
    Custcollection.find({}, function(err, customers){
        if (err) throw err;
      	res.json(customers);
    });
});

module.exports = router;