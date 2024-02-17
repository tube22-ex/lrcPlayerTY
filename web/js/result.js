function nowDateTime(){
    const now = new Date();
    const NOW = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
    return NOW
}

function ResultData(uid,Name){
    const ResultDataObj = typesDataObj;
    ResultDataObj["NAME"] = uid;
    ResultDataObj["displayName"] = Name;
    ResultDataObj["date"] = nowDateTime();
    const keysToDelete = ['KPM', 'LineRemaining'];
    keysToDelete.forEach((key) => {
        delete ResultDataObj[key];
    });
    return ResultDataObj;
}

function Result(){
    DB.ref(played_chartID).once('value').then(snapshot => {
        let uid = localStorage.getItem('uid')
        let displayName = localStorage.getItem('displayName')
        let appdata = snapshot.val();
        if(!appdata){
            let data = {
                [played_chartID]: {
                  [uid]: {
                    0: ResultData(uid,displayName)
                  }
                }
              };
            DB.ref().update(data);
        }else{
            if(appdata[uid]){
                let len = Object.keys(appdata[uid]).length;
                let data01 = {};
                data01[len] = ResultData(uid,displayName);
                DB.ref(played_chartID).child(uid).update(data01);
            }else{
                let data02 = {};
                data02[uid] = {};
                data02[uid][0] = ResultData(uid,displayName);
                DB.ref(played_chartID).update(data02);
            }
            //名前があるかどうか
        }
        alert("ランキングに登録しました")
        //played_chartIDがあるかどうか
    });
}