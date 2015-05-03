var IGGApplication = angular.module('IGG', ['ngResource','simplePagination']);

IGGApplication.directive('clickAnywhereButHere', function($document){
	  return {
	    restrict: 'A',
	    link: function(scope, elem, attr, ctrl) {
	    	var hitEvent = 'ontouchstart' in document.documentElement
			  ? 'touchstart'
			  : 'click';
	      elem.bind(hitEvent, function(e) {
	        // this part keeps it from firing the click on the document.
	        e.stopPropagation();
	      });
	      $document.bind(hitEvent, function() {
	        scope.$apply(attr.clickAnywhereButHere);
	      });
	    }
	  };
	});
IGGApplication.directive('typeahead', ["$timeout", function($timeout) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '...',

        // ...
    };
}]);
IGGApplication.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });
IGGApplication.directive('scrollcontainer', function(){
	return {
	    restrict: 'A',
	    link: function(scope, elem, attr, ctrl) {
	      	angular.element(elem).bind('scroll', function() {
	      		scope.$apply(attr.scrollcontainer);
	      	});
	    }
	  };
});
IGGApplication.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight-300) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});
IGGApplication.directive('loading', function() { 
		
		return {
		restrict: 'A',
		templateUrl : '../HTML/Rotate.html',
		link : function(scope, el, attrs){
			
		}
	};
});
IGGApplication.controller("pageCtrl", ['$scope','$resource','GetDashboardData','$timeout','$location','$anchorScroll' , function($scope, $resource, GetDashboardData,$timeout,$location,$anchorScroll){
	$scope.expandHeightCity = false;	
	$scope.openCity = false;
	$scope.openMore = false;
	$scope.expandHeightMore = false;
	$scope.expandHeightJoin = false;
	$scope.openJoin = false;
	
	var note = GetDashboardData.get({}, function(u, getResponseHeaders) {
		$scope.data = u;
	}, function(err) {
		console.log("i got err");
	});
	
		
	$scope.closeOthers = function(){
		$scope.searchActive = false;
		$scope.textBoxAnim = false;
		document.getElementById("myTextbox").blur();
	};
	$scope.closeCity = function(){
		$timeout(function(){
			$scope.expandHeightCity = false;	
		},150);			
		$scope.openCity = false;
	};
	$scope.closeMore = function(){
		$timeout(function(){
			$scope.expandHeightMore = false;	
		},150);			
		$scope.openMore = false;
	};
	$scope.closeJoin = function(){
		$timeout(function(){
			$scope.expandHeightJoin = false;	
		},150);			
		$scope.openJoin = false;
	};
	$scope.openSlideCity = function(){
		$scope.openMore = false;
		$scope.expandHeightMore = false;
		$scope.expandHeightJoin = false;
		$scope.openJoin = false;
		if(!$scope.expandHeightCity){
			$scope.expandHeightCity = true;
			$timeout(function(){
				$scope.openCity = true;					
			},150);			
		}else{
			$timeout(function(){
				$scope.expandHeightCity = false;	
			},150);			
			$scope.openCity = false;
		}
	};
	$scope.openSlideMore = function(){
		$scope.expandHeightJoin = false;
		$scope.openJoin = false;
		$scope.expandHeightCity = false;
		$scope.openCity = false;
		if(!$scope.expandHeightMore){
			$scope.expandHeightMore = true;
			$timeout(function(){
				$scope.openMore = true;					
			},150);			
		}else{
			$timeout(function(){
				$scope.expandHeightMore = false;	
			},150);			
			$scope.openMore = false;
		}
	};
	$scope.openSlideJoin = function(){
		$scope.expandHeightMore = false;
		$scope.openMore = false;
		$scope.expandHeightCity = false;
		$scope.openCity = false;
		if(!$scope.expandHeightJoin){
			$scope.expandHeightJoin = true;
			$timeout(function(){
				$scope.openJoin = true;					
			},150);			
		}else{
			$timeout(function(){
				$scope.expandHeightJoin = false;	
			},150);			
			$scope.openJoin = false;
		}
	};
	$scope.movethisToRight = function(){
		$scope.searchActive = true;
		$scope.textBoxAnim = true;
		document.getElementById("myTextbox").focus();
	};

}]);


