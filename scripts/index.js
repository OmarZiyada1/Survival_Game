import { GameScene } from './gameScene.js'
import { HomeScene } from './homeScene.js';
import { LoadScene } from './loadScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
		arcade: {
			gravity: { y: 200 },
            //debug: true
		}
    },
    scale: {
        mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [LoadScene, HomeScene, GameScene]
};

const game = new Phaser.Game(config);
