import { getHeight, getWidth, getCenterX, getCenterY } from "./utils.js";

export class HomeScene extends Phaser.Scene
{

	constructor()
	{
		super('HomeScene');

	}

    init(){

    }

    create(){
        // this.road = this.add.image(getCenterX(this),  getCenterY(this), "road");
        // this.road.setScale(.6, .4);

        this.road = this.add.tileSprite(0, 0, getWidth(this), getHeight(this), "road").setOrigin(0, 0);

        this.menuCotainer = this.add.container(getCenterX(this), 1100);

        let title = this.add.text(0, 0, `Omar Survival Game`, {
            fontFamily: "font",
            fontSize: "40px",
            stroke: '#107AFF',
			strokeThickness: 5,
			shadow: { fill: true, blur: 0, stroke: false, offsetX: 1, offsetY: 1, color: '#000'}
        }).setOrigin(0.5, 0.5).setDepth(20);

        let playBtn = this.add.image(0, 120, "button-play").setScale(.8).setInteractive();
        
        this.menuCotainer.add([title, playBtn]);

        playBtn.on("pointerdown", ()=>{
            this.scene.start("GameScene");
        })

        this.tweens.add({
            targets: this.menuCotainer,
            y: 200,
            duration: 1000,
            ease:  "Quintic.Out"
        })
    }

    update(){

    }
}