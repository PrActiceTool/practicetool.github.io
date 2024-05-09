// 280母音
const vowels280 = ["images/280/vowels/45.png", "images/280/vowels/46.png", "images/280/vowels/47.png", "images/280/vowels/48.png", "images/280/vowels/49.png", "images/280/vowels/50.png", "images/280/vowels/62.png", "images/280/vowels/63.png", "images/280/vowels/64.png", "images/280/vowels/4647.png"];
// 豬豬家族
const consonantsPartOne = ["images/280/consonants/dr-3260.png", "images/280/consonants/tr-3360.png", "images/280/consonants/br-13560.png", "images/280/consonants/pr-23560.png"];
// 樂樂家族
const consonantsPartTwo = ["images/280/consonants/bl-119.png", "images/280/consonants/pl-219.png", "images/280/consonants/kl-2219.png", "images/280/consonants/sl-3819.png"];
// 思思家族
const consonantsPartThree = ["images/280/consonants/sm-383.png", "images/280/consonants/sn-3812.png", "images/280/consonants/sp-381.png", "images/280/consonants/st-3814.png", "images/280/consonants/sk-3821.png", "images/280/consonants/str-383260.png"];

// 8800母音
const vowels8800 = ["images/8800/vowels/44.png", "images/8800/vowels/45.png", "images/8800/vowels/46.png", "images/8800/vowels/47.png", "images/8800/vowels/48.png", "images/8800/vowels/49.png", "images/8800/vowels/50.png", "images/8800/vowels/51.png", "images/8800/vowels/62.png", "images/8800/vowels/63.png", "images/8800/vowels/64.png", "images/8800/vowels/66.png", "images/8800/vowels/4347.png", "images/8800/vowels/4359.png", "images/8800/vowels/4547.png", "images/8800/vowels/4647.png", "images/8800/vowels/5960.png"];
// 8800頭子音
const beginningConsonants8800 = ["images/8800/consonants/beginning/01.png", "images/8800/consonants/beginning/02.png", "images/8800/consonants/beginning/03.png", "images/8800/consonants/beginning/04.png", "images/8800/consonants/beginning/12.png", "images/8800/consonants/beginning/14.png", "images/8800/consonants/beginning/15.png", "images/8800/consonants/beginning/19.png", "images/8800/consonants/beginning/21.png", "images/8800/consonants/beginning/22.png", "images/8800/consonants/beginning/23.png", "images/8800/consonants/beginning/38.png", "images/8800/consonants/beginning/40.png", "images/8800/consonants/beginning/3260.png", "images/8800/consonants/beginning/3360.png", "images/8800/consonants/beginning/3560.png", "images/8800/consonants/beginning/3801.png", "images/8800/consonants/beginning/3814.png", "images/8800/consonants/beginning/3821.png", "images/8800/consonants/beginning/383260.png"];

let consonants = [];
let vowels = [];

let currentIndex = 0;
let shuffledCards = [];
let consonantImg = document.getElementById("consonant");
let vowelImg = document.getElementById("vowel");
let startButton = document.getElementById('start');
let counter = document.getElementById('counter');
let suah = document.getElementById('suah'); // ‧ㄙㄨㄚ
let descText = document.getElementById('descText'); // 一般說明文字
let keySpaceHint = document.getElementById('keySpaceHint');
let audioPlayer = document.getElementById('audioPlayer');

keySpaceHint.style.display = 'none';

// 空白鍵監聽器
function handleKeyPress(event) {
    if (currentIndex != 0 && currentIndex <= shuffledCards.length) {
        if (event.code === "Space") {
            // 防止預設的空白鍵行為（例如捲動頁面）
            event.preventDefault();
            startButton.click();
        }
    }
}

// Fisher-Yates 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 初始化（預載圖片及洗牌）
function initializeShuffle() {
    // 清牌
    consonantImg.src = "";
    vowelImg.src = "";

    audioPlayer.style.display = 'none';
    suah.style.display = 'none';
    counter.style.display = 'block';

    startButton.removeAttribute('data-bs-toggle', 'modal');
    startButton.removeAttribute('data-bs-target', '#staticBackdrop');

    startButton.classList.remove('btn-success');
    startButton.classList.add('btn-danger');
    startButton.textContent = '點我開始';
    // 啟用空白鍵監聽
    document.addEventListener('keydown', handleKeyPress);

    shuffledCards = [];
    consonants = [];
    vowels = vowels280;

    // 豬豬家族
    if (document.getElementById('partOne')) {
        consonants = consonantsPartOne;
    }
    // 樂樂家族
    if (document.getElementById('partTwo')) {
        consonants = consonantsPartTwo;
    }
    // 樂樂家族
    if (document.getElementById('partThree')) {
        consonants = consonantsPartThree;
    }
    // 280攻頂
    if (document.getElementById('all')) {
        consonants = consonants.concat(consonantsPartOne, consonantsPartTwo, consonantsPartThree);
    }
    // 8800
    if (document.getElementById('sounds8800')) {
        consonants = beginningConsonants8800;
        vowels = vowels8800;
    }

    shuffleArray(consonants);
    shuffleArray(vowels);

    for (let i = 0; i < consonants.length; i++) {
        for (let j = 0; j < vowels.length; j++) {
            shuffledCards.push({
                consonant: consonants[i],
                vowel: vowels[j]
            });
        }
    }

    shuffleArray(shuffledCards);

    currentIndex = 0;
    counter.textContent = currentIndex;

}

