var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/video-store');
var custDB = monk('localhost:27017/customers');

router.get('/', function(req, res) {
    var collection = db.get('videos');
    collection.find({}, function(err, videos){
        if (err) throw err;
      	res.json(videos);
    });
});

router.get('/admin/customers', function(req, res) {
    var Custcollection = custDB.get('customers');
    Custcollection.find({}, function(err, customers){
        if (err) throw err;
      	res.json(customers);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

      	res.json(video);
    });
});
//to get form values.   
router.post('/', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        running_time: req.body.running_time,
        Genre: req.body.Genre,
        Rating: req.body.Rating,
        Director: req.body.Director,
        Status: req.body.Status
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        running_time: req.body.running_time,
        Genre: req.body.Genre,
        Rating: req.body.Rating,
        Director: req.body.Director,
        Status: req.body.Status
        
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('videos');
    collection.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});



module.exports = router;