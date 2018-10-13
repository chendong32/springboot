/**
 * Created by Administrator on 2018/10/12.
 */
var play = play || {};

play.init = function () {
    console.log("play");
    play.isPlay = true;
    play.map =	com.arr2Clone (com.initMap);		//初始化棋盘
    play.mans = com.mans;
    play.showMans = com.showMans;
    play.showMans();
    com.canvas.addEventListener("click",play.clickCanvas);
};

play.clickCanvas = function (e){
    if (!play.isPlay) return false;

    var key = play.getClickMan(e);
    console.log(key);
    var point = play.getClickPoint(e);
    console.log(point);
};

play.getClickPoint = function (e){
    var domXY = com.getDomXY(com.canvas);
    var x=Math.round((e.pageX-domXY.x-com.pointStartX-20)/com.spaceX);
    var y=Math.round((e.pageY-domXY.y-com.pointStartY-20)/com.spaceY);
    return {"x":x,"y":y}
};
play.getClickMan = function (e){
    var clickXY=play.getClickPoint(e);
    var x=clickXY.x;
    var y=clickXY.y;
    if (x < 0 || x>8 || y < 0 || y > 9) return false;
    return (play.map[y][x] && play.map[y][x]!="0") ? play.map[y][x] : false;
};




