let lrcObj;
let lycIndex = 0;
let is_kanalyrics = false;
function playFunc(videoID,type){
    let lyrics;
    if(type == 'YOMI'){
        lyrics = sessionStorage.getItem(videoID + 'YOMI');
        lyrics = JSON.parse(lyrics);
        let cnt = 0;
        let lyrcsStr = '';
        lyrics.forEach(element => {
            cnt += element["LYRICS"].length;
            lyrcsStr+=element["LYRICS"];
        });
        keygraph.build(lyrcsStr);
        Score_per_char = 200000 / keygraph.key_candidate().length;
        Score_per_char_kana = 200000 / cnt;
        kanaLen = cnt;
        keygraph.build('');
    }else{
        lyrics = sessionStorage.getItem(videoID);
        lyrics = JSON.parse(lyrics);
    }
    lrcObj = lyrics
    console.log(lrcObj)
}

myWorker.onmessage = function(e){
    if(e.data.RESULT === '' || e.data.RESULT){
       kashiA.innerHTML = e.data.RESULT;
       [fixedKPS,fixedKPM] = [0,0]
    }
    if(e.data.PROGRESS){
        progressBar.value = e.data.PROGRESS;
    }
    if(e.data.REMAINING){
        typesDataObj["LineRemaining"] = e.data.REMAINING;
    }
    if(e.data.STATE === 'end'){
        nextTime(player.getDuration());
    }
    if(e.data.NEXTTIME){
        nextTime(e.data.NEXTTIME);
    }
    if(e.data.TIME){
        setCurrentTime(e.data.TIME);
        preTime(e.data.PRE)
    }
}


myWorker1.onmessage = function(e){
    if(e.data.NEXT === '' || e.data.NEXT){
    nextA.innerHTML = "NEXT: " + e.data.NEXT;
    };
    const K = e.data.RESULT.toLowerCase();
    is_kanalyrics = K !== '' ? true : false;
    lineDataReset()
    keygraph.build(K);
    disp();
    dataDisp(); 
    yomiA.style.color = '#0099CC';
    romaA.style.color = '#0099CC';
}

let global_nextTime;
function nextTime(next) {
    return (global_nextTime = next || global_nextTime);
}

let global_CurrentTime;
function setCurrentTime(time) {
    return (global_CurrentTime = time || global_CurrentTime);
}

let global_preTime;
function preTime(time) {
    return (global_preTime = time || global_preTime);
}