$(document).ready (function () {
	var config = getConfig();
	$('.viewPfdFile').click(function (event, ui) {
		var str = event.target.id.slice(4, event.target.id.length);
		var url = "/pattern-list/viewPfd/" + str;
		window.location = "http://" + config.ip + ":" + config.port + "/pfd-edit?name=" + str;
	});

	$('#homeButton').click(function (event, ui) {
		window.location = "http://" + config.ip + ":" + config.port;
	});

});