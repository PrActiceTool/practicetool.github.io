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
    // 思思家族
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
        consonantImg.src = card.consonant;
        vowelImg.src = card.vowel;

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                // 網頁不可見時，暫停播放
                audioPlayer.pause();
            }
        });

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
            /**
             * 8800-b
             */
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/b.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/03CVC_B/03CVC_BAIR.mp3",
            },
            /**
             * 8800-p
             */
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_POR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_POO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_POU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_POI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/p.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/04CVC_P/04CVC_PAIR.mp3",
            },
            /**
             * 8800-m
             */
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_ME.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_ME_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/m.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/05CVC_M/05CVC_MAIR.mp3",
            },
            /**
             * 8800-f
             */
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/f.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/06CVC_F/06CVC_FAIR.mp3",
            },
            /**
             * 8800-d
             */
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/d.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/07CVC_D/07CVC_DAIR.mp3",
            },
            /**
             * 8800-t
             */
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/t.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/08CVC_T/08CVC_TAIR.mp3",
            },
            /**
             * 8800-n
             */
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/n.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/09CVC_N/09CVC_NAIR.mp3",
            },
            /**
             * 8800-l
             */
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/l.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/10CVC_L/10CVC_LAIR.mp3",
            },
            /**
             * 8800-g
             */
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/g.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/11CVC_G/11CVC_GAIR.mp3",
            },
            /**
             * 8800-k
             */
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/k.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/12CVC_K/12CVC_KAIR.mp3",
            },
            /**
             * 8800-h
             */
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/h.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/13CVC_H/13CVC_HAIR.mp3",
            },
            /**
             * 8800-dr
             */
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DROR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DROO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DROU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DROI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/dr.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/14CVC_DR/14CVC_DRAIR.mp3",
            },
            /**
             * 8800-tr
             */
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TROR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TROO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TROU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TROI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/tr.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/15CVC_TR/15CVC_TRAIR.mp3",
            },
            /**
             * 8800-r
             */
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_ROR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_ROO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_ROU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_ROI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/r.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/16CVC_R/16CVC_RAIR.mp3",
            },
            /**
             * 8800-s
             */
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/s.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/17CVC_S/17CVC_SAIR.mp3",
            },
            /**
             * 8800-sk
             */
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sk.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/18CVC_SK/18CVC_SKAIR.mp3",
            },
            /**
             * 8800-sp
             */
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/sp.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/19CVC_SP/19CVC_SPAIR.mp3",
            },
            /**
             * 8800-st
             */
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/st.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/20CVC_ST/20CVC_STAIR.mp3",
            },
            /**
             * 8800-str
             */
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STROR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STROO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STROU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STROI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/str.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/21CVC_STR/21CVC_STRAIR.mp3",
            },
            /**
             * 8800-th
             */
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/a.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THA.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/e.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THE.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/i.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/o.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/u.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/a_e.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THA_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/e_e.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THE_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/i_e.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THI_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/o_e.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THO_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/u_e.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THU_E.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/ar.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THAR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/er.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THER.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/or.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THOR.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/oo.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THOO.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/ou.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THOU.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/oi.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THOI.mp3",
            },
            {
                consonantBrick: "images/8800/consonants/beginning/th.png",
                vowelBrick: "images/8800/vowels/air.png",
                audioSrc: "audios/8800/22CVC_TH/22CVC_THAIR.mp3",
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
            audioPlayer.pause();
            audioPlayer.style.display = 'none';
        }

        currentIndex++;
        counter.textContent = currentIndex;

    } else {
        audioPlayer.pause();
        audioPlayer.style.display = 'none';

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