/**
 * Created by florian on 01.05.2014.
 */
var navigation = navigation || {};
var data = {
	data: [
		{
			url: "http://www.google.de", title: "google", type: "web", children: [
			{
				url: "http://www.google.de", title: "google1", type: "list"
			},
			{
				url: "http://www.google.de", title: "google2", type: "list"
			}
		]
		},

		{
			url: "http://www.bild.de", title: "bild", type: "web", children: [
			{
				url: "http://www.bild.de/sport", title: "sport", type: "list"
			},
			{
				url: "http://www.bild.de/politik", title: "politik", type: "list"
			}
		]
		}
	]
};
navigation.viewBase = function (controller) {
	var self = this;
	var controller = controller;
	self.Nodes = [];
	self.render = function (htmlModes) {
		var d = document.createDocumentFragment();
		var l = htmlModes.length;
		for (var i = 0; i < l; i++) {
			d.appendChild(htmlModes[i].htmlelements);
		}
		$("#navigationItems").append($(d));
	};
	self.renderChild = function (parent, children) {
		var d = document.createDocumentFragment();
		var l = children.length;
		for (var i = 0; i < l; i++) {
			d.appendChild(children[i].htmlelements);
		}
		parent.appendChild(d);
	}
	self.getHtmlElements = function (type, title, path, onImageClickFunction) {
		var docFragment = document.createDocumentFragment();
		var li = document.createElement("li");
		var mainDiv = document.createElement("div");
		var img = document.createElement("img");
		var link = document.createElement("a");
		img.src = "http://upload.wikimedia.org/wikipedia/foundation/2/20/CloseWindow19x19.png";
		img.alt = "upload";
		link.innerHTML = title;
		link.href = path;
		img.onclick = function (event) {
			if ("function" === typeof onImageClickFunction)
				onImageClickFunction(event);
		};
		mainDiv.appendChild(img);
		mainDiv.appendChild(link);
		li.appendChild(mainDiv);
		docFragment.appendChild(li);
		if (type === "web" || type === "list") {
			var ul = document.createElement("ul");
			mainDiv.appendChild(ul);
		}
		return docFragment;
	}

};

navigation.controller = function (view) {
	var self = this;
	var view = view;
	self.models = [];

	//Base Nodes get rendered
	self.init = function (data) {
		var j = data.length;
		for (var i = 0; i < j; i++) {
			var a = data[i];
			var b = new navigation.webModel(self, a);
			b.htmlelements = view.getHtmlElements(b.getType(), b.title, b.path, function (e) {
				self.dataChanged(b, e);
			});
			self.models.push(b);
		}
		view.render(self.models);
	}

	//dataChanged Method!
	self.dataChanged = function (model, event) {
		//	alert(event.currentTarget.parentNode);
		var sChild = [];
		var start = Date.now();

		console.log(start);
		for (var i = 0; i < 50000; i++) {
			var b = new navigation.webModel(self, data.data[0]);
			b.htmlelements = view.getHtmlElements(b.getType(), b.title + "child" + i, b.path, function (e) {
				self.dataChanged(b, e);
			});
			sChild.push(b);
		}
		view.renderChild(event.currentTarget.parentNode.getElementsByTagName("ul")[0], sChild);

		var end = Date.now();
		console.log(end);
		var elapsed = (end - start) / 1000;
		console.log(elapsed + " Sekunden!");
	};
};

navigation.webModel = function (_controller, _data) {
	var self = this;
	self.lists = [];
	self.webs = [];
	self.controller = _controller;
	self.title = _data.title;
	self.path = _data.url;
	self.type = "web";
	self.htmlelements = "";
	self.getType = function () {
		return self.type;
	};
};
navigation.listModel = function () {
	this.listItems = [];
	this.type = "list";
	this.title = "";
	this.path = "";
	this.getType = function () {
		return this.type;
	};
};
navigation.itemModel = function () {
	var type = "item";
	this.title = "";
	this.path = "";

	this.getType = function () {
		return this.type;
	};
};

$(document).ready(function () {
	var v = new navigation.viewBase();
	var c = new navigation.controller(v);
	c.init(data.data);
});


var start = Date.now();

console.log(start);
var ii = "";
for (var i = 0; i < 10000000; i++) {
	ii += i;

}
var end = Date.now();
var elapsed = (end - start) / 1000;
console.log(elapsed + " Sekunden!");

console.log("#########");
var start = Date.now();
var k = "";
for (var i = 0; i < 10000000; i++) {

	k.concat(i);
}

var end = Date.now();
var elapsed = (end - start) / 1000;
console.log(elapsed + " Sekunden!");

console.log("#########");
var start = Date.now();
var j = "";
for (var i = 0; i < 10000000; i++) {

	j = ii + i;
}

var end = Date.now();
var elapsed = (end - start) / 1000;
console.log(elapsed + " Sekunden!");