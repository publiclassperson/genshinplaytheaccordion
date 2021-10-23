##原神自动弹琴脚本-可自行打稿

###文件说明
1.  score.js 该文件为谱子
2.  music.js 该文件为读谱弹琴脚本
3.  buttons.js 该文件为悬浮窗,琴键对齐,开关控制脚本

###谱子规则
1.  琴共21键,映射规则如下
   qwertyu
   asdfghj
   zxcvbnm
2.  谱子案例
   abc,__
   含义：abc三个当作一个和弦按，逗号右边根据字符长度2，作为节拍数，也就是按压时长
3.  谱子书写规则
   每行即每次按下的琴键与节拍数。逗号左边为对应琴键，右边为节拍数。右边实际取值是字符长度，所以逗号右边可以是-_0-9等各种字符。目前socre.js中为<一闪一闪亮晶晶-和弦版>来自b站up主：斯巴达酸奶的谱子,可自行对照乐谱更改.

###使用步骤
1.  导入所有脚本和谱子到autojs同一目录下,运行buttons.js
2.  打开原神,并打开弹琴页面.
3.  移动abc三个定位点按钮,分别在琴键左上、右上、左下，顺序保证一致,点击定位完成.
注意:定位点按钮，保持正方形左上角，处在那颗琴键中心.
4.  点击开始弹奏按钮,即可享受自动弹琴.
     
###大晚上写的,实现功能为主,受欢迎的话,之后再考虑增加共享谱子功能,让大家的辛苦打的谱子可以共享.有疑问或者遇到问题欢迎github提问,万一急不可耐,可以加群(qq群:175252284) 



