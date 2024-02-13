function shortcut(key){
    switch (key) {
        case "Space":
            skip();
            break;
        case "F4":
            TypingInitialization(true);
            break;
        case "F10":
            playSpeedChanger();
            break;
        case "Escape":
            togglePlayback();
            break;
        case "ArrowUp":
            controlVolume('up');
            break;
        case "ArrowDown":
            controlVolume('down');
        default:
            break;
    }
}
function controlVolume(type){      
    const rangeValue = Number(videoSoundRange.value)
    if(type === 'up'){
        videoVolume = rangeValue + 1;
    }else{
        videoVolume = rangeValue-1;
    }
    updateVolume(videoVolume, 'videoSoundVolumeValue', 'videoVolume');
    player.setVolume(videoVolume);
    videoSoundRange.value = videoVolume;
}

function togglePlayback(){
    if(is_play){
        player.pauseVideo();
    }else{
        player.playVideo();
    }
}

function skip(){
    if(nextTime() - Time(true) > 3){
        player.seekTo(nextTime() - 3);
    }
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