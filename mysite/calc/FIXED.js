/*firstSource.js
  Edited stuff*/

//Global variable:

solar_calculator = 
	'<div class="wrapperCalc" id="solar_calc">' +
		'<div id="prev" class="cursor"></div>' +
		'<div class="resizable_pvc">' +
			'<div class="pvcalc">' +
				'<div id="floatingBarsG">' +
					'<div class="blockG" id="rotateG_01"></div>' +
					'<div class="blockG" id="rotateG_02"></div>' +
					'<div class="blockG" id="rotateG_03"></div>' +
					'<div class="blockG" id="rotateG_04"></div>' +
					'<div class="blockG" id="rotateG_05"></div>' +
					'<div class="blockG" id="rotateG_06"></div>' +
					'<div class="blockG" id="rotateG_07"></div>' +
					'<div class="blockG" id="rotateG_08"></div>' +
				'</div>' +	
				'<div class="pgNav draggable">' +
					'<div class="tabNav">' +
						'<div class="all_tabs">' +
						'</div>' +														'</div>' +
					'<div class="pageNav cursor" id="pg0" page="0"> [Name] </div>' +
					'<div class="pageNav cursor" id="pg1" page="1"> [Input] </div>' +
					'<div class="pageNav cursor" id="pg2" page="2"> [Result] </div>' +
					'<div class="add_tab cursor window">+Add</div>' +
					'<div class="hide cursor"> - </div>' +
					'<div class="exit cursor"> X </div>' +
				'</div>' +
				'<div class="contents">' +
					'<div class="add_tab startpg cursor">+Create An Instance</div>' +
				'</div>' +
			'</div>' +
		'</div>' +				
		'<div id="next" class="cursor"></div>' +
	'</div>' ,

googleMapHTML =
	'<div class="wrapperGoogle" id="google_map">' +
		'<div class="resizable_map">' +
			'<div class="gmap" >' +					
				'<div class="pgNav draggable">' +
					'<div class="tabNav">' + 'GOOGLE MAP' +	
					'</div>' +
					'<div class="hide_map cursor"> - </div>' +
					'<div class="exit cursor"> X </div>' +
				'</div>' +
				'<div id="googleMap">' +
				'</div>'
			'</div>' +
		'</div>' +
	'</div>' ,
heatMapData = new google.maps.MVCArray(),
elevator = new google.maps.ElevationService(),

//…

// Added Functions:
// HEATMAP implementation function
heatmapLoad: function() {
	var _this = this,
		mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng(34.0522300, -118.2436800),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	},
	map, pointarray, heatmap;
	
	var nw_lat = 34.16566,
		nw_lng = -118.58795,
		se_lat = 33.93866,
		se_lng = -118.08533,
		weightedElev;
		
	map = new google.maps.Map( document.getElementById('googleMap'),
			mapOptions);
	
	for (var x = se_lat; x < nw_lat; x+=0.012) {
		for (var y = nw_lng; y < se_lng; y+= 0.012) {
			
			var currentLatLng = [];
			
			// convert the increasing latitude & longitude into google map coordinates
			currentLatLng.push( new google.maps.LatLng(x,y));
			
			var positionCoord = {
				'locations': currentLatLng
			}
			
			if ( x < 34.04 ) {
				if( y > -118.4314)
					// plot heatmap only the bottom right area of LA
					_this.getElevation(positionCoord, x, y)
			} else {	// plot the top-half part of LA
				_this.getElevation(positionCoord, x, y)
			}
			
		}
	}
	
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: heatMapData
	});
	
	heatmap.setMap(map);
	heatmap.set('radius', heatmap.get('radius') ? null : 20);
	
},

// Getting the elevation from latitude and longitude plot
getElevation: function(data, lat, lng) {
	// get the weight of elevation at each x,y coordinate
	elevator.getElevationForLocations(data, function(results, status)
	{
		if (status == google.maps.ElevationStatus.OK) {
			// Retrieve the elevation and append to heatMapData array
			if (results[0]) {
			
				var elev = results[0].elevation;
				
				heatMapData.push({
					location: new google.maps.LatLng(lat, lng),
					weight: elev
				});
		
			} else {
			alert("Elevation is not found!");
			}
		} else {
			alert("Elevation service failed due to: " + status);
		}
	});
},



