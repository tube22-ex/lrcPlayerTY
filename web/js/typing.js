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

const kanaDisp = () => {
    yomiB.textContent = KANA.seq_candidates();//これから打つ文字
    yomiA.textContent = KANA.seq_done();//打ち終わった文字
}

const dataDisp = ()=>{
    status_miss.textContent = typesDataObj["Miss"];
    status_types.textContent = typesDataObj["Types"];
    status_clearLines.textContent = typesDataObj["lineClertCnt"];
    status_score.textContent = (Math.round((typesDataObj["Score"] / 2000)*100)/100).toFixed(2); 
    status_lost.textContent = typesDataObj["Lost"];
    status_kps.textContent = typesDataObj["AllSpeed"].toFixed(2);
    status_acc.textContent = typesDataObj["Acc"].toFixed(2);
    status_lines.textContent = typesDataObj["LineRemaining"]
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
    LineRemaining:0,
    playlog:[]
};

let fixedKPS,fixedKPM,KPS//global

function calculateSpeedATime(){
    if((playmode === 0 && !keygraph.is_finished()) || (playmode === 1 && !KANA.is_finished())){
        let Ctime = setCurrentTime() - preTime();
        KPS = (lineDataObj["Types"] / (Ctime /  videoSpeedAry[playSpeedIndex]));
        let KPM = KPS * 60;
        fixedKPS = KPS.toFixed(2);
        fixedKPM = KPM.toFixed(0);
        if(isNaN(Ctime)){
            [fixedKPM,fixedKPS] = [0,0]
        }
        AllspeedCalc(KPS);
    }
    let fixedtiem = ((nextTime() - setCurrentTime()) / videoSpeedAry[playSpeedIndex]).toFixed(1);
    drawSpeed(`残り${fixedtiem}秒 - ${fixedKPS}KPS - ${fixedKPM}KPM`)
}

function accCalc(){
    let acc = 100 -((typesDataObj["Miss"] / typesDataObj["Types"]) * 100);
    if(acc < 0){
        acc = 0;
    }
    if(acc){
        typesDataObj["Acc"] = acc;
    }
}

function lineDataReset(){
    if(playmode === 0){
        typesDataObj["TypesKana"] += keygraph.seq_done().length;
        typesDataObj["Lost"] += keygraph.key_candidate().length;
    }else if(playmode === 1){
        typesDataObj["TypesKana"] += KANA.seq_done().length;
        typesDataObj["Lost"] += KANA.seq_candidates().length;
    }
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

class Typing{
    constructor(){
        this.inputKey;
        this.setKeyEvent();
    }

    setKeyEvent(){
        document.addEventListener('keydown', (e) => this.keyFunc(e));
    }

    keyFunc(e){
        if(!is_input && is_play){
            e.preventDefault();
        }
        if(shortcutList.includes(e.key)){
            shortcut(e.key)
            e.preventDefault();
        }else if(is_play){
            if(playmode === 0){
                this.ty_roma(e);
            }else if(playmode === 1){
                this.ty_kana(e);
            }
        }
        if((playmode === 0 && e.code === 'Space' && keygraph.is_finished()) || (playmode === 1 && e.code === 'Space' && KANA.is_finished())){
            skip();
        }
        this.status_calc();
    }

    ty_roma(e){
        this.inputKey = e.key;
        if( keygraph.next(e.key) ){
            // 正解の場合
            this.ty_correct();
        if( keygraph.is_finished() && yomiArea.innerText){
            this.ty_finish();
        }
        }else if(!keygraph.is_finished()){
            // 不正解の場合
            this.ty_miss();
        }
        disp();
    }

    ty_kana(e){
        this.inputKey = e.code;
        if(KANA.nextkey() && ((!KANA.nextkey()[1] && e.code === KANA.nextkey()[0]) || (KANA.nextkey()[1] && e.shiftKey && e.code === KANA.nextkey()[0]))){
            //正解の場合
            KANA.correct()
            this.ty_correct();
            if(KANA.is_finished()){
                //完走した場合
                this.ty_finish();
            }
        }else{
            if(!KANA.is_finished()){
                this.ty_miss();
                //ミス
            }

        }
        kanaDisp();
    }

    ty_correct(){
        sound.play();
        lineDataObj["Types"]++;
        typesDataObj["Types"]++;
        typesDataObj["playlog"].push({"KEY":this.inputKey,"TIME":Time(true),isMatch:true});
    }

    ty_miss(){
        miss_sound.play();
        lineDataObj["Miss"]++;
        typesDataObj["Miss"]++;
        typesDataObj["playlog"].push({"KEY":this.inputKey,"TIME":Time(true),isMatch:false});
    }

    ty_finish(){
        yomiA.style.color = '#1eff52';
        romaA.style.color = '#1eff52';
        clear_sound.play();
        typesDataObj["lineClertCnt"]++;
    }

    status_calc(){
        yomiA.textContent = yomiA.textContent.slice(-15).replaceAll(' ', '_');
        romaA.textContent = romaA.textContent.slice(-20).replaceAll(' ', '_');
        let kanaLength = 0;
        if(playmode === 0){
            kanaLength = keygraph.seq_done().length;
        }else if(playmode === 1){
            kanaLength = KANA.seq_done().length;
        }
        const totalKana = typesDataObj["TypesKana"] + kanaLength;

        typesDataObj["Score"] = (Score_per_char_kana * totalKana) - (typesDataObj["Miss"] * (Score_per_char / 4));
        if(typesDataObj["Score"] < 0){
            typesDataObj["Score"] = 0;
        } 
        calculateSpeedATime();
        accCalc();
        dataDisp();
    }
    
}
const TypingCLS = new Typing();


/*
function keyFunc(e){
    if(!is_input && is_play){
        e.preventDefault();
    }
    if(shortcutList.includes(e.key)){
        shortcut(e.key)
        e.preventDefault();
    }else if(is_play){
        if( keygraph.next(e.key) ){
                // 正解の場合
                sound.play();
                lineDataObj["Types"]++;
                typesDataObj["Types"]++;
                typesDataObj["playlog"].push({"KEY":e.key,"TIME":Time(true),isMatch:true});
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
                typesDataObj["playlog"].push({"KEY":e.key,"TIME":Time(true),isMatch:false});
        }
           disp();
    }
    if(e.code === 'Space' && keygraph.is_finished()){
        skip();
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

*/