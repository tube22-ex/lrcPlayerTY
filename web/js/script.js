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
    let auto = false;
    if(e.type === 'search'){
        n = document.getElementById('searchNumber').value;
    }
    else if(e.type === 'click'){
        n = e.num;
    }
    else if(e.type === 'restart'){
        n = e.num;
        auto = true;
    }
    played_chartID = n;
    const [fileName,dataDict] = await eel.fileSearch(n)();
    //writeFileName(fileName);
    console.log(n)
    writeLrc(dataDict,auto)
}

function writeLrc(data,autoStart = false){
    kashi.value = data["KASHI"];
    yomi.value = data["YOMI"];
    url.value = data["URL"]
    const videoID = data["URL"].substring(data["URL"].indexOf('?v=') + 3)
    if(!sessionStorage.getItem(videoID)){
        aryToObj(data["KASHI"],videoID,"def");
        aryToObj(data["YOMI"],videoID,"YOMI");
    }
    video_set(videoID,autoStart);
    workerset();
    Datareset();
    myWorker.postMessage({ type: 'set', videoTime: player.getDuration() })
}

function workerset(){
    myWorker.postMessage({ type: 'reset'});
    myWorker1.postMessage({ type: 'reset'});
}

/*
eel.expose(js_test)
function js_test(){
    alert("PYから呼び出された")
    eel.py_test();
}
*/
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
                // オブジェクトの場合、再帰的に処理
                resetValues(value);
            } else {
                // それ以外の場合、値を0にする
                obj[key] = 0;
            }
        }
    }
}
