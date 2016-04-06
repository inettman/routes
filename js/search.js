jQuery(document).ready(function () {
    $('#search').typeahead({
        minLength:3,
        source: function (typeahead, query) {
            return $.get($('#search').data('href')+'?q='+query,
                function (response) {
                    return typeahead.process(response);
                }
            );
        },
        onselect: function(obj) {
            window.location.href = obj.href;
        }
    })
});