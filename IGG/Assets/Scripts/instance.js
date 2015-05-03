var IGGApplication = angular.module('IGG', ['ngResource','angular-carousel']);
var window_width ;
var window_height;
IGGApplication.controller("pageCtrl", ['$scope','$resource','GetDashboardData','$rootScope','$timeout' , function($scope, $resource, GetDashboardData,$rootScope,GetInstanceData,$timeout){
	$scope.expandHeight = false;
	$scope.openHome = false;
	var note = GetDashboardData.get({}, function(u, getResponseHeaders) {
		console.log(u);
		$scope.data = u;
	}, function(err) {
		console.log("i got err");
	});
}]);
IGGApplication.directive('clickAnywhereButHere', function($document){
	  return {
	    restrict: 'A',
	    link: function(scope, elem, attr, ctrl) {
	      elem.bind('click', function(e) {
	        // this part keeps it from firing the click on the document.
	        e.stopPropagation();
	      });
	      $document.bind('click', function() {
	        scope.$apply(attr.clickAnywhereButHere);
	      });
	    }
	  };
	});
/*--Nixon--*/
	IGGApplication.controller("instanceCtrl",['$scope','$resource','GetInstanceData','$timeout','$http','$location','$anchorScroll', function($scope, $resource, GetInstanceData,$timeout,$http,$location,$anchorScroll){
		$scope.clicked = false;
		$scope.clickLike = function(){
			if(!$scope.clicked)
			$scope.clicked = true;
			else
			$scope.clicked = false;
		};
		
		$scope.hodeCommentsBlock = true;
		$scope.messageClick = false;
		$scope.closeOthers = function(){
			$scope.searchActive = false;
			$scope.textBoxAnim = false;
		};
		
		$scope.background = true;
		$scope.contact = false;
		$scope.reports = false;
		$scope.backgroundStuff = function(){
			$scope.background = true;
			$scope.contact = false;
			$scope.reports = false;
		};
		$scope.reportsStuff = function(){
			$scope.background = false;
			$scope.contact = false;
			$scope.reports = true;
		};
		$scope.contactStuff = function(){
			$scope.background = false;
			$scope.contact = true;
			$scope.reports = false;
		};
		$scope.movethisToRight = function(){
			$scope.searchActive = true;
			$scope.textBoxAnim = true;
			document.getElementById("myTextbox").focus();
		};
		
		//show and hide comments
		
		$scope.hideComments = function(){
			if(!$scope.hodeCommentsBlock){
				if(!$scope.expandMsgBlk){
					$scope.expandMsgBlk = true;
				}
				else{
					$scope.expandMsgBlk = false;
				}
			}else{			
				$scope.hodeCommentsBlock = false;
				if(!$scope.messageClick){
				$http({method: 'GET', url: '../Assets/Json/commentsData.json'}).
		    	success(function(data, status) {
			    	$scope.predicate = '-commentPostDate';
			    	$scope.clickedSec = false;
			    	$scope.clicked = true;
			    	$scope.clickedTab = function(){
			    		$scope.clickedSec = false;
			    		$scope.clicked = true;
			    		$scope.clickedThird = false;
			    	};
			    	$scope.clickedTabSec = function(){
			    		$scope.clicked = false;
			    		$scope.clickedSec = true;
			    		$scope.clickedThird = false;
			    	};
			    	$scope.clickedTabThird = function(){
			    		$scope.clicked = false;
			    		$scope.clickedSec = false;
			    		$scope.clickedThird = true;
			    		
			    	};
			    	$scope.comments = 0;
			      	$scope.commentsToShow =[];
			      	for(i=0;i<2;i++){
			      		$scope.commentsToShow.push(data.commentUserDetails[i]);
			      		$scope.comments += 1;
			      	}
			      	$scope.loadMore = function(){
			      		var a = $scope.comments;
			      		var b = a+2;
			      		for(i=a;i<b;i++){
				      		$scope.commentsToShow.push(data.commentUserDetails[i]);
				      		$scope.comments += 1;
				      		if($scope.commentsToShow.length===data.commentUserDetails.length){
				      			$scope.hideButton = true;
				      		}
				      	}
				      	//window.scrollTo(0,1000);
				     // $location.hash('LoadButton');
					 // $anchorScroll();
					    
			      	};
			    	$scope.blankCommentsText = true;
		    		$scope.commentUserDetails=$scope.commentsToShow;
				    $scope.layoutChange = function() {	
				    	$scope.blankCommentsText = false;
				    	$scope.acceptComment = function() {	
				    		$scope.addComments = false;
				    		var commentObject={};
			      			commentObject.comment = $scope.userInputComment;
			      			/* --name of the user and date are hardcoded here--*/
			      			commentObject.commentUserName = "Jake Danzka";
			      			commentObject.commentPostDate = "28 FEB";
			      			commentObject.userReply = [];
			      			
			      			/*
							  if(commentObject.comment===""){
																$scope.addComments = false;
																return;
															}*/
							  
			      			/*--/hardcoded--*/
			      			console.log(commentObject);
			      			$scope.commentUserDetails.unshift(commentObject);
			      			data.commentUserDetails.unshift(commentObject);
			      			$scope.totalComments = data.commentUserDetails.length;
			      			
			   			 };
			   		};
			   		
			   		$scope.addComment = function(){
						$scope.addComments = true;						
					};
					$scope.blankComment = function(){
						if($scope.addComments){	
							if($scope.blankCommentsText)					
				   				$scope.addComments = false;
				   		}
	      			};
					$scope.reply = function($event){						
						angular.element($event.target.nextElementSibling).addClass("active");
					};
					
					$scope.hideReplyComments = function($event){
						if(!angular.element($event.target).hasClass('active')){						
							angular.element($event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling).addClass("hide");
							angular.element($event.target).addClass('active');
							
						}
						else{						
							angular.element($event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling).removeClass("hide");
							angular.element($event.target).removeClass('active');
							
						}
						
					};
			   		$scope.change = function($index) {	 
			   			 $scope.acceptReplyComment = function($event) {			   			 	
							var replyCommentObject={};
							replyCommentObject.description = $scope.commentUserDetails[$index].userReply.description;
							replyCommentObject.replyeeName = "Jake Danzka";
							replyCommentObject.replyDate = "28 FEB";
							$scope.commentUserDetails[$index].userReply.unshift(replyCommentObject);						
							angular.element(document.getElementsByClassName('pg-reply-on-post-input-container')).removeClass('active');
			      		};
			      	};	
			      	
		      				
			    }).error(function(data, status) {
			      alert(+status+"Data Not Found");
			    });	
			    }		
			};
		};
		$scope.closeMessages = function(){	
			$scope.expandMsgBlk = false;		
			$scope.hodeCommentsBlock = true;	
		};
		//show and hide comments
		
		var note1 = GetInstanceData.get({}, function(data, i) {
		$scope.aa = data.userDetails;
		$scope.totalComments = data.totalComments;
	}, function(err) {
		console.log("i got error");
	});
	
}]);
/*--/Nixon--*/

IGGApplication.factory('GetDashboardData', ['$resource', function($resource) {
   return $resource(paths.dashboardPath, null,
   {
       'getData': { method:'GET' }
   });
}]);
/*--data fetch:Nixon--*/
IGGApplication.factory('GetInstanceData', ['$resource', function($resource) {
   return $resource(paths.instancePath, null,
   {
       'getData': { method:'GET' }
   });
}]);
/*--/Nixon--*/