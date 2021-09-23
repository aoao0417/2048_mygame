//keydown事件，表示键盘被按下
$(document).keydown(function (event) { //event是keydown事件自带
    switch (event.keyCode){
        case 37://left
            //moveLeft()方法完成向左移动，返回值为boolean
            if(moveLeft()){
                //重新的随机生成数字
                setTimeout("generateOneNumber()",210);
                //判断这次移动后游戏是否结束
                setTimeout("isgameover()",300);
            }
            break;
        case 38://up
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39://right
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://down
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
    }
});

function moveLeft() {
    //返回值为boolean，判断是否可以移动
    if(!canMoveLeft(board)){
        //当前格子无法移动
        return false;
    }
    for(var i = 0;i < 4;i++){
            for(var j = 1;j < 4;j++){
            //当前数字格有没有值
            if(board[i][j]!=0){
                //向左移动的逻辑
                for(var k = 0;k<j;k++){
                    if(board[i][k] == 0 && noBlockHorizontalCol(i,k,j,board)){
                        //向左移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontalCol(i,k,j,board) && !hasConflicted[i][k]){
                        //两值相等
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

function moveRight() {
    //返回值为boolean，判断是否可以移动
    if(!canMoveRight(board)){
        //当前格子无法移动
        return false;
    }
    for(var i = 0;i < 4;i++){
        for(var j = 2;j >= 0;j--){
            //当前数字格有没有值
            if(board[i][j]!=0){
                //向右移动的逻辑
                for(var k = 3;k>j;k--){
                    if(board[i][k] == 0 && noBlockHorizontalCol(i,j,k,board)){
                        //向右移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontalCol(i,j,k,board) &&!hasConflicted[i][k]){
                        //两值相等
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

function moveUp() {
    //返回值为boolean，判断是否可以移动
    if(!canMoveUp(board)){
        //当前格子无法移动
        return false;
    }
    for(var i = 1;i < 4;i++){
        for(var j = 0;j < 4;j++){
            //当前数字格有没有值
            if(board[i][j]!=0){
                //向上移动的逻辑
                for(var k = 0;k<i;k++){
                    if(board[k][j] == 0 && noBlockVerticalCol(k,i,j,board)){
                        //向上移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[k][j] == board[i][j] && noBlockVerticalCol(k,i,j,board) &&!hasConflicted[k][j]){
                        //两值相等
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

function moveDown() {
    //返回值为boolean，判断是否可以移动
    if(!canMoveDown(board)){
        //当前格子无法移动
        return false;
    }
    for(var i = 2;i >= 0;i--){
        for(var j = 0;j < 4;j++){
            //当前数字格有没有值
            if(board[i][j]!=0){
                //向上移动的逻辑
                for(var k = 3;k>i;k--){
                    if(board[k][j] == 0 && noBlockVerticalCol(i,k,j,board)){
                        //向上移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[k][j] == board[i][j] && noBlockVerticalCol(i,k,j,board) &&!hasConflicted[k][j]){
                        //两值相等
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

function isgameover() {
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover() {
    // setTimeout("alert(\"gameover!\")",300);
    $("#box").append("<div id='gameover' class='gameover'><p>本次得分</p><span>"+score+"</span>" +
        "<a href='javascript:restartgame();'id='restartbutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width","460px");
    gameover.css("height","460px");
    gameover.css("background-color","rgba(0,0,0,0.5)");
}

