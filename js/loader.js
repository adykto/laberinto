var APP = APP||{};

APP.Loader = (function() {
	var self = {},
		element = null,
		value = 0,
		total = 0;

	self.set = function(percentage) {
		value = (element.clientWidth / total) * percentage;
		self.update();
	}

	self.update = function() {
		var offset = value - element.clientWidth;
		element.style.webkitBoxShadow = 'inset ' + offset + 'px 0 0 #000';

		if(value >= total) {
			APP.DOM.remove(element.id);
		}
	}

	self.init = function(id, content, newTotal) {
		total = newTotal;
		element = APP.DOM.put('div', 'container', id, 'loader');
		element.innerHTML = content;
		self.update();
	}

	return self;
})();

