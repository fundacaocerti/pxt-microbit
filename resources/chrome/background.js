/*
 * Copyright (C) 2018 Fundação CERTI
 */
chrome.browserAction.onClicked.addListener(
	function openMicrobitExtension() {
		chrome.tabs.create({
		     "url": "/index.html"
		});
	}
);
