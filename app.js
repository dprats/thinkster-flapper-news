angular.module('flapperNews',[]);

angular.module('flapperNews').controller('MainCtrl',['$scope', function($scope){

	$scope.test = 'hello world';
	$scope.posts = [
		{title: 'post 1', upvotes: 5 },
	  	{title: 'post 2', upvotes: 2},
		{title: 'post 3', upvotes: 15},
		{title: 'post 4', upvotes: 9},
		{title: 'post 5', upvotes: 4}
	];

	//Create a $scope function that will add an object into the posts array:
	$scope.addPost = function(){
		if(!$scope.title || $scope.title === ''){ return; }
		$scope.posts.push({title: $scope.title, upvotes: 0}	);
		$scope.title = '';
	}

}]);