IGGApplication.factory('GetDashboardData', ['$resource', function($resource) {
   return $resource(paths.dashboardPath, null,
   {
       'getData': { method:'GET' }
   });
}]);
$(document).ready(function(){
	
	var breadCrumbFirstLine = $(".pg-breadCrumb-firstLine");  
	var breadCrumbSecondLine = $(".pg-breadCrumb-secondLine");  
	var breadCrumbThirdLine = $(".pg-breadCrumb-thirdLine");  
	var hammIconCont = $(".pg-hamm-icon-cont");
	var hamburgerDown = $(".pg-hamburger-down");
	var hamburgerUp = $(".pg-hamburger-up");
	var relativeDiv = $(".relativeDiv");
	var initiateDropdown = true;
	var iconsaAreClicked;
	
	$(".pg-hamburger-window").click(function(event){
		event.stopPropagation();
	});
	
			$(".pg-breadCrumb-cont").click(function(event){
				if (initiateDropdown) {
					if(!iconsaAreClicked){
					iconsaAreClicked = true;
					event.stopPropagation();
			    	
			    	hamburgerUp.css('opacity','0.3');
					hamburgerUp.css('color','#ffffff');
					hamburgerUp.css('background','#32302f');
			    	hamburgerUp.animate({'opacity':'1'},500);
				    breadCrumbFirstLine.animate({top:'40px'},150,function(){
				    		breadCrumbFirstLine.css('visibility','hidden');
				    	});
				    breadCrumbSecondLine.animate({top:'31px'},150,function(){
				    		breadCrumbSecondLine.css('visibility','hidden');
				   		});
				    breadCrumbThirdLine.animate({top:'22px'},150,function(){
				    		
					    /*--before opacity waala part was here--*/
					   		
					   		breadCrumbThirdLine.animate({left:'-10px',width:'210px'},150,function() {
					   			
					    	});  
					    	hammIconCont.animate({opacity:'1'},500);
					    	hammIconCont.promise().done(function(){								
							   	initiateDropdown = false;							   			
				   			});
				   });				   
				   hamburgerDown.slideDown(150);
		     }
		  }  
	  	});
	  	
	 
	
	 	var hitEvent = 'ontouchstart' in document.documentElement
		  ? 'touchstart'
		  : 'click';
	     $("body, .pg-breadCrumb-cont").bind(hitEvent,function(event) {
	     	if(!initiateDropdown) {
		     	if(iconsaAreClicked){
				  	hammIconCont.animate({opacity:'0'},500);
				  		hamburgerDown.slideUp(150);
				  		
				  		breadCrumbThirdLine.animate({left:'0px',width:'25px'},450,function (){
				  			breadCrumbFirstLine.css('visibility','visible');
				    		breadCrumbSecondLine.css('visibility','visible');
				    		breadCrumbFirstLine.animate({top:'0px'},150);
				    		breadCrumbSecondLine.animate({top:'0px'},150);
				    		breadCrumbThirdLine.animate({top:'0px'},150);
				    		
				  		});
					  	hamburgerUp.animate({opacity:'1'});	
				  	   
				  	   hamburgerUp.css('color','#676665');
				       hamburgerUp.css('background','#E9E5E2');
				  	   hamburgerUp.animate({'opacity':'1'},function(){
				  	   		
				    		hamburgerUp.css('opacity','1');
				  	   });
				  	   hamburgerDown.animate({'opacity':'1'});
				  	
				  	hammIconCont.promise().done(function(){
					  		iconsaAreClicked = false;
					  		initiateDropdown = true;
					  		
					});
					
			  	}
		  	}
		  });	
});
