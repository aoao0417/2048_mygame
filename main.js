//定义一个js数组
var board = new Array();
//定义一个判断是否合并过的数组
var hasConflicted = new Array();
var score = 0;

//ready函数，一打开立即运行
$(function () {
    newGame();
});

function newGame() {
    //初始化棋盘格和数字格
    init();
    //生成两个随机位置的随机数字
    generateOneNumber();
    generateOneNumber();
}

function restartgame() {
    //先清空gameover的提示框，然后清空得分，最后重新开始游戏
    $("#gameover").remove();
    updateScore(0);
    newGame();
}

function init() {
    for(var i = 0;i < 4;i++){
        //定义一个二维数组
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0;j < 4;j++){
            var gridCell = $("#x"+i+"y"+j);
            //通过getPosTop()方法设置每个格子距顶端位置
            gridCell.css("top",getPosTop(i,j));
            //通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left",getPosLeft(i,j));
            board[i][j] = 0;
            hasConflicted[i][j] = false;//定义一个是否合并过一次的boolean变量
        }
    }
    // for(var i = 0;i < 4;i++){
    //     //定义了一个二维数组
    //     board[i] = new Array();
    //     hasConflicted[i] = new Array();
    //     for(var j = 0;j < 4;j++){
    //         //初始化小格的值
    //         board[i][j] = 0;
    //         hasConflicted[i][j] = false;
    //     }
    // }
    updateBoardView();
    score = 0;
    $("#score").text(0);
}

//数字格的创建
function updateBoardView() {
    $(".number-cell").remove();
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                $("#box").append("<div class = 'number-cell' id='number-cell-"+i+"-"+j+"'></div>");
                var numberCell = $("#number-cell-"+i+"-"+j);
            //如果棋盘格的值为0，设置数字格宽高为0
                if(board[i][j] == 0){
                numberCell.css("width","0px");
                numberCell.css("height","0px");
                numberCell.css("top",getPosTop(i,j)+50 );//就算值为0不显示，也要把中心点放在每个空格的中心点上
                numberCell.css("left",getPosLeft(i,j)+50);
            }
            //如果不为0，设置数字格
            else{
                numberCell.css("width","100px");
                numberCell.css("height","100px");
                numberCell.css("top",getPosTop(i,j));
                numberCell.css("left",getPosLeft(i,j));
                numberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                numberCell.css("color",getNumberColor(board[i][j]));
                numberCell.css("font-size",getFontsize(board[i][j]));
                numberCell.text(board[i][j]);
            }
                hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    //生成一个位置的随机数字
    //1 生成随机的位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));

    while (true){
        if(board[randx][randy] == 0){
            break;
    }
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));
    }
    //2 生成随机的数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //3 在随机的位置显示出来
    board[randx][randy] = randNumber;
    ShowNumberWithAnimation(randx,randy,randNumber);
}