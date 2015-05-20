$(document).ready (function () {
	$('#alert-modal').hide();
	setNo();
	var config = getConfig();
	var idSelect;
	$('#homeButton').click(function (event, ui) {
		window.location = "http://" + config.ip + ":" + config.port;
	});

	function showAlert (msg, err) {
    	document.querySelector("#alert-msg").innerHTML = "";
    	document.querySelector("#err-msg").innerHTML = "";
    	if (msg != null) document.querySelector('#alert-msg').innerHTML = msg;
    	if (err != null) document.querySelector('#err-msg').innerHTML = err;
        $('#alert-modal').modal('show');
    }
    
    function setNo () {
    	var trOfTable = $('.tableContent');
    	var no = 1;
    	console.log(trOfTable.length);
    	for (var i = 0; i < trOfTable.length; i++) {
    		var tdOfRow = $(trOfTable[i]).find('td');
    		$(tdOfRow[0]).html(no);
    		no++;
    	}
    }
});