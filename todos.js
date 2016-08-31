var express = require('express');

var router = express.Router();

var toDoItems = [
    {id: 1, desc: "Buy Milk"},
    {id: 2, desc: "Drop Ben off"},
    {id: 3, desc: "Download Music"}
];

router.get('/' , function(req, res) {
    res.render('index', {
        title: "ToDo List App",
        items: toDoItems
    });
});

router.post('/add', function(req, res){
    var newItem = req.body.newItem;
    console.log(newItem);
    toDoItems.push({
        id: toDoItems.length + 1,
        desc: newItem
    });
    res.redirect('/');
});

module.exports = router;