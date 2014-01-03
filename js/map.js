var APP = APP||{};

APP.Map = (function() {
	var self = {},
		context = null,
		tileset = null,
		data = null;

	self.onLoadMap = function(response) {
		data = response;

		tileset = new Image();
		tileset.src = data.tileset;
		tileset.onload = self.onResize;
		APP.Controls.init();

		window.onresize = self.onResize;
	}

	self.onResize = function() {
		context.canvas.width  = window.innerWidth;
		context.canvas.height = window.innerHeight;

		for(var rows = 0; rows < data.rows; rows++) {
			for(var cols = 0; cols < data.cols; cols++) {
				var id = data.terrain[cols + (rows * data.cols)],
					left = data.sprites[id][0],
					top = data.sprites[id][1],
					width = data.sprites[id][2],
					height = data.sprites[id][3],
					x = cols * width,
					y = rows * height;

				context.drawImage(tileset,left,top,width,height,x,y,width,height);
			}
		}
	}

	self.init = function() {
		context = document.getElementById('board').getContext('2d');
		APP.Main.getJSON('api/arnkalor.json', self.onLoadMap);
	}

	return self;
})();