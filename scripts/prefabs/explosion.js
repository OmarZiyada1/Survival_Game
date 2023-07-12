export class Explosion extends Phaser.GameObjects.Sprite {
    constructor(params){
        super(params.scene, params.x, params.y, "explosion", 0);
        this.setDepth(9);
        this.setScale(0.5);
        this.visible = false;
        this.scene.add.existing(this);
  
    }

    Show(x, y){
        this.scene.sound.play("explose");
        this.x = x;
        this.y = y;
        this.visible = true;

        this.anims.play("explosion");
    }
}