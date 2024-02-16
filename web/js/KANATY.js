/*
ビルド  KANA.build();
const kanaDisp = () => {
    kanaA.textContent = KANA.seq_done();//打ち終わった文字
    kanaB.textContent = KANA.seq_candidates();//これから打つ文字
}
kanaDisp();

document.addEventListener('keydown',(e)=>{
    console.log(KANA.nextkey(),e.code)
    if((!KANA.nextkey()[1] && e.code === KANA.nextkey()[0]) || (KANA.nextkey()[1] && e.shiftKey && e.code === KANA.nextkey()[0])){
        KANA.correct()
        console.log("正解")
        if(KANA.is_finished()){
            console.log('完走')
        }
    }else{
        console.log("ミス")
    }
    kanaDisp();
})
*/

class Kanaty{
    constructor(){
        this.kanaCharacters = [
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
        this.kanaconvartList = {
            "ぬ":["Digit1",false],
            "ふ":["Digit2",false],
            "あ":["Digit3",false],
            "う":["Digit4",false],
            "え":["Digit5",false],
            "お":["Digit6",false],
            "や":["Digit7",false],
            "ゆ":["Digit8",false],
            "よ":["Digit9",false],
            "わ":["Digit0",false],
            "ほ":["Minus",false],
            "へ":["Equal",false],
            "ー":["IntlYen",false],
            "ぁ":["Digit3",true],
            "ぅ":["Digit4",true],
            "ぇ":["Digit5",true],
            "ぉ":["Digit6",true],
            "ゃ":["Digit7",true],
            "ゅ":["Digit8",true],
            "ょ":["Digit9",true],
            "を":["Digit0",true],
            //一列目
            "た":["KeyQ",false],
            "て":["KeyW",false],
            "い":["KeyE",false],
            "す":["KeyR",false],
            "か":["KeyT",false],
            "ん":["KeyY",false],
            "な":["KeyU",false],
            "に":["KeyI",false],
            "ら":["KeyO",false],
            "せ":["KeyP",false],
            "゛":["BracketLeft",false],
            "゜":["BracketRight",false],
            "ぃ":["KeyE",true],
            "「":["BracketRight",true],
            //二列目
            "ち":["KeyA",false],
            "と":["KeyS",false],
            "し":["KeyD",false],
            "は":["KeyF",false],
            "き":["KeyG",false],
            "く":["KeyH",false],
            "ま":["KeyJ",false],
            "の":["KeyK",false],
            "り":["KeyL",false],
            "れ":["Semicolon",false],
            "け":["Quote",false],
            "む":["Backslash",false],
            "」":["Backslash",true],
            //三列目
            "つ":["KeyZ",false],
            "さ":["KeyX",false],
            "そ":["KeyC",false],
            "ひ":["KeyV",false],
            "こ":["KeyB",false],
            "み":["KeyN",false],
            "も":["KeyM",false],
            "ね":["Comma",false],
            "る":["Period",false],
            "め":["Slash",false],
            "ろ":["IntlRo",false],
            "っ":["KeyZ",true],
            "、":["Comma",true],
            "。":["Period",true],
            "・":["Slash",true],
            /*ここまでかな */
            "1":["Digit1",false],
            '2':["Digit2",false],
            "3":["Digit3",false],
            "4":["Digit4",false],
            "5":["Digit5",false],
            "6":["Digit6",false],
            "7":["Digit7",false],
            "8":["Digit8",false],
            "9":["Digit9",false],
            "0":["Digit0",false],
            "-":["Minus",false],
            "^":["Equal",false],
            "\\":["IntlYen",false],
            "!":["Digit1",true],
            '"':["Digit2",true],
            "#":["Digit3",true],
            "$":["Digit4",true],
            "%":["Digit5",true],
            "&":["Digit6",true],
            "'":["Digit7",true],
            "(":["Digit8",true],
            ")":["Digit9",true],
            "0":["Digit0",true],
            "=":["Minus",true],
            "~":["Equal",true],
            "|":["IntlYen",true],
            //一列目
            "q":["KeyQ",false],
            "w":["KeyW",false],
            "e":["KeyE",false],
            "r":["KeyR",false],
            "t":["KeyT",false],
            "y":["KeyY",false],
            "u":["KeyU",false],
            "i":["KeyI",false],
            "o":["KeyO",false],
            "p":["KeyP",false],
            "@":["BracketLeft",false],
            "[":["BracketRight",false],
            "Q":["KeyQ",true],
            "W":["KeyW",true],
            "E":["KeyE",true],
            "R":["KeyR",true],
            "T":["KeyT",true],
            "Y":["KeyY",true],
            "U":["KeyU",true],
            "I":["KeyI",true],
            "O":["KeyO",true],
            "P":["KeyP",true],
            "`":["BracketLeft",true],
            "{":["BracketRight",true],
            //二列目
            "a":["KeyA",false],
            "s":["KeyS",false],
            "d":["KeyD",false],
            "f":["KeyF",false],
            "g":["KeyG",false],
            "h":["KeyH",false],
            "j":["KeyJ",false],
            "k":["KeyK",false],
            "l":["KeyL",false],
            ";":["Semicolon",false],
            ":":["Quote",false],
            "]":["Backslash",false],
            "A":["KeyA",true],
            "S":["KeyS",true],
            "D":["KeyD",true],
            "F":["KeyF",true],
            "G":["KeyG",true],
            "H":["KeyH",true],
            "J":["KeyJ",true],
            "K":["KeyK",true],
            "L":["KeyL",true],
            "+":["Semicolon",true],
            "*":["Quote",true],
            "}":["Backslash",true],
            //三列目
            "z":["KeyZ",false],
            "x":["KeyX",false],
            "c":["KeyC",false],
            "v":["KeyV",false],
            "b":["KeyB",false],
            "n":["KeyN",false],
            "m":["KeyM",false],
            ",":["Comma",false],
            ".":["Period",false],
            "/":["Slash",false],
            "\\":["IntlRo",false],
            "Z":["KeyZ",true],
            "X":["KeyX",true],
            "C":["KeyC",true],
            "V":["KeyV",true],
            "B":["KeyB",true],
            "N":["KeyN",true],
            "M":["KeyM",true],
            "<":["Comma",true],
            ">":["Period",true],
            "?":["Slash",true],
            "_":["IntlRo",true],
        }
    }

    build(text){
        this.typedCharacters = [];
        const char = [...text]
        let ary = [];
        char.forEach((c)=>{
            if(this.kanaCharacters.includes(c)){
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
        this.Allromaconvart();
    }

    Allromaconvart(){
        let AllromaAry = [];
        this.ary.forEach((c)=>{
            if(Object.keys(this.kanaconvartList).includes(c)){
                AllromaAry.push(this.kanaconvartList[c]);
            }else{
                AllromaAry.push(c)
            }
        })
        this.AllromaAry = AllromaAry;
    }

    nextkey(){
        return this.AllromaAry[0];
    }

    correct(){
        this.typedCharacters.push(this.ary[0])
        this.AllromaAry.shift();
        this.ary.shift();
    }

    seq_candidates(){
        return this.ary.join("");
    }

    seq_done(){
        return this.typedCharacters.join("");
    }

    is_finished(){
        if(this.AllromaAry.length){
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




