$(document).ready (function () {
	var config = getConfig();
	var index;
	var id; //when edit pfd with id
	var url = $(location).attr('href');
	var action;
	console.log(url.indexOf("/edit/"));
	if ((url.indexOf("/edit/"))&&(typeof data != 'undefined')) {
		action = "edit";
		console.log(data.pfdData);
		var oldData = data.pfdData;
		index = url.lastIndexOf("/");
		id = url.slice(index + 1);
		console.log(oldData);
		$('#projectNumber').val(oldData.projectNumber);
		$('#devManagerNumber').val(oldData.devManagerNumber);
		$('#devFolder').val(oldData.devFolder);
		$('#ticketId').val(oldData.ticketId);
		$('#functionName').val(oldData.functionName);
		$('#devItemName').val(oldData.devItemName);
		$('#typePfdFile').val(oldData.typePfdFile);
		$('#personInCharge1').val(oldData.pic1);
		$('#personInCharge2').val(oldData.pic2);
		$('#beginDay').val(oldData.beginDay);
		$('#completeDay').val(oldData.completeDay);
		$('#hightRanking').val(oldData.hightRanking);
		$('#subordinatePosition').val(oldData.subordinatePosition);
		$('#typePfdFile').val(oldData.typePfdFile);
		$('#pfdPattern').val(oldData.templateFile);

		function editButton() {
			console.log('click');
			var dataEdit = {
				projectNumber: $('#projectNumber').val(),
				devManagerNumber: $('#devManagerNumber').val(),
				devFolder: $('#devFolder').val(),
				ticketId: $('#ticketId').val(),
				functionName: $('#functionName').val(),
				devItemName: $('#devItemName').val(),
				typePfdFile: parseInt($('#typePfdFile').val()),
				personInCharge1: $('#personInCharge1').val(),
				personInCharge2: $('#personInCharge2').val(),
				pfdPattern: $('#pfdPattern').val(),
				beginDay: $('#beginDay').val(),
				completeDay: $('#completeDay').val(),
				hightRanking: $('#hightRanking').val(),
				subordinatePosition: $('#subordinatePosition').val(),
				id: oldData.pfdId,
				devItemId: oldData.devItemId,
				functionId: oldData.functionId,
				projectId: oldData.projectId
			};
			console.log(dataEdit);
			checkError(editFunction);

			function editFunction () {
				var strJson = JSON.stringify(dataEdit);
				$.ajax({
				    url: "/edit",
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
				      	if (data.err == null) showAlert(data.result, null);
				      	else showAlert(data.result, data.err);
				   	},
					error: function() {
				      	console.log('process error');
				    },
				});
			}
		}

	}
	else {
		action = "regis";
		function submitButton() {
			
			var err = 0;
			var dataForm = {
				projectNumber: $('#projectNumber').val(),
				devManagerNumber: $('#devManagerNumber').val(),
				devFolder: $('#devFolder').val(),
				ticketId: $('#ticketId').val(),
				functionName: $('#functionName').val(),
				devItemName: $('#devItemName').val(),
				typePfdFile: parseInt($('#typePfdFile').val()),
				personInCharge1: $('#personInCharge1').val(),
				personInCharge2: $('#personInCharge2').val(),
				pfdPattern: $('#pfdPattern').val(),
				beginDay: $('#beginDay').val(),
				completeDay: $('#completeDay').val(),
				hightRanking: $('#hightRanking').val(),
				subordinatePosition: $('#subordinatePosition').val(),
			};
			console.log(dataForm);
			console.log(dataForm);
			checkError(submitFunction);
			function submitFunction () {
				var strJson = JSON.stringify(dataForm);

				$.ajax({
				    url: "/submit",
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
				      	if (data.err == null) showAlert(data.result, null);
				      	else showAlert(data.result, data.err);
				   	},
					error: function() {
				      	console.log('process error');
				    },
				});
			}
		}	
	}

	$('#dataCreateButton').click(function (e, ui) {
		if ((url.indexOf("/edit/"))&&(typeof data != 'undefined')) {
			editButton();
		}
		else submitButton();
	})
	$('#backHome').click(function (e, ui) {
		window.location = "http://" + config.ip + ":" + config.port;
	});

	$('form').submit(function formSubmit(ev) {
        console.log('formSubmit');
        return false; // ignore
    });


    function showAlert (msg, err) {
    	document.querySelector("#alert-msg").innerHTML = "";
    	document.querySelector("#err-msg").innerHTML = "";
    	if (msg != null) document.querySelector('#alert-msg').innerHTML = msg;
    	if (err != null) document.querySelector('#err-msg').innerHTML = err;
    	$('#confirm-ok').click(function (e, ui) {
    		if (err == null) {
    		switch (action) {
    			case "edit": window.location = "http://" + config.ip + ":" + config.port + "/edit-data";
    				break;
    			case "regis": window.location = "http://" + config.ip + ":" + config.port;
    				break;
    				 
    		}
    			
    		}
    		else {
    			$('#alert-modal').modal('hide');
    		}
    	})
        $('#alert-modal').modal('show');
    }

    function checkError (cb) {
    	var err = 0;
    	var errStyle = {
					"color": "red",
					"font-style": "italic"
			}
    	var formTitle = $('.form-group');

			for (var i = 0;i < formTitle.length; i++) {
				$(formTitle[i]).find('p').html("");
			}

			for (var i = 0; i <  formTitle.length; i++) {
				if (($(formTitle[i]).find('input').length > 0)) {
					if ((i != 2) && (i != 3) && (i != 12) && (i != 13)) {
						if ($(formTitle[i]).find('input').val() == '') {
							console.log("err");
							err = 1;
							$(formTitle[i]).find('p').html("error: Please fill this field!");
							$(formTitle[i]).find('p').css(errStyle);
						}
					}
				}
			}
			if (err == 0) {
				cb();
			}
			else {
				showAlert("Error", "Please fix errors");
			}
    }
    $('#homeButton').click(function (event, ui) {
		window.location = "http://" + config.ip + ":" + config.port;
	});

});