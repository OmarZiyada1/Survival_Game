export class CharecterObstacle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, obstacleGroup){
        super(scene, Phaser.Math.Between(130, 650), -300, "zoombie_1", 0);
        this.scene.physics.world.enable(this);
        this.setScale(1);
        this.body.setAllowGravity(false);
        this.body.velocity.y = 80;
        this.angle = 90;
        this.setDepth(5);
        this.scene.add.existing(this);
        this.anims.play(`charecterAnim_${Phaser.Math.Between(1, 2)}`);

        obstacleGroup.add(this);
    }
}