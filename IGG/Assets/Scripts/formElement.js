var IGGApplication = angular.module('IGG', ['ngResource']);
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
IGGApplication.controller("formCtrl",['$scope','$timeout', function($scope,$timeout){
	$scope.username1 = 'Peter Parker';
	$scope.closeOthers = function(){
		$scope.searchActive = false;
		$scope.textBoxAnim = false;
		document.getElementById("myTextbox").blur();
	};
	$scope.showProcessing = function(){
		if(!$scope.show)
		$scope.show = true;
		$scope.processing = "Processing...";
		/*presently its timeout, call "$scope.show = false;" when the data is fetched*/
		$timeout(function(){
			$scope.processing = "Fetched";			
		},1000);
		$timeout(function(){
			$scope.show = false;				
		},1500);
	};
	$scope.movethisToRight = function(){
		$scope.searchActive = true;
		$scope.textBoxAnim = true;
		document.getElementById("myTextbox").focus();
	};
}]);
$(window).on('load', function() {
	/*for hamburger menu*/
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
	/*hamburger menu ends*/
	$("select").chosen({
	});

	$("#dialog").dialog({
		modal: true,
		draggable : false,
		autoOpen : false,
		show : {
			effect : "explode",
			duration : 150
		},
		hide : {
			effect : "explode",
			duration : 150
		},
		open: function(){
            jQuery('.ui-widget-overlay').bind('click',function(){
                jQuery('#dialog').dialog('close');
            });
       }
	});
	$("#nonModalDialog").dialog({
		draggable : false,
		autoOpen : false
	});
	$("#opener").click(function() {
		$("#dialog").dialog("open");
	});
	$("#nonModalOpener").click(function() {
		$("#nonModalDialog").dialog("open");
	});
	
	$('.multiple').append('<span class="arrow_image"></span>');
	$("#datepicker").datepicker({
		 beforeShow: function(input, inst) {
        // Handle calendar position before showing it.
        // It's not supported by Datepicker itself (for now) so we need to use its internal variables.
        var calendar = inst.dpDiv;

        // Dirty hack, but we can't do anything without it (for now, in jQuery UI 1.8.20)
        setTimeout(function() {
            calendar.position({
                my: 'right top',
                at: 'right bottom',
                collision: 'none',
                of: input
            });
        }, 1);
    }
	});
	$('.addmore').on('click', function() {
		$('.repeatableElm').parent().append('<div class= "repeatableElm"><textarea placeholder="This is a text area"></textarea></div>');
		$(".target").customScrollbar("resize", true);
	});

	$(".target").customScrollbar({
		updateOnWindowResize : true
	});

	var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];
	var availableTags1 = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];
	$("#tags").autocomplete({
		source : availableTags
	});
	$("#tags1").autocomplete({
		source : availableTags1
	});
	$("#tabs").tabs();
	$(function() {
    $( "#accordion" ).accordion({
	      heightStyle: "fill"
	    });
	  });
	  $(function() {
	    $( "#accordion-resizer" ).resizable({
	      minHeight: 140,
	      minWidth: 200,
	      resize: function() {
	        $( "#accordion" ).accordion( "refresh" );
	      }
	    });
	  });
	 $(function() {
    
    $( ".ui-widget-content" ).draggable({
      connectToSortable: ".ui-widget-content",
      revert: "invalid"
    }).sortable({    	
	      revert: true
	});  
	$( ".ui-widget-content" ).draggable( "option", "connectToSortable", ".ui-widget-content" );
	$( "ul, li" ).disableSelection();
 
    $( "#droppable" ).droppable({
      activeClass: "ui-state-hover",
      hoverClass: "ui-state-active",
      drop: function( event, ui ) {   
      	$('.ui-sortable-helper ').addClass( "activeLi" ).removeClass("ui-widget-content")  ; 	
        $( this ).addClass( "ui-state-highlight" );
        return false;
         $( ".activeLi" ).draggable({
		      revert: "invalid"
	     });
      }
    });
  });
}); 
