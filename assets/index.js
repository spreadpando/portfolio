function addItem(labelHTML, level, index, target) {
    let menuItem = $('<div class="menu-item level' + level + ' index' + index + '">');
    let bullet = $('<p class="bullet">').html('+');
    let label = $('<p class="label">').html(labelHTML);
    menuItem.append(bullet);
    menuItem.append(label);
    $(target).append(menuItem);
}

addItem('pando', 0, 0, 'nav');

let repoLinks = [];
let repos = [];
$.get('https://api.github.com/users/spreadpando/repos', function (result, status) {
    for (let i in result) {
        repoLinks.push('https://github.com/spreadpando/' + result[i].name);
        repos.push(result[i].name)
    }
})

$(document).on('click', '.label', function () {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    var nodes = [];
    let subItems0 = ["about", "portfolio", "contact"];
    let subItems1 = ["development", "design", "marketing"];
    let subItems2 = repos;
    let subLinks2 = repoLinks;
    let subItems3 = ["social", "contact form"];

    let context = $(this).parent();
    $(".bullet", context).toggleClass('rot');
    if (context.hasClass('level0')) {

        nodes = subItems0;
        if (context.hasClass('open')) {
            $('.level1').remove();
            nodes = ['pando'];
        } else {
            for (let i = 0; i < subItems0.length; i++) {
                setTimeout(function () { addItem(subItems0[i], 1, i, 'nav') }, i * 100);
            }
        }
    }
    if (context.hasClass('level1')) {
        if (context.hasClass('index0')) {
            if (context.hasClass('open')) {
                $('.level2').remove();
                nodes = subItems0;

            } else {
                nodes = subItems1;
                for (let i = 0; i < subItems1.length; i++) {
                    setTimeout(function () { addItem(subItems1[i], 2, i, context) }, i * 100);
                }
            }
        }
        if (context.hasClass('index1')) {
            if (context.hasClass('open')) {
                $('.level3').remove();
                nodes = subItems0;

            } else {
                nodes = subItems2;
                for (let i = 0; i < subItems2.length; i++) {
                    setTimeout(function () { addItem('<a href = ' + subLinks2[i] + '>' + subItems2[i] + '</a>', 3, i, context) }, i * 100);
                }
            }
        }
        if (context.hasClass('index2')) {
            if (context.hasClass('open')) {
                $('.level4').remove();
                nodes = subItems0;
            } else {
                nodes = subItems3;
                for (let i = 0; i < subItems3.length; i++) {
                    setTimeout(function () { addItem(subItems3[i], 4, i, context) }, i * 100);
                }
            }
        }
    }
    context.toggleClass('open');
    render(nodes);
})
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(document.getElementById('wrap-body').offsetWidth, document.getElementById('wrap-body').offsetHeight);
$('#wrap-body').append(renderer.domElement);
camera.position.z = 5;

function render(nodes) {
    var group = new THREE.Group;
    var banners = new THREE.Group;
    var starsGeometry = new THREE.Geometry();
    for (var i = 0; i < nodes.length; i++) {
        var starGeometry = new THREE.Geometry();
        var canvas = document.createElement("canvas");
        var size = 4096;
        canvas.width = size;
        canvas.height = size;
        var context1 = canvas.getContext('2d');
        context1.fillStyle = "#ffffff";
        context1.textAlign = "left";
        context1.font = "normal 100px Work Sans, monospace";
        context1.fillText(nodes[i], size / 2.1, size / 2.1);
        var texture1 = new THREE.Texture(canvas);
        texture1.needsUpdate = true;
        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(4);
        star.y = THREE.Math.randFloatSpread(4);
        starGeometry.vertices.push(star);
        starsGeometry.vertices.push(star);
        var textMaterial = new THREE.PointsMaterial({
            size: 10,
            map: texture1,
            depthTest: false,
            transparent: true
        });
        var pointMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            depthTest: true,
            transparent: true,
            //colorsneedsUpdate: true
        });
        var bulletPoint = new THREE.Points(starGeometry, pointMaterial);
        var banner = new THREE.Points(starGeometry, textMaterial);

        switch (i) {
            case i:
                bulletPoint.name = nodes[i];
                break;
        }
        banner.add(bulletPoint)
        banners.add(banner);
    }
    group.add(banners);
    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0x000000,
    });

    var line = new THREE.LineLoop(starsGeometry, lineMaterial);
    line.computeLineDistances();
    group.add(line);
    scene.add(group);







    var animate = function () {
        requestAnimationFrame(animate);
        group.rotation.z += Math.random() * 0.005;

        renderer.render(scene, camera);
    };
    animate();
}
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

render(['pando'])
