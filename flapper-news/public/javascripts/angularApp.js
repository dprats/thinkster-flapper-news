var app = angular.module('flapperNews',['ui.router']);

app.config([ 
	'$stateProvider', 
	'$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state('posts', {
			url: '/post/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

	$urlRouterProvider.otherwise('home');

}]);

//creating a factory to store the data
app.factory('posts', [function(){

	var o = {
		posts: []
	};

	return o;

}]);

app.controller('MainCtrl',['$scope','posts', function($scope, posts){

	$scope.test = 'hello world';
	$scope.posts = posts.posts;
	// $scope.posts = [
	// 	{title: 'post 1', upvotes: 5 },
	//   	{title: 'post 2', upvotes: 2},
	// 	{title: 'post 3', upvotes: 15},
	// 	{title: 'post 4', upvotes: 9},
	// 	{title: 'post 5', upvotes: 4}
	// ];

	//Create a $scope function that will add an object into the posts array:
	$scope.addPost = function(){
		if(!$scope.title || $scope.title === ''){ return; }

		$scope.posts.push({
			title: $scope.title, 
			link: $scope.link, 
			upvotes: 0,
			comments: [
			    {author: 'Joe', body: 'Cool post!', upvotes: 0},
			    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  			]
		});
		$scope.title = '';
		$scope.link = '';
	}

	$scope.incrementUpvotes = function(post){
		post.upvotes += 1;
	}

}]);

app.controller('PostsCtrl', ['$scope','$stateParams', 'posts', 
							function($scope, $stateParams, posts){

	//set a scope object called post that grabs the 
	//appropriate post from the posts service using the id from $stateParams:
	$scope.post = posts.posts[$stateParams.id];

	//create an addComment() function:
	$scope.addComment = function(post){

		if ($scope.body ===''){ return;}
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	}

}]);

