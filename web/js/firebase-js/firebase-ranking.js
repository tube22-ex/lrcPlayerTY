function getProfile(uid) {
    return DB.ref('/user').child(uid).once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        });
}

function show_ranking(id){
    document.getElementById('ranking').innerHTML = `<ol type="1" id="ranking_ol"></ol>`
    DB.ref().child(id).once('value')
    .then(snapshot => {
        if (snapshot.exists()) {
        // パスが存在する場合の処理
        let DBdata = snapshot.val();
        DBdataSelector(DBdata)
        } else {
        // パスが存在しない場合の処理
        console.log(`DB内に${id}のデータがありません。`);
        return
        }
    })
    async function DBdataSelector(dbdata){
        let rank_Array = [];
        for(item in dbdata){
            dbdata[item].sort((a, b) => b.Score - a.Score);
            rank_Array.push(dbdata[item][0]);
        }
        rank_Array.sort((a, b) => b.Score - a.Score);

        for (const Array of rank_Array) {
              const data = await getProfile(Array["NAME"]);
              const toFixedScore = (Math.round((Array["Score"] / 2000) * 100) / 100).toFixed(2);
              const liHTML = `<li ><span id="${Array["NAME"]}" 1class="ranking_score">${toFixedScore}</span><div class="ranking_icondiv"><img src="${data["iconURL"]}" class="ranking_icon"></div><span class="ranking_name">${data["dispName"]}<span></li>`;
              
              document.getElementById('ranking_ol').insertAdjacentHTML("beforeend", liHTML);
        }

        document.querySelectorAll('.ranking_score').forEach((list) => {
            list.addEventListener('click',show_record);
        })

        function show_record(e){
            const UID = e.target.getAttribute("id");
            let select_object = dbdata[UID];
            let window1 = window.open("about:blank", "window_name", "width=800,height=500,scrollbars=yes");
            window1.document.body.insertAdjacentHTML("afterbegin",`<ol id="Record_ol"></ol>`);
            select_object.forEach((s)=>{
                const li_HTML = `<li>${s["date"]} クリアライン数: ${s["lineClertCnt"]} スコア: ${s["Score"]} タイプ数: ${s["Types"]} ミス数: ${s["Miss"]} ロスト数: ${s["Lost"]} 正確性: ${s["Acc"] } 速度: ${s["AllSpeed"]} かな換算: ${s["TypesKana"]} </li>`
                window1.document.getElementById('Record_ol').insertAdjacentHTML("afterbegin",li_HTML)
            })
        }

    }

}

