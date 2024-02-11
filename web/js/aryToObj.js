const pattern = /\[(\d{2}:\d{2}\.\d{2})\]/;
const pattern1 = /\[(\d{2}:\d{2}\.\s\d)\]/;
function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

function sessionStorageSet(obj,videoID,type){
    const jsonObj = JSON.stringify(obj);
    if(type == 'YOMI'){
        sessionStorage.setItem(videoID + 'YOMI', jsonObj);
    }else{
        sessionStorage.setItem(videoID, jsonObj);
    }
}

function aryToObj(lrc,videoID,type){
    const lines = lrc.split('\n');
    const arrObj = [];
    lines.forEach(line => {
        let match
        if ((match = line.match(pattern)) || (match = line.match(pattern1))) {
            const [fullMatch, T] = match;
            const index = line.indexOf(fullMatch);
            const timeTag = line.substring(index, index + fullMatch.length);
            const lyrics = line.substring(index + fullMatch.length);
            const x = match[2] ? '00' : timeTag.substring(7, 9);//. \dのミスがあった場合00に置き換える
            const time = changeTimeFormat(timeTag,x);
            const HTMLDecodeLyrics = htmlDecode(lyrics);
            arrObj.push({
                "TIME" : time,
                "LYRICS" : HTMLDecodeLyrics
            })
        }
    });
    sessionStorageSet(arrObj,videoID,type);
};

function changeTimeFormat(timeTag,x){
    const m = timeTag.substring(1,3);
    const s = timeTag.substring(4,6);
    const time = (Number(m) * 60) + Number(s) + (Number(x) / 100);
    return time;
}