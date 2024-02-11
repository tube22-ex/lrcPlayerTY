/*
let chartAry = []
class Html{
    constructor(TITLE,VIDEOURL){
        const VIDEOID = VIDEOURL.slice(VIDEOURL.indexOf("watch?v=") + 8);
        this.title = TITLE.substring(TITLE.indexOf('_') + 1, TITLE.indexOf('.lrc'));
        this.img = "https://i.ytimg.com/vi/" + VIDEOID + "/mqdefault.jpg";
        this.id = TITLE.substring(0, TITLE.indexOf('_'));
    }
    chart(){
        const tag = `
        <div class="item" chartid="${this.id}">${this.id}
        </div>
        `;
        return tag;
    }
}
譜面番号出したいとき用
*/
let chartAry = []
class Html{
    constructor(TITLE,VIDEOURL){
        const VIDEOID = VIDEOURL.slice(VIDEOURL.indexOf("watch?v=") + 8);
        this.title = TITLE.substring(TITLE.indexOf('_') + 1, TITLE.indexOf('.lrc'));
        this.img = "https://i.ytimg.com/vi/" + VIDEOID + "/mqdefault.jpg";
        this.id = TITLE.substring(0, TITLE.indexOf('_'));
    }
    chart(){
        const tag = `
        <div class="item" chartid="${this.id}">
            <div class="chartID">${this.id}</div>
            <img src="${this.img}">
            <div class="title">${this.title}</div>
        </div>
        `;
        return tag;
    }
}