/*global console, FB, $*/

window.fbAsyncInit = function () {
	"use strict";
	FB.init({
		appId      : '905448086190770',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.4'
	});
};

// Load the SDK asynchronously
(function (d, s, id) {
	"use strict";
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) { return; }
	js = d.createElement(s);
	js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));