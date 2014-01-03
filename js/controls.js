var APP = APP||{};

APP.Controls = (function(){
	var self = {},
		player = null,
		isMovementLocked = true;

	self.onLoadPlayer = function(response) {
		player = new Player(response);
		setInterval(self.timerTick, APP.Main.getConfig('delay'));
		document.onkeydown = self.onKeyDown;
	}

	self.timerTick = function() {
		isMovementLocked = false;
	}

	self.onKeyDown = function(event) {
 		if(isMovementLocked === false) {
			isMovementLocked = true;

			switch (event.keyCode ) {
				case 37:
					player.translate(player.x - 1,player.y);
					break;
				case 38:
					player.translate(player.x, player.y - 1);
					break;
				case 39:
					player.translate(player.x + 1, player.y);
					break;
				case 40:
					player.translate(player.x, player.y + 1);
					break;
			}
		}
	}

	self.init = function() {
		APP.Main.getJSON('/api/player.json', self.onLoadPlayer);
	}

	return self;
})();