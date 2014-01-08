var APP = APP||{};

APP.Config = (function() {
	var self = {},
		config = null;

	self.get = function(key, defaultValue) {
		if(config.hasOwnProperty(key)) {
	        return config[key];
    	} else {
    		return defaultValue;
    	}
	}

	self.init = function(newConfig) {
		config = newConfig;
		APP.Loader.set(10);
	}

	return self;
})();