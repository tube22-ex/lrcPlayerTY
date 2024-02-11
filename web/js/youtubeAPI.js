let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const intervalRate = 20;//ms
let time_interval;

function onYouTubeIframeAPIReady() {

    player = new YT.Player('player', {
        width: '640', //幅
        height: '360',
        videoId: '',//テスト用 f1xNyfpNlTM
        playerVars: {
            start: 0,
            startSeconds: 0,
            controls: 0, // コントロールバーを非表示にする
            enablejsapi: 1,
            disablekb: 1,
            rel: 0,
            origin: location.protocol + '//' + location.hostname + "/"
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });

}
//Youtube playerAPI

function onPlayerReady() {
    player.setVolume(videoVolume)
}

function Time(get){
    let currentTime = player.getCurrentTime();
    let display_time = Math.floor(currentTime*100)/100;
    const time = `${display_time.toFixed(0)} / ${player.getDuration().toFixed(0)}`;
    myWorker.postMessage({ type: 'Time', time: currentTime});
    myWorker1.postMessage({ type: 'Time', time: currentTime });
    drawTime(time);
    if(get){
        return currentTime
    }
    calculateSpeedATime()
    progressValueSet(currentTime)
    //showLyrics(currentTime)
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        is_play = true;
        time_interval = setInterval(Time,intervalRate);
    }
    else if (event.data == YT.PlayerState.PAUSED) {
        is_play = false;
        clearInterval(time_interval);
    }
    else if(event.data == YT.PlayerState.ENDED) {
        clearInterval(time_interval);
        is_play = false;
    }
}

function video_set(videoID,autoStart=false){
    player.setVolume(videoVolume)
    player.cueVideoById(videoID);
    lycIndex = 0;
    player.seekTo(0);
    playFunc(videoID,"def");
    myWorker.postMessage({ type: 'Lyrics', lyrics: lrcObj });
    //Workerに歌詞をセット
    playFunc(videoID,'YOMI');
    myWorker1.postMessage({ type: 'Lyrics', lyrics: lrcObj });
    //Worker1に読みをセット
    if(is_playFirstclick){
        is_playFirstclick = false;
        keygraph.build('');
    }
    if(autoStart){
        setTimeout(()=>player.playVideo(),300)
    }
}

function progressValueSet(currentTime){
    const percentage = currentTime / player.getDuration();
    progressBar1.value = percentage;
}