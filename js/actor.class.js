"use strict"; "use restrict";
var Actor = function(newName) {
	this.initialize = function(newConfig) {
		this.cfg = newConfig;
		this.x = this.cfg.location.x;
		this.y = this.cfg.location.y;
		this.lx = -1;
		this.ly = -1;
		this.side = 0;
		this.frame = 0;
		this.pose = this.cfg.sprites.poses.walk;

		this.style = APP.DOM.put('div', 'container', this.cfg.id, 'sprite').style;
		this.style.background = 'url(' + this.cfg.sprites.tileset + ')';

		this.update();
	}

	this.update = function () {
		if(this.x != this.lx || this.y != this.ly) {
			var	newX = (this.x - this.lx ) * APP.Config.get('tileSize'),
				newY = (this.y - this.ly ) * APP.Config.get('tileSize');

			this.style.webkitTransform = 'translate(' + newX + 'px, ' + newY + 'px)';
		}
	}

	this.animate = function() {
		var spr = this, timer;

		timer = setInterval(function(){
			if(spr.frame++ === spr.cfg.sprites.frames-1) {
				spr.frame = 0;
				clearInterval(timer);
			}

			var posX = (spr.pose[0] - (spr.frame * spr.cfg.sprites.width)),
				posY = (spr.pose[1] + (spr.side * spr.cfg.sprites.height));

			spr.style.backgroundPositionX = posX + 'px';
			spr.style.backgroundPositionY = posY + 'px';
			spr.update();
		}, spr.cfg.sprites.speed);
	}

	this.translate = function(newX, newY) {
		if(newY > this.y) {
			this.side = 0;
		} else if(newY < this.y) {
			this.side = 1;
		}

		if(newX > this.x) {
			this.side = 2;
		} else if(newX < this.x) {
			this.side = 3;
		}

		this.x = newX;
		this.y = newY;

		this.animate();
	}
}