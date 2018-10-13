/**
 * Created by Administrator on 2018/10/12.
 */
var com = com || {};

com.pointStartX = 7;
com.pointStartY = 169;
com.spaceX = 95 + 11;
com.spaceY = 95 + 12;

function init() {
    com.canvas = document.getElementById("chess");
    com.ct = com.canvas.getContext("2d");
    com.ct.shadowOffsetX = 2;
    com.ct.shadowOffsetY = 4;
    com.ct.shadowBlur = 2;
    com.ct.shadowColor = "rgba(0,0,0,0.4)";
    loadImages();
}
com.images = ['a_b', 'b_c', 'b_j', 'b_m', 'b_p', 'b_s', 'b_x', 'b_z', 'r_c', 'r_j', 'r_m', 'r_p', 'r_s', 'r_x', 'r_z', 'z_c'];
function loadImages() {
    console.log("loadImages");
    com.abImg = new Image();
    com.abImg.src = "./img/" + com.images[0] + ".png";
    for (var i = 1; i < com.images.length - 1; i++) {
        com[i] = {};
        com[i].image = new Image();
        com[i].image.src = "./img/" + com.images[i] + ".png";
    }
    com.zcImg = new Image();
    com.zcImg.src = "./img/" + com.images[com.images.length - 1] + ".png";
}

com.initMap = [
    ['b_c_1', 'b_m_3', 'b_x_6', 'b_s_5', 'b_j_2', 'b_s_5', 'b_x_6', 'b_m_3', 'b_c_1'],
    [, , , , , , , ,],
    [, 'b_p_4', , , , , , 'b_p_4',],
    ['b_z_7', , 'b_z_7', , 'b_z_7', , 'b_z_7', , 'b_z_7'],
    [, , , , , , , ,],
    [, , , , , , , ,],
    ['r_z_14', , 'r_z_14', , 'r_z_14', , 'r_z_14', , 'r_z_14'],
    [, 'r_p_11', , , , , , 'r_p_11',],
    [, , , , , , , ,],
    ['r_c_8', 'r_m_10', 'r_x_13', 'r_s_12', 'r_j_9', 'r_s_12', 'r_x_13', 'r_m_10', 'r_c_8']
];
window.onload = function () {
    console.log("onload");
    com.ct.drawImage(com.abImg, 0, 0);
    for (var i = 0; i < com.initMap.length; i++) {
        for (var j = 0; j < com.initMap[i].length; j++) {
            if (com.initMap[i][j]) {
                var key = com.initMap[i][j].substr(4);
                com.ct.drawImage(com[key].image, com.pointStartX + com.spaceX * j, com.pointStartY + com.spaceY * i);
            }
        }
    }
};

init();