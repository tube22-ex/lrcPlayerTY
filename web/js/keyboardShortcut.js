function shortcut(key){
    switch (key) {
        case "Space":
            skip();
            break;
        case "F4":
            restart();
            break;
        case "F10":
            playSpeedChanger();
            break;
        default:
            break;
    }
}
function skip(){
    if(nextTime() - Time(true) > 3){
        player.seekTo(nextTime() - 3);
    }
}

function restart(){
    NFileNameReq({type:"restart", num:played_chartID});
}

let playSpeedIndex = 3;
function playSpeedChanger(){
    // iを増やす
    playSpeedIndex++;
    // iが配列の長さ以上になったら0に戻す
    if (playSpeedIndex >= videoSpeedAry.length) {
        playSpeedIndex = 0;
    }

    player.setPlaybackRate(videoSpeedAry[playSpeedIndex]);
  
}