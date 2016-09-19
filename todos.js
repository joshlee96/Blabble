var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/test';
var areNewPosts = true;
var blogPosts = [];

router.get('/' , function(req, res) {
    var resultArray = [];
    if(areNewPosts == true) {
        mongo.connect(url, function(err, db) {
            console.log('connected to db');
            var cursor = db.collection('blog-posts').find(); //get all pointers to these entries
            cursor.forEach(function(doc, err) {
                resultArray.push(doc);
            }, function() {
                db.close();
                res.render('index', {
                    items: resultArray
                });
            });
        });
        areNewPosts = false;
        blogPosts = resultArray;
    }
    else {
        res.render('index', {
            items: blogPosts
        });
    }
});

router.post('/comment/:id', function(req, res) {
    var id = req.params.id;
    var newComment = req.body.comment;
    console.log(newComment);

    mongo.connect(url, function(err,db) {
        db.collection('blog-posts').update({"_id": objectId(id)}, {$set: {comments: newComment}});
        db.close();
    });
    areNewPosts = true;
    res.redirect('/')
});

// about page
router.get('/about', function(req, res) {
    res.render('about');
});

router.post('/add', function(req, res){
    var newPost = {
        title: req.body.title,
        post: req.body.post,
        comments: []
    };
    mongo.connect(url, function (err, db) {
        db.collection('blog-posts').insertOne(newPost, function(err, result){
            console.log('Item added to database');
            db.close();
        });
    });
    areNewPosts = true;
    res.redirect('/');
});

router.post('/delete/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    mongo.connect(url, function(err, db) {
       db.collection('blog-posts').deleteOne({"_id": objectId(id)}, function(err, result) {
           console.log('item deleted');
           db.close();
       });
    });
    areNewPosts = true;
    res.redirect('/');
});

module.exports = router;