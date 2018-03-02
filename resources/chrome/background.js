var serverReachable = function() { //check if we have internet connection
	var x = new XMLHttpRequest();
	x.open("HEAD","https://www.pxt.io",false);
	try {
		x.send();
		s = x.status;
		// Make sure the server is reachable
		return (s >= 200 && s < 300 || s === 304);
		// catch network & other problems
	} catch (e) {
		return false;
	}
}

chrome.webRequest.onBeforeRequest.addListener(function (details) {   
	var lang = "en"; //default language
	var file = " ";
	var redirect_url = details.url;
	var requested_url = details.url;
	if(details.url.indexOf("https://www.pxt.io") > -1) {
		if(requested_url.indexOf("api/translations") > -1) {    //extract language and file name from url
				var regex = /lang=\s*(.*?)\s*&filename/g;
				var result = regex.exec(requested_url);
				lang = result[1];
				regex = /filename=\s*(.*?)\s*&approved/g;
				result = regex.exec(requested_url);
				result = result[1];
				file = result.replace(/%2F/i,"/");	
		}
		if(requested_url.indexOf("api/md/microbit/projects/") > -1) {    //extract language and file name from url
				var regex = /lang=\s*(.*?)\s*&live/g;
				var result = regex.exec(requested_url);
				lang = result[1];
				regex = /projects\s*(.*?)\s*\?/g;
				result = regex.exec(requested_url);
				file = result[1];
		}
		if(requested_url.indexOf("api/md/microbit/examples/") > -1) {    //extract language and file name from url
				var regex = /lang=\s*(.*?)\s*&live/g;
				var result = regex.exec(requested_url);
				lang = result[1];
				regex = /examples\s*(.*?)\s*\?/g;
				result = regex.exec(requested_url);
				file = result[1];
		}
		if(requested_url.indexOf("api/md/microbit/docs/") > -1) {    //extract language and file name from url
				var regex = /lang=\s*(.*?)\s*&live/g;
				var result = regex.exec(requested_url);
				lang = result[1];
				regex = /docs\s*(.*?)\s*\?/g;
				result = regex.exec(requested_url);
				file = result[1];
		}
		if(requested_url.indexOf("api/md/microbit/reference/") > -1) {    //extract language and file name from url
				var regex = /lang=\s*(.*?)\s*&live/g;
				var result = regex.exec(requested_url);
				lang = result[1];
				regex = /reference\s*(.*?)\s*\?/g;
				result = regex.exec(requested_url);
				file = result[1];
		}
		if(requested_url.indexOf("api/md/microbit/blocks/") > -1) {    //extract language and file name from url
				var regex = /lang=\s*(.*?)\s*&live/g;
				var result = regex.exec(requested_url);
				lang = result[1];
				regex = /blocks\s*(.*?)\s*\?/g;
				result = regex.exec(requested_url);
				file = result[1];
		}
	}
	
	if(details.url.indexOf("https://www.pxt.io") > -1) { 
			if(details.url.indexOf("www.pxt.io/api/md/microbit/projects?targetVersion=0.0.0&lang=pt-BR&live=1") > -1) {
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/projectslist";
			}
			if(details.url.indexOf("www.pxt.io/api/md/microbit/examples?targetVersion=0.0.0&lang=pt-BR&live=1") > -1) {
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/exampleslist";
			}
			if(requested_url.indexOf("www.pxt.io/api/md/microbit/projects/") > -1) { 
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/projects/" + lang + file;
			}
			if(requested_url.indexOf("www.pxt.io/api/md/microbit/examples/") > -1) { 
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/examples/" + lang + file;
			}
			if(requested_url.indexOf("www.pxt.io/api/md/microbit/docs/") > -1) { 
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/docs/" + lang + file;
			}
			if(details.url.indexOf("https://www.pxt.io/api/md/microbit/docs/projects.html") > -1) {
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/projectslist";
			}
			if(requested_url.indexOf("www.pxt.io/api/md/microbit/reference/") > -1) { 
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/reference/" + lang + file;
			}
			if(requested_url.indexOf("www.pxt.io/api/md/microbit/blocks/") > -1) { 
				redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/blocks/" + lang + file;
			}
	}
	
	if(details.url.indexOf("https://www.pxt.io/api/config/microbit/targetconfig") > -1) {
		redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/config/microbit/targetconfig";
	}
	
	if((details.url.indexOf("https://www.pxt.io/api/translations") > -1) && (lang == "pt-BR" || lang == "es-ES")) {    //custom languages. not available online
		redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/translations/" + lang + "/" + file;
	}
	
	if(details.url.indexOf("https://pxt.azureedge.net/compile/") > -1 ) {
		if(!serverReachable()) {
			redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/compile/"  + "38f5fd82cd5a4097203a4c897b61293e32aa715945713902f50c7ef8a0884d1c.hex";
		}
	}
	
	if(details.url.indexOf("https://www.pxt.io/api/md/microbit/tutorials/getting-started?targetVersion=0.0.0") > -1 ) {
		redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/md/microbit/tutorials/getting-startedtargetVersion=0.0.0";
	}	
	if(redirect_url.indexOf("https://www.pxt.io") > -1) { 
		if(!serverReachable()) {
			redirect_url = requested_url.replace("https://www.pxt.io","chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj");//browser is offline, load resources from local server	
		}
	}
	
	return {
		redirectUrl: redirect_url /*Redirection URL*/
	};
	
}, 
{urls: [ "*://www.pxt.io/*","*://pxt.azureedge.net/compile/*"]}, 
["blocking"]); // Block intercepted requests until this handler has finished




