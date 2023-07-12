import { Bullet } from "./prefabs/bullet.js";
import { CharecterObstacle } from "./prefabs/charecterObs.js";
import { Explosion } from "./prefabs/explosion.js";
import { Fuel } from "./prefabs/fuel.js";
import { Jumper } from "./prefabs/jumper.js";
import { Obstacle } from "./prefabs/obstacle.js";
import { getCenterX, getCenterY, getHeight, getWidth } from "./utils.js";


export class GameScene extends Phaser.Scene
{

	constructor()
	{
		super('GameScene');

	}

    init(){
        this.SPEED = 5;
        this.shootingDelay =  2;
        this.cursor = this.input.keyboard.createCursorKeys();
        this.obstacleGroup = this.add.group();
        this.jumperGroup = this.add.group();
        this.bulletGroup = this.add.group();
        this.fuelGroup = this.add.group();
        this.score = 0;
        this.bestScore = 0;
        this.isGameOver = false;
        this.obstacleSpwanDelay = 80;

        this.jumping = false;

        this.speedStayTime = 500;

        this.maxFuel = 1000;
        this.fuelAmount = this.maxFuel;

    }


	create()
	{

        this.anims.create({
            key: "charecterAnim_1",
            frames: this.anims.generateFrameNumbers("zoombie_1", {start: 0, end: 5}),
            repeat: -1,
            frameRate: 10
        })

        this.anims.create({
            key: "charecterAnim_2",
            frames: this.anims.generateFrameNumbers("zoombie_2", {start: 0, end: 5}),
            repeat: -1,
            frameRate: 10
        })

        this.road = this.add.tileSprite(0, 0, getWidth(this), getHeight(this), "road").setOrigin(0, 0);

        let fuelBg = this.add.rectangle(600, 30, 150, 20, 0xfc2403).setDepth(20).setOrigin(0, 0.5);
        this.fuelBar = this.add.rectangle(600, 30, 150, 20, 0x21ad02).setDepth(21).setOrigin(0, 0.5);
        let fuel_icon = this.add.image(585, 30, "fuel-icon").setDepth(20).setScale(0.25);

        
        this.scoreText = this.add.text(50, 30, `Score:${this.score}`, {
            fontFamily: "font",
            fontSize: "20px",
            stroke: '#107AFF',
			strokeThickness: 5,
			shadow: { fill: true, blur: 0, stroke: false, offsetX: 1, offsetY: 1, color: '#000'}
        }).setOrigin(0, 0.5).setDepth(12);

        this.speedUpText = this.add.text(this.sys.canvas.width / 2, 380, `SPEED UP`, {
            fontSize: "25px",
            fontFamily: "font"
        }).setDepth(30).setOrigin(0.5).setScale(0);
        this.speedUpText.visible = false;


         if(localStorage.getItem("best_score")){
            this.bestScore = parseInt(localStorage.getItem("best_score"));
        }else{
            localStorage.setItem("best_score", ""+0);
        } 

        this.bestScoreText = this.add.text(50, 60, `Best:${this.bestScore}`, {
            fontFamily: "font",
            fontSize: "20px",
            stroke: '#107AFF',
			strokeThickness: 5,
			shadow: { fill: true, blur: 0, stroke: false, offsetX: 1, offsetY: 1, color: '#000'}
        }).setOrigin(0, 0.5).setDepth(12);


        // anim
        this.anims.create({
            key: "explosion",
            frameRate: 15,
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 8}),
            hideOnComplete: true
        })


        this.car = this.physics.add.image(getCenterX(this), getHeight(this) - 100, "car");
        this.car.body.setAllowGravity(false);
        this.car.setDepth(6);


        let helpText = this.add.text(this.sys.canvas.width / 2, 280, `Left: ← \nRight: → \nDown: ↓\nUp: ↑ \nShoot: SPACE`, {
            fontSize: "30px",
            fontFamily: "font"
        }).setDepth(30).setOrigin(0.5);

        this.time.addEvent({
            delay: 3000,
            callback: ()=>{
               helpText.visible = false;
            },
            repeat: -1
        })

        this.expl = new Explosion({
            scene: this,
            x: 0,
            y: 0
        })


        this.time.addEvent({
            delay: 12000,
            callback: ()=>{
                new Jumper(this, getCenterX(this), -300, this.jumperGroup);
            },
            repeat: -1
        })

        this.time.addEvent({
            delay: 10000,
            callback: ()=>{
                new Fuel(this, this.fuelGroup);
            },
            repeat: -1
        })

        this.time.addEvent({
            delay: 2100,
            callback: ()=>{
                new CharecterObstacle(this, this.obstacleGroup);
            },
            repeat: -1
        })

       
        

        this.addCollider();

    }

    update(time, delta){
        this.road.tilePositionY -= this.SPEED;

        if(this.fuelAmount > 0 && !this.isGameOver) {
            this.fuelAmount--;
            this.fuelBar.setScale(this.fuelAmount / this.maxFuel, 1);
        }

        if(this.fuelAmount <= 0 && !this.isGameOver){
            this.isGameOver =  true;
            this.gameOver();
        }

        if(this.speedStayTime > 0){
            this.speedStayTime--;
        }

        if(this.speedStayTime == 0){
            this.SPEED = 5;
        }

        if(!this.isGameOver){
            if(this.cursor.left.isDown && this.car.x > 185){
                this.car.setVelocityX(-300);
                this.car.angle = -7;
            }else if(this.cursor.right.isDown && this.car.x < 620){
                this.car.setVelocityX(300);
                this.car.angle = 7;
            }else{
                this.car.setVelocity(0);
                this.car.angle = 0;
            }
    
            if(this.cursor.up.isDown && this.car.y > 75){
                this.car.setVelocityY(-300);
            }else if(this.cursor.down.isDown && this.car.y < 540){
                this.car.setVelocityY(300);
            }else{
                this.car.setVelocityY(0);
            }
    
            if(this.cursor.space.isDown && this.shootingDelay < 1){
                let bullet = new Bullet(this, this.car.x, this.car.y);
                this.bulletGroup.add(bullet);
                this.shootingDelay =  20;
            }
    
            this.shootingDelay--;
        }

    }

    gameOver(){
 
        let container = this.add.container(getCenterX(this), 1200).setDepth(20);

        let bg = this.add.image(0, 0, "panel-gameover").setScale(0.5);

        let title = this.add.text(0, -125, `Game Over`, {
            fontFamily: "font",
            fontSize: "17px",
            stroke: '#000000',
			strokeThickness: 5,
        }).setOrigin(0.5).setDepth(20);

        let score = this.add.text(0, -30, `Score ${this.score}`, {
            fontFamily: "font",
            fontSize: "27px",
            stroke: '#000000',
			strokeThickness: 5,
			// shadow: { fill: true, blur: 0, stroke: false, offsetX: 1, offsetY: 1, color: '#000'}
        }).setOrigin(0.5).setDepth(20);

        let homeBtn = this.add.image(-70, 50, "button-home").setScale(0.5).setInteractive();
        let retryBtn = this.add.image(70, 50, "button-restart").setScale(0.5).setInteractive();


        container.add([bg, title, homeBtn, retryBtn, score]);

        retryBtn.setInteractive();
        retryBtn.on("pointerdown", ()=>{
            this.scene.start("GameScene");
        })


        homeBtn.setInteractive();
        homeBtn.on("pointerdown", ()=>{
            this.scene.start("HomeScene");
        })


        this.tweens.add({
            targets: container,
            y: 300,
            duration: 1000,
            ease:  "Quintic.Out"
        })

    }

    addCollider(){
        this.physics.add.overlap(this.car, this.jumperGroup, (obj, obj2)=>{
            if(!this.jumping && !this.isGameOver){
                this.speedStayTime = 500;
                this.showSpeedUpText();
                this.jumping = true;
                this.tweens.add({
                    targets: this.car,
                    scale: 1.2,
                    duration: 1000,
                    yoyo: true,
                    onComplete: ()=>{
                        this.jumping = false;
                        //this.speedUpText.visible = false;
                    }
                })
            }        
        });

        this.physics.add.collider(this.fuelGroup, this.car, (fuel, car)=>{
            fuel.destroy();
            this.fuelAmount = this.maxFuel;
        });

        this.physics.add.collider(this.obstacleGroup, this.car, (obj1, obj2)=>{
            if(!this.isGameOver){
                this.expl.Show(this.car.x, this.car.y);
                this.isGameOver =  true;
                this.car.destroy();
                obj1.destroy();
                if(this.score > this.bestScore){
                    localStorage.setItem("best_score", ""+this.score);
                }
    
                this.gameOver();
            }

        })



        this.physics.add.collider(this.obstacleGroup, this.bulletGroup, (obj1, obj2)=>{
            this.expl.Show(obj1.x, obj1.y);
            obj1.destroy();
            obj2.destroy();
            this.score += 5;
            this.scoreText.text = `Score:${this.score}`;
        })
    }

    showSpeedUpText(){
        this.speedUpText.visible = true;
        this.speedUpText.x = this.car.x;
        this.SPEED = 10;
        this.tweens.add({
            targets: this.speedUpText,
            scale: 1,
            duration: 1000,
            onComplete: ()=>{
                this.speedUpText.visible = false;
                this.speedUpText.setScale(0);
            }
        });
    }
}

