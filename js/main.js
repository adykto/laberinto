var APP = {};

APP.Main = (function() {
	var self = {},
		config = null,
		head = null,
		body = null;

	self.getConfig = function(key, defaultValue) {
		if(config.hasOwnProperty(key)) {
	        return config[key];
    	} else {
    		return defaultValue;
    	}
	}

	self.wipeBody = function() {
		var children = body.firstChild;

		while( children ) {
			body.removeChild( children );
			children = body.firstChild;
		}

		return self;
	}

	self.getObject = function(objectId) {
		return document.getElementById(objectId);
	}

	self.createObject = function(objectType, objectParent, objectId, objectClass) {
		var parent = document.getElementById(objectParent);
		var element = document.createElement(objectType);
		element.className = objectClass;
		element.id = objectId;
		parent.appendChild(element);

		return self;
	}

	self.require = function(url) {
		var scriptElement= document.createElement('script');
		scriptElement.type = 'text/javascript';
		scriptElement.src= url;
		head.appendChild(scriptElement);

		return self;
	}

	self.getJSON = function(url, onload) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = onload;
		xhr.send();

		return self;
	}

	self.onLoadConfig = function(result) {
		if (result.currentTarget.readyState == 4) {
			config = JSON.parse(result.currentTarget.responseText);
			console.log('Config loaded! - ', config);
			self.
				wipeBody().
				createObject('canvas', 'container', 'board', 'wide').
				require('js/creature.js').
				require('js/map.js');
		}
	}

	self.onLoad = function() {
		head = document.getElementsByTagName('head').item(0),
		body = document.getElementById('container');

		self.getJSON('api/config.json', self.onLoadConfig);
	}

	window.onload = self.onLoad;

	return self;
})();