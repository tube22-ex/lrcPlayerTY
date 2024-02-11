const kashiA = document.getElementById('kashiA');
const yomiA = document.getElementById('yomiA');
const yomiB = document.getElementById('yomiB');
const romaA = document.getElementById('romaA');
const romaB = document.getElementById('romaB');
const nextA = document.getElementById('nextA');
//歌詞

const status_miss = document.getElementById('status_miss')
const status_types = document.getElementById('status_types')
const status_score = document.getElementById('status_score');
const status_clearLines = document.getElementById('status_clearLines')
const status_lost = document.getElementById('status_lost');
const status_kps = document.getElementById('status_kps');
const status_acc = document.getElementById('status_acc');
const status_lines = document.getElementById('status_lines');
//ステータス

const progressBar = document.getElementById('progressBar');
const progressBar1 = document.getElementById('progressBar1');
//プログレスバー

const missSoundRange = document.getElementById('missSoundRange');
const videoSoundRange = document.getElementById('videoSoundRange');
const typeSoundRange = document.getElementById('typeSoundRange');
const clearSoundRange = document.getElementById('clearSoundRange');
//input-range
const ChartContents = document.getElementById('ChartContents');
const TotalCount = document.getElementById('TotalCount');
const ContentArea = document.getElementById('ContentArea');
const lrcArea = document.getElementById('lrcArea');
const kashi = document.getElementById('kashi');
const yomi = document.getElementById('yomi');
const url = document.getElementById('url');
//その他DOM

const myWorker = new Worker('js\\worker.js');
const myWorker1 = new Worker('js\\worker1.js');
//worker

let missVolume = 0.15;
let clearVolume = 0.15;
let typeVolume = 0.15;
let videoVolume = 15;
//volume

let played_chartID = 0;
//プレイ中の譜面ID

sound.init();
clear_sound.init();
miss_sound.init();
//効果音

keygraph.build('');
//一旦空でビルド

let Score_per_char = 0;
let Score_per_char_kana = 0;
//roma,kana一文字あたりのスコア

let kanaLen = 0;
//かなのスコア計算変数　一旦ビルド後に入れる変数

const shortcutList = [
    "Space",
    "F4",
    "F10"
]
//入力にショートカットが含まれているか判定用リスト
let videoSpeedAry = [
    0.25,
    0.50,
    0.75,
    1.00,
    1.25,
    1.50,
    1.75,
    2.00
]
//倍速用リスト