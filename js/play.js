/**
 * Created by Administrator on 2018/10/12.
 */
var play = play || {};

play.init = function () {
    console.log("play");
    play.isPlay = true;
    play.nowMankey = false;
    play.map = com.arr2Clone(com.initMap);
    play.mans = com.mans;
    play.showMans = com.showMans;
    play.show = com.show;
    play.showMans();
    com.canvas.addEventListener("click", play.clickCanvas);
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
    var x = Math.round((e.pageX - domXY.x - com.pointStartX - 20) / com.spaceX);
    var y = Math.round((e.pageY - domXY.y - com.pointStartY - 20) / com.spaceY);
    return {"x": x, "y": y}
};
play.getClickMan = function (e) {
    var clickXY = play.getClickPoint(e);
    var x = clickXY.x;
    var y = clickXY.y;
    if (x < 0 || x > 8 || y < 0 || y > 9) return false;
    return (play.map[y][x] && play.map[y][x] != "0") ? play.map[y][x] : false;
};
play.clickMan = function (key, x, y) {
    var man = play.mans[x + y * 10];
    if(man.pater){
        if (play.mans[play.nowMankey]) {
            play.mans[play.nowMankey].alpha = 1;
        }
        play.nowMankey = x + y * 10;
        man.alpha = 0.6;
        com.cr.x = x;
        com.cr.y = y;
        com.cr.isShow = true;
        play.show();
    }else if (play.nowMankey && play.mans[play.nowMankey].pater != man.pater) {
        var p_man = play.mans[play.nowMankey];
        var key = x + y * 10;
        delete play.map[p_man.y][p_man.x];
        play.mans[key].isShow = false;
        p_man.x = x;
        p_man.y = y;
        p_man.alpha = 1;
        com.cr.x = x;
        com.cr.y = y;
        play.map[y][x] = p_man.key;
        play.nowMankey = false;
        play.show();
    }
};
play.clickPoint = function (x, y) {
    console.log(play.nowMankey);
    var key = play.nowMankey;
    var man = play.mans[key];
    if (play.nowMankey && play.nowMankey >= 0) {
        delete play.map[man.y][man.x];
        play.map[y][x] = man.key;
        man.x = x;
        man.y = y;
        man.alpha = 1;
        com.cr.x = x;
        com.cr.y = y;
        play.nowMankey = false;
        play.show();
    }
};





