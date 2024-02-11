(function() {
    function worker1_VariableReset(){
        Obj;
        WcurrentTime = 0;
        Index = 0;
        checkIndex = 0;
        is_last = false;
        workerResult = '';
    }

    let Obj;
    let WcurrentTime = 0;
    let Index = 0;
    let checkIndex = 0;
    let is_last = false;
    let workerResult;

    self.onmessage = function (e) {
        const messageType = e.data.type;
        checkIndex = Index;
        if (messageType === 'Time') {
            // 歌詞の取得処理
            if(Index > 0 && Obj.lyrics[Index -1]["TIME"] > WcurrentTime){
                Index--;
            }
            //Indexがおかしくなっていたときに戻す

            if(Index < Obj.lyrics.length -1){
                WcurrentTime = e.data.time
            while (Obj.lyrics[Index]["TIME"] <= WcurrentTime) {
                Index++;
            }
            }else{
                //最後
                WcurrentTime = e.data.time
                if(Obj.lyrics[Index]["TIME"] <= WcurrentTime && is_last==false){
                    is_last = true;
                    workerResult = Obj.lyrics[Index]["LYRICS"];
                    self.postMessage({"RESULT":workerResult});
                }
                
            }
            
            if(checkIndex < Index){
                let next = '';
                if(Index === 0){
                    workerResult = Obj.lyrics[Index]["LYRICS"];
                    next = Obj.lyrics[Index + 1]["LYRICS"];
                }else{
                    workerResult = Obj.lyrics[Index - 1]["LYRICS"];
                    if (Obj.lyrics[Index]["LYRICS"] !== undefined && Obj.lyrics[Index]["LYRICS"] !== null){
                        next = Obj.lyrics[Index]["LYRICS"]
                    }
                    
                }

                self.postMessage({"RESULT":workerResult, "NEXT":next});
                
            }
        }
        else if(messageType === 'reset'){
            worker1_VariableReset();
        }
        else if (messageType === 'Lyrics') {
            Obj = e.data
        }
    };
})();