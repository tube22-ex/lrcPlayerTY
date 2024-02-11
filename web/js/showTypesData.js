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