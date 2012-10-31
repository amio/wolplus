// ==UserScript==
// @name         WOL.Plus
// @namespace    http://www.airmio.com/
// @version      0.2.1
// @description  将WOL中鼠标指向技能的英文说明替换为中文说明
// @match        http://www.worldoflogs.com/*
// @updateURL    https://github.com/amio/wolplus/raw/master/wolplus.meta.js
// @downloadURL  https://github.com/amio/wolplus/raw/master/wolplus.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {

	// List to inject
	var injects = [
		{type: 'script', attrs: {type: 'text/javascript', src: 'https://github.com/amio/wolplus/raw/master/wolplus.js'}},
		{type: 'link', attrs: {rel: 'stylesheet', type: 'text/css', href: 'http://fonts.googleapis.com/css?family=Open+Sans'}},
		{type: 'link', attrs: {rel: 'stylesheet', type: 'text/css', href: 'https://github.com/amio/wolplus/raw/master/wolplus.css'}}
	];

	// Inject function
	var inject = function (parent, elemData) {
		var elem = document.createElement(elemData.type);
		for (var attr in elemData.attrs) {
			elem[attr] = elemData.attrs[attr];
		}
		parent.appendChild(elem);
	};

	var head = document.querySelector('head');

	// Inject Style immediately (document-start)
	inject(head,injects[1]);
	inject(head,injects[2]);

	// Inject Script after document ready (document-end?)
	// (anyway, if script inject at document-start, it won't share the same scope with local scrits )
	window.addEventListener('DOMContentLoaded',function(){
		inject(head,injects[0]);
	},false);
})();
