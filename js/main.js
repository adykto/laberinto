var APP = APP||{};

APP.Main = (function() {
	var self = {};

	self.onLoadConfig = function(result) {
		APP.Config.init(result)
		APP.Map.init();
	}

	self.init = function() {
		APP.Loader.init('mainLoader', 'Loading... please wait...', 100);
		APP.JSON.load('api/config.json', self.onLoadConfig);
	}

	return self;
})();

window.onload = APP.Main.init;
