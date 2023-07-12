export class Bullet extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y){
        super(scene, x, y, `bullet`);
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.body.velocity.y = -500;
        this.setDepth(2);
        this.scene.add.existing(this);
    }
}