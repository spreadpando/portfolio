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
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    var nodes = [];
    let context = $(this).parent();
    $(".bullet", context).toggleClass('rot');

    if (context.hasClass('level0')) {
        let subItems = ["about", "portfolio", "contact"];
        nodes = subItems;
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
                let subItems = ["development", "design"];
                nodes = subItems;
                for (let i = 0; i < subItems.length; i++) {
                    setTimeout(function () { addItem(subItems[i], 2, i, context) }, i * 100);
                }
            }
        }
        if (context.hasClass('index1')) {
            if (context.hasClass('open')) {
                $('.level3').remove();
            } else {
                let subItems = ["repo", "repo", "repo"];
                nodes = subItems;
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
                nodes = subItems;
                for (let i = 0; i < subItems.length; i++) {
                    setTimeout(function () { addItem(subItems[i], 4, i, context) }, i * 100);
                }
            }
        }

    }

    context.toggleClass('open');
    for (let i = 0; i < nodes.length; i++) {
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = Math.random() * 10;
        cube.position.y = Math.random() * 10;
        cube.position.z = Math.random() * 10;
        scene.add(cube);
    }
})



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(document.getElementById('wrap-body').offsetWidth, document.getElementById('wrap-body').offsetHeight);
$('#wrap-body').append(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);


camera.position.z = 25;

var animate = function () {
    requestAnimationFrame(animate);



    renderer.render(scene, camera);
};

animate();