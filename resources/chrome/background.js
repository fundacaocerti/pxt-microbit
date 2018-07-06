chrome.webRequest.onBeforeRequest.addListener(function (details) {
	var lang = "en"; //default language
	var file = " ";
	var redirect_url = details.url;
	var requested_url = details.url;

	if(details.url.indexOf("https://www.pxt.io") > -1) {
		if(requested_url.indexOf("api/translations") > -1) {    //extract language and file name from url
				var regex = /lang=\s*(.*?)\s*&filename/g;
				var result = regex.exec(requested_url);
				if(result != null) {
					lang = result[1];
				}
				regex = /filename=\s*(.*?)\s*&approved/g;
				result = regex.exec(requested_url);
				result = result[1];
				file = result.replace(/%2F/i,"/");
		}
		if(requested_url.indexOf("api/md/microbit/projects/") > -1) {    //extract language and file name from url
				var regex = /lang=\s*(.*?)\s*&live/g;
				var result = regex.exec(requested_url);
				if(result != null) {
					lang = result[1];
				}
				regex = /projects\s*(.*?)\s*\?/g;
				result = regex.exec(requested_url);
				file = result[1];
		}
		if(requested_url.indexOf("api/md/microbit/examples") > -1) {    //extract language and file name from url
				var regex = /lang=\s*(.*?)\s*&live/g;
				var result = regex.exec(requested_url);
				if(result != null) {
					lang = result[1];
				}
				regex = /examples\s*(.*?)\s*\?/g;
				result = regex.exec(requested_url);
				file = result[1];
		}
	}

	if(details.url.indexOf("https://www.pxt.io") > -1) {
			if(details.url.indexOf("www.pxt.io/api/md/microbit/projects?targetVersion=0.0.0&lang=pt-BR&live=1") > -1) {
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/projectslist";
			}
			if(details.url.indexOf("www.pxt.io/api/md/microbit/examples?targetVersion=0.0.0&lang=pt-BR&live=1") > -1) {
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/examples/" + lang + "/examples.md";
			}
			if(requested_url.indexOf("www.pxt.io/api/md/microbit/projects/") > -1) {
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/projects/" + lang + file;
			}
			if(requested_url.indexOf("www.pxt.io/api/md/microbit/examples/") > -1) {
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/examples/" + lang + file;
			}
			if(requested_url.indexOf("www.pxt.io/api/md/microbit/docs/") > -1) {
				if(requested_url.includes(".html")){
					redirect_url = requested_url.replace("docs/", "").replace(".html", "");
				}
			}
	}

	if(details.url.indexOf("https://www.pxt.io/api/config/microbit/targetconfig") > -1 ) {
		redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/targetconfig.json";
	}

	if(details.url.indexOf("https://www.pxt.io/api/clientconfig") > -1) {
		redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/clientconfig";
	}

	if((details.url.indexOf("https://www.pxt.io/api/translations") > -1) && (lang == "pt-BR" || lang == "es-ES")) {    //custom languages. not available online
		redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/translations/" + lang + "/" + file;
	}

	return {
		redirectUrl: redirect_url /*Redirection URL*/
	};

},
{urls: ["*://www.pxt.io/api/translations*", "*://www.pxt.io/api/config/microbit/targetconfig*", "*://www.pxt.io/api/md/microbit/docs*", "*://www.pxt.io/api/md/microbit/examples*", "*://www.pxt.io/api/md/microbit/projects*", "*://www.pxt.io/api/clientconfig*"]},
["blocking"]); // Block intercepted requests until this handler has finished