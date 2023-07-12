export class Jumper extends Phaser.GameObjects.Container {
    constructor(scene, x, y, jumperGroup){
        super(scene, x, y);
        this.scene.add.existing(this);
        this.setDepth(5);

        let jumper = this.scene.physics.add.image(Phaser.Math.Between(-160, 160), 0, "jumper").setScale(0.7);
        jumper.body.setSize(0.5 * jumper.width);

        this.add([jumper]);

        jumperGroup.add(jumper);

    }
}