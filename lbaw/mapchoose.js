var search = new L.Control.Search({
	url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}&polygon_geojson=1&viewbox=-8.72091%2C41.19557%2C-8.54633%2C41.12747&bounded=1',
	jsonpParam: 'json_callback',
	propertyName: 'display_name',
	propertyLoc: ['lat','lon'],
	marker: L.marker([0,0], {
		draggable: true,
		icon: mintyIcon
	}),
	firstTipSubmit: true,	
	autoCollapse: true,
	autoType: false,
	textErr: 'Localização não encontrada',
	textCancel: 'Cancelar',
	textPlaceholder: 'Pesquisar...',
	minLength: 2,
	position:'topleft'
}) 

mymap.addControl(search);
console.log(search);
search.options.marker.setLatLng([41.150096,-8.610646]);

mymap.addLayer(search.options.marker);
var unchangeableMarker = false;

function clearParishes() {	
	unchangeableMarker = false;
	parishes.forEach(removeLayer);
	if(search.options.marker != null)
		mymap.addLayer(search.options.marker);
	mymap.addControl(search);
}

function clearMarkers() {	
	unchangeableMarker = true;
	if(search.options.marker != null)
		mymap.removeLayer(search.options.marker);
	mymap.removeControl(search);
	mymap.addLayer(parishes[document.getElementById("parishselect").selectedIndex]);
}

function onSelect() {
	parishes.forEach(removeLayer);
	mymap.addLayer(parishes[document.getElementById("parishselect").selectedIndex]);
	mymap.setView([parishIDs[document.getElementById("parishselect").value][1], parishIDs[document.getElementById("parishselect").value][2]], 13);
}

function onMapClick(e) {
	var latlng = e.latlng.toString().split(',');
		var lat = parseFloat(latlng[0].substring(7));
		var lng = parseFloat(latlng[1]);
	console.log(lat + ", " + lng);
	if (!unchangeableMarker) {
		var latlng = e.latlng.toString().split(',');
		var lat = parseFloat(latlng[0].substring(7));
		var lng = parseFloat(latlng[1]);
		
		if (lat < 41.195577 && lat > 41.12747 && lng < -8.546333 && lng > -8.720913) {
			if (search.options.marker != null)
				search.options.marker.setLatLng(e.latlng);
			else
				search.options.marker = L.marker(e.latlng, {
					draggable: true,
					icon: mintyIcon
				}).addTo(mymap);
		}
	}
}

document.getElementById("maptab").onclick = function() {clearParishes()};
document.getElementById("parishtab").onclick = function() {clearMarkers()};
document.getElementById("parishselect").onclick = function() {onSelect()};
mymap.on('click', onMapClick);
