function addItem(labelHTML, level, index, target) {
    let menuItem = $('<div class="menu-item level' + level + ' index' + index + '">');
    let bullet = $('<p class="bullet">').html('+');
    let label = $('<p class="label">').html(labelHTML);
    menuItem.append(bullet);
    menuItem.append(label);
    $(target).append(menuItem);
}
addItem('pando', 0, 0, 'nav');
$(document).on('click', '.label', function () {
    let context = $(this).parent();
    $(".bullet", context).toggleClass('rot');

    if (context.hasClass('level0')) {
        let subItems = ["about", "portfolio", "contact"]
        if (context.hasClass('open')) {
            $('.level1').remove();
        } else {
            for (let i = 0; i < subItems.length; i++) {
                setTimeout(function () { addItem(subItems[i], 1, i, 'nav') }, i * 100);
            }
        }
    }
    if (context.hasClass('level1')) {
        if (context.hasClass('index0')) {
            if (context.hasClass('open')) {
                $('.level2').remove();
            } else {
                let subItems = ["development", "design"]
                for (let i = 0; i < subItems.length; i++) {
                    setTimeout(function () { addItem(subItems[i], 2, i, context) }, i * 100);
                }
            }
        }
        if (context.hasClass('index1')) {
            if (context.hasClass('open')) {
                $('.level3').remove();
            } else {
                let subItems = ["repo", "repo", "repo"]
                for (let i = 0; i < subItems.length; i++) {
                    setTimeout(function () { addItem(subItems[i], 3, i, context) }, i * 100);
                }
            }
        }
        if (context.hasClass('index2')) {
            if (context.hasClass('open')) {
                $('.level4').remove();
            } else {
                let subItems = ["social", "contact form"]
                for (let i = 0; i < subItems.length; i++) {
                    setTimeout(function () { addItem(subItems[i], 4, i, context) }, i * 100);
                }
            }
        }

    }

    context.toggleClass('open');

})