$(document).ready (function () {
	var config = getConfig();
	$('#homeButton').click(function (event, ui) {
		window.location = "http://" + config.ip + ":" + config.port;
	});

	$('.showPfd').click(function (event, ui) {
		var elementSelect = document.getElementById(event.target.id);
		var devNumber = $(elementSelect).html();
		window.location = "http://" + config.ip + ":"+ config.port + "/pfd-show?dev=" + devNumber;
	});
	var dataConfig = getConfig();
	console.log(dataConfig);

	$('#toExcel').click(function (event, ui) {
		console.log('table to excel');
	  	$("#devList").table2excel({
		    // exclude CSS class
		    exclude: ".noExl",
		    name: "開発一覧"
		});
	});


});
