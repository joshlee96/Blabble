var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

var resultArray = [];

router.get('/' , function(req, res) {
    res.render('index', {
        items: resultArray
    });
});

router.get('/get-data', function(req, res) {
   mongo.connect(url, function(err, db) {
       assert.equals(null, err);
       var cursor = db.collection('blog-posts').find(); //get all pointers to these entries
       cursor.forEach(function(doc, err) {
           assert.equals(null, err);
           resultArray.push(doc);
       }, function() {
           db.close();
           res.render('index', {
               items: resultArray
           });
       });
   });
    res.redirect('/')
});

router.post('/add', function(req, res){
    var newPost = {
        name: req.body.name,
        comment: req.body.comment
    }

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('blog-posts').insertOne(newPost, function(err, result){
            assert.equal(null, err);
            console.log('Item added to database');
            db.close();
        });
    });
    res.redirect('/');
});

router.post('/delete', function(req, res) {

});
module.exports = router;