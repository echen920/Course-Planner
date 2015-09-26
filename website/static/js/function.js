var timeoutId = 0;
var course_code_2_id = {};

$(document).ready(function(){

	$("form :input").change(function() {
		email = document.getElementById("email").value;
		pws = $('.pw');

		if (email.toLowerCase().indexOf("utoronto.ca", this.length - "utoronto.ca".length) != -1 && pws[0].value.length > 0 && pws[0].value == pws[1].value) {
			$('#createBtn').prop('disabled', false);
		} else {
			$('#createBtn').prop('disabled', true);
		}
	});

	$('#removeCourseModal .modal-body .btn-primary').click(function() {
		$(this).toggleClass("btn-danger");
		$(this).toggleClass("btn-primary");
	});

	
});

function removeCourses() {
	var courses = $('#removeCourseModal .modal-body .btn-danger');
	var courses_rm = ""
	for (var i = 0; i < courses.length; i ++) {
		courses_rm += courses[i].value + ",";
	}
	courses_rm = courses_rm.substring(0, courses_rm.length - 1);
}

function addImportantDate() {
	var time = document.getElementById("addDeadLineTime").value.trim();
	var date = document.getElementById("addDeadLineDate").value.trim();
	var location = document.getElementById("addDeadLineLocation").value.trim();
	var item_name = document.getElementById("addDeadLineItemType").value.trim() + document.getElementById("addDeadLineItemNum").value.trim();
	var course_sect_id = document.getElementById("deadline_course_sect_id").value.trim();
	var target_url = "/section/" + course_sect_id + "/date/create";

	$.ajax({
		url: target_url,
		type: "POST",
		data: {
			time: time,
			date: date,
			location: location,
			item_name: item_name
		}
	}).done(function (data, status, response) {
		document.getElementById("addDeadLineTime").value = "";
		document.getElementById("addDeadLineDate").value = "";
		document.getElementById("addDeadLineLocation").value = "";
		document.getElementById("addDeadLineItemType").value = "";
		document.getElementById("addDeadLineItemNum").value = "";
		document.getElementById("deadline_course_sect_id").value = "";
		if (status == 202) {
			// place holder for refreshing info.
			location.reload();	
		}
	});
}


function updateCourseSectionInfo() {
	var id = course_code_2_id[document.getElementById("course_code").value.trim()]
	var target_url = "/course/" + id + "/section/list";
	$.ajax({
		type: "GET",
		url: target_url
	}).done(function(data, status, response) {
		var options = document.getElementById('course_sect_id');
		options.options.length = 0;

		if (data && data.length > 0) {
			for (var i = 0; i < data.length; i ++) {
				var option = document.createElement("option");
    			option.text = data[i].section;
    			option.value= data[i].course_sec_id;
    			options.add(option);
			}
			document.getElementById('addCourseSect').style.display="";
		} else {
			document.getElementById('addCourseSect').style.display="none";
		}
	});
}

function setUpAddDeadLine() {
	$("#addDeadlineDate").datepicker({ dateFormat: "yyyy-mm-dd" });
	$.ajax({
		type: "GET",
		url: "course/list"
	}).done(function(data, status, response) {
		var options = document.getElementById("deadline_course_sect_id");
		options.options.length = 0;
		for (var i = 0; i < data.length; i ++) {
			var option = document.createElement("option");
			option.text = data[i].course_code + data[i].semester + " - " + data[i].section;
			option.value= data[i].course_sec_id;
			options.add(option);
		}
	});
}