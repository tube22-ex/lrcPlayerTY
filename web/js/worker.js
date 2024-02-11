(function() {
    let Obj;
    let WcurrentTime = 0;
    let Index = 0;
    let checkIndex = 0;
    let is_last = false;
    let VTime = 0;
    self.onmessage = function (e) {
    const messageType = e.data.type;
    checkIndex = Index;
    if (messageType === 'Time') {

        if(is_last && WcurrentTime == e.data.time){
            self.postMessage({"RESULT":"END", "STATE": "end",});
        }

        function progressCalc(p){
            const time = p.T;
            const pre = p.PRE;
            const next = p.IT;
            const index = p.I;
            let progress;
            if(index > 0){
                progress = progress = (time - pre) / (next - pre);
            }
            else if (index == 0){
                progress = time / next
            }
            if(isFinite(progress)){
                self.postMessage({"PROGRESS": progress, "STATE": "checking","TIME":WcurrentTime,"PRE":pre});
            }
        }
        
        // 歌詞の取得処理
        WcurrentTime = e.data.time
        if(Index < Obj.lyrics.length && is_last==false){
            if(Index == 0){
                progressCalc({T: WcurrentTime, IT : Obj.lyrics[Index]["TIME"], I : Index})
            }else if(!is_last){
                progressCalc({T: WcurrentTime, PRE :Obj.lyrics[Index- 1]["TIME"],  IT : Obj.lyrics[Index]["TIME"], I : Index})
            }

            if(Index > 0 && Obj.lyrics[Index -1]["TIME"] > WcurrentTime){
                Index--;
            }

            if(Index < Obj.lyrics.length -1){
                while (Obj.lyrics[Index]["TIME"] <= WcurrentTime) {
                    Index++;
                }
            }else{
                if(Obj.lyrics[Index]["TIME"] <= WcurrentTime){
                    is_last = true;
                    sendMessage(Index + 1)
                }

            }
        }
        else if(is_last){
            progressCalc({T: WcurrentTime, PRE :Obj.lyrics[Index]["TIME"], I : Index , next : VTime});
        }
        
        if(checkIndex < Index){
            sendMessage(Index)
        }
        function sendMessage(i){
            let workerResult;
            if(i === 0){
                workerResult = Obj.lyrics[i]["LYRICS"];
            }else{
                workerResult = Obj.lyrics[i - 1]["LYRICS"];
            }
            const remaining = Obj.lyrics.length - i;
            self.postMessage({"RESULT":workerResult, "STATE": "checking", "NEXTTIME": Obj.lyrics[Index]["TIME"],"REMAINING":remaining});
        }
    }
    else if(messageType === 'reset'){
        Obj;
        WcurrentTime = 0;
        Index = 0;
        checkIndex = 0;
        is_last = false;

    }
    else if (messageType === 'Lyrics') {
        Obj = e.data
        console.log(Obj)
    }
    else if(messageType === 'set'){
        VTime = e.data.videoTime;
    }
    };
})();
