
// Register an event listener which 
//traces all requests before being fired
chrome.webRequest.onBeforeRequest.addListener(function (details) {   
	var online = navigator.onLine;
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
				var file = result.replace(/%2F/i,"/");	
		}
	}
	
	if(details.url.indexOf("https://www.pxt.io") > -1) { 
		if(!online) {
			redirect_url = requested_url.replace("https://www.pxt.io","chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj");//browser is offline, load resources from local server
		}
	}
	
	if(details.url.indexOf("https://www.pxt.io/api/config/microbit/targetconfig") > -1) {
		redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/config/microbit/targetconfig";
	}
	
	if((details.url.indexOf("https://www.pxt.io/api/translations") > -1) && (lang == "pt-BR" || lang == "es-ES")) {    //custom languages. not available online
		redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/translations/" + lang + "/" + file;
	}
	
	if(details.url.indexOf("https://pxt.azureedge.net/compile/0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.hex") > -1 ) {
		redirect_url = "chrome-extension://ngbgjifibhpeaiomjmfhnegegokbmlgj/api/compile/"  + "0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.hex";
	}
		
	return {
		redirectUrl: redirect_url /*Redirection URL*/
	};
	
}, 
{urls: [ "<all_urls>" ]}, 
["blocking"]); // Block intercepted requests until this handler has finished





