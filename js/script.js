// 280母音
const vowels280 = ["images/280/vowels/45.png", "images/280/vowels/46.png", "images/280/vowels/47.png", "images/280/vowels/48.png", "images/280/vowels/49.png", "images/280/vowels/50.png", "images/280/vowels/62.png", "images/280/vowels/63.png", "images/280/vowels/64.png", "images/280/vowels/4647.png"];
// 豬豬家族
const consonantsPartOne = ["images/280/consonants/dr-3260.png", "images/280/consonants/tr-3360.png", "images/280/consonants/br-13560.png", "images/280/consonants/pr-23560.png"];
// 樂樂家族
const consonantsPartTwo = ["images/280/consonants/bl-119.png", "images/280/consonants/pl-219.png", "images/280/consonants/kl-2219.png", "images/280/consonants/sl-3819.png"];
// 思思家族
const consonantsPartThree = ["images/280/consonants/sm-383.png", "images/280/consonants/sn-3812.png", "images/280/consonants/sp-381.png", "images/280/consonants/st-3814.png", "images/280/consonants/sk-3821.png", "images/280/consonants/str-383260.png"];

// 8800母音
const vowels8800 = ["images/8800/vowels/a.png", "images/8800/vowels/e.png", "images/8800/vowels/i.png", "images/8800/vowels/o.png", "images/8800/vowels/u.png", "images/8800/vowels/a_e.png", "images/8800/vowels/e_e.png", "images/8800/vowels/i_e.png", "images/8800/vowels/o_e.png", "images/8800/vowels/u_e.png", "images/8800/vowels/ar.png", "images/8800/vowels/er.png", "images/8800/vowels/or.png", "images/8800/vowels/oo.png", "images/8800/vowels/ou.png", "images/8800/vowels/oi.png", "images/8800/vowels/air.png", "images/8800/vowels/ear.png"];
// 8800頭子音
const beginningConsonants8800 = ["images/8800/consonants/beginning/b.png", "images/8800/consonants/beginning/p.png", "images/8800/consonants/beginning/m.png", "images/8800/consonants/beginning/f.png", "images/8800/consonants/beginning/d.png", "images/8800/consonants/beginning/t.png", "images/8800/consonants/beginning/n.png", "images/8800/consonants/beginning/l.png", "images/8800/consonants/beginning/g.png", "images/8800/consonants/beginning/k.png", "images/8800/consonants/beginning/h.png", "images/8800/consonants/beginning/dr.png", "images/8800/consonants/beginning/tr.png", "images/8800/consonants/beginning/r.png", "images/8800/consonants/beginning/s.png", "images/8800/consonants/beginning/sk.png", "images/8800/consonants/beginning/sp.png", "images/8800/consonants/beginning/st.png", "images/8800/consonants/beginning/str.png", "images/8800/consonants/beginning/th.png"];

// 8800認證.2024
const cert8800TwentyTwentyFour = ["images/8800/cert/2024/01-ou.png", "images/8800/cert/2024/02-trai.png", "images/8800/cert/2024/03-he.png", "images/8800/cert/2024/04-ra.png", "images/8800/cert/2024/05-li.png", "images/8800/cert/2024/06-do.png", "images/8800/cert/2024/07-strar.png", "images/8800/cert/2024/08-cler.png", "images/8800/cert/2024/09-thee.png", "images/8800/cert/2024/10-sto.png",];

let consonants = [];
let vowels = [];

let currentIndex = 0;
let shuffledCards = [];

let consonantImg = document.getElementById("consonant");
let vowelImg = document.getElementById("vowel");
let examImg = document.getElementById("exam");

let startButton = document.getElementById('start');
let counter = document.getElementById('counter');
let suah = document.getElementById('suah'); // ‧ㄙㄨㄚ
let descText = document.getElementById('descText'); // 一般說明文字

let keySpaceHint = document.getElementById('keySpaceHint');
let audioPlayer = document.getElementById('audioPlayer');

let sounds280 = document.getElementById('sounds280');
let cert8800 = document.getElementById('cert8800');
let sounds8800 = document.getElementById('sounds8800');

keySpaceHint.style.display = 'none';

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
    // 確認 bricks JSON 已載入
    if (bricks.length === 0) {
        console.error('Bricks data is not loaded yet.');
        return;
    }

    if (sounds8800 || cert8800) {
        // 顯示「+20個尾子音」文字
        descText.style.display = 'block';
    }

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
            if (((sounds280 || sounds8800) && (card.consonant === brick.consonantBrick && card.vowel === brick.vowelBrick)) || (cert8800 && (card === brick.examBrick))) {

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
        counter.textContent = currentIndex;

    } else {
        // 當牌組跑完就暫停播放音檔並隱藏播放器
        audioPlayer.pause();
        audioPlayer.style.display = 'none';

        if (sounds8800 || cert8800) {
            descText.style.display = 'none';
        }

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

// 重新開始
function restart() {
    initializeShuffle();
}