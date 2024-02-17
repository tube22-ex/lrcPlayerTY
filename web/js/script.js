let is_play = false;
let is_playFirstclick = true;
let is_input = false;

document.getElementById('FileNameGetBtn').addEventListener('click',FileNameReq)
document.getElementById('searchBtn').addEventListener('click',()=>{
    NFileNameReq({'type':"search"})
})

async function FileNameReq(){
    const [fileName,YTURLObj] = await eel.fileReturn()();
    writeFileName(fileName,YTURLObj);
};

async function NFileNameReq(e){
    let n;
    played_chartID = n;
    if(e.type === 'search'){
        n = document.getElementById('searchNumber').value;
    }
    else if(e.type === 'click'){
        n = e.num;
    }
    show_ranking(n);
    const [fileName,dataDict] = await eel.fileSearch(n)();
    writeLrc(dataDict)
}

function writeLrc(data){
    kashi.value = data["KASHI"];
    yomi.value = data["YOMI"];
    url.value = data["URL"]
    const videoID = data["URL"].substring(data["URL"].indexOf('?v=') + 3)
    if(!sessionStorage.getItem(videoID)){
        aryToObj(data["KASHI"],videoID,"def");
        aryToObj(data["YOMI"],videoID,"YOMI");
    }
    video_set(videoID);
    modeSelect.style.display = 'flex';
    playmode = playModeSelect()
    playFunc(videoID,"def");
    myWorker.postMessage({ type: 'Lyrics', lyrics: lrcObj });
    //Workerに歌詞をセット
    playFunc(videoID,'YOMI');
    myWorker1.postMessage({ type: 'Lyrics', lyrics: lrcObj });
    //Worker1に読みをセット
    TypingInitialization();
}

function playModeSelect(){
    kanaDisp();
    disp();
    let SelectElements = modeSelect.querySelectorAll('input[type="radio"]');
    for(i of SelectElements){
        if(i.checked){
            return Number(i.value);
        }
    }
}

function TypingInitialization(autoStart = false){
    workerset();
    Datareset();
    lycIndex = 0;
    player.seekTo(0);
    if(autoStart){
        setTimeout(()=>{
            keygraph.build('');
            disp();
            kashiA.innerHTML = '';
            nextA.innerHTML = "NEXT: "
            player.playVideo()
        },200)
    }
    myWorker.postMessage({ type: 'set', videoTime: player.getDuration() })
}

function workerset(){
    myWorker.postMessage({ type: 'reset'});
    myWorker1.postMessage({ type: 'reset'});
}

function writeFileName(files, YTURLObj){ 
    chartAry = []
    ContentArea.innerHTML = '';
    ChartContents.innerHTML = '';
    ContentArea.insertAdjacentHTML("beforeend", `<div id="len"></div>`);
    const len = document.getElementById('len');
    const fileLen = files.length / 3
    files.forEach((f) => {
        const fileName = f
        if(fileName.search(/(youtubeURL.txt|（読み）)/) == -1){
        /*仮         譜面番号のみ表示
               ContentArea.insertAdjacentHTML("beforeend", `<div class="files"><span>${fileName.slice(0,fileName.indexOf("_"))}</span></div>`);
       */
        videoURL = YTURLObj[fileName.slice(0,fileName.indexOf("_"))]
        const html = new Html(fileName, videoURL);
        chartAry.push(html.chart());
        }
    });

    async function addElement(){
        let cnt = 0;
        for (const element of chartAry) {
            await new Promise(resolve => setTimeout(resolve, 10));
            ChartContents.insertAdjacentHTML("beforeend", element);
            cnt++
            len.textContent = `${fileLen}件中${cnt}件表示中`;
        }

        const divItem = ChartContents.querySelectorAll('div.item');
        divItem.forEach((ele)=>{
            ele.addEventListener('click',()=>{
                NFileNameReq({type:"click", num : ele.getAttribute('chartid')})
            })
        })
    }
    addElement();
}

function Datareset(){
    resetValues(typesDataObj)
    playSpeedIndex = 3;
}

function resetValues(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (Array.isArray(value)) {
                // 配列の場合、配列を空にする
                obj[key] = [];
            } else if (typeof value === 'object') {
                resetValues(value);
            } else {
                obj[key] = 0;
            }
        }
    }
}
