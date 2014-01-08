var APP = APP||{};

APP.DOM = (function() {
	var self = {};

	self.get = function(objectId) {
		return document.getElementById(objectId);
	}

	self.put = function(objectType, objectParent, objectId, objectClass) {
		var parent = document.getElementById(objectParent),
			element = document.createElement(objectType);

		element.className = objectClass;
		element.id = objectId;
		parent.appendChild(element);

		return element;
	}

	return self;
})();