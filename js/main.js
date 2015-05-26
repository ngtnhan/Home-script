$(document).ready(function () {
    var FORM1_REQUIRED = [
    	"inputTitle",
    	"inputName",
    	"inputEmail"
    ];

    var FORM_ARRAY = [
    	{idForm: "divForm1",
    	idTitle: "titleForm1"},
    	{idForm: "divForm2-1",
    	idTitle: "titleForm2"},
    	{idForm: "divForm2-2",
    	idTitle: "titleForm2"},
    	{idForm: "divForm3",
    	idTitle: "titleForm3"},
    	{idForm: "divForm4",
    	idTitle: "titleForm4"}
    ];

    var dataForm = {
    	form1: {
    		inputTitle: null,
    		inputLocation: null,
    		inputDescription: null,
    		inputName: null,
    		inputEmail: null
    	},
    	form2: [],
    	form3: {
    		basicPoll: false,
    		checkbox1: false,
    		checkbox2: false,
    		checkbox3: false
    	}
    }

    var dateSelected = [];
    var current = 0;
    var numberOfTimeSlot = 3;

    startInterface();
    $('#datePicker').multiDatesPicker({
      	minDate: +1, // jQuery UI datepicker option
      	onSelect: function(date) {
            console.log('One date is selected');
            showDateSelected(date);
    	}
    });

    $('.btn-next').click(function (e, ui) {
    	console.log("Next Click, next form " + FORM_ARRAY[current + 1].idForm);
    	switch (current) {
    		case 0: checkForm1();
    			break;
    		case 1: checkForm2();
    			break;
    	}
    });

    $('.btn-back').click(function (e, ui) {
    	console.log("Back click, form " + FORM_ARRAY[current - 1].idForm);
    	displayNextForm(false);
    })

    /*Display next form 
    boolean next: true-next, false-back
    */
    function displayNextForm(next) {
    	var currentForm = document.getElementById(FORM_ARRAY[current].idForm);
    	$(currentForm).addClass("none-display");
    	if (next) current++;
    	else current--;
        if (current == 2) {
            generateForm2();
        }
    	currentForm = document.getElementById(FORM_ARRAY[current].idForm);
    	$('.inputErr').html('');
    	$(currentForm).removeClass("none-display");
    }    

    /*check fields of Form 1*/
    function checkForm1() {
    	var errField = false;
    	console.log("Check fields of form 1");
        $('.inputErr').html('');
    	for (var i = 0; i < FORM1_REQUIRED.length; i++) {
    		var inputElement = document.getElementById(FORM1_REQUIRED[i]);
    		if ($(inputElement).val() == '') {
    			errField = true;
    			var err = $(inputElement).parent().find('.inputErr');
    			displayErr($(err).attr('id'), "Please enter a value");
    		}
    	}
    	if (!errField) {
    		getDataForm1();
    		displayNextForm(true);
    	}
    }

    function getDataForm1() {
    	console.log("get data form 1");
    	dataForm.form1.inputTitle = $('#inputTitle').val();
    	dataForm.form1.inputLocation = $('#inputLocation').val();
    	dataForm.form1.inputDescription = $('#inputDescription').val();
    	dataForm.form1.inputName = $('#inputName').val();
    	dataForm.form1.inputEmail = $('#inputEmail').val();
    }

    /*check date of Form 2*/
    function checkForm2() {
    	console.log("Check form 2");
        if (dateSelected.length == 0) {
            displayErr("dateErr", "You must select date");
        }
        else {
            console.log(dateSelected);
            displayNextForm(true);
        }        
    }

    /*Display error for errorField*/
    function displayErr(errId, msg) {
    	console.log("Display error");
    	var errElement = document.getElementById(errId);
    	$(errElement).html(msg);
    }

    /*ignore button*/
    $('form').submit(function formSubmit(ev) {
        console.log('formSubmit');
        return false; // ignore
    });

    function startInterface() {
    	$(".formStep:not(#divForm1)").addClass("none-display");
    }

    /*
    Check if date is exist in dateSelected array -> return
    else push to array and show
        */
    function showDateSelected(date) {
        var textAdd =   "<div class='row'>" +
                            "<span class='dateTrash col-md-1 glyphicon glyphicon-trash' aria-hidden='true'></span>" +
                            "<p class='dateP col-md-10'>" + date + "</p>" +
                        "</div>";
        for (var i = 0; i < dateSelected.length; i++) {
            if (date == dateSelected[i]) {
                console.log("Date is exist!");
                removeDateSelected(date);
                return;
            }
        }
        /*not exist*/
        $('#datePicker').multiDatesPicker('addDates', date);
        dateSelected = $('#datePicker').multiDatesPicker('getDates');

        var newElement = $(textAdd);
        $('#datesSelectedDiv').append(newElement);
        newElement.addClass("dateRow");

        newElement.find('.dateTrash').on("click", function (e, ui) {
            var dateDelete = new Date($(this).parent().find('.dateP').text());
            removeDateSelected($(this).parent().find('.dateP').text());
        })
    }

    function removeDateSelected(date) {
        console.log("Delete date selected");

        $('#datePicker').multiDatesPicker('removeDates', date);
        dateSelected = $('#datePicker').multiDatesPicker('getDates');

        var rows = $('#datesSelectedDiv').find('.row');
        console.log(rows.length);
        for (var j = 0; j < rows.length; j++) {
            if ($(rows[j]).find('.dateP').text() == date) {
                $(rows[j]).remove();
                console.log('Removed');
            }
        }
    }

    function generateForm2() {
        var text = "";
        var dateExist = $('#tableTime').find('.dateP');
        for (var i = 0; i < dateSelected.length; i++) {
            var exist = false;
            for (var j = 0; j < dateExist.length; j++) {
                if ($(dateExist[j]).text() == dateSelected[i]) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                text += "<tr id='rowDate" + i + "'>" +
                            "<td>" +
                                "<div class='divDateTrash'>" + 
                                    "<span class='dateTrash trashForm22 glyphicon glyphicon-trash' aria-hidden='true' style='display: inline-block;'></span>" +
                                    "<p class='dateP' style='display: inline-block; margin-left: 5px;'>" + dateSelected[i] + "</p>" +
                                "</div>" + 
                            "</td>" +
                            "<td><input type='text'></td>" +
                            "<td><input type='text'></td>" +
                            "<td><input type='text'></td>" +
                        "</tr>";    
            }
        }
        var newElement = $(text);
        $('#tableTime').append(newElement);
        var dateTrash = $('#tableTime').find('.dateTrash');
        $('.trashForm22').on("click", function (e, ui) {
            var dateDelete = ($(this).parent().find('.dateP').text());
            for (var j = 0; j < dateSelected.length; j++) {
                if (dateSelected[j] == dateDelete) {
                    var trElement = document.getElementById("rowDate" + j);
                    $(trElement).remove();
                    break;
                }
            }
            removeDateSelected(dateDelete);
            if (dateSelected.length == 0) {
                displayNextForm(false);
            }
        });
    }

    $('#addTimeSlot').on("click", function (e, ui) {
        console.log("Add time slots");
        numberOfTimeSlot++;
        var text = "<td><input type='text'></td>";
        var newElement = document.createElement('td');
        $(newElement).text("Time " + numberOfTimeSlot);
        $('#rowTitle').append(newElement);
        // $('#rowTitle').append($("<td>Time " + numberOfTimeSlot + "</td>"));
        for (var i = 0; i < dateSelected.length; i++) {
            var rowElement = document.getElementById("rowDate" + i);
            $(rowElement).append($(text));
        }
    });



})