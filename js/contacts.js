$(function() {
	mapInit();
});

function mapInit() {
	var latlng = new google.maps.LatLng(50.016784, 36.207342);
	var myOptions = {
		zoom: 16,
		scrollwheel: false,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);
	setMarkers(map, places);
}

var places = [
	['Наш офис', 50.016784, 36.206142, 'images/svg/marker.svg', 100, 100],
];
 
function setMarkers(map, locations) {
	var width = $(window).width();
	
	//Определяем область показа маркеров
	var latlngbounds = new google.maps.LatLngBounds();	
	  
	for (var i = 0; i < locations.length; i++) {
		var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
		if(width<720){
			var image = new google.maps.MarkerImage(
				locations[i][3],
				new google.maps.Size(locations[i][4], locations[i][5]),
				new google.maps.Point(0,0),
				new google.maps.Point(locations[i][4]*0.7/2, locations[i][5]*0.7/2),
				new google.maps.Size(locations[i][4]*0.7, locations[i][5]*0.7)
			);
		} else {
			var image = new google.maps.MarkerImage(
				locations[i][3],
				new google.maps.Size(locations[i][4], locations[i][5]),
				new google.maps.Point(0,0),
				new google.maps.Point(-5, locations[i][5]/2),
				new google.maps.Size(locations[i][4], locations[i][5])
			);
		}
		//Добавляем координаты маркера в область
		latlngbounds.extend(myLatLng);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map, 
			icon: image,  
			title: locations[i][0],
		});
		//bindInfoWindow(marker, map, locations[i][0]);
	}
	//Центрируем и масштабируем карту
	//map.setCenter( latlngbounds.getCenter(), map.fitBounds(latlngbounds));	 
};