/**
 * Created by Administrator on 2018/10/12.
 */
var play = play || {};

play.init = function () {
    console.log("play");
    play.isPlay = true;
    play.nowMankey = false;
    play.map = com.arr2Clone(com.initMap);		//初始化棋盘
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
    console.log(key);
    if (key) {
        play.clickMan(key, point.x, point.y);
    } else {
        //play.clickPoint(point.x,point.y);
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
    if (play.mans[play.nowMankey]) {
        play.mans[play.nowMankey].alpha = 1;
        play.nowMankey = false;
    }
    play.nowMankey = x + y * 10;
    var man = play.mans[play.nowMankey];
    man.alpha = 0.6;

    play.show();
};




