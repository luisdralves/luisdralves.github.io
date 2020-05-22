var marker = L.marker([41.158890, -8.623054], {
		draggable: false,
		icon: mintyIcon
});

function update() {
	var isParish = document.getElementById('isParish').checked;
	if (!isParish) {
		parishes.forEach(removeLayer);
		var coord = document.getElementById("location-coord");
		var latlng = coord.innerHTML.split(',');
		var lat = parseFloat(latlng[0]);
		var lng = parseFloat(latlng[1]);
	
		mymap.setView([lat, lng], 15);
	
		marker.setLatLng([lat, lng]);
		mymap.addLayer(marker);
		
		var s = document.createElement('script');       
		s.src = 'http://nominatim.openstreetmap.org/reverse?json_callback=response&format=json&lat=' + lat + '&lon=' + lng + '&zoom=18&addressdetails=1';
		document.getElementsByTagName('head')[0].appendChild(s);
	} else {
		mymap.removeLayer(marker);
		var parish = document.getElementById("location-parish").innerHTML;
		mymap.addLayer(parishes[parishIDs[parish][0]]);		
		mymap.setView([parishIDs[parish][1], parishIDs[parish][2]], 13);
	}
}

window.response = function response(json) {
	var street = ((json.address.road == null) ? json.address.pedestrian : json.address.road);
	var city_district = ((json.address.city_district == null) ? json.address.city : json.address.city_district);
	document.getElementById('textlocation').innerHTML = "Localização: " + street + ", " + city_district + ", " + json.address.county;
}

update();

document.getElementById("isParish").onclick = function() {update()};
