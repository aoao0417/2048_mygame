function ShowNumberWithAnimation(i,j,randNumber) {
    var numberCell = $("#number-cell-"+i+"-"+j);
    numberCell.css("background-color",getNumberBackgroundColor(randNumber));
    numberCell.css("color",getNumberColor(randNumber));
    numberCell.css("font-size",getFontsize(board[i][j]));
    numberCell.text(randNumber);

    numberCell.animate({
        width: "100px",
        height: "100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },200);
}


function showMoveAnimation(fromx,fromy,tox,toy) {
    //获取当前数字格元素
    var numberCell = $("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function updateScore(score) {
    $("#score").text(score);
}