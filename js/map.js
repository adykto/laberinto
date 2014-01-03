APP.Map = (function() {
	var self = {},
		context = null,
		tileset = null,
		data = null;

	self.getTile = function(url) {
		var tileImage = new Image();

		tileImage.src = url;
		tileImage.onload = function() {
			tileset = tileImage;
			self.onResize();
		}

		return self;
	}

	self.onLoadMap = function(result) {
		if (result.currentTarget.readyState == 4) {
			data = JSON.parse(result.currentTarget.responseText);
			self.getTile(data.tileset);
			console.log('Map loaded! - ', data);
		}
	}

	self.onResize = function() {
		context.canvas.width  = window.innerWidth;
		context.canvas.height = window.innerHeight;

		for(var rows = 0; rows < data.rows; rows++) {
			var line = "";

			for(var cols = 0; cols < data.cols; cols++) {
				var id = data.terrain[cols + (rows * data.cols)],
					left = data.sprites[id][0],
					top = data.sprites[id][1],
					width = data.sprites[id][2],
					height = data.sprites[id][3],
					x = cols * width,
					y = rows * height;

				context.drawImage(tileset,left,top,width,height,x,y,width,height);
				line+= id;
			}
		}
	}

	context = document.getElementById('board').getContext('2d');
	APP.Main.getJSON('api/arnkalor.json', self.onLoadMap);
	window.onresize = self.onResize;

	return self;
})();