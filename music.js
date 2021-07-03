auto();

var pX = 480;
var pY = 1070;
var pX_length = 1800;
var pY_length = 500;
//每分钟拍数
var music_min = 120

playMusic();


//根据谱子一个一个谈
function playMusic() {
    //读取定位配置


    // 读取乐谱
    playMusicArr = readMusic();
    console.log("playMusicArr:" + JSON.stringify(playMusicArr))
    // console.log(":"+JSON.stringify())
    playMusicArr.forEach(item => {
        console.log("playMusicArr-item:" + JSON.stringify(item))
        ClickAll(item);
    })

}


//读取曲谱
function readMusic() {
    let musicArr = []
    var rootpath = files.cwd()
    var musicName = "score"
    var suffix = ".js"

    var targetMusicPath = rootpath + "/" + musicName + suffix;
    console.log(targetMusicPath)
    if (files.isFile(targetMusicPath)) {
        var musicStr = files.read(targetMusicPath, encoding = "utf-8")
        console.log("原歌词字符" + musicStr)
        musicArr = parseMusic(musicStr);
    } else {
        console.log("没有找到" + musicName + "的谱子")
    }
    return musicArr
}

//解析曲谱
/*
    示例,左边为需要按的字符,右边为时长(当每分钟120拍,-代表500ms)
    a,---
    b,---

*/
function parseMusic(musicStr) {

    let musicArr = []

    const musicChar = "ABCDEFG1234567abcdefg"
    const charXY = initXY();
    console.log("charXY=" + JSON.stringify(charXY))
    let musicSplit_1 = musicStr.split(/[(\r\n)\r\n]/)
    //解析谱子格式错误检测


    //循环获取谱子
    for (let i = 0; i < musicSplit_1.length; i++) {
        let one_arr_time = {
            arrs: [],
            delay: 0
        }
        if (!musicSplit_1[i]) {
            continue
        }
        let musicSplit_2 = musicSplit_1[i].split(",")
        //解析谱子音符
        let chars = musicSplit_2[0].split("");
        chars.forEach(item => {
            let place_index = musicChar.indexOf(item)
            // console.log("place_index:"+place_index)
            one_arr_time.arrs.push(charXY[place_index])
        })
        console.log("musicSplit_2:" + JSON.stringify(musicSplit_2))
        //解析按键时长
        one_arr_time.delay = musicSplit_2[1].length

        // console.log("one_arr_time_"+i+":"+JSON.stringify(one_arr_time))
        musicArr.push(one_arr_time)
    }
    return musicArr;
}



//初始化琴键位置
function initXY() {
    let char_xy = []
    const x_size = 7
    const y_size = 3
    // 初始化琴键位置
    var storage = storages.create("PXY");
    if (storage.contains("pY")) {
        pX = storage.get("pX");
        pY = storage.get("pY");
        pX_length = storage.get("pX_length");
        pY_length = storage.get("pY_length");
        music_min = storage.get("music_min")
        console.log("获取配置成功")
    } else {
        log("获取配置失败,使用默认配置")
    }
    let x_interval = parseInt(pX_length / (x_size - 1));
    let y_interval = parseInt(pY_length / (y_size - 1));

    for (let i = 0; i < y_size; i++) {
        for (let j = 0; j < x_size; j++) {
            let XY = {
                x: pX + j * x_interval,
                y: pY + i * y_interval
            }
            char_xy.push(XY);
        }
    }
    console.log("初始化按键位置坐标:" + JSON.stringify(char_xy))
    return char_xy;
}





//点击所有可点击点
function ClickAll(arrs_delay) {
    let arrp = arrs_delay.arrs
    let parmsize = arrp.length;
    let delay = arrs_delay.delay * (60 * 1000 / music_min)
    // console.log()
    if (parmsize > 0) {
        console.time("ClickAll")
        //组装点击参数数组
        let arrClick = [];
        // log("找到" + parmsize + "个点需要点！");
        for (let i = 0; i < parmsize; i++) {
            arrClick.push([0, delay, [arrp[i].x, arrp[i].y],]);
        }
        // console.log("点击数组查看:"+JSON.stringify(arrClick))
        //多点操作
        arrClick.length > 0 && gestures.apply(null, arrClick);
        console.timeEnd("ClickAll")
    }

}
