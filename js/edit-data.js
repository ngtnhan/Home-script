$(document).ready (function () {
	$('#alert-modal').hide();
	beginInterface();
	setNo();
	var config = getConfig();
	var idSelect;
	$('#homeButton').click(function (event, ui) {
		window.location = "http://" + config.ip + ":" + config.port;
	});

	$('.editPfd').click(function (event, ui) {

		var strJson;
		if (event.target.type == "button") {
			idSelect = $(event.target).find('span').prop('id');
		}
		else {
			idSelect = event.target.id;
		}
		idSelect = idSelect.slice(4);
		idSelect = parseInt(idSelect);

		console.log(idSelect);

		var tdOfRow = $('#table' + idSelect).find('td');
		strJson = JSON.stringify({id: idSelect});
		window.location = "http://" + config.ip + ":" + config.port + "/edit/" + idSelect;
	});

	$('.removePfd').click(function (event, ui) {
		var id = event.target.id;
		if (event.target.type == "button") {
			idSelect = $(event.target).find('span').prop('id');
		}
		else {
			idSelect = event.target.id;
		}
		idSelect = idSelect.slice(4);
		idSelect = parseInt(idSelect);
		console.log(idSelect);
		showConfirm("Want to delete?");
	});	

	function removePfd() {
		var strJson = JSON.stringify({id: idSelect});
		$.ajax({
			url: "/remove",
		    type: "POST",
		    dataType: "json",
		    data: strJson,
		    contentType: "application/json",
		    cache: false,
		    timeout: 5000,
		    complete: function() {
	      	console.log('process complete');
	    	},
	    	success: function(data) {
		      	console.log('success');
		      	console.log(data);
		     	if (data.result == "success") {
		     		removeSuccess();
		     	}
		     	else {
		     		showAlert ("Failed", null);
		     	}
			},
			error: function() {
		      	console.log('process error');
		    },
		});
	}
	

	function beginInterface () {
		$('input').hide();
		$('p').show();
		$('select').hide();
	}

	function showAlert (msg, err) {
    	document.querySelector("#alert-msg").innerHTML = "";
    	document.querySelector("#err-msg").innerHTML = "";
    	if (msg != null) document.querySelector('#alert-msg').innerHTML = msg;
    	if (err != null) document.querySelector('#err-msg').innerHTML = err;
        $('#alert-modal').modal('show');
    }

    function removeSuccess () {
    	$('#table' + idSelect).remove();
    	setNo();
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

    function showConfirm(msg) {
        console.log(msg);
        document.querySelector('#confirm-msg').innerHTML = msg;
        document.querySelector('#confirm-ok').onclick = function confirmOK() {
            removePfd();
            $('#confirm-modal').modal('hide');
        }
        $('#confirm-modal').modal('show');
    }
});