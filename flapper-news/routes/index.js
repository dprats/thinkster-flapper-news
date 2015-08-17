var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//start by creating a GET route for retrieving posts in routes/index.js. 
//It should return a JSON list containing all posts:

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

router.get('/posts', function(req,res, next){

	Post.find(function(err,posts){
		if (err){ return next(err); }

		res.json(posts);
	})

});


//creating a POST route for creating posts:

router.post('/posts', function(req,res,next){

	var post = new Post(req.body);

	post.save(function(err, post){
		if(err) {return next(err); }

		res.json(post);	
	});

});

//Rather than replicating the same code for the remaining routes across several
//different request handlers, we use the param() function on Express.js to loan an object

router.param('post', function(req,res,next,id){

	var query = Post.findById(id);

	query.exec(function(err, post){
		if (err) { return next(err); }
		if (!post) { return next(new Error('can\'t find post')); }

		req.post = post;
		return next();
	});
});

//create our route for returning a single post:
router.get('/posts/:post', function(req,res){
	res.json(req.post);
});
