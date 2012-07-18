var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		// Load our textures
		var self = this,
			gameTexture = [],
			Cuboid, Player, x;

		this.obj = [];

		gameTexture[0] = new IgeTexture('../assets/textures/buildings/bank1.png');

		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {
			ige.createFrontBuffer(true);

			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
					Cuboid = IgeInteractiveEntity.extend({
						tick: function (ctx) {
							this._transformContext(ctx);

							var r3d = this.geometry3d,
								xl1 = new IgePoint(-(r3d.x / 2), 0, 0)
									.toIso(),
								xl2 = new IgePoint(+(r3d.x / 2), 0, 0)
									.toIso(),
								xl3 = new IgePoint(0, -(r3d.y / 2), 0)
									.toIso(),
								xl4 = new IgePoint(0, +(r3d.y / 2), 0)
									.toIso(),
								xl5 = new IgePoint(0, 0, -(r3d.z / 2))
									.toIso(),
								xl6 = new IgePoint(0, 0, +(r3d.z / 2))
									.toIso(),
								// Bottom face
								bf1 = new IgePoint(-(r3d.x / 2), -(r3d.y / 2),  +(r3d.z / 2))
									.toIso(),
								bf2 = new IgePoint(+(r3d.x / 2), -(r3d.y / 2),  +(r3d.z / 2))
									.toIso(),
								bf3 = new IgePoint(+(r3d.x / 2), +(r3d.y / 2),  +(r3d.z / 2))
									.toIso(),
								bf4 = new IgePoint(-(r3d.x / 2), +(r3d.y / 2),  +(r3d.z / 2))
									.toIso(),
								// Top face
								tf1 = new IgePoint(-(r3d.x / 2), -(r3d.y / 2),  -(r3d.z / 2))
									.toIso(),
								tf2 = new IgePoint(+(r3d.x / 2), -(r3d.y / 2),  -(r3d.z / 2))
									.toIso(),
								tf3 = new IgePoint(+(r3d.x / 2), +(r3d.y / 2),  -(r3d.z / 2))
									.toIso(),
								tf4 = new IgePoint(-(r3d.x / 2), +(r3d.y / 2),  -(r3d.z / 2))
									.toIso();

							ctx.strokeStyle = '#ffffff';

							// Axis lines
							/*ctx.beginPath();
							ctx.moveTo(xl1.x, xl1.y);
							ctx.lineTo(xl2.x, xl2.y);
							ctx.moveTo(xl3.x, xl3.y);
							ctx.lineTo(xl4.x, xl4.y);
							ctx.moveTo(xl5.x, xl5.y);
							ctx.lineTo(xl6.x, xl6.y);
							ctx.stroke();*/

							// Left face
							ctx.fillStyle = '#545454';
							ctx.beginPath();
							ctx.moveTo(bf3.x, bf3.y);
							ctx.lineTo(bf4.x, bf4.y);
							ctx.lineTo(tf4.x, tf4.y);
							ctx.lineTo(tf3.x, tf3.y);
							ctx.lineTo(bf3.x, bf3.y);
							ctx.fill();
							ctx.stroke();

							// Right face
							ctx.fillStyle = '#282828';
							ctx.beginPath();
							ctx.moveTo(bf3.x, bf3.y);
							ctx.lineTo(bf2.x, bf2.y);
							ctx.lineTo(tf2.x, tf2.y);
							ctx.lineTo(tf3.x, tf3.y);
							ctx.lineTo(bf3.x, bf3.y);
							ctx.fill();
							ctx.stroke();

							// Top face
							ctx.fillStyle = '#676767';
							ctx.beginPath();
							ctx.moveTo(tf1.x, tf1.y);
							ctx.lineTo(tf2.x, tf2.y);
							ctx.lineTo(tf3.x, tf3.y);
							ctx.lineTo(tf4.x, tf4.y);
							ctx.lineTo(tf1.x, tf1.y);
							ctx.fill();
							ctx.stroke();

							ctx.fillStyle = '#ffffff';
							ctx.fillText(this._id, 0, 0);

							this._super(ctx, true);
						}
					});

					Player = Cuboid.extend({
						init: function () {
							this._super();

							// Setup the control system
							this.input.map('walkLeft', this.input.key.left);
							this.input.map('walkRight', this.input.key.right);
							this.input.map('walkUp', this.input.key.up);
							this.input.map('walkDown', this.input.key.down);
						},

						tick: function (ctx) {
							if (this.input.action('walkLeft')) {
								this.translateByIso(-2, 0, 0);
							} else if (this.input.action('walkRight')) {
								this.translateByIso(2, 0, 0);
							} else if (this.input.action('walkUp')) {
								this.translateByIso(0, -2, 0);
							} else if (this.input.action('walkDown')) {
								this.translateByIso(0, 2, 0);
							} else {

							}

							this._super(ctx);
						}
					});

					// Create the scene
					self.scene1 = new IgeScene2d();

					// Create the main viewport
					self.vp1 = new IgeViewport()
						.autoSize(true)
						.scene(self.scene1)
						.drawBounds(true)
						.drawBoundsData(true)
						.mount(ige)
						.camera.translateTo(-100, -50, 0);

					// Create the tile map
					self.tileMap1 = new IgeTileMap2d()
						.tileWidth(40)
						.tileHeight(40)
						.drawGrid(0)
						.mode(1)
						.mount(self.scene1);

					// Create an entity
					// Plinth 1
					x = -140;
					self.obj[0] = new Cuboid()
						.id(1)
						.depth(0)
						.mount(self.tileMap1)
						.translateToIso(x + 0, 0, 0)
						.size3d(160, 240, 40)
						.opacity(0.95)
						.mode(1);

					self.obj[1] = new Cuboid()
						.id(2)
						.depth(1)
						.mount(self.tileMap1)
						.translateToIso(x + 0, -60, 40)
						.opacity(0.95)
						.mode(1);

					self.obj[2] = new Cuboid()
						.id(3)
						.depth(2)
						.mount(self.tileMap1)
						.translateToIso(x + 0, 60, 40)
						.opacity(0.95)
						.mode(1);

					self.obj[3] = new Cuboid()
						.id(4)
						.depth(4)
						.mount(self.tileMap1)
						.translateToIso(x + 0, 0, 80)
						.size3d(40, 160, 40)
						.opacity(0.95)
						.mode(1);

					// Center column
					self.obj[4] = new Cuboid()
						.id(5)
						.depth(5)
						.mount(self.tileMap1)
						.translateToIso(0, 0, 40)
						.size3d(40, 380, 120)
						.opacity(0.95)
						.mode(1);

					// Plinth 2
					x = 140;
					self.obj[5] = new Cuboid()
						.id(6)
						.depth(6)
						.mount(self.tileMap1)
						.translateToIso(x + 0, 0, 0)
						.size3d(160, 240, 40)
						.opacity(0.95)
						.mode(1);

					self.obj[6] = new Cuboid()
						.id(7)
						.depth(7)
						.mount(self.tileMap1)
						.translateToIso(x + 0, -60, 40)
						.opacity(0.95)
						.mode(1);

					self.obj[7] = new Cuboid()
						.id(8)
						.depth(8)
						.mount(self.tileMap1)
						.translateToIso(x + 0, 60, 40)
						.opacity(0.95)
						.mode(1);

					self.obj[8] = new Cuboid()
						.id(9)
						.depth(9)
						.mount(self.tileMap1)
						.translateToIso(x + 0, 0, 80)
						.size3d(40, 160, 40)
						.opacity(0.95)
						.mode(1);

					// Big slab on top
					self.obj[9] = new Cuboid()
						.id(10)
						.depth(10)
						.mount(self.tileMap1)
						.translateToIso(0, 0, 120)
						.size3d(360, 160, 40)
						.opacity(0.95)
						.mode(1);

					// Building
					self.obj[10] = new Cuboid()
						.id(11)
						.depth(11)
						.mount(self.tileMap1)
						.translateToIso(0, 300, 0)
						.size3d(80, 80, 40)
						.opacity(0.95)
						.mode(1);

					self.obj[11] = new Cuboid()
						.id(12)
						.depth(12)
						.mount(self.tileMap1)
						.translateToIso(0, 300, 40)
						.size3d(70, 70, 40)
						.opacity(0.95)
						.mode(1);

					self.obj[12] = new Cuboid()
						.id(13)
						.depth(13)
						.mount(self.tileMap1)
						.translateToIso(0, 300, 120)
						.size3d(20, 20, 120)
						.opacity(0.95)
						.mode(1);

					self.obj[13] = new Cuboid()
						.id(14)
						.depth(14)
						.mount(self.tileMap1)
						.translateToIso(0, 300, 185)
						.size3d(400, 200, 10)
						.opacity(0.95)
						.mode(1);

					self.obj[14] = new Player()
						.id(15)
						.depth(15)
						.mount(self.tileMap1)
						.translateToIso(300, 300, 0)
						.size3d(20, 20, 80)
						.opacity(0.95)
						.mode(1);
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }