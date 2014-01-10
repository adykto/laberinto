var APP = APP||{};

// This one

APP.Viewport = (function() {
	var self = {},
		onUpdateCallback = null,
		height = null,
		width = null,
		maxX = 0,
		maxY = 0;

	self.getHeight = function() {
		return height;
	}

	self.getWidth = function() {
		return width;
	}

	self.isOutOfBounds = function(x, y) {
		return (x < 0 || x > maxX || y < 0 || y > maxY);
	}

	self.update = function() {
		height = window.innerHeight;
		width  = window.innerWidth;
		maxX = Math.round(width / (APP.Config.get('tileSize'))) - 3;
		maxY = Math.round(height / (APP.Config.get('tileSize'))) - 3;

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