initializeShuffle();

// 豬豬家族
document.getElementById('pills-part-one').onclick = () => {
    let tabPane = document.querySelector('.tab-pane');
    if (tabPane) {
        tabPane.id = 'partOne';
        document.body.style.backgroundColor = "rgb(255 245 244)";
        document.getElementById('partOne').classList.add('active');
        document.getElementById('hint').style.display = 'none';
        initializeShuffle();
    }
}

// 樂樂家族
function addIdtoTabPaneTwo() {
    let tabPane = document.querySelector('.tab-pane');
    if (tabPane) {
        tabPane.id = 'partTwo';
        document.body.style.backgroundColor = "rgb(235 247 255)";
        document.getElementById('partTwo').classList.add('active');
        document.getElementById('hint').style.display = 'none';
        initializeShuffle();
    }
}

// 思思家族
function addIdtoTabPaneThree() {
    let tabPane = document.querySelector('.tab-pane');
    if (tabPane) {
        tabPane.id = 'partThree';
        document.body.style.backgroundColor = "rgb(243 255 245)";
        document.getElementById('partThree').classList.add('active');
        document.getElementById('hint').style.display = 'none';
        initializeShuffle();
    }
}

// 280攻頂
function addIdtoTabPaneAll() {
    let tabPane = document.querySelector('.tab-pane');
    if (tabPane) {
        tabPane.id = 'all';
        document.body.style.backgroundColor = "rgb(255 253 241)";
        document.getElementById('all').classList.add('active');
        document.getElementById('hint').style.display = 'none';
        initializeShuffle();
    }
}

