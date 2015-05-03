IGGApplication.controller("myPageCtrl", ['$scope','$resource','GetMyData','Pagination','$timeout' , function($scope, $resource, GetMyData,Pagination,$timeout){
	var note = GetMyData.get({}, function(u, getResponseHeaders) {
		$scope.data = u;
		console.log(u);
		$scope.pagination = Pagination.getNew(6);
		$scope.pagination.numPages = Math.ceil(u.Subscriptions.length/$scope.pagination.perPage);
		
		var articles = u.TimelineArticles;
		$scope.items = [];
		$scope.comments = 0;
      	for(i=0;i<2;i++){
      		$scope.items.push(articles[$scope.comments]);
      		$scope.comments += 1;
      	}
      	/*for the status of pleges*/
      	for(i=0;i<3;i++){
      		var a = u.Pledges[i].TargetCompleted;
	      	var b = u.Pledges[i].TargetTotal;
	      	var c = a*100/b;
		    u.Pledges[i].percentage = c;
      	}
	    /*for the status of pleges*/
	   
	    $scope.loadMore = function() {
	    	
	    	var a = $scope.comments;
      		var b = a+2;
      		for(i=a;i<b;i++){
	      		$scope.items.push(articles[i]);
	      		$scope.comments += 1;
	      		if($scope.items.length===articles.length){
	      			$scope.hideButton = true;
	      			$scope.lastClass = true;
	      		}
	      	}
	    	
	    	
	    };	
	      $scope.editemailid = function(){
	      	$scope.checkedTrue = true;
	      };
	      $scope.submitEmail = function(){
	      	$scope.checkedTrue = false;
	      };
	      $scope.showCategoryMenu = function(){
	      	$scope.CategoryShow = true;
	      };
	       $scope.hideCategoryMenu = function(){
	      	$scope.CategoryShow = false;
	      };
	}, function(err) {
		console.log("i got err");
	});

}]);

IGGApplication.factory('GetMyData', ['$resource', function($resource) {
   return $resource(paths.myPageData, null,
   {
       'getData': { method:'GET' }

   });

}]);
