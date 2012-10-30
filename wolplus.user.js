// ==UserScript==
// @name         WOL.Plus
// @namespace    http://www.airmio.com/
// @version      0.2
// @description  将WOL中鼠标指向技能的英文说明替换为中文说明
// @match        http://www.worldoflogs.com/*
// @updateURL    https://github.com/amio/wolplus/raw/master/wolplus.meta.js
// @downloadURL  https://github.com/amio/wolplus/raw/master/wolplus.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

;'use strict';
(function(){

	// List to inject
	var injects = [
		'script>https://github.com/amio/wolplus/raw/master/wolplus.js',
		'style>https://github.com/amio/wolplus/raw/master/wolplus.css'
	];

	var head = document.querySelector('head'),
		TMPL = {
			script: '<script type="text/javascript" src="{$src}"></script>',
			style : '<link rel="stylesheet" type="text/css" href="{$src}" />'
		};

	if (head) {
		var fragment = document.createElement('div');
		for(var i = injects.length, item; i--;){
			item = injects[i].split('>');
			fragment.innerHTML = TMPL[item[0]].replace('{$src}',item[1]);
			head.appendChild(fragment.firstChild);
		}
	}
})();