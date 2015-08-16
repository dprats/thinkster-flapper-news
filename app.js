var app = angular.module('flapperNews',['ui.Router']);

app.config([ '$stateProvider', '$urlrouteProvider', function($stateProvider, $urlrouteProvider){

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});

	$urlrouteProvider.otherwise('home');

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
			upvotes: 0
		});
		$scope.title = '';
		$scope.link = '';
	}

	$scope.incrementUpvotes = function(post){
		post.upvotes += 1;
	}

}]);

//creating a factory to store the data
app.factory('posts', [function(){

	var o = {
		posts: []
	}

	return o;

}]);