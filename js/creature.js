Creature = function(newName) {
	this.initialize = function(newOptions) {
		this.options = newOptions;
		this.x = newOptions.location.x;
		this.y = newOptions.location.y;
		this.lastX = -1;
		this.lastY = -1;
		this.animationPose = 0;
		this.animationFrame = 0;
		this.animation = this.options.sprites.poses.walk;
		this.time = null;

		APP.Main.createObject('div', 'container', this.options.id, 'creature');
		this.element = APP.Main.getObject(this.options.id);
		this.style = this.element.style;
		this.style.backgroundImage = 'url(' + this.options.sprites.tileset + ')';

		this.update();
	}

	this.update = function () {
		if(this.x != this.lastX || this.y != this.lastY) {
			var	newX = (this.x - this.lastX ) * APP.Main.getConfig('tileSize', 32),
				newY = (this.y - this.lastY ) * APP.Main.getConfig('tileSize', 32);

			this.style.webkitTransform = 'translateX(' + newX + 'px) translateY(' + newY + 'px)';
		}
	}

	this.setPose = function(newPose) {
		this.animationPose = newPose;

		var spr = this,
			timer = setInterval(function(){
				if(spr.animationFrame++ === spr.options.sprites.frames-1) {
					spr.animationFrame = 0;
					clearInterval(timer);
				}

				var posX = (spr.animation[0] - (spr.animationFrame * spr.options.sprites.width)),
					posY = (spr.animation[1] + (spr.animationPose * spr.options.sprites.height));

				spr.style.backgroundPositionX = posX + 'px';
				spr.style.backgroundPositionY = posY + 'px';
				spr.update();
			}, 100);
	}

	this.moveLeft = function() {
		this.x--;
		this.setPose(3);
	}

	this.moveUp = function() {
		this.y--;
		this.setPose(1);
	}

	this.moveRight = function() {
		this.x++;
		this.setPose(2);
	}

	this.moveDown = function() {
		this.y++;
		this.setPose(0);
	}
}

Player = function(newOptions) {
	this.initialize(newOptions);
}

Player.prototype = new Creature();

APP.Creatures = (function(){
	var self = {},
		player = null,
		timer = null,
		isMovementLocked = true,
		creatures = null;

	self.playerLoad = function(result) {
		if (result.currentTarget.readyState == 4) {
			var	json = JSON.parse(result.currentTarget.responseText);
			console.log('Player loaded! - ', json);
			player = new Player(json);
			self.timerStart();
			self.unlockMovement();
		}
	}

	self.lockMovement = function() {
		isMovementLocked = true;
	}

	self.unlockMovement = function() {
		isMovementLocked = false;
	}

	self.timerTick = function() {
		self.unlockMovement();
	}

	self.timerStart = function() {
		timer = setInterval(self.timerTick, 300);
	}

	self.timerStop = function() {
		clearInterval(timer);
	}

	self.onKeyDown = function() {
 		if(isMovementLocked === false) {
			self.lockMovement();

			switch (window.event.keyCode) {
				case 37:
					player.moveLeft();
					break;
				case 38:
					player.moveUp();
					break;
				case 39:
					player.moveRight();
					break;
				case 40:
					player.moveDown();
					break;
				case 80:
					self.timerStop();
					break;
			}
		}
	}

	APP.Main.getJSON('/api/player.json', self.playerLoad);
	document.onkeydown = self.onKeyDown;
	//self.timerStop();

	return self;
})();