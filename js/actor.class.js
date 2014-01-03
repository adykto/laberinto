Actor = function(newName) {
	this.initialize = function(newOptions) {
		this.options = newOptions;
		this.x = this.options.location.x;
		this.y = this.options.location.y;
		this.lastX = -1;
		this.lastY = -1;
		this.animationPose = 0;
		this.animationFrame = 0;
		this.animation = this.options.sprites.poses.walk;

		this.element = APP.Main.createObject('div', 'container', this.options.id, 'sprite');
		this.style = this.element.style;
		this.style.background = 'url(' + this.options.sprites.tileset + ')';

		this.update();
	}

	this.update = function () {
		if(this.x != this.lastX || this.y != this.lastY) {
			var	newX = (this.x - this.lastX ) * APP.Main.getConfig('tileSize'),
				newY = (this.y - this.lastY ) * APP.Main.getConfig('tileSize');

			this.style.webkitTransform = 'translate(' + newX + 'px, ' + newY + 'px)';
		}
	}

	this.animate = function() {
		var spr = this, timer;

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

	this.translate = function(newX, newY) {
		if(newY > this.y) {
			this.animationPose = 0;
		} else if(newY < this.y) {
			this.animationPose = 1;
		}

		if(newX > this.x) {
			this.animationPose = 2;
		} else if(newX < this.x) {
			this.animationPose = 3;
		}

		this.x = newX;
		this.y = newY;

		this.animate();
	}
}