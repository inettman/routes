var gaPlugin;

$(function() {
    gaPlugin = window.plugins.gaPlugin;
    gaPlugin.init(successHandler, errorHandler, "UA-76447213-1", 10);
});


