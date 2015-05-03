IGGApplication.controller("searchCtrl", ['$scope','$http','Pagination','$window' , function($scope, $http,Pagination,$window){
	$http({method: 'GET', url: '../Assets/Json/searchResults.json'}).
    success(function(data, status) { 
    	$scope.results=data; 
    	var paper,layer0,level0,level1,level2,coordinates,layer1,ifLoadonly,layer1Connections,textConnected,randomCentralX,randomCentralY;
    	var canvasID = document.getElementById("graphSearch");
    	var mapWidth =  canvasID.offsetWidth;
    	//console.log(canvasID.style);
		var mapHeight = canvasID.offsetHeight; 
		$scope.pagination = Pagination.getNew(10);
		$scope.pagination.numPages = Math.ceil(data.searchResults.length/$scope.pagination.perPage);
		
    	$scope.draw = function(ifLoadonly){
    		if(ifLoadonly){
    				paper = new Raphael(document.getElementById('graphSearch'), mapWidth, mapHeight);  
		    		randomCentralX = 20;
					randomCentralY = 20;
				}
	    		
		    	layer0 = paper.set();
		    	level0 = paper.set();
		    	level1 = paper.set();
		    	level2 = paper.set();
		    	level1Connections = paper.set();
		    	level2Connections = paper.set();
		    	var mainResult = data.results["mainResultId"];
		    	var connections_l0 = data.results[mainResult].relation;
		    	
		    	var circle_l0 = paper.circle(300+randomCentralX, 200+randomCentralY, descriptiveJSON.SizeCircles.large);
			    var image="url("+data.results[mainResult].image+")";
			  // if(ifLoadonly)
			    circle_l0.attr({"fill":image,stroke: 'rgba(233,229,226,.15)', 'stroke-width': 10});	
			    var textCircles = data.results[mainResult].name;
			    
			    var text = paper.text(300+randomCentralX, 270+randomCentralY, textCircles);
			    text.attr({'font-size': 14, 'font-family': 'Lato700','fill': '#e9e5e2'});
			    level0.push(circle_l0,text);	    
			    circle_l0.data('originalId',mainResult);
		    	    
					
			coordinates = descriptiveJSON.coordinates;
		    
		    $scope.reDraw = function(){		    
			    for(var i=0;i<connections_l0.length;i++){
			    	var id_l1 = connections_l0[i];
			    	//var smallImage="url("+data.results[id_l1].image+")";
			    	var centralOriginX = 300+randomCentralX;
			    	var centralOriginY = 200+randomCentralY;
			    	
			    	/*paths of relatively smaller circles*/
			    	var randomCenterX = Math.floor(Math.random()*50)+1;
		    		var randomCenterY = Math.floor(Math.random()*50)+1;  	
			    	var xCo = coordinates[i].x+randomCenterX;
			    	var yCo = coordinates[i].y+randomCenterY;
			    	var a = paper.path("M"+" "+ centralOriginX+" "+centralOriginY+" "+"L"+" "+ centralOriginX+" "+centralOriginY);	    
			    	//console.log("M"+" "+centralOriginX+" "+centralOriginY+" "+"L"+" "+xCo+" "+yCo);	
			    	a.attr({"stroke-width":"1","fill":"#e9e5e2","stroke":"#837974"}).animate({path: ("M"+" "+centralOriginX+" "+centralOriginY+" "+"L"+" "+xCo+" "+yCo)},300,"linear");
			    	
			    	/*paths of relatively smaller circles*/
			    	level1Connections.push(a);
			    	/*relatively smaller circles*/
			    	
			    	var circle_l1 = paper.circle(xCo , yCo , 0).animate({r:descriptiveJSON.SizeCircles.medium},300,"linear",function(){
			    		this.attr({"fill":this.data('img')});
			    	}).data('img',"url("+data.results[id_l1].image+")");
			    	//if(ifLoadonly)
			    	circle_l1.attr({"fill":"#434241",stroke: 'rgba(255,255,255,.3)', 'stroke-width': 1});
			    	var textCirclesConnected = data.results[id_l1].name;			    
				    textConnected = paper.text(xCo, yCo+40, textCirclesConnected);
				    textConnected.attr({'font-size': 12, 'font-family': 'Lato700','fill': '#e9e5e2'});
			    	//circle_l1.id='l1_'+id_l1;
			    	level1.push(circle_l1,textConnected);
			    	circle_l1.data('originalId',id_l1)
			    	.click(function(e){
			    			reArrange(this);				    				    						    			
			    		});
			    	
			    	level1.toFront();	
			    	/*relatively smaller circles*/
			    	
			    	var connections_l1 = data.results[id_l1].relation;			    	
			    	var smallRad=150;
			    	var angle = (Math.PI*0.6/connections_l1.length); 	
			    	for(var j=0;j<connections_l1.length;j++){
			    		var randomSizeLines = Math.floor(Math.random()*50);
			    		var idl_2 = connections_l1[j];
			    		var newAngle=(j+1)*angle-coordinates[i].offset*Math.PI/180;
			    		var smallImageLinkImages="url("+data.results[connections_l1[j]].image+")";
			    		var xCs=xCo+randomSizeLines+smallRad*Math.cos(newAngle);
			    		var yCs=yCo+randomSizeLines+smallRad*Math.sin(newAngle);
			    		var connections_smallerCircles = paper.path("M "+xCo+" "+yCo+" "+"L"+xCo+" "+yCo);	    	
			    		connections_smallerCircles.attr({"stroke-width":"1","fill":"#e9e5e2","stroke":"#837974"}).animate({path: ("M "+xCo+" "+yCo+" "+"L"+xCs+" "+yCs)},300,"linear");
			    		
			    		level2Connections.push(connections_smallerCircles);
			    		//setTimeout(function(){
			    		var circle_l2 = paper.circle(xCs , yCs , 0).animate({r:descriptiveJSON.SizeCircles.small},300,"linear");
			    		//if(ifLoadonly)
			    		circle_l2.attr({stroke: 'rgba(255,255,255,.3)',"fill":smallImageLinkImages,'stroke-width': 1});
			    		
			    		circle_l2.data('originalId',idl_2)
			    		.click(function(e){
			    			reArrange(this);
			    		});
			    		
				    	layer0.push(
				    		connections_smallerCircles,circle_l2
				    	);
				    	level2.push(circle_l2);
				    	//},Math.floor(Math.random()*1000));
			    	}	
			    	layer0.push(
			    		a,circle_l1,textConnected
			    	);    	
			    layer0.push(		    
				    connections_l0,
				    circle_l0,
				    text
				);	
			    	
			    }
		    };
		    $scope.drawSuggestions = function(){
		    	var hoverIn = function() {
			        this.attr({"stroke": "#ffb22c","cursor": "pointer"});
			    };
			    
			    var hoverOut = function() {
			        this.attr({"stroke": "#292826"});    
			    };
		    	var suggestions = data.suggestions.length;
			   	layer1 = paper.set();
			   	layer1Connections = paper.set();
			   	var circle_layer2;
			   	var coordinates_layer2 = descriptiveJSON.coordinates_layer2;
			   	var randomCoordinateX = Math.floor(Math.random()*100);
			   	var randomCoordinateY = Math.floor(Math.random()*100);
		    	for(var i=0;i<suggestions;i++){
			   		var xCo_layer2 = coordinates_layer2[i].x+randomCoordinateX;
			    	var yCo_layer2 = coordinates_layer2[i].y+randomCoordinateY;
			   		var noOfLines = Math.floor(Math.random()*1)+1;
			   		for(j=0; j<noOfLines; j++){	   			
			   			var randomIndex = Math.floor(Math.random()*(suggestions-1));
			   			var xCo_layer2_target = coordinates_layer2[randomIndex].x+randomCoordinateX;
			   			var yCo_layer2_target = coordinates_layer2[randomIndex].y+randomCoordinateY;
			   			var connections_layer2 = paper.path("M "+xCo_layer2+" "+yCo_layer2+" "+"L"+ xCo_layer2+" "+yCo_layer2);
			    		connections_layer2.attr({"stroke-width":"1","fill":"#fddf14","stroke":"#292826"}).animate({path: ("M "+xCo_layer2+" "+yCo_layer2+" "+"L"+" "+ xCo_layer2_target +" "+yCo_layer2_target)},300,"linear");
			    		layer1.push(
			    			connections_layer2
			    		);
			    		
			   		}
			   	}
			   	
			   	for(var i=0;i<suggestions;i++){
			   		var xCo_layer2 = coordinates_layer2[i].x+randomCoordinateX;
			    	var yCo_layer2 = coordinates_layer2[i].y+randomCoordinateY;
			   		circle_layer2 = paper.circle(xCo_layer2, yCo_layer2, descriptiveJSON.SizeCircles.layer2Circles);
			   		circle_layer2.attr({"fill":"#FFB22C",'stroke-width': 3,"stroke":"#434241"});
			   		circle_layer2.id=data.suggestions[i].id;
			   		layer1.push(
		    			circle_layer2
		    		);
		    		layer1Connections.push(circle_layer2);
		    		circle_layer2.click(function(){
		    			$window.location.href = "instance.html";
		    		});
		    		circle_layer2.hover(hoverIn, hoverOut, circle_layer2, circle_layer2);
			   	}
			   	layer1.toFront();
			   	circle_layer2.toFront();
		    };
		    $scope.reDraw();
		    if(ifLoadonly){
		    	$scope.drawSuggestions();
		    }
		    circle_l0.toFront();
		    text.toFront();
		    textConnected.toFront();
		    
    	};
    	
		/*find out main circle*/
	    $scope.draw(true);
	    
	    //$scope.drawSuggestions();
	    
		layer0.toFront();level1.toFront();
		
			$scope.parallexMe = function(){			
		    		var x=event.clientX;
					var y=event.clientY;
		    		//console.log(x+""+y);
		    		if(x<300 && y<250){
			    		//layer0.animate({transform:"T10,10"},2000);
					  	layer1.animate({transform:"T10,10"},1600);
				  	}else if(x>300 && y<250){
				  		//layer0.animate({transform:"T-10,10"},2000);
					  	layer1.animate({transform:"T-10,10"},1600);
				  	}else if(x<300 && y>250){
				  		//layer0.animate({transform:"T10,-10"},2000);
					  	layer1.animate({transform:"T10,-10"},1600);
				  	}else{
				  		//layer0.animate({transform:"T-10,-10"},2000);
					  	layer1.animate({transform:"T-10,-10"},1600);
				  	}
				  	return; 
	    	};
		 	
    	
	    $scope.parallexMeLeave = function(){
    		layer0.animate({transform:"T0,0"},1000);
		  	layer1.animate({transform:"T0,0"},2000);
    	};
	    var reArrange = function(circle){
	    	
	   		var clickedCircleOrigId = circle.data('originalId');
	   		
	    	data.results.mainResultId = clickedCircleOrigId;
	    	
			level0.push(circle); 
	    	level0.forEach(
    		function(e){
    			e.animate({r:0},300,"linear",function(){
    				level0.exclude(this);
    				this.remove();
    			});
    		});
	    
	    	level0.push(circle); 
	    	randomCentralX = Math.floor(Math.random()*150)+1;
		    randomCentralY = Math.floor(Math.random()*100)+1; 
	    	circle.animate({cx:300+randomCentralX,cy:200+randomCentralY,r:descriptiveJSON.SizeCircles.large,'stroke-width':10,stroke: 'rgba(233,229,226,.15)'},300,"linear",
		    	function(e){
		    		
		    		$scope.draw(false);	 
		    		//$scope.drawSuggestions(); 
		    		layer0.toFront();  		
		    	});				   	
			var leve1Length = 	level1.length;    	
    		level1.forEach(
    		function(e, index){
    			//level1.exclude(e);
    			if(e.data('originalId')!=clickedCircleOrigId){
    				e.animate({r:0},300,"linear",function(){	    					
    					this.remove();    					
    				});	    				
    			}
    			if (index === leve1Length - 1) {
					//console.log('last');
			        level1.exclude(e);
			    }
    		});
    		
			/*
			layer1Connections.forEach(
										function(e){
											e.animate({r:0},400,function(){	    					
												this.remove();    					
											});
										}
									);
									layer1.forEach(
										function(e){
											e.animate({"stroke-width":"0"},100,function(){	    					
												this.remove();    					
											});
										}
									);*/
			
			
    		var level1ConnectionsLength = level1Connections.length;
    		level1Connections.forEach(
    			function(e){
    				e.animate({"stroke-width":"0"},100,function(){	    					
    					this.remove();    					
    				});
    			}
    		);
    		var level2ConnectionsLength = level2Connections.length;
    		level2Connections.forEach(
    			function(e){
    				e.animate({"stroke-width":"0"},400,function(){	    					
    					this.remove();    					
    				});
    			}
    		);
    		var leve2Length = 	level2.length;    	
    		level2.forEach(
    		function(e, index){
    			//level1.exclude(e);
    			//if(e.data('originalId')!=clickedCircleOrigId){
    				e.animate({r:0},300,"linear",function(){	    					
    					this.remove();    					
    				});	    				
    			//}
    			if (index === leve2Length - 1) {
					//console.log('last');
			        level2.exclude(e);
			    }
    		});
	    	level1.toFront();
	    };
		
    }).error(function(data, status) {
      alert(status+"Data Not Found");
    });   
}]);

