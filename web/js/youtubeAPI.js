let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const intervalRate = 20;//ms
const intervalLowRate = 100;
let time_interval;
let time_interval_Lowrate;

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
}

function Time_low(){
    const currentTime = player.getCurrentTime();
    progressValueSet(currentTime)
    calculateSpeedATime()
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        is_play = true;
        time_interval = setInterval(Time,intervalRate);
        time_interval_Lowrate = setInterval(Time_low,intervalLowRate);
    }
    else if (event.data == YT.PlayerState.PAUSED) {
        is_play = false;
        clearInterval(time_interval);
        clearInterval(time_interval_Lowrate);
    }
    else if(event.data == YT.PlayerState.ENDED) {
        clearInterval(time_interval);
        clearInterval(time_interval_Lowrate);
        is_play = false;
        Result()
        //リザルト＆登録
    }
}

function video_set(videoID){
    player.setVolume(videoVolume)
    player.cueVideoById(videoID);
    lycIndex = 0;
    player.seekTo(0);
    modeSelect.style.display = 'none'
    if(is_playFirstclick){
        is_playFirstclick = false;
        keygraph.build('');
    }
}

function progressValueSet(currentTime){
    const percentage = currentTime / player.getDuration();
    progressBar1.value = percentage;
}