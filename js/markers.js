$(document).ready(function() {
  $("#map").css({		
	});
  var myLatLng = new google.maps.LatLng(46.845263, 35.376955);
  MYMAP.init('#map', myLatLng, 13);
 
  $(document).ready(function(e){
		MYMAP.placeMarkers('markers.xml');
  });
});
 
var MYMAP = {
  map: null,
	bounds: null
}
 
MYMAP.init = function(selector, latLng, zoom) {
  var myOptions = {
    zoom:zoom,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
	this.map = new google.maps.Map($(selector)[0], myOptions);
	this.bounds = new google.maps.LatLngBounds();
} 
 
MYMAP.placeMarkers = function(filename) {
	$.get(filename, function(xml){
		$(xml).find("marker").each(function(){
			var name = $(this).find('name').text();
			var address = $(this).find('address').text();
 
			// create a new LatLng point for the marker
			var lat = $(this).find('lat').text();
			var lng = $(this).find('lng').text();
			var point = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
 
			// extend the bounds to include the new point
			MYMAP.bounds.extend(point);
 
			var marker = new google.maps.Marker({
				position: point,
				map: MYMAP.map
			});
 
			var infoWindow = new google.maps.InfoWindow();
			var html='<strong>'+name+'</strong.><br />'+address;
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.setContent(html);
				infoWindow.open(MYMAP.map, marker);
			});
			MYMAP.map.fitBounds(MYMAP.bounds);
		});
	});
}