var descriptiveJSON =
{
	"coordinates":
	[
		{
			"x": 200,
			"y": 100,
			"offset": 210
		},
		{
			"x": 500,
			"y": 300,
			"offset": 30
		},
		{
			"x": 500,
			"y": 150,
			"offset": 90
		},
		{
			"x": 100,
			"y": 200,
			"offset": -120
		},
		{
			"x": 150,
			"y": 300,
			"offset": -45
		}
	],
	"coordinates_layer2":
	[
		{
			"x": 150,
			"y": 200
		},
		{
			"x": 130,
			"y": 180
		},
		{
			"x": 250,
			"y": 400
		},
		{
			"x": 350,
			"y": 210
		},
		{
			"x": 500,
			"y": 100
		},
		{
			"x": -10,
			"y": -10
		},
		{
			"x": -110,
			"y": 20
		},
		{
			"x": 50,
			"y": -20
		},
		{
			"x": 90,
			"y": -120
		},
		{
			"x": 200,
			"y": -60
		},
		{
			"x": 300,
			"y": 20
		},
		{
			"x": 350,
			"y": -10
		},
		{
			"x": 400,
			"y": -120
		},
		{
			"x": 550,
			"y": -20
		},
		{
			"x": 900,
			"y": 40
		},
		{
			"x": 1050,
			"y": -80
		},
		{
			"x": 800,
			"y": 300
		},
		{
			"x": 750,
			"y": 410
		},
		{
			"x": 600,
			"y": 210
		},
		{
			"x": 600,
			"y": 150
		},
		{
			"x": 700,
			"y": 510
		},
		{
			"x": 150,
			"y": 510
		},
		{
			"x": 600,
			"y": 510
		},
		{
			"x": 10,
			"y": 510
		},
		{
			"x": 500,
			"y": 310
		},
		{
			"x": -110,
			"y": 120
		},
		{
			"x": 1010,
			"y": 220
		},
		{
			"x": 1020,
			"y": 320
		},
		{
			"x": -10,
			"y": 320
		},
		{
			"x": -10,
			"y": 230
		},
		{
			"x": 1020,
			"y": 130
		}
	],
	"SizeCircles":
	{
		"small": 15,
		"medium": 30,
		"large": 50,
		"layer2Circles": 4	
	}
	
};