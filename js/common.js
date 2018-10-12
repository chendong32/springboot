/**
 * Created by Administrator on 2018/10/12.
 */
var com = com || {};

function init() {
    com.canvas = document.getElementById("chess"); //画布
    com.ct = com.canvas.getContext("2d");

    var Map = [
        ['b_c_0', 'b_m_0', 'b_x_0', 'b_s_0', 'b_j_0', 'b_s_1', 'b_x_1', 'b_m_1', 'b_c_1'],
        [, , , , , , , ,],
        [, 'b_p_0', , , , , , 'b_p_1',],
        ['b_z_0', , 'b_z_1', , 'b_z_2', , 'b_z_3', , 'b_z_4'],
        [, , , , , , , ,],
        [, , , , , , , ,],
        ['r_z_0', , 'r_z_1', , 'r_z_2', , 'r_z_3', , 'r_z_4'],
        [, 'r_p_0', , , , , , 'r_p_1',],
        [, , , , , , , ,],
        ['r_c_0', 'r_m_0', 'r_x_0', 'r_s_0', 'r_j_0', 'r_s_1', 'r_x_1', 'r_m_1', 'r_c_1']
    ];

    com.ct.shadowOffsetX = 2; // 设置水平位移
    com.ct.shadowOffsetY = 4; // 设置垂直位移
    com.ct.shadowBlur = 2; // 设置模糊度
    com.ct.shadowColor = "rgba(0,0,0,0.4)"; // 设置阴影颜色

    for (var i = 0; i < Map.length; i++) {
        for (var j = 0; j < Map[i].length; j++) {
            var img_b = new Image();
            if (Map[i][j] == undefined)
                continue;
            img_b.src = "./img/" + Map[i][j].substr(0, 3) + ".png";
            com.ct.drawImage(img_b, 7 + (95 + 11) * j, 169 + (95 + 12) * i);
        }
    }

};

init();