////////////////// Replace!////////////////
configureController: function() {
	var _this = this;
			
	$(".ctrl_pvc").on("click", function(e) {
		var solar_window = '<div class="window_tab solar_calc_window"><img class="window_img" src="solarenergy.jpg"></img></div>';																											
		if( $(".wrapperCalc").length == 0 ) {
			$(".total").append(solar_calculator);
			$(".bottombar").append(solar_window);
			_this.configureSelect();
			_this.configureAutoSave();
			_this.configurePageMove();
			_this.configurePageNav();
			_this.configureCalc();
			_this.configureAddTab();
			_this.configureTabNav();																								
			_this.configurePointer();
			_this.configureWindow();
			_this.configureLoadSpinner();
			
		}
	});
			
	$(".ctrl_googmap").on("click", function(e) {
		var gmap_window = '<div class="window_tab google_map_window"><img class="window_img" src="googlemap.jpg"></img></div>';																											
		if( $(".wrapperGoogle").length == 0 ) {
			$(".total").append(googleMapHTML);
			$(".bottombar").append(gmap_window);
			_this.configureSelect();
			//_this.configureAutoSave();
			_this.configurePageMove();
			_this.configurePageNav();
			_this.GoogleMapWidget();
			//_this.configureAddTab();
			//_this.configureTabNav();																						
			_this.configurePointer();
			_this.configureWindowGMAP();
			_this.configureLoadSpinner();
			_this.heatmapLoad();
			
		}
	});		
	
},



///////////////////// NEWLY ADDED!!! ///////////////////////////
configureWindowGMAP: function() {
	$(".google_map_window").off();
	$(".google_map_window").on("click", function() {
		$("#google_map").show();
	}).on("mouseenter", function() {
		$(this).addClass( "mouseover" );
		//$(this).css("box-shadow", "0 0 5px 2px rgba(224, 224, 31, 0.8)");
	}).on("mouseleave", function() {
		$(this).css("box-shadow", "");
	});
},

configureCalc: function() {
	$( ".wrapperCalc" ).draggable({ handle: ".draggable", containment: "parent" });
	$(".exit").on("click", function() {
		var calc = $(this).closest(".wrapperCalc"),
			id = calc.attr("id");
		calc.remove();
		$("." + id + "_window").remove();
		
	});
	$(".hide").on("click", function() {
		$(".wrapperCalc").hide();
	});
	$( ".resizable_pvc" ).resizable({ handles: "se", alsoResize: ".wrapperCalc", minWidth: 250, minHeight: 250 });
},

// NEWLY ADDED FUNCTION!!!
GoogleMapWidget: function() {
	$( ".wrapperGoogle" ).draggable({ handle: ".draggable", containment: "parent" });
	$(".exit").on("click", function() {
		var calc = $(this).closest(".wrapperGoogle"),
			id = calc.attr("id");
		calc.remove();
		$("." + id + "_window").remove();
		
	});
	$(".hide_map").on("click", function() {
		$(".wrapperGoogle").hide();
	});
	$( ".resizable_map" ).resizable({ handles: "se", alsoResize: ".wrapperGoogle", minWidth: 250, minHeight: 250 });
},



//////// CSS STUFF ////////
#googleMap {
  margin-top: 30px;
  position: absolute;
  height: 94%;
  width: 100%;
}

.wrapperGoogle {
  position: absolute;
  left: 15%;
  width: 1100px;
  top: 105px;
  height: 600px;
}

// INSTEAD OF .resiable
.resizable_pvc {
  position: absolute !important;
  left: 30px;
  right: 30px;
  top: 0%;
  height: 100%;
  border-radius: 5px;
  min-width: 250px;
  min-height: 250px;
}

.resizable_map {
  position: absolute !important;
  left: 0px;
  right: 30px;
  top: 0%;
  height: 100%;
  border-radius: 5px;
  min-width: 800px;
  min-height: 400px;
  max-width: 1190px;
}

.gmap{
  position: relative;
  width: 100%;
  top: 0%;
  height: 100%;
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);
  background-color: white;
  border-radius: 5px;
}


.hide {
  position: absolute;
  right: 20px;
  font-size: 80%;
}

.hide_map {
  position: absolute;
  right: 20px;
  font-size: 80%;
}




