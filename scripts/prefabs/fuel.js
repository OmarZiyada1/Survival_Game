export class Fuel extends Phaser.Physics.Arcade.Image{
    constructor(scene, fuelGroup){
        super(scene, Phaser.Math.Between(130, 650), -300, "fuel-icon");
        this.scene.physics.world.enable(this);
        this.setScale(0.5);
        this.body.setAllowGravity(false);
        this.body.velocity.y = 80;
        this.setDepth(5);
        this.scene.add.existing(this);

        fuelGroup.add(this);
    }
}