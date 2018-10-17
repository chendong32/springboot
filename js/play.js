/**
 * Created by Administrator on 2018/10/12.
 */
var play = play || {};

play.init = function () {
    console.log("play");
    play.isPlay = true;
    play.pace = [];
    play.nowMankey = false;
    play.generateKey = com.arr2Clone (com.generateKey);
    play.mans = com.mans;
    play.showMans = com.showMans;
    play.show = com.show;
    play.showMans();
    com.canvas.addEventListener("click", play.clickCanvas);

    com.get("regretBn").addEventListener("click", function(e) {
        play.regret();
    });
};

play.clickCanvas = function (e) {
    if (!play.isPlay) return false;
    var key = play.getClickMan(e);
    var point = play.getClickPoint(e);
    console.log(point);
    if (key) {
        play.clickMan(key, point.x, point.y);
    } else {
        play.clickPoint(point.x, point.y);
    }
};

play.getClickPoint = function (e) {
    var domXY = com.getDomXY(com.canvas);
    var x = Math.round((e.pageX - domXY.x - com.pointStartX - 52) / com.spaceX);
    var y = Math.round((e.pageY - domXY.y - com.pointStartY - 53) / com.spaceY);
    return {"x": x, "y": y}
};
play.getClickMan = function (e) {
    var clickXY = play.getClickPoint(e);
    var x = clickXY.x;
    var y = clickXY.y;
    if (x < 0 || x > 8 || y < 0 || y > 9) return false;
    return (play.generateKey[y][x] && play.generateKey[y][x] != "0") ? play.generateKey[y][x] : false;
};
play.clickMan = function (key, x, y) {
    var man = play.mans[key];
    if(!play.nowMankey || play.mans[play.nowMankey].pater == man.pater){
        if (play.mans[play.nowMankey]) {
            play.mans[play.nowMankey].alpha = 1;
        }
        play.nowMankey = key;
        man.alpha = 0.6;
        com.cr.x = x;
        com.cr.y = y;
        com.cr.isShow = true;
        man.ps = man.bl();
        play.show();
    }else if (play.mans[play.nowMankey].pater != man.pater) {
        var p_man = play.mans[play.nowMankey];
        var pace = p_man.y + "" + p_man.x;
        play.generateKey[y][x] = p_man.key;
        delete play.generateKey[p_man.y][p_man.x];
        play.mans[key].isShow = false;
        p_man.x = x;
        p_man.y = y;
        p_man.alpha = 1;
        com.cr.x = x;
        com.cr.y = y;
        play.nowMankey = false;
        play.show();
        play.pace.push(pace+y+x);
    }
};
play.clickPoint = function (x, y) {
    console.log(play.nowMankey);
    var key = play.nowMankey;
    var man = play.mans[key];
    if (play.nowMankey && y >= 0 && y <= 9 && play.indexOfPs(com.mans[key].ps,[x,y])) {
        var pace = man.y + "" + man.x;
        play.generateKey[y][x] = key;
        delete play.generateKey[man.y][man.x];
        man.x = x;
        man.y = y;
        man.alpha = 1;
        com.cr.x = x;
        com.cr.y = y;
        play.nowMankey = false;
        play.show();
        play.pace.push(pace+y+x);
    }
};

play.indexOfPs = function (ps,xy){
    for (var i=0; i<ps.length; i++){
        if (ps[i][0]==xy[0]&&ps[i][1]==xy[1]) return true;
    }
    return false;
};

play.regret = function () {
    var generateKey = com.arr2Clone(com.generateKey);
    for (var y = 0; y < generateKey.length; y++) {
        for (var x = 0; x < generateKey[y].length; x++) {
            if (generateKey[y][x]) {
                var key = generateKey[y][x];
                com.mans[key].x = x;
                com.mans[key].y = y;
                com.mans[key].isShow = true;
            }
        }
    }
    var pace = play.pace;
    var last = pace.pop();
    if (last){
        com.cr.y = parseInt(last.split("")[2], 10);
        com.cr.x = parseInt(last.split("")[3], 10);
    }
    for (var i=0; i<pace.length; i++){
        var p= pace[i].split("")
        var y = parseInt(p[0], 10);
        var x = parseInt(p[1], 10);
        var newY = parseInt(p[2], 10);
        var newX = parseInt(p[3], 10);
        var key=generateKey[y][x];
        var newKey=generateKey[newY][newX];
        if (com.mans[newKey]) com.mans[newKey].isShow = false;
        com.mans[key].x = newX;
        com.mans[key].y = newY;
        generateKey[newY][newX] = generateKey[y][x];
        delete generateKey[y][x];
    }

    play.generateKey = generateKey;
    play.isPlay=true;
    play.show();
};





