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
    ctx.drawImage(game.image.bird, 500, 320);
    ctx.drawImage(game.image.cactus, 300, 320);
    ctx.drawImage(game.image.dino, 100, 320);
}