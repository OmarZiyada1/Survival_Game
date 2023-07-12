
export class LoadScene extends Phaser.Scene
{

	constructor()
	{
		super('LoadScene')
    }

    preload(){
        this.load.image("bullet", "./assets/sprites/bullet.png");
        this.load.image("car", "./assets/sprites/car.png");
        this.load.image("obstacle_0", "./assets/sprites/obstacle_hard.png");
        this.load.image("obstacle_1", "./assets/sprites/obstacle_to_shot_2.png");
        this.load.image("obstacle_2", "./assets/sprites/obstacle_to_shot.png");
        this.load.image("obstacle_3", "./assets/sprites/berigate.png");

        this.load.image("road", "./assets/sprites/road.png");
        this.load.image("roadEnd", "./assets/sprites/roadEnd.png");
        this.load.image("roadStart", "./assets/sprites/roadStart.png");
        this.load.spritesheet("explosion", "./assets/sprites/explosion.png", {frameWidth: 478, frameHeight: 382});
        this.load.audio("explose", "./assets/sound/explose.ogg");
        this.load.image("button-play", "./assets/sprites/button-play.png");
        this.load.image("panel-gameover", "./assets/sprites/panel-gameover.png");
        this.load.image("button-home", "./assets/sprites/button-home.png");
        this.load.image("button-restart", "./assets/sprites/button-restart.png");
        this.load.image("jumper", "./assets/sprites/jumper.png");
        this.load.image("fuel-icon", "./assets/sprites/fuel-icon.png");
        this.load.spritesheet("zoombie_1", "./assets/sprites/obstacle.png", {frameWidth: 100, frameHeight: 96.6});
        this.load.spritesheet("zoombie_2", "./assets/sprites/obstacle_1.png", {frameWidth: 100, frameHeight: 96.6});





        


    }



    create(){
        this.scene.start("HomeScene");
    }

}