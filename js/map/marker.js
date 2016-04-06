var markers = [];
function addMarker()
{
    var point = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: point,
        map: map,
        icon: image
    });

    var infowindow = new google.maps.InfoWindow({
        content: '<div class="info-window">'+content+'</div>'
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    markers.push(marker);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function showMarkers() {
    setMapOnAll(map);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}