// 隨機音素組合
function showRandomCard() {
    if (document.getElementById('sounds8800')) {
        descText.style.display = 'inline-block';
    }

    startButton.textContent = '下一個';


    let currentWidth = window.innerWidth;
    let mediumDevices = 768;
    let smallDevices = 576;
    // 螢幕寬度大於768時才顯示空白鍵提示
    if (currentWidth >= mediumDevices) {
        keySpaceHint.style.display = 'block';
    }
    // 螢幕小於576時將「+20個尾子音」換行
    if (document.getElementById('sounds8800') && currentWidth <= smallDevices) {
        descText.style.display = 'block';
    }


    if (currentIndex < shuffledCards.length) {
        const card = shuffledCards[currentIndex];
        consonantImg.src = card.consonant;
        vowelImg.src = card.vowel;

        audioPlayer.pause();
        audioPlayer.currentTime = 0;

        // 檢查組合並顯示對應音檔
        const bricks = [
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c3260v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c3260v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c3260v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c3260v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c3260v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c3260v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c3260v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c3260v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c3260v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/dr-3260.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c3260v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c3360v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c3360v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c3360v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c3360v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c3360v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c3360v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c3360v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c3360v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c3360v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/tr-3360.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c3360v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c13560v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c13560v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c13560v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c13560v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c13560v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c13560v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c13560v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c13560v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c13560v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/br-13560.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c13560v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c23560v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c23560v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c23560v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c23560v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c23560v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c23560v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c23560v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c23560v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c23560v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pr-23560.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c23560v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c119v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c119v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c119v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c119v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c119v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c119v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c119v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c119v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c119v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/bl-119.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c119v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c219v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c219v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c219v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c219v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c219v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c219v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c219v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c219v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c219v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/pl-219.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c219v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c2219v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c2219v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c2219v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c2219v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c2219v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c2219v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c2219v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c2219v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c2219v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/kl-2219.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c2219v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c3819v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c3819v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c3819v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c3819v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c3819v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c3819v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c3819v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c3819v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c3819v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sl-3819.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c3819v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c383v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c383v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c383v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c383v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c383v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c383v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c383v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c383v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c383v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sm-383.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c383v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c3812v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c3812v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c3812v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c3812v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c3812v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c3812v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c3812v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c3812v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c3812v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sn-3812.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c3812v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c381v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c381v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c381v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c381v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c381v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c381v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c381v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c381v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c381v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sp-381.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c381v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c3814v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c3814v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c3814v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c3814v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c3814v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c3814v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c3814v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c3814v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c3814v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/st-3814.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c3814v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c3821v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c3821v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c3821v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c3821v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c3821v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c3821v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c3821v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c3821v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c3821v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/sk-3821.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c3821v4647.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/45.png",
                audioSrc: "audios/280/c383260v45.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/46.png",
                audioSrc: "audios/280/c383260v46.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/47.png",
                audioSrc: "audios/280/c383260v47.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/48.png",
                audioSrc: "audios/280/c383260v48.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/49.png",
                audioSrc: "audios/280/c383260v49.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/50.png",
                audioSrc: "audios/280/c383260v50.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/62.png",
                audioSrc: "audios/280/c383260v62.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/63.png",
                audioSrc: "audios/280/c383260v63.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/64.png",
                audioSrc: "audios/280/c383260v64.mp3",
            },
            {
                consonantBrick: "images/280/consonants/str-383260.png",
                vowelBrick: "images/280/vowels/4647.png",
                audioSrc: "audios/280/c383260v4647.mp3",
            },
            // 8800 ㄅ
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/49.png",
                audioSrc: "audios/8800/c01v49_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/45.png",
                audioSrc: "audios/8800/c01v45_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/62.png",
                audioSrc: "audios/8800/c01v62_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/46.png",
                audioSrc: "audios/8800/c01v46_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/44.png",
                audioSrc: "audios/8800/c01v44_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/48.png",
                audioSrc: "audios/8800/c01v48_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/66.png",
                audioSrc: "audios/8800/c01v66_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/51.png",
                audioSrc: "audios/8800/c01v51_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/64.png",
                audioSrc: "audios/8800/c01v64_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/5960.png",
                audioSrc: "audios/8800/c01v5960_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/4647.png",
                audioSrc: "audios/8800/c01v4647_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/47.png",
                audioSrc: "audios/8800/c01v47_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/4347.png",
                audioSrc: "audios/8800/c01v4347_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/63.png",
                audioSrc: "audios/8800/c01v63_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/50.png",
                audioSrc: "audios/8800/c01v50_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/4359.png",
                audioSrc: "audios/8800/c01v4359_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/01.png",
                vowelBrick: "images/8800/vowels/4547.png",
                audioSrc: "audios/8800/c01v4547_8800.mp3",
            },
            // 8800 ㄆ
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/49.png",
                audioSrc: "audios/8800/c02v49_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/45.png",
                audioSrc: "audios/8800/c02v45_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/62.png",
                audioSrc: "audios/8800/c02v62_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/46.png",
                audioSrc: "audios/8800/c02v46_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/44.png",
                audioSrc: "audios/8800/c02v44_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/48.png",
                audioSrc: "audios/8800/c02v48_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/66.png",
                audioSrc: "audios/8800/c02v66_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/51.png",
                audioSrc: "audios/8800/c02v51_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/64.png",
                audioSrc: "audios/8800/c02v64_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/5960.png",
                audioSrc: "audios/8800/c02v5960_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/4647.png",
                audioSrc: "audios/8800/c02v4647_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/47.png",
                audioSrc: "audios/8800/c02v47_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/4347.png",
                audioSrc: "audios/8800/c02v4347_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/63.png",
                audioSrc: "audios/8800/c02v63_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/50.png",
                audioSrc: "audios/8800/c02v50_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/4359.png",
                audioSrc: "audios/8800/c02v4359_8800.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/02.png",
                vowelBrick: "images/8800/vowels/4547.png",
                audioSrc: "audios/8800/c02v4547_8800.mp3",
            },
        ];

        for (const brick of bricks) {
            if (card.consonant === brick.consonantBrick && card.vowel === brick.vowelBrick) {

                // 確認音檔存在
                if (brick.audioSrc) {
                    audioPlayer.src = brick.audioSrc;
                    audioPlayer.style.display = 'block';
                }
                break;
            }

            audioPlayer.style.display = 'none';
        }

        currentIndex++;
        counter.textContent = currentIndex;

    } else {

        suah.style.display = 'block';
        counter.style.display = 'none';

        startButton.classList.remove('btn-danger');
        startButton.classList.add('btn-success');
        startButton.textContent = '點我完成';

        startButton.setAttribute('data-bs-toggle', 'modal');
        startButton.setAttribute('data-bs-target', '#staticBackdrop');

        // 彈出完成視窗時移除空白鍵監聽
        if (startButton.hasAttribute('data-bs-target')) {
            document.removeEventListener('keydown', handleKeyPress);
        }

    }
}

// 當Modal關閉時停止影片播放
let modals = document.querySelectorAll('.modal');
modals.forEach(function (modal) {
    modal.addEventListener('hidden.bs.modal', function () {
        let iframe = modal.querySelector('#youtubeIframe');
        let iframeSrc = iframe.src;
        iframe.src = iframeSrc; // 重新設置iframe的src，以停止影片播放
    });
});

// 重新開始
function restart() {
    initializeShuffle();
}