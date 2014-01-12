"use strict"; "use restrict";
var APP = APP||{};

APP.Viewport = (function() {
	var self = {},
		onUpdateCallback = null,
		height = null,
		width = null,
		cols = 0,
		rows = 0;

	self.getHeight = function() {
		return height;
	}

	self.getWidth = function() {
		return width;
	}

	self.getRows = function() {
		return rows;
	}

	self.getCols = function() {
		return cols;
	}

	self.isOutOfBounds = function(x, y) {
		return (x < 0 || x > cols || y < 0 || y > rows);
	}

	self.update = function() {
		height = window.innerHeight;
		width  = window.innerWidth;
		cols = Math.round(width / (APP.Config.get('tileSize')));
		rows = Math.round(height / (APP.Config.get('tileSize')));

		if(onUpdateCallback != null){
			onUpdateCallback();
		}
	}

	self.init = function(callback) {
		onUpdateCallback = callback;
		self.update();
		window.onresize = self.update;
	}

	return self;
})();