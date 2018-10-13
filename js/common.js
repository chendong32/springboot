/**
 * Created by Administrator on 2018/10/12.
 */
var com = com || {};

com.pointStartX = 7;
com.pointStartY = 169;
com.spaceX = 95 + 11;
com.spaceY = 95 + 12;
com.width = 960;
com.height = 1596;

function init() {
    console.log("init");
    com.canvas = document.getElementById("chess");
    com.ct = com.canvas.getContext("2d");
    com.ct.shadowOffsetX = 2;
    com.ct.shadowOffsetY = 4;
    com.ct.shadowBlur = 2;
    com.ct.shadowColor = "rgba(0,0,0,0.4)";
    com.mans = com.mans||[];
    com.loadImages();
}
com.images = ['a_b', 'b_c', 'b_j', 'b_m', 'b_p', 'b_s', 'b_x', 'b_z', 'r_c', 'r_j', 'r_m', 'r_p', 'r_s', 'r_x', 'r_z', 'z_c'];
com.loadImages = function () {
    console.log("loadImages");
    for (var i = 0; i < com.images.length ; i++) {
        com[i] = {};
        com[i].image = new Image();
        com[i].image.src = "./img/" + com.images[i] + ".png";
    }
};
com.getDomXY = function (dom){
    var left = dom.offsetLeft;
    var top = dom.offsetTop;
    var current = dom.offsetParent;
    while (current !== null){
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent;
    };
    return {x:left,y:top};
};

com.initMap = [
    [1, 3, 6, 5, 2, 5, 6, 3, 1],
    [, , , , , , , ,],
    [, 4, , , , , , 4,],
    [7, , 7, , 7, , 7, , 7],
    [, , , , , , , ,],
    [, , , , , , , ,],
    [14, , 14, , 14, , 14, , 14],
    [, 11, , , , , , 11,],
    [, , , , , , , ,],
    [8, 10, 13, 12, 9, 12, 13, 10, 8]
];

window.onload = function () {
    console.log("onload");
    com.bg = createBg();
    com.bg.show();
    com.createMans(com.initMap);
    play.init();

};

com.createMans = function (map) {
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j]) {
                var key = map[i][j];
                com.mans.push(createMan(key, com.pointStartX + com.spaceX * j, com.pointStartY + com.spaceY * i));
            }
        }
    }
};
com.showMans = function () {
    for (var i = 0; i < com.mans.length; i++) {
        com.ct.drawImage(com.mans[i].image, com.mans[i].x, com.mans[i].y);
    }
};
function createMan(key, x, y){
    var man = new Object;
    man.x = x||0;
    man.y = y||0;
    man.image = com[key].image;
    return man;
}
function createBg(x ,y) {
    var bg = new Object;
    bg.x = x||0;
    bg.y = y||0;
    bg.isShow = true;
    bg.show = function () {
        if (bg.isShow) com.ct.drawImage(com[0].image, bg.x, bg.y);
    };
    return bg;
}
com.arr2Clone = function (arr){
    var newArr=[];
    for (var i=0; i<arr.length ; i++){
        newArr[i] = arr[i].slice();
    }
    return newArr;
};

init();