class Kanaty{
    constructor(){
        this.kanaList = [
            "ゔ",
            "が",
            "ぎ",
            "ぐ",
            "げ",
            "ご",
            "ざ",
            "じ", 
            "ず",
            "ぜ",
            "ぞ",
            "だ",
            "ぢ",
            "づ",
            "で",
            "ど",
            "ば",   
            "び",
            "ぶ",
            "べ",
            "ぼ",
            "ぱ",
            "ぴ",
            "ぷ",
            "ぺ",
            "ぽ",
            "ヴ"
        ];
        this.kanaLayout = {
            "1":"ぬ",
            "2":"ふ",
            "3":"あ",
            "4":"う",
            "5":"え",
            "6":"お",
            "7":"や",
            "8":"ゆ",
            "9":"よ",
            "0":"わ",
            "-":"ほ",
            "^":"へ",
            "￥":"ー",
            "!":"ぬ",
            '"':"ふ",
            "#":"ぁ",
            "$":"ぅ",
            "%":"ぇ",
            "&":"ぉ",
            "'":"ゃ",
            "(":"ゅ",
            ")":"ょ",
            "0":"を",
            "=":"ほ",
            "~":"へ",
            "|":"ー",
            "q":"た",
            "w":"て",
            "e":"い",
            "r":"す",
            "t":"か",
            "y":"ん",
            "u":"な",
            "i":"に",
            "o":"ら",
            "p":"せ",
            "@":"゛",
            "[":"゜",
            "Q":"た",
            "W":"て",
            "E":"ぃ",
            "R":"す",
            "T":"か",
            "Y":"ん",
            "U":"な",
            "I":"に",
            "O":"ら",
            "P":"せ",
            "`":"゛",
            "{":"「",
            "a":"ち",
            "s":"と",
            "d":"し",
            "f":"は",
            "g":"き",
            "h":"く",
            "j":"ま",
            "k":"の",
            "l":"り",
            ";":"れ",
            ":":"け",
            "]":"む",
            "A":"ち",
            "S":"と",
            "D":"し",
            "F":"は",
            "G":"き",
            "H":"く",
            "J":"ま",
            "K":"の",
            "L":"り",
            "+":"れ",
            "*":"け",
            "}":"」",
            "z":"つ",
            "x":"さ",
            "c":"そ",
            "v":"ひ",
            "b":"こ",
            "n":"み",
            "m":"も",
            ",":"ね",
            ".":"る",
            "/":"め",
            "\\":"ろ",
            "Z":"っ",
            "X":"さ",
            "C":"そ",
            "V":"ひ",
            "B":"こ",
            "N":"み",
            "M":"も",
            "<":"、",
            ">":"。",
            "?":"・",
            "_":"ろ",
        }
        this.setEventListener();
    }

    setEventListener(){
        document.addEventListener('keydown',(e)=>{
            if(e.key === '\\'){
                if(e.code === 'IntlRo'){
                    inputKey(this.kanaLayout["\\"]);
                }else{
                    inputKey(this.kanaLayout["￥"]);
                }
            }else{
                if(Object.keys(this.kanaLayout).includes(e.key)){
                    inputKey(this.kanaLayout[e.key])
                }
            }
        })
    }

    build(text){
        this.correctAry = [];
        const char = [...text]
        let ary = [];
        char.forEach((c)=>{
            if(this.kanaList.includes(c)){
                let [a,b] = c.normalize('NFD');
                if(b.codePointAt(0) === 12441){
                    b = "゛";
                }else{
                    b = "゜";
                }
                //バグった文字を置換
                ary.push(a,b);
            }else{
                ary.push(c);
            }
        })
        this.kanalen = ary.length;
        this.ary = ary;
    }

    nextkey(){
        return this.ary[0];
    }

    correct(){
        this.correctAry.push(this.ary[0])
        this.ary.shift();
    }

    seq_candidates(){
        return this.ary.join("");
    }

    seq_done(){
        return this.correctAry.join("");
    }

    is_finished(){
        if(this.ary.length){
            return false;
        }else{
            return true;
        }
    }

    len(){
        return this.kanalen;
    }

}
const KANA = new Kanaty();


const kanaA = document.getElementById('kanaA');
const kanaB = document.getElementById('kanaB');

KANA.build("ちとのないらがあぱ");

const kanaDisp = () =>{
    kanaA.textContent = KANA.seq_done();
    kanaB.textContent = KANA.seq_candidates();
}

kanaDisp();

function inputKey(key){
    if(KANA.nextkey() === key){
        KANA.correct()
        if(KANA.is_finished()){
            kanaA.style.color = 'green';
        }
    }else{
        console.log("ミス")
    }
    kanaDisp();
}


