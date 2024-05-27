// 140子音
const consonants140 = ["images/consonants/beginning/b.png", "images/consonants/beginning/p.png", "images/consonants/beginning/m.png", "images/consonants/beginning/f.png", "images/consonants/beginning/d.png", "images/consonants/beginning/t.png", "images/consonants/beginning/n.png", "images/consonants/beginning/l.png", "images/consonants/beginning/g.png", "images/consonants/beginning/k.png", "images/consonants/beginning/h.png", "images/consonants/beginning/s.png", "images/consonants/beginning/th.png", "images/consonants/beginning/th_z.png", "images/consonants/beginning/r.png",];
// 140母音
const vowels140 = ["images/vowels/e.png", "images/vowels/a_e.png", "images/vowels/a.png", "images/vowels/ou.png", "images/vowels/i.png", "images/vowels/oo.png", "images/vowels/o_e.png", "images/vowels/o.png", "images/vowels/er.png", "images/vowels/ar.png",];
// 280母音
const vowels280 = ["images/280/vowels/45.png", "images/280/vowels/46.png", "images/280/vowels/47.png", "images/280/vowels/48.png", "images/280/vowels/49.png", "images/280/vowels/50.png", "images/280/vowels/62.png", "images/280/vowels/63.png", "images/280/vowels/64.png", "images/280/vowels/4647.png"];
// 豬豬家族
const consonantsPartOne = ["images/280/consonants/dr-3260.png", "images/280/consonants/tr-3360.png", "images/280/consonants/br-13560.png", "images/280/consonants/pr-23560.png"];
// 樂樂家族
const consonantsPartTwo = ["images/280/consonants/bl-119.png", "images/280/consonants/pl-219.png", "images/280/consonants/kl-2219.png", "images/280/consonants/sl-3819.png"];
// 思思家族
const consonantsPartThree = ["images/280/consonants/sm-383.png", "images/280/consonants/sn-3812.png", "images/280/consonants/sp-381.png", "images/280/consonants/st-3814.png", "images/280/consonants/sk-3821.png", "images/280/consonants/str-383260.png"];

// 8800母音
const vowels8800 = ["images/vowels/a.png", "images/vowels/e.png", "images/vowels/i.png", "images/vowels/o.png", "images/vowels/u.png", "images/vowels/a_e.png", "images/vowels/e_e.png", "images/vowels/i_e.png", "images/vowels/o_e.png", "images/vowels/u_e.png", "images/vowels/ar.png", "images/vowels/er.png", "images/vowels/or.png", "images/vowels/oo.png", "images/vowels/ou.png", "images/vowels/oi.png", "images/vowels/air.png", "images/vowels/ear.png"];
// 8800頭子音
const beginningConsonants8800 = ["images/consonants/beginning/b.png", "images/consonants/beginning/p.png", "images/consonants/beginning/m.png", "images/consonants/beginning/f.png", "images/consonants/beginning/d.png", "images/consonants/beginning/t.png", "images/consonants/beginning/n.png", "images/consonants/beginning/l.png", "images/consonants/beginning/g.png", "images/consonants/beginning/k.png", "images/consonants/beginning/h.png", "images/consonants/beginning/dr.png", "images/consonants/beginning/tr.png", "images/consonants/beginning/r.png", "images/consonants/beginning/s.png", "images/consonants/beginning/sk.png", "images/consonants/beginning/sp.png", "images/consonants/beginning/st.png", "images/consonants/beginning/str.png", "images/consonants/beginning/th.png"];

// 8800認證.2024
const cert8800TwentyTwentyFour = ["images/cert/2024/8800/01-ou.png", "images/cert/2024/8800/02-trai.png", "images/cert/2024/8800/03-he.png", "images/cert/2024/8800/04-ra.png", "images/cert/2024/8800/05-li.png", "images/cert/2024/8800/06-do.png", "images/cert/2024/8800/07-strar.png", "images/cert/2024/8800/08-cler.png", "images/cert/2024/8800/09-thee.png", "images/cert/2024/8800/10-sto.png",];

let consonants = [];
let vowels = [];

let currentIndex = 0;
let shuffledCards = [];

let consonantImg = document.getElementById("consonant");
let vowelImg = document.getElementById("vowel");
let examImg = document.getElementById("exam");

let startButton = document.getElementById('start');
let counter = document.getElementById('counter');
let counterStart = document.getElementById('counterStart');
let totalCounter = document.getElementById('totalCounter');
let suah = document.getElementById('suah'); // ‧ㄙㄨㄚ
let descText = document.getElementById('descText'); // 一般說明文字

