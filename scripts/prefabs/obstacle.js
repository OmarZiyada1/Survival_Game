export class Obstacle extends Phaser.Physics.Arcade.Image{
    constructor(scene){
        super(scene, Phaser.Math.Between(130, 650), -100, `obstacle_${Phaser.Math.Between(0, 2)}`);
        this.scene.physics.world.enable(this);
        this.body.setCircle(this.width * 0.5);
        this.body.setAllowGravity(false);
        this.body.velocity.y = 100;
        this.scene.add.existing(this);
    }
}