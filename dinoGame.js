const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageNames = ['bird', 'cactus', 'dino'];

// グローバルな game オブジェクト
const game = {
    counter: 0,
    enemys: [],
    image: {},
    isGameOver: true,
    score: 0,
    timer: null
};

// 複数画像読み込み
let imageLoadCounter = 0;
for (const imageName of imageNames) {
    const imagePath = `image/${imageName}.png`;
    game.image[imageName] = new Image();
    game.image[imageName].src = imagePath;
    game.image[imageName].onload = () => {
        imageLoadCounter += 1;
        if (imageLoadCounter === imageNames.length) {
            console.log('画像のロードが完了しました。');
            init();
        }
    }
}

function init() {
    game.counter    = 0;
    game.enemys     = [];
    game.isGameOver = false;
    game.score      = 0;
    createDino();
    game.timer = setInterval(ticker, 30);
}

function ticker() {
    // 画面クリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 敵キャラクターの生成
    if(Math.floor(Math.random() * 100) === 0) {
        createCactus();
    }
    if(Math.floor(Math.random() * 200) === 0) {
        createBird();
    }

    // キャクター移動
    movedino(); // 恐竜の移動
    moveEnemys(); // 敵キャラクターの移動

    //描画
    drawdino();// 恐竜の描画
    drawEnemys(); // 敵キャラクターの描画

    // TODO あたり判定

    // カウンターの更新
    game.counter = (game.counter + 1) % 1000000;
}

function createDino() {
    game.dino = {
        x: game.image.dino.width / 2,
        y: canvas.height - game.image.dino.height / 2,
        moveY: 0,
        width: game.image.dino.width,
        height: game.image.dino.height,
        image: game.image.dino
    }
}

function createCactus() {
    game.enemys.push({
        x: canvas.width + game.image.cactus.width / 2,
        y: canvas.height - game.image.cactus.height / 2,
        width: game.image.cactus.width,
        height: game.image.cactus.height,
        moveX: -10,
        image: game.image.cactus
    });
}

function createBird() {
    const birdY = Math.random() * (300 - game.image.bird.height) + 150;
    game.enemys.push({
        x: canvas.width + game.image.bird.width / 2,
        y: birdY,
        width: game.image.bird.width,
        height: game.image.bird.height,
        moveX: -15,
        image: game.image.bird
    });
}

function movedino() {
    game.dino.y += game.dino.moveY;
    if (game.dino.y >= canvas.height - game.dino.height / 2) {
        game.dino.y = canvas.height - game.dino.height / 2;
        game.dino.moveY = 0;
    } else {
        game.dino.moveY += 3;
    }
}

function moveEnemys() {
    for (const enemy of game.enemys) {
        enemy.x += enemy.moveX;
    }
}

function drawdino() {
    ctx.drawImage(game.image.dino, game.dino.x - game.dino.width / 2, game.dino.y - game.dino.height / 2);
}

function drawEnemys() {
    for (const enemy of game.enemys) {
        ctx.drawImage(enemy.image, enemy.x - enemy.width / 2, enemy.y - enemy.height / 2);
    }
}

document.onkeydown = function(e) {
    if(e.key === ' ' && game.dino.moveY === 0) {
        game.dino.moveY = -41;
    }
};