let keySpaceHint = document.getElementById('keySpaceHint');
let audioPlayer = document.getElementById('audioPlayer');

let sounds280 = document.getElementById('sounds280');
let cert8800 = document.getElementById('cert8800');
let sounds8800 = document.getElementById('sounds8800');
let sounds140 = document.getElementById('sounds140');


// 積木組合與對應音檔
let bricks = [];
fetch('bricks.json')
    .then(response => response.json())
    .then(data => {
        bricks = data;
    })
    .catch(error => console.error('Error loading bricks:', error));

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

// 當Modal關閉時停止影片播放
let modals = document.querySelectorAll('.modal');
modals.forEach(function (modal) {
    modal.addEventListener('hidden.bs.modal', function () {
        let iframe = modal.querySelector('#youtubeIframe');
        let iframeSrc = iframe.src;
        iframe.src = iframeSrc; // 重新設置iframe的src，以停止影片播放
    });
});

// 初始化（預載圖片及洗牌）
function initializeShuffle() {

    // 清牌
    if (cert8800) {
        examImg.src = "";
    } else {
        consonantImg.src = "";
        vowelImg.src = "";
    }

    audioPlayer.style.display = 'none';
    suah.style.display = 'none';
    counter.style.display = 'none';
    keySpaceHint.style.display = 'none';

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

    if (sounds140) {
        vowels = vowels140;
        consonants = consonants140;
    }

    // 豬豬家族
    if (document.getElementById('partOne')) {
        consonants = consonantsPartOne;
    }
    // 樂樂家族
    if (document.getElementById('partTwo')) {
        consonants = consonantsPartTwo;
    }
    // 思思家族
    if (document.getElementById('partThree')) {
        consonants = consonantsPartThree;
    }
    // 280攻頂
    if (document.getElementById('all')) {
        consonants = consonants.concat(consonantsPartOne, consonantsPartTwo, consonantsPartThree);
    }
    // 8800
    if (sounds8800) {
        consonants = beginningConsonants8800;
        vowels = vowels8800;
    }
    // 8800認證.2024
    if (cert8800) {
        vowels = [];
        shuffledCards = cert8800TwentyTwentyFour;
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
    counterStart.textContent = currentIndex;
    totalCounter.textContent = shuffledCards.length;
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
    // 確認 bricks JSON 已載入
    if (bricks.length === 0) {
        console.error('Bricks data is not loaded yet.');
        return;
    }

    if (sounds8800 || cert8800) {
        // 顯示「+20個尾子音」文字
        descText.style.display = 'block';
    }

    counter.style.display = 'block';
    startButton.textContent = '下一個';


    let currentWidth = window.innerWidth;
    let mediumDevices = 768;
    // 螢幕寬度大於768時才顯示空白鍵提示
    if (currentWidth >= mediumDevices) {
        keySpaceHint.style.display = 'block';
    }


    if (currentIndex < shuffledCards.length) {
        const card = shuffledCards[currentIndex];

        if (cert8800) {
            examImg.src = card;
        } else {
            consonantImg.src = card.consonant;
            vowelImg.src = card.vowel;
        }


        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                // 網頁不可見時，暫停播放
                audioPlayer.pause();
            }
        });

        // 確認音檔及組合
        for (const brick of bricks) {
            if (((sounds280 || sounds8800) && (card.consonant === brick.consonantBrick && card.vowel === brick.vowelBrick)) || (cert8800 && (card === brick.examBrick)) || (sounds140 && (card.consonant === brick.consonantBrick140 && card.vowel === brick.vowelBrick140))) {

                // 確認音檔存在
                if (brick.audioSrc) {
                    audioPlayer.src = brick.audioSrc;
                    audioPlayer.style.display = 'block';
                }
                break;
            }

            // 若音檔不存在，隱藏播放器並停止播放
            audioPlayer.pause();
            audioPlayer.style.display = 'none';
        }

        currentIndex++;
        counterStart.textContent = currentIndex;

    } else {
        // 當牌組跑完就暫停播放音檔並隱藏播放器
        audioPlayer.pause();
        audioPlayer.style.display = 'none';

        if (sounds8800 || cert8800) {
            descText.style.display = 'none';
        }

        suah.style.display = 'block';
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

// 重新開始
function restart() {
    initializeShuffle();
}