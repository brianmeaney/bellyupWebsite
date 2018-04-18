 express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var Recipe = require('../models/recipe');
var bodyParser = require('body-parser');
var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BellyUp' });
});

router.get('/carbonara', function(req, res, next) {
  res.render('carbonara', { title: 'BellyUp' });
});

router.get('/steakchips', function(req, res, next) {
  res.render('steakchips', { title: 'BellyUp' });
});

router.get('/lasagne', function(req, res, next) {
  res.render('lasagne', { title: 'BellyUp' });
});

router.get('/sheppie', function(req, res, next) {
  res.render('sheppie', { title: 'BellyUp' });
});

router.get('/fishchip', function(req, res, next) {
  res.render('fishchip', { title: 'BellyUp' });
});

router.get('/stirfry', function(req, res, next) {
  res.render('stirfry', { title: 'BellyUp' });
});

router.get('/burgerchips', function(req, res, next) {
  res.render('burgerchips', { title: 'BellyUp' });
});

router.get('/fajitas', function(req, res, next) {
  res.render('fahitas', { title: 'BellyUp' });
});

router.get('/curry', function(req, res, next) {
  res.render('curry', { title: 'BellyUp' });
});

router.get('/request', function(req, res, next) {
  res.render('request', { title: 'BellyUp - Request a Recipe' });
});


/* GET home page. */
router.get('/feed', function(req, res, next) {
  res.render('feed', { title: 'BellyUp - Comments' });
});

router.get('/spagbol', function(req, res, next) {
  res.render('spagbol', { title: 'BellyUp - Spagetti Bolognaise' });
});

router.get('/resultpage/', function(req, res, next) {
  res.render('resultpage', { title: 'Express' });
});

router.post('/recipe', function(req, res, next){
console.log(req.body);

Recipe.find({$text: {$search: req.body.search }}, {score: {$meta: "textScore"}},  function(err, recipe) {
		//if you put a search term ie. "chicken", instead of "req.body", the search works
		res.json(recipe);
	}).sort({score: {$meta: "textScore"}}).limit(3);

});

router.post("/addComment", function(req, res, next)  {

	comment= new Comment(req.body);
	comment.save(function(err, savedComment) { 
		if(err)
		throw err;

	res.json({
		"id": savedComment._id
		});
	});
});


router.get('/getComments', function(req, res, next)  {

	Comment.find({}, function(err, comments) {
	if(err)
		res.send(err);

	res.json(comments);
	});
});

router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.remove({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "successfully removed the document"});
    });
});


router.get('/feed', function(req, res, next) {

    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('feed');
        }
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});

function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}



module.exports = router;


