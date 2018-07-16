chrome.webRequest.onBeforeRequest.addListener(function (details) {
	var lang = "en"; //default language
	var requestedUrl = details.url;

	if(requestedUrl.indexOf("api/translations") > -1) {
		// Extract language and file name from url
		var regex = /lang=\s*(.*?)\s*&filename/g;
		var result = regex.exec(requestedUrl);
		if(result != null) {
			lang = result[1];
		}
		regex = /filename=\s*(.*?)\s*&approved/g;
		result = regex.exec(requestedUrl);
		result = result[1];
		var file = result.replace(/%2F/i,"/");
		return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/translations/" + lang + "/" + file};
	}

	if(requestedUrl.indexOf("www.pxt.io/api/md/microbit/examples") > -1) {
		var regex = /lang=\s*(.*?)\s*&live/g;
		var result = regex.exec(requestedUrl);
		if(result != null) {
			lang = result[1];
		}
		regex = /examples\s*(.*?)\s*\?/g;
		result = regex.exec(requestedUrl);
		var file = result[1];

		if(requestedUrl.indexOf("www.pxt.io/api/md/microbit/examples/") > -1) {
			return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/examples/" + lang + file};
		}

		if(requestedUrl.indexOf("www.pxt.io/api/md/microbit/examples") > -1) {
			return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/examples/" + lang + "/examples.md"};
		}
	}

	if(requestedUrl.indexOf("www.pxt.io/api/md/microbit/docs/") > -1) {
		if(requestedUrl.includes(".html")){
			return { redirectUrl: requestedUrl.replace("docs/", "").replace(".html", "")};
		}
	}

	if(requestedUrl.indexOf("www.pxt.io/api/config/microbit/targetconfig") > -1 ) {
		return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/targetconfig.json"};
	}

	if(requestedUrl.indexOf("www.pxt.io/api/clientconfig") > -1) {
		return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/clientconfig.json"};
	}

	if(requestedUrl.indexOf("www.pxt.io/api/md/microbit/tutorials/getting-started?targetVersion=0.0.0") > -1 ) {
		return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/tutorials/getting-startedtargetVersion=0.0.0"};
	}

	if(requestedUrl.indexOf("www.pxt.io/api/compile/extension") > -1 ) {
		return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/compile/extension.json"};
	}

	if(requestedUrl.indexOf("pxt.azureedge.net/compile/") > -1 || requestedUrl.indexOf("makecode.com/compile/") > -1) {
		var sha = requestedUrl.split("compile/")[1];
		return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/compile/"  + sha};
	}

	if(requestedUrl.indexOf("az416426.vo.msecnd.net/scripts/a/ai.0.js") > -1 ) {
		return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/ai.0.js"};
	}

	if(requestedUrl.indexOf("az742082.vo.msecnd.net/pub/psopafpj") > -1 ) {
		return { redirectUrl: "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/psopafpj.png" };
	}

	return { redirectUrl: details.url};
},
{urls: [
	"*://www.pxt.io/api/translations*",
	"*://www.pxt.io/api/config/microbit/targetconfig*",
	"*://www.pxt.io/api/md/microbit/docs*",
	"*://www.pxt.io/api/md/microbit/examples*",
	"*://www.pxt.io/api/clientconfig*",
	"*://www.pxt.io/api/md/microbit/tutorials/getting-started?*",
	"*://pxt.azureedge.net/compile/*",
	"*://makecode.com/compile/*",
	"*://www.pxt.io/api/compile/extension",
	"*://az416426.vo.msecnd.net/scripts/a/ai.0.js",
	"*://az742082.vo.msecnd.net/pub/psopafpj"
	]
},
["blocking"]); // Block intercepted requests until this handler has finished