"use strict"; "use restrict";
var APP = APP||{};

APP.Map = (function() {
	var self = {},
		map = null,
		tileset = null,
		data = null,
		x = 0,
		y = 0;

	self.moveLeft = function() {
		x = x < 1 ? 0 : x - 1;
		self.update();
	}

	self.moveUp = function() {
		y = y < 1 ? 0 : y - 1;
		self.update();
	}

	self.moveRight = function() {
		x = x >= data.cols - APP.Viewport.getCols()? data.cols - APP.Viewport.getCols() : x + 1;
		self.update();
	}

	self.moveDown = function() {
		y = y >= data.rows - APP.Viewport.getRows()? data.rows - APP.Viewport.getRows() : y + 1;
		self.update();
	}

	self.scrollTo = function(newX, newY) {
		x = newX;
		y = newY;
		self.update();
	}

	self.onLoadMap = function(response) {
		APP.Loader.set(30);
		data = response;
		tileset = new Image();
		tileset.src = data.tileset;
		tileset.onload = self.onTileLoad;
	}

	self.onTileLoad = function() {
		APP.Loader.set(90);
		map = APP.DOM.put('canvas', 'container', 'board', 'wide').getContext('2d');
		self.scrollTo(0, 0);
		APP.Controls.init();
		APP.Viewport.init(self.update);
	}

	self.update = function() {
		var maxWidth = APP.Viewport.getCols(),
			maxHeight = APP.Viewport.getRows();

		if(maxWidth + x > data.cols) {
			maxWidth = data.cols - x;
		}

		if(maxHeight + y > data.rows) {
			maxHeight = data.rows - y;
		}

		console.log(maxWidth, maxHeight, data.cols, data.rows);

		map.canvas.width  = APP.Viewport.getWidth();
		map.canvas.height = APP.Viewport.getHeight();

		for(var rows = 0; rows < maxHeight; rows++) {
			for(var cols = 0; cols < maxWidth; cols++) {
				var id = data.terrain[x + cols + ((y + rows) * data.cols)],
					x1 = data.sprites[id][0],
					y1 = data.sprites[id][1],
					width = data.sprites[id][2],
					height = data.sprites[id][3],
					x2 = cols * width,
					y2 = rows * height;

				map.drawImage(tileset,x1,y1,width,height,x2,y2,width,height);
			}
		}
	}

	self.init = function() {
		APP.JSON.load('api/arnkalor.json', self.onLoadMap);
	}

	return self;
})();