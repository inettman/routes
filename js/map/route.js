routeHref.on('click', function () {
    $(this).select();
});
jQuery('#map_options_control').click(function(){
    jQuery("#map_options").toggle();

    if (jQuery("#map_options").css('display') != 'none') {
        jQuery('#map_options_control').text('Скрыть настройки');
    } else {
        jQuery('#map_options_control').text('Показать настройки');
    }
});

function route() {
    directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});
    directionsService = new google.maps.DirectionsService;
    directionsDisplay.setMap(map);
    geocoder = new google.maps.Geocoder();
    addListener(new google.maps.places.Autocomplete(document.getElementById('route_start')));

    if (!routeEnd.attr('readonly')) {
        addListener(new google.maps.places.Autocomplete(document.getElementById('route_end')));
    }

    directionsDisplay.addListener('directions_changed', function() {
        showRouteInfo();
    });

    petrolInputs.on('blur', function(){
        if (directionsDisplay.directions) {
            showRouteInfo();
        }
    });

    if (routeStart.val() && routeEnd.val()) {
        buildRoute();
    }
}

function addListener(autocomplete)
{
    autocomplete.addListener('place_changed', function () {
        if (routeStart.val() && routeEnd.val()) {
            buildRoute();
            return;
        }
        var place = autocomplete.getPlace();

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(placeZoom);
        }

    });
}

function buildRoute()
{
    routeHrefContainer.hide();

    var request = {
        origin: routeStart.val(),
        destination: routeEnd.val(),
        travelMode: google.maps.TravelMode[travelMode]
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            showRouteInfo();
            showRouteInstruction();
        } else {
            showNotFoundRoute();
        }
    });
}

function showRouteInfo()
{
    var distance = directionsDisplay.directions.routes[0].legs[0].distance.value/1000;
    var content = '<div class="well">';
    content += '<p><strong>' + routeDistanceText + ':</strong> ' + distance.toFixed(2) + ' ' + routeDistanceDimension + '.</p>';
    content += '<p><strong>' + routeTimeText + ':</strong> ' + directionsDisplay.directions.routes[0].legs[0].duration.text + '.</p>';

    if (jQuery.isNumeric(petrolUsed.val()) && jQuery.isNumeric(petrolCost.val())) {
        var routeCost =  (petrolUsed.val()/100 * petrolCost.val() * distance).toFixed(2);
        content += ' <p><strong>' + routeCostText + ':</strong> ' + routeCost + ' ' + moneyDimension + '.</p>';
        content += ' <p><small>' + petrolUsedText + ': ' + petrolUsed.val() + ', ';
        content += ' ' + petrolCostText + ': ' + petrolCost.val() + ' ' + moneyDimension + '.</small></p>';
    }

    content += '</div>';
    routeInfo.html(content);
}

function showRouteInstruction()
{
    var content = '<h2>' + routeInstructionText +'</h2>'
    content += '<ol>';
    jQuery.each(directionsDisplay.directions.routes[0].legs[0].steps, function(index, value) {
        content += '<li>' + value.instructions + ' (' + value.distance.text + ')' + '</li>';
    });
    content += '</ol>';
    content += '<p>' + directionsDisplay.directions.routes[0].copyrights + '</p>';
    routeInstruction.html(content);
}

function getCityData(latitude, longitude, callback)
{
    geocoder.geocode({'latLng': new google.maps.LatLng(latitude, longitude)}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            jQuery.each(results, function(index, value) {
                if (value.types.indexOf("locality") != -1) {
                    var city = {};
                    city.location = value.formatted_address;

                    jQuery.each(value.address_components, function(index, value) {
                        if (value.types.indexOf("locality") != -1) {
                            city.name = value.long_name;
                        }
                    });
                    callback(city);
                }
            });
        }
    });
}
function showNotFoundRoute()
{
    var content = '<div class="well">';
    content += '<p><strong>' + routeNotFound + '.</p>';
    content += '</div>';
    routeInfo.html(content);
    routeInstruction.html('');
}