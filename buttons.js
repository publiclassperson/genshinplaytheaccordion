auto();
//每分钟拍数
var music_min = 240







var pX = 480;
var pY = 1070;
var pX_length = 1800;
var pY_length = 500;
let musicArr = []
var rootpath = files.cwd()
var musicName = "music"
var suffix = ".js"

var path = rootpath + "/" + musicName + suffix;
if (!files.exists(path)) {
    toast("脚本文件不存在: " + path);
    exit();
}


var execution = null;

//定位确认按钮 和重新定位按钮
var button_ok = floaty.rawWindow(
    <frame gravity="center" bg="#ff00ff">
        <button id="action" w="100dp" h="50dp">
            定位完成
        </button>
    </frame>
);

//播放按钮 和停止按钮
var button_pl = floaty.rawWindow(
    <frame gravity="center" bg="#ff00ff">
        <button id="action" w="100dp" h="50dp">
            开始弹奏
        </button>
    </frame>
);

//退出脚本按钮
var button_exit = floaty.rawWindow(
    <frame gravity="center" bg="#ff00ff">
        <button id="action" w="100dp" h="50dp">
            退出
        </button>
    </frame>
);

// 整三个按钮确定位置 确认以后隐藏
var button_a = floaty.rawWindow(
    <frame gravity="center" bg="#ff00ff">
        <button id="action" w="50dp" h="50dp" >
            A点
        </button>
    </frame>
);
var button_b = floaty.rawWindow(
    <frame gravity="center" bg="#ff00ff">
        <button id="action" w="50dp" h="50dp">
            B点
        </button>
    </frame>
);
var button_c = floaty.rawWindow(
    <frame gravity="center" bg="#ff00ff">
        <button id="action" w="50dp" h="50dp">
            C点
        </button>
    </frame>
);
button_a.setPosition(500, 300)
bind3Point(button_a)
button_b.setPosition(800, 300)
bind3Point(button_b)
button_c.setPosition(1100, 300)
bind3Point(button_c)
button_ok.setPosition(100, 300)
onClick(button_ok, "定位完成", "重新定位")
button_pl.setPosition(100, 500)
button_pl.setTouchable(false)
onClick(button_pl, "开始弹奏", "停止弹奏")
button_exit.setPosition(100, 700)

//退出按钮监听
button_exit.action.click(() => {
    if (execution) {
        execution.getEngine().forceStop();
    }
    floaty.closeAll()
    exit()
})



setInterval(() => {
    ui.run(() => {
    })

}, 1000)
function onClick(window, str1, str2) {

    window.action.click(() => {
        if (window.action.getText() == str1) {

            window.action.setText(str2);
            switch (str1) {
                case "定位完成":
                    //打开弹奏开关
                    button_pl.setTouchable(true)

                    pX = button_a.getX()
                    pY = button_a.getY()
                    pX_length = button_b.getX() - pX
                    pY_length = button_c.getY() - pY

                    //隐藏三个点
                    button_a.setTouchable(false);
                    button_b.setTouchable(false);
                    button_c.setTouchable(false);
                    // button_a.attr("alpha","0")
                    // button_b.attr("alpha","0")
                    // button_c.attr("alpha","0")

                    //保存到storages.create(name)
                    var storage = storages.create("PXY");
                    storage.put("pX", pX);
                    storage.put("pY", pY);
                    storage.put("pX_length", pX_length);
                    storage.put("pY_length", pY_length);
                    storage.put("music_min", music_min)


                    break;
                case "开始弹奏":
                    execution = engines.execScriptFile(path);
                    break;
            }

        } else {
            // if(execution){
            //     execution.getEngine().forceStop();
            // }
            window.action.setText(str1);
            switch (str2) {
                case "重新定位":
                    //显示三个点
                    button_a.setTouchable(true);
                    button_b.setTouchable(true);
                    button_c.setTouchable(true);
                    button_pl.setTouchable(false)
                    // button_a.attr("alpha","1")
                    // button_b.attr("alpha","1")
                    // button_c.attr("alpha","1")
                    button_a.setPosition(500, 300)
                    button_b.setPosition(800, 300)
                    button_c.setPosition(1100, 300)
                    break;
                case "停止弹奏":
                    if (execution) {
                        execution.getEngine().forceStop();
                    }
                    break;
            }
        }


    })
}

// 移动定位按钮
function bind3Point(window) {
    //记录按键被按下时的触摸坐标
    var x = 0, y = 0;
    //记录按键被按下时的悬浮窗位置
    var windowX, windowY;
    //记录按键被按下的时间以便判断长按等动作
    // var downTime;
    window.action.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                // downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                //如果按下的时间超过1.5秒判断为长按，退出脚本
                // if(new Date().getTime() - downTime > 1500){
                //     exit();
                // }
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                // if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                //     onClick();
                // }
                return true;
        }
        return true;
    });
}
