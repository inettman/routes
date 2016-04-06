$(document).ready(function () {
    setNavigation();
});

function setNavigation() {
    path = decodeURIComponent(window.location.href.replace(/\/$/, ""));
    
    $(".nav a, a.list-group-item").each(function () {
        var href = $(this).attr('href');
        href = href.replace(/\/$/, "");
        href = decodeURIComponent(href);
        if (path == href) {
            $(this).closest('li').addClass('active');
            $(this).addClass('active');
        }
    });
}