var APP = APP||{};

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

	self.getObject = function(objectId) {
		return document.getElementById(objectId);
	}

	self.createObject = function(objectType, objectParent, objectId, objectClass) {
		var parent = document.getElementById(objectParent),
			element = document.createElement(objectType);
		element.className = objectClass;
		element.id = objectId;
		parent.appendChild(element);

		return element;
	}

	self.isJSON = function(str) {
		if (str === '') return false;

		str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
		str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
		str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

		return (/^[\],:{}\s]*$/).test(str);
	}

	self.getJSON = function(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);

		xhr.onreadystatechange = function(response){
			var content = response.currentTarget;

			if (content.readyState == 4) {
				if (content.status == 200 && self.isJSON(content.responseText)) {
					var data = JSON.parse(content.responseText);
					console.log('Loaded: ', url, data);
					callback(data);
				} else {
					console.error('Failed to load: ', url, data);
				}
			}
		};
		xhr.send();
	}

	self.onLoadConfig = function(result) {
		config = result;
		body.innerHTML = '';

		self.createObject('canvas', 'container', 'board', 'wide');
		APP.Map.init();
	}

	self.init = function() {
		head = document.getElementsByTagName('head').item(0),
		body = document.getElementById('container');

		self.getJSON('api/config.json', self.onLoadConfig);
	}

	return self;
})();

window.onload = APP.Main.init;
