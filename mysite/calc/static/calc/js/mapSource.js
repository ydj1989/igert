var Igert = {};
Igert.map = function() {
	// private members
	m_map = {},
	m_lat = 0,
	m_lng = 0;
	
	return {
		init: function(cfg) {
			var cfg = cfg || {};
			this.initMap();
			this.configureButtons();
		},
		
		initMap: function() {
			var _this = this,
				mapOptions = {
					zoom: 12
				},
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			
			m_map = map;
			// Try HTML5 geolocation
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
				m_lat = position.coords.latitude;
				m_lng = position.coords.longitude; console.log(m_lat)
				var pos = new google.maps.LatLng(m_lat, m_lng); console.log(pos)
				map.setCenter(pos); console.log(map)
				_this.drawRegionOnMap();
				}, function() {
					_this.handleNoGeolocation(true);
				});
			} else {
				// Browser doesn't support Geolocation
				_this.handleNoGeolocation(false);
			}			
		},

		handleNoGeolocation: function(errorFlag) {
			var _this = this;
			m_lat = 34.0684494;
			m_lng = -118.44513210000002;
			
		  if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		  } else {
			var content = 'Error: Your browser doesn\'t support geolocation.';
		  }
		  
		  var options = {
			map: m_map,
			position: new google.maps.LatLng(m_lat, m_lng),
		  };

		  m_map.setCenter(options.position);
		  _this.drawRegionOnMap();
		},
		
		drawRegionOnMap: function() { console.log("draw")
			var bounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(m_lat-0.02, m_lng-0.02),
				new google.maps.LatLng(m_lat+0.02, m_lng+0.02)
			),
			_this = this;
			
			// Define the rectangle and set its editable property to true.
			rectangle = new google.maps.Rectangle({
				bounds: bounds,
				editable: true,
				draggable: true
			});

			console.log(rectangle)

			rectangle.setMap(m_map);

			// Add an event listener on the rectangle.
			google.maps.event.addListener(rectangle, 'bounds_changed', _this.updateRegion);

			// Define an info window on the map.
			infoWindow = new google.maps.InfoWindow();
		}, 
		
		updateRegion: function() {
			var ne = rectangle.getBounds().getNorthEast(),
				sw = rectangle.getBounds().getSouthWest(),
				center_lat = (ne.lat() + sw.lat())/2,
				center_lng = (ne.lng() + sw.lng())/2,
				contentString = '<b>Rectangle moved.</b><br>' +
				'Center: ' + center_lat + ', ' + center_lng;
			
			m_lat = center_lat;
			m_lng = center_lng;
			
			// Set the info window's content and position.
			infoWindow.setContent(contentString);
			infoWindow.setPosition(ne);
			infoWindow.open(m_map);
			
		},
		
		configureButtons: function() {
			$("#cancelButton").on("click", function() {
				window.parent.Igert.mainFunction.unblockMap();
			});
			
			$("#okayButton").on("click", function() {
				window.parent.Igert.mainFunction.storeLocation(m_lat, m_lng);
				window.parent.Igert.mainFunction.unblockMap();
			});
		}
		
	}
		
}();

$( document ).ready(function() {
    Igert.map.init();
});


