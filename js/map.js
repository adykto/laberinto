var APP = APP||{};

APP.Map = (function() {
	var self = {},
		map = null,
		tileset = null,
		data = null;

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
		self.onResize();
		APP.Controls.init();
		APP.Viewport.init(self.onResize);
	}

	self.onResize = function() {
		map.canvas.width  = APP.Viewport.getWidth();
		map.canvas.height = APP.Viewport.getHeight();

		for(var rows = 0; rows < data.rows; rows++) {
			for(var cols = 0; cols < data.cols; cols++) {
				var id = data.terrain[cols + (rows * data.cols)],
					left = data.sprites[id][0],
					top = data.sprites[id][1],
					width = data.sprites[id][2],
					height = data.sprites[id][3],
					x = cols * width,
					y = rows * height;

				map.drawImage(tileset,left,top,width,height,x,y,width,height);
			}
		}
	}

	self.init = function() {
		APP.JSON.load('api/arnkalor.json', self.onLoadMap);
	}

	return self;
})();