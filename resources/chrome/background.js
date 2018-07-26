chrome.browserAction.onClicked.addListener(
	function openMakecode() {
		chrome.tabs.create({
		     "url": "/index.html"
		});
	}
);
