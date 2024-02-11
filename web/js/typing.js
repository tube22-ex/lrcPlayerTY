const disp = ()=>{
    // これからタイプしなければいけないキーの取得
    romaB.innerText = keygraph.key_candidate();
    
    // タイプし終わったキーの取得
    romaA.innerText = keygraph.key_done();
    
    // これから打つ ひらがな の取得
    yomiB.innerText = keygraph.seq_candidates();
    
    // 打ち終わった ひらがな の取得
    yomiA.innerText = keygraph.seq_done();
}

let DataAry = [];
let lineDataObj = {
    Types:0,
    Miss:0
};
let typesDataObj = {
    Types:0,
    Miss:0,
    lineClertCnt:0,
    Lost:0,
    Score:0,
    TypesKana:0,
    KPM:0,
    speed:[],
    AllSpeed:0,
    Acc:0,
    LineRemaining:0
};

let fixedKPS,fixedKPM,KPS//global

function calculateSpeedATime(){
    if(!keygraph.is_finished()){
        let Ctime = setCurrentTime() - preTime();
        KPS = lineDataObj["Types"] / Ctime;
        let KPM = KPS * 60
        fixedKPS = KPS.toFixed(2);
        fixedKPM = KPM.toFixed(0);
        if(isNaN(Ctime)){
            [fixedKPM,fixedKPS] = [0,0]
        }
        AllspeedCalc(KPS);
    }
    let fixedtiem = (nextTime() - setCurrentTime()).toFixed(1);
    drawSpeed(`残り${fixedtiem}秒 - ${fixedKPS}KPS - ${fixedKPM}KPM`)
}

function accCalc(){
    let acc = 100 -((typesDataObj["Miss"] / typesDataObj["Types"]) * 100);
    if(acc){
        typesDataObj["Acc"] = acc;
    }
}

function lineDataReset(){
    typesDataObj["TypesKana"] += keygraph.seq_done().length;
    typesDataObj["Lost"] += keygraph.key_candidate().length;
    DataAry.push(lineDataObj);
    if(is_kanalyrics){
        if (typeof KPS !== 'undefined') {
            let k = KPS;
            typesDataObj["speed"].push(k);
        }

    }
    lineDataObj = {Types:0,Miss:0};

}

function AllspeedCalc(kps){
    const speedAry = typesDataObj["speed"];
    let speedCalc = 0;
    speedAry.forEach((s)=>{
        speedCalc += s;
    })
    typesDataObj["AllSpeed"] = (speedCalc + kps) / (speedAry.length + 1);
}

function keyFunc(e){
    if(!is_input && is_play){
        e.preventDefault();
    }
    if(shortcutList.includes(e.key)){
        shortcut(e.key)
    }else if(is_play){
        if( keygraph.next(e.key) ){
                // 正解の場合
                sound.play();
                lineDataObj["Types"]++;
                typesDataObj["Types"]++;
                if( keygraph.is_finished() && yomiArea.innerText){
                    // すべてのキーが入力された場合
                    yomiA.style.color = '#1eff52';
                    romaA.style.color = '#1eff52';
                    clear_sound.play();
                    typesDataObj["lineClertCnt"]++;
                }
            }else if(!keygraph.is_finished()){
                // 不正解の場合
                miss_sound.play();
                lineDataObj["Miss"]++;
                typesDataObj["Miss"]++;
        }
        disp();
    }
    if(shortcutList.includes(e.code) && keygraph.is_finished()){
        shortcut(e.code)
    }
    //ショートカット

    function statusCalc(){
        yomiA.textContent = yomiA.textContent.slice(-15).replaceAll(' ', '_');
        romaA.textContent = romaA.textContent.slice(-20).replaceAll(' ', '_');
        const kanaLength = keygraph.seq_done().length;
        const totalKana = typesDataObj["TypesKana"] + kanaLength;

        typesDataObj["Score"] = (Score_per_char_kana * totalKana) - (typesDataObj["Miss"] * (Score_per_char / 4));
        if(typesDataObj["Score"] < 0){
            typesDataObj["Score"] = 0;
        } 
        calculateSpeedATime();
        accCalc();
        dataDisp();
    }
    statusCalc();
}

document.addEventListener('keydown',keyFunc);