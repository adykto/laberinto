var APP = APP||{};

APP.JSON = (function() {
	var self = {};

	self.isValid = function(str) {
		if (str === '') return false;

		str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
		str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
		str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

		return (/^[\],:{}\s]*$/).test(str);
	}

	self.load = function(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);

		xhr.onreadystatechange = function(response){
			var content = response.currentTarget;

			if (content.readyState == 4) {
				if (content.status == 200 && self.isValid(content.responseText)) {
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

	return self;
})();
