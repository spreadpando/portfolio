function init() {
    let menuItem = $('<span class="menu-item">');
    let bullet = $('<p class="bullet">');
    menuItem.append;
    menuItem.append('<p class="label">');
}


$(document).on('click', '.menu-item', function () {
    let context = $(this);
    $(".bullet", context).toggleClass('rot');

})