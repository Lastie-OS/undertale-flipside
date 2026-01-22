class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super('helloWorld')
    }

    init() {
        this.cursors = null
        this.keys = null
        this.player = null
    }

    preload() {
        // load the PNG file
        this.load.image('77405', '/assets/tileset/77405.png')

        // load the JSON file
        this.load.tilemapTiledJSON('tilemap', '/assets/tileset/untitled.json')

        // load character sprite sheet
        this.load.spritesheet('character', '/image.png', { frameWidth: 20, frameHeight: 20 })
    }

    create()
{
	// remove this 👇 sanity check from previous section
	// this.add.image(0, 0, 'base_tiles')

	// create the Tilemap
	const map = this.make.tilemap({ key: 'tilemap' })

	// add the tileset image we are using
	const tileset = map.addTilesetImage('77405')
	
	// create the layers we want in the right order
	map.createLayer('Tile Layer 1', tileset)

	// the remaining tile layers ...

	this.cameras.main.setZoom(2); // zoom level of 2x

	// setup keyboard input
	this.cursors = this.input.keyboard.createCursorKeys()
	this.keys = this.input.keyboard.addKeys({
		W: Phaser.Input.Keyboard.KeyCodes.W,
		A: Phaser.Input.Keyboard.KeyCodes.A,
		S: Phaser.Input.Keyboard.KeyCodes.S,
		D: Phaser.Input.Keyboard.KeyCodes.D,
		shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
		x: Phaser.Input.Keyboard.KeyCodes.X
	})

	// create player character
	this.player = this.add.sprite(200, 200, 'character', 0)
	this.player.setScale(2)

	// create animations
	this.anims.create({
		key: 'down',
		frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
		frameRate: 5,
		repeat: -1
	})
	this.anims.create({
		key: 'up',
		frames: this.anims.generateFrameNumbers('character', { start: 4, end: 7 }),
		frameRate: 5,
		repeat: -1
	})
	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('character', { start: 8, end: 9 }),
		frameRate: 5,
		repeat: -1
	})
	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('character', { start: 10, end: 11 }),
		frameRate: 5,
		repeat: -1
	})

	// camera follows player
	this.cameras.main.startFollow(this.player)
}

update() {
	const speed = 100
	const boost = this.keys.shift.isDown || this.keys.x.isDown ? 1.5 : 1
	const moveSpeed = speed * boost

	let moving = false
	let direction = null

	// arrow keys and WASD
	if (this.cursors.up.isDown || this.keys.W.isDown) {
		this.player.y -= moveSpeed / 60
		direction = 'up'
		moving = true
	}
	if (this.cursors.down.isDown || this.keys.S.isDown) {
		this.player.y += moveSpeed / 60
		direction = 'down'
		moving = true
	}
	if (this.cursors.left.isDown || this.keys.A.isDown) {
		this.player.x -= moveSpeed / 60
		direction = 'left'
		moving = true
	}
	if (this.cursors.right.isDown || this.keys.D.isDown) {
		this.player.x += moveSpeed / 60
		direction = 'right'
		moving = true
	}

	// play animation if moving
	if (moving && direction) {
		this.player.play(direction, true)
	} else {
		this.player.stop()
	}
}
}