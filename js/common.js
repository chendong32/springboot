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
    com.childList = com.childList || [];
    com.mans = com.mans || [];
    com.loadImages();
}
com.images = ['a_b', 'b_c', 'b_j', 'b_m', 'b_p', 'b_s', 'b_x', 'b_z', 'r_c', 'r_j', 'r_m', 'r_p', 'r_s', 'r_x', 'r_z', 'z_c', 'z_p'];
com.loadImages = function () {
    console.log("loadImages");
    for (var i = 0; i < com.images.length; i++) {
        com[i] = {};
        com[i].image = new Image();
        com[i].image.src = "./img/" + com.images[i] + ".png";
    }
};
com.getDomXY = function (dom) {
    var left = dom.offsetLeft;
    var top = dom.offsetTop;
    var current = dom.offsetParent;
    while (current !== null) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent;
    }
    return {x: left, y: top};
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

com.generateKey = [
    [2, 3, 4, 5, 6, 7, 8, 9, 10],
    [, , , , , , , ,],
    [, 11, , , , , , 12,],
    [13, , 14, , 15, , 16, , 17],
    [, , , , , , , ,],
    [, , , , , , , ,],
    [18, , 19, , 20, , 21, , 22],
    [, 23, , , , , , 24,],
    [, , , , , , , ,],
    [25, 26, 27, 28, 29, 30, 31, 32, 33]
];

window.onload = function () {
    console.log("onload");
    com.bg = createBg();
    com.cr = createCr();
    com.dot = createDot();
    com.cr.isShow = false;
    com.childList = [com.bg, com.cr, com.dot];
    com.bg.show();
    com.createMans(com.initMap);
    play.init();

};

com.createMans = function (map) {
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            if (map[y][x]) {
                var key = map[y][x];
                var man = createMan(key, x, y);
                com.mans[com.generateKey[y][x]] = man;
                com.childList.push(man);
            }
        }
    }
};
com.showMans = function () {
    for (var i = 0; i < com.mans.length; i++) {
        if (com.mans[i])
            com.mans[i].show();
    }
};
function createMan(key, x, y) {
    var man = new Object;
    man.key = com.generateKey[y][x];
    man.pater = key - 7 > 0 ? 1 : 0;
    man.x = x || 0;
    man.y = y || 0;
    man.alpha = 1;
    man.image = com[key].image;
    man.ps = [];
    man.isShow = true;
    man.show = function () {
        if (man.isShow) {
            com.ct.save();
            com.ct.globalAlpha = man.alpha;
            com.ct.drawImage(man.image, com.pointStartX + com.spaceX * man.x, com.pointStartY + com.spaceY * man.y);
            com.ct.restore();
        }
    };
    man.bl = function (map) {
        var map = map || play.generateKey;
        return com.bylaw[com.initMap[y][x]](man.x, man.y, map)
    };
    return man;
}
function createBg(x, y) {
    var bg = new Object;
    bg.x = x || 0;
    bg.y = y || 0;
    bg.image = com[0].image;
    bg.isShow = true;
    bg.show = function () {
        if (bg.isShow) com.ct.drawImage(bg.image, bg.x, bg.y);
    };
    return bg;
}
function createCr(x, y) {
    var cr = new Object;
    cr.x = x || 0;
    cr.y = y || 0;
    cr.image = com[15].image;
    cr.isShow = true;
    cr.show = function () {
        if (cr.isShow) com.ct.drawImage(cr.image, com.pointStartX + com.spaceX * cr.x, com.pointStartY + com.spaceY * cr.y);
    };
    return cr;
}
function createDot(x, y) {
    var dot = new Object;
    dot.x = x || 0;
    dot.y = y || 0;
    dot.image = com[16].image;
    dot.dots=[];
    dot.isShow = true;
    dot.show = function () {
        for (var i=0; i<dot.dots.length;i++) {
            if (dot.isShow) com.ct.drawImage(dot.image, com.spaceX * this.dots[i][0]+38  + com.pointStartX ,com.spaceY *  this.dots[i][1]+39 + com.pointStartY);
        }
    };
    return dot;
}
com.arr2Clone = function (arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr[i] = arr[i].slice();
    }
    return newArr;
};
com.show = function () {
    com.ct.clearRect(0, 0, com.width, com.height);
    for (var i = 0; i < com.childList.length; i++) {
        com.childList[i].show();
    }
};
com.get = function (id) {
    return document.getElementById(id);
};

com.bylaw = {};

com.bylaw[1] = function (x, y, map) {
    var d=[];
    for (var i=x-1; i>= 0; i--){
        if (map[y][i]) {
            if (com.mans[map[y][i]].pater != 0) d.push([i,y]);
            break;
        }else {
            d.push([i,y])
        }
    }
    for (var i=x+1; i <= 8; i++){
        if (map[y][i]) {
            if (com.mans[map[y][i]].pater != 0) d.push([i,y]);
            break
        }else {
            d.push([i,y])
        }
    }
    for (var i = y-1 ; i >= 0; i--){
        if (map[i][x]) {
            if (com.mans[map[i][x]].pater != 0) d.push([x,i]);
            break
        }else {
            d.push([x,i])
        }
    }
    for (var i = y+1 ; i<= 9; i++){
        if (map[i][x]) {
            if (com.mans[map[i][x]].pater != 0) d.push([x,i]);
            break
        }else {
            d.push([x,i])
        }
    }
    return d;
};
com.bylaw[2] = function (x, y, map) {
    var d = [];
    if (y + 1 <= 2 && (!com.mans[map[y + 1][x]] || com.mans[map[y + 1][x]].pater != 0)) d.push([x, y + 1]);
    if (y - 1 >= 0 && (!com.mans[map[y - 1][x]] || com.mans[map[y - 1][x]].pater != 0)) d.push([x, y - 1]);
    if (x + 1 <= 5 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].pater != 0)) d.push([x + 1, y]);
    if (x - 1 >= 3 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].pater != 0)) d.push([x - 1, y]);
    return d;
};
com.bylaw[3] = function (x, y, map) {
    var d=[];
    if ( y-2>= 0 && x+1<= 8 && !map[y-1][x] &&(!com.mans[map[y-2][x+1]] || com.mans[map[y-2][x+1]].pater != 0)) d.push([x+1,y-2]);
    if ( y-1>= 0 && x+2<= 8 && !map[y][x+1] &&(!com.mans[map[y-1][x+2]] || com.mans[map[y-1][x+2]].pater != 0)) d.push([x+2,y-1]);
    if ( y+1<= 9 && x+2<= 8 && !map[y][x+1] &&(!com.mans[map[y+1][x+2]] || com.mans[map[y+1][x+2]].pater != 0)) d.push([x+2,y+1]);
    if ( y+2<= 9 && x+1<= 8 && !map[y+1][x] &&(!com.mans[map[y+2][x+1]] || com.mans[map[y+2][x+1]].pater != 0)) d.push([x+1,y+2]);
    if ( y+2<= 9 && x-1>= 0 && !map[y+1][x] &&(!com.mans[map[y+2][x-1]] || com.mans[map[y+2][x-1]].pater != 0)) d.push([x-1,y+2]);
    if ( y+1<= 9 && x-2>= 0 && !map[y][x-1] &&(!com.mans[map[y+1][x-2]] || com.mans[map[y+1][x-2]].pater != 0)) d.push([x-2,y+1]);
    if ( y-1>= 0 && x-2>= 0 && !map[y][x-1] &&(!com.mans[map[y-1][x-2]] || com.mans[map[y-1][x-2]].pater != 0)) d.push([x-2,y-1]);
    if ( y-2>= 0 && x-1>= 0 && !map[y-1][x] &&(!com.mans[map[y-2][x-1]] || com.mans[map[y-2][x-1]].pater != 0)) d.push([x-1,y-2]);
    return d;
};
com.bylaw[4] = function (x, y, map) {
    var d=[];
    var isMiddle= false;
    for (var i=x-1; i>= 0; i--){
        if (map[y][i]) {
            if (!isMiddle){
                isMiddle = true;
                continue;
            }else {
                if (com.mans[map[y][i]].pater != 0) d.push([i,y]);
                break;
            }
        }else if(!isMiddle){
             d.push([i,y])
        }
    }
    isMiddle= false;
    for (var i=x+1; i <= 8; i++){
        if (map[y][i]) {
            if (!isMiddle){
                isMiddle = true;
                continue;
            }else{
                if (com.mans[map[y][i]].pater != 0) d.push([i,y]);
                break
            }
        }else if(!isMiddle) {
            d.push([i,y])
        }
    }
    isMiddle= false;
    for (var i = y-1 ; i >= 0; i--){
        if (map[i][x]) {
            if (!isMiddle){
                isMiddle = true;
                continue;
            }else {
                if (com.mans[map[i][x]].pater != 0) d.push([x,i]);
                break
            }
        }else if(!isMiddle){
             d.push([x,i])
        }
    }
    isMiddle= false;
    for (var i = y+1 ; i<= 9; i++){
        if (map[i][x]) {
            if (!isMiddle){
                isMiddle = true;
                continue;
            }else  {
                if (com.mans[map[i][x]].pater != 0) d.push([x,i]);
                break
            }
        }else if(!isMiddle) {
             d.push([x,i])
        }
    }
    return d;
};
com.bylaw[5] = function (x, y, map) {
    var d = [];
    if ( y+1<= 2 && x+1<= 5 && (!com.mans[map[y+1][x+1]] || com.mans[map[y+1][x+1]].pater != 0)) d.push([x+1,y+1]);
    if ( y+1<= 2 && x-1>= 3 && (!com.mans[map[y+1][x-1]] || com.mans[map[y+1][x-1]].pater != 0)) d.push([x-1,y+1]);
    if ( y-1>= 0 && x+1<= 5 && (!com.mans[map[y-1][x+1]] || com.mans[map[y-1][x+1]].pater != 0)) d.push([x+1,y-1]);
    if ( y-1>= 0 && x-1>= 3 && (!com.mans[map[y-1][x-1]] || com.mans[map[y-1][x-1]].pater != 0)) d.push([x-1,y-1]);
    return d;
};
com.bylaw[6] = function (x, y, map) {
    var d = [];
    if ( y+2<= 4 && x+2<= 8 && !map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].pater != 0)) d.push([x+2,y+2]);
    if ( y+2<= 4 && x-2>= 0 && !map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].pater != 0)) d.push([x-2,y+2]);
    if ( y-2>= 0 && x+2<= 8 && !map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].pater != 0)) d.push([x+2,y-2]);
    if ( y-2>= 0 && x-2>= 0 && !map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].pater != 0)) d.push([x-2,y-2]);
    return d;
};
com.bylaw[7] = function (x, y, map) {
    var d = [];
    if (y + 1 <= 9 && (!com.mans[map[y + 1][x]] || com.mans[map[y + 1][x]].pater != 0)) d.push([x, y + 1]);
    if (x + 1 <= 8 && y > 4 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].pater != 0)) d.push([x + 1, y]);
    if (x - 1 >= 0 && y > 4 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].pater != 0)) d.push([x - 1, y]);
    return d;
};
com.bylaw[8] = function (x, y, map) {
    var d=[];
    for (var i=x-1; i>= 0; i--){
        if (map[y][i]) {
            if (com.mans[map[y][i]].pater != 1) d.push([i,y]);
            break;
        }else {
            d.push([i,y])
        }
    }
    for (var i=x+1; i <= 8; i++){
        if (map[y][i]) {
            if (com.mans[map[y][i]].pater != 1) d.push([i,y]);
            break
        }else {
            d.push([i,y])
        }
    }
    for (var i = y-1 ; i >= 0; i--){
        if (map[i][x]) {
            if (com.mans[map[i][x]].pater != 1) d.push([x,i]);
            break
        }else {
            d.push([x,i])
        }
    }
    for (var i = y+1 ; i<= 9; i++){
        if (map[i][x]) {
            if (com.mans[map[i][x]].pater != 1) d.push([x,i]);
            break
        }else {
            d.push([x,i])
        }
    }
    return d;
};
com.bylaw[9] = function (x, y, map) {
    var d = [];
    if (y + 1 <= 9 && (!com.mans[map[y + 1][x]] || com.mans[map[y + 1][x]].pater != 1)) d.push([x, y + 1]);
    if (y - 1 >= 7 && (!com.mans[map[y - 1][x]] || com.mans[map[y - 1][x]].pater != 1)) d.push([x, y - 1]);
    if (x + 1 <= 5 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].pater != 1)) d.push([x + 1, y]);
    if (x - 1 >= 3 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].pater != 1)) d.push([x - 1, y]);
    return d;
};
com.bylaw[10] = function (x, y, map) {
    var d=[];
    if ( y-2>= 0 && x+1<= 8 && !map[y-1][x] &&(!com.mans[map[y-2][x+1]] || com.mans[map[y-2][x+1]].pater != 1)) d.push([x+1,y-2]);
    if ( y-1>= 0 && x+2<= 8 && !map[y][x+1] &&(!com.mans[map[y-1][x+2]] || com.mans[map[y-1][x+2]].pater != 1)) d.push([x+2,y-1]);
    if ( y+1<= 9 && x+2<= 8 && !map[y][x+1] &&(!com.mans[map[y+1][x+2]] || com.mans[map[y+1][x+2]].pater != 1)) d.push([x+2,y+1]);
    if ( y+2<= 9 && x+1<= 8 && !map[y+1][x] &&(!com.mans[map[y+2][x+1]] || com.mans[map[y+2][x+1]].pater != 1)) d.push([x+1,y+2]);
    if ( y+2<= 9 && x-1>= 0 && !map[y+1][x] &&(!com.mans[map[y+2][x-1]] || com.mans[map[y+2][x-1]].pater != 1)) d.push([x-1,y+2]);
    if ( y+1<= 9 && x-2>= 0 && !map[y][x-1] &&(!com.mans[map[y+1][x-2]] || com.mans[map[y+1][x-2]].pater != 1)) d.push([x-2,y+1]);
    if ( y-1>= 0 && x-2>= 0 && !map[y][x-1] &&(!com.mans[map[y-1][x-2]] || com.mans[map[y-1][x-2]].pater != 1)) d.push([x-2,y-1]);
    if ( y-2>= 0 && x-1>= 0 && !map[y-1][x] &&(!com.mans[map[y-2][x-1]] || com.mans[map[y-2][x-1]].pater != 1)) d.push([x-1,y-2]);
    return d;
};
com.bylaw[11] = function (x, y, map) {
    var d=[];
    var isMiddle= false;
    for (var i=x-1; i>= 0; i--){
        if (map[y][i]) {
            if (!isMiddle){
                isMiddle = true;
                continue;
            }else {
                if (com.mans[map[y][i]].pater != 1) d.push([i,y]);
                break;
            }
        }else if(!isMiddle){
            d.push([i,y])
        }
    }
    isMiddle= false;
    for (var i=x+1; i <= 8; i++){
        if (map[y][i]) {
            if (!isMiddle){
                isMiddle = true;
                continue;
            }else{
                if (com.mans[map[y][i]].pater != 1) d.push([i,y]);
                break
            }
        }else if(!isMiddle) {
            d.push([i,y])
        }
    }
    isMiddle= false;
    for (var i = y-1 ; i >= 0; i--){
        if (map[i][x]) {
            if (!isMiddle){
                isMiddle = true;
                continue;
            }else {
                if (com.mans[map[i][x]].pater != 1) d.push([x,i]);
                break
            }
        }else if(!isMiddle){
            d.push([x,i])
        }
    }
    isMiddle= false;
    for (var i = y+1 ; i<= 9; i++){
        if (map[i][x]) {
            if (!isMiddle){
                isMiddle = true;
                continue;
            }else  {
                if (com.mans[map[i][x]].pater != 1) d.push([x,i]);
                break
            }
        }else if(!isMiddle) {
            d.push([x,i])
        }
    }
    return d;
};
com.bylaw[12] = function (x, y, map) {
    var d = [];
    if ( y+1<= 9 && x+1<= 5 && (!com.mans[map[y+1][x+1]] || com.mans[map[y+1][x+1]].pater != 1)) d.push([x+1,y+1]);
    if ( y+1<= 9 && x-1>= 3 && (!com.mans[map[y+1][x-1]] || com.mans[map[y+1][x-1]].pater != 1)) d.push([x-1,y+1]);
    if ( y-1>= 7 && x+1<= 5 && (!com.mans[map[y-1][x+1]] || com.mans[map[y-1][x+1]].pater != 1)) d.push([x+1,y-1]);
    if ( y-1>= 7 && x-1>= 3 && (!com.mans[map[y-1][x-1]] || com.mans[map[y-1][x-1]].pater != 1)) d.push([x-1,y-1]);
    return d;
};
com.bylaw[13] = function (x, y, map) {
    var d = [];
    if ( y+2<= 4 && x+2<= 8 && !map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].pater != 1)) d.push([x+2,y+2]);
    if ( y+2<= 4 && x-2>= 0 && !map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].pater != 1)) d.push([x-2,y+2]);
    if ( y-2>= 0 && x+2<= 8 && !map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].pater != 1)) d.push([x+2,y-2]);
    if ( y-2>= 0 && x-2>= 0 && !map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].pater != 1)) d.push([x-2,y-2]);
    return d;
};
com.bylaw[14] = function (x, y, map) {
    var d = [];
    if (y - 1 >= 0 && (!com.mans[map[y - 1][x]] || com.mans[map[y - 1][x]].pater != 1)) d.push([x, y - 1]);
    if (x + 1 <= 8 && y < 5 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].pater != 1)) d.push([x + 1, y]);
    if (x - 1 >= 0 && y < 5 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].pater != 1)) d.push([x - 1, y]);
    return d;
};

init();