var course_code_to_id = {};

$(document).ready(function(){
  if (document.getElementById("due_date"))
    $("#due_date").datepicker({ dateFormat: "yy-mm-dd" });

  displayDeadlinesList();

  // If this is a re-direct from the user clicking on a calendar event, get the id from the URL
  var deadlines_id = window.location.href.split('#')[1];

  if (deadlines_id) {
    displayDeadline(deadlines_id);
  }  

  $("#create-deadline").click(function(){
    $("#rightContent").hide();
    $('#add-course-page').hide();
    $('#remove-course-page').hide();
    $('#display-deadline-page').hide();
    $('#add-deadline-page').filter(function() {
      showCoursesToAddDeadlines();
      return $(this).css('display') == 'none';
  }).animate({ opacity: 'toggle'}, 1000 );

    return false;
  });

  $.ajax({
      type: "GET",
      url: "/course",
  }).done(function (data, status, response) {
      var courses = []
      var i = data.length;
      while(i-- > 0) {
        courses.push(data[i].course);
        course_code_to_id[data[i].course] = data[i].course_id;
      }
      $("#course_code").autocomplete({source:courses, 
        select: function(event, ui) {
          updateCourseSectionInfo(ui.item);
        }
      });
  });

  $('#add-course').click(function(){
    $('#rightContent').hide();
    $('#add-deadline-page').hide();
    $('#remove-course-page').hide();
    $('#display-deadline-page').hide();
    $('#add-course-page').filter(function() {
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    return false;
  });

  $('#button-add-course').click(function(){
    // DO ERROR CHECKING FOR VALID FIELDS???????
    $('#add-course-page').hide();
    $('#add-deadline-page').hide();
    $('#rightContent').filter(function() {
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    return false;
  });

  $('#remove-course').click(function(){
    $('#rightContent').hide();
    $('#add-deadline-page').hide();
    $('#add-course-page').hide();
    $('#display-deadline-page').hide();
    $('#remove-course-page').filter(function() {
      showCoursesToRemove();
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    return false;
  });

  $('#button-done').click(function(){
    $('#remove-course-page').hide();
    $('#rightContent').filter(function() {
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    return false;
  });
});


function updateCourseSectionInfo(option) {
  if (option != null) {
    var id = course_code_to_id[option.value.trim()];
  }
  else {
    var id = course_code_to_id[document.getElementById("course_code").value.trim()]
  }
  var options = document.getElementById('course_sect_id');
  if(id) {
    var target_url = "/course/" + id + "/section/list";
    $.ajax({
      type: "GET",
      url: target_url
    }).done(function(data, status, response) {
      options.options.length = 0;

      if (data && data.length > 0) {
        for (var i = 0; i < data.length; i ++) {
          var option = document.createElement("option");
            option.text = data[i].section;
            option.value= data[i].course_sec_id;
            options.add(option);
        }
      } else {
        document.getElementById('button-add-course').disabled=false;
      }
    });
  } else {
    options.options.length = 0;
  }
}

function addCourse() {

  if ( !$('#course_code').val() && !$('#course_sect_id').val() ) {
    window.alert("Please enter a valid course code and course section!");
  } else if ( !$('#course_code').val() ) {
    window.alert("Please enter a valid course code!");
  } else if ( !$('#course_sect_id').val() ) {
    window.alert("Please enter a valid course section!");
  } else {

    var options = document.getElementById("course_sect_id");
    var course_sec_id = options.options[options.selectedIndex].value;
    var is_tut = options.options[options.selectedIndex].text.indexOf('T') == 0;
    var target_url = "/course/add";

    $.ajax({
      url: target_url,
      type: "POST",
      data: {
        course_sec_id: course_sec_id,
        tutorial_sec: is_tut
      }
    }).done(function (data, status, response) {
      options.options.length = 0;
      document.getElementById("course_code").value = "";
      if (status == 202) {
        // place holder for refreshing info.
        location.reload();
      }
    });

    $('#add-course-page').hide();
    $('#add-deadline-page').hide();
    $('#rightContent').filter(function() {
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );

  }
}

function showCoursesToRemove() {
  var courses = document.getElementById("course-items");
  courses.innerHTML = "";
  var target_url = "/course/list";
  $.ajax({
    type: "GET",
    url: target_url,
  }).done(function (data, status, response) {
    if (data && data.length > 0) {
      var courses_listed = [];
      for (var i = 0; i < data.length; i ++) {
        if (courses_listed[courses_listed.length-1] != data[i].course_sec_id) {
          courses_listed.push(data[i].course_sec_id);
          var div = document.createElement("div");
          div.className = "course-item";
          var img = document.createElement("img");
          img.src = "static/imgs/delete-course.png";
          var anchor = document.createElement("a");
          anchor.href = "javascript:removeCourse(" + data[i].course_sec_id + ")";
          anchor.appendChild(img);
          var course_code = document.createElement("h1");
          course_code.innerHTML = String(data[i].course_code);
          var course_section = document.createElement("h1");
          course_section.innerHTML = String(data[i].section);
          div.appendChild(anchor);
          div.appendChild(course_code);
          div.appendChild(course_section);
          courses.appendChild(div);
        }
      }
    } else {
      var div = document.createElement("div");
      div.class = "course-item";
      var h1 = document.createElement("h1");
      h1.innerHTML = "No courses to remove!<br><br>Click 'Add Course' to add courses to your account.";
      div.appendChild(h1);
      courses.appendChild(div);
    }
  });
}

function showCoursesToAddDeadlines() {
  var add_deadline_page = document.getElementById("add-deadline-page");
  var top_bar = document.getElementById("top-bar");
  top_bar.innerHTML = "";
  var second_bar = document.getElementById("second-bar");
  second_bar.innerHTML = "";
  var description_title_bar = document.getElementById("description-title-bar");
  description_title_bar.innerHTML = "";
  var add_page_detail = document.getElementById("add-page-detail");
  add_page_detail.innerHTML = "";
  var add_page_buttons = document.getElementById("add-page-button");
  add_page_buttons.innerHTML = "";

  var div = document.getElementById("no-courses-message");
  div.innerHTML = "";
  var target_url = "/course/list";
  $.ajax({
    type: "GET",
    url: target_url,
  }).done(function (data, status, response) {
    if (data && data.length > 0) {
      var req_fields = document.createElement("h2");
      req_fields.id = "required-fields";
      req_fields.innerHTML = "* Indicates required field";
      var add_page_title = document.createElement("div");
      add_page_title.className = "right-content-title";
      add_page_title.id = "add-page-title";
      var deadline_title = document.createElement("input");
      deadline_title.type = "text";
      deadline_title.id = "deadline_title";
      deadline_title.name = "deadline_title";
      deadline_title.placeholder = "ENTER TITLE *";
      add_page_title.appendChild(deadline_title);
      top_bar.appendChild(req_fields);
      top_bar.appendChild(add_page_title);

      var add_page_due_date = document.createElement("div");
      add_page_due_date.className = "right-content-due-date";
      add_page_due_date.id = "add-page-due-date";
      var due_date_h1 = document.createElement("h1");
      due_date_h1.innerHTML = "Enter Due Date *";
      var due_date_input = document.createElement("input");
      due_date_input.type = "date";
      due_date_input.id = "due_date";
      due_date_input.name = "due_date";
      add_page_due_date.appendChild(due_date_h1);
      add_page_due_date.appendChild(due_date_input);

      var add_page_due_time = document.createElement("div");
      add_page_due_time.className = "right-content-due-date";
      add_page_due_time.id = "add-page-due-time";
      var due_time_h1 = document.createElement("h1");
      due_time_h1.innerHTML = "Enter Time Due *";
      var due_time_input = document.createElement("input");
      due_time_input.type = "time";
      due_time_input.id = "time_due";
      due_time_input.name = "time_due";
      add_page_due_time.appendChild(due_time_h1);
      add_page_due_time.appendChild(due_time_input);

      var add_page_due_location = document.createElement("div");
      add_page_due_location.className = "right-content-due-date";
      add_page_due_location.id = "add-page-due-location";
      var due_location_h1 = document.createElement("h1");
      due_location_h1.innerHTML = "Enter Location";
      var due_location_input = document.createElement("input");
      due_location_input.type = "text";
      due_location_input.id = "location_due";
      due_location_input.name = "location_due";
      due_location_input.placeholder = "(e.g. EX100)";
      add_page_due_location.appendChild(due_location_h1);
      add_page_due_location.appendChild(due_location_input);

      var add_page_target_course = document.createElement("div");
      add_page_target_course.className = "right-content-due-date";
      add_page_target_course.id = "add-page-target_course";
      var target_course_h1 = document.createElement("h1");
      target_course_h1.innerHTML = "Select A Course *";
      var target_course_input = document.createElement("select");
      target_course_input.className = "form-control";
      target_course_input.id = "user_course_code";
      target_course_input.name = "user_course_code";
      target_course_input.options.length = 0;
      add_page_target_course.appendChild(target_course_h1);
      add_page_target_course.appendChild(target_course_input);

      var description_title = document.createElement("h1");
      description_title.innerHTML = "Deadline Description";
      description_title_bar.appendChild(description_title);

      add_page_detail.innerHTML = '<textarea id="textInput" name="description" maxlength="1500" placeholder="Enter Description"></textarea>';

      add_page_buttons.innerHTML = '<button type="button" id="button-add-deadline" onclick="addDeadline()">Add Deadline</button';

      second_bar.appendChild(add_page_due_date);
      second_bar.appendChild(add_page_due_time);
      second_bar.appendChild(add_page_due_location);
      second_bar.appendChild(add_page_target_course);

      var courses_listed = [];
      for (var i = 0; i < data.length; i ++) {
        if (courses_listed[courses_listed.length-1] != data[i].course_sec_id) {
          courses_listed.push(data[i].course_sec_id);
          var option = document.createElement("option");
          option.text = data[i].course_code;
          option.value= data[i].course_sec_id;
          target_course_input.add(option);
        }
      }
    } else {
      var h1 = document.createElement("h1");
      h1.innerHTML = "No courses to display deadlines for!<br><br>Click 'Add Course' to add courses to your account.";
      div.appendChild(h1);
    }
  });
}

function addDeadline() {

  if (!$('#deadline_title').val() || !$('#due_date').val() || !$('#time_due').val()) {
    window.alert("Please make sure all fields are filled");
  } else {
var courses_listed = [];
    var options = document.getElementById("user_course_code");
    var course_sec_id = options.options[options.selectedIndex].value;
    var item_name = document.getElementById("deadline_title").value.trim()
    var due_date = document.getElementById("due_date").value;
    var time_due = document.getElementById("time_due").value;
    var location_due = document.getElementById("location_due").value.trim();
    var description = document.getElementById("textInput").value.trim();
    var target_url = "/section/" + course_sec_id + "/date/create";
    $.ajax({
      url: target_url,
      type: "POST",
      data: {
        date: due_date,
        time: time_due,
        location: location_due,
        description: description,
        item_name: item_name,
      }
    }).done(function (data, status, response) {
      options.options.length = 0;
      document.getElementById("user_course_code").value = "";
      document.getElementById("deadline_title").value = "";
      document.getElementById("due_date").value = "";
      document.getElementById("time_due").value = "";
      document.getElementById("location_due").value = "";
      document.getElementById("textInput").value = "";
      displayDeadlinesList();
      if (status == 202) {
        // place holder for refreshing info.
        location.reload();
      }
    });
    $("#add-deadline-page").hide();
    $('#rightContent').animate({ opacity: 'toggle'}, 1000 );
  }
}

function removeCourseDeadline(due_date_id) {
  var target_url = "/date/destroy";
  $.ajax({
    url: target_url,
    type: "POST",
    data: {
      course_section_due_date_id: due_date_id,
    }
  }).done(function (data, status, response) {
    //displayDeadlinesList();
  });
}

function removeCourseDeadlines(course_sec_id) {
  var target_url = "/date/list";
  $.ajax({
    type: "GET",
    url: target_url,
  }).done(function (data, status, response) {
    if (data && data.length > 0) {
      for (var i = 0; i < data.length; i ++) {
        if (data[i].course_sec_id.toString() == course_sec_id) {
          removeCourseDeadline(String(data[i].due_date_id));       
        }        
      }
      displayDeadlinesList();
    }
  });
}

function removeCourse(course_sec_id) {
  var confirm_remove = window.confirm("Are you sure you want to remove this course? Warning: All deadlines associated with this course will also be removed!");
  if (confirm_remove == true) {
    var target_url = "/course/destroy";
    $.ajax({
      url: target_url,
      type: "POST",
      data: {
        course_sec_id: course_sec_id,
      }
    }).done(function (data, status, response) {
      removeCourseDeadlines(String(course_sec_id));
      $('#remove-course-page').hide();
      $('#remove-course-page').filter(function() {
        showCoursesToRemove();
        return $(this).css('display') == 'none';
      }).animate({ opacity: 'toggle'}, 1000 );
      if (status == 202) {
        // place holder for refreshing info.
        location.reload();
      }
    }); 
  }
}

function displayDeadline(due_date_id) {
  var current_date = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
  var right_content = document.getElementById("display-deadline-page");
  right_content.innerHTML = "";
  var target_url = "/date/list";
  $.ajax({
    type: "GET",
    url: target_url,
  }).done(function (data, status, response) {
    if (data && data.length > 0) {
      for (var i = 0; i < data.length; i ++) {
        if (String(data[i].due_date_id) == String(due_date_id)) {
          var top_bar = document.createElement("div");
          top_bar.className = "top-bar";
          var deadline_title = document.createElement("div");
          deadline_title.className = "right-content-title";
          deadline_title.innerHTML = data[i].item_due_name.trim();
          var deadline_course_div = document.createElement("div");
          deadline_course_div.className = "right-content-course";
          var deadline_course = document.createElement("div");
          deadline_course.className = "right-content-time";
          deadline_course.innerHTML = data[i].course_code.trim();
          deadline_course_div.appendChild(deadline_course);
          top_bar.appendChild(deadline_title);
          top_bar.appendChild(deadline_course_div);

          var second_bar = document.createElement("div");
          second_bar.className = "second-bar";
          var deadline_due_date = document.createElement("div");
          deadline_due_date.className = "right-content-due-date";

          var due_date_string = data[i].date.split("-");
          var year = due_date_string[0];
          var month = due_date_string[1];
          var day = due_date_string[2];

          var date_string = String(months[month-1]) + " " + String(day) + ", " + String(year);
          deadline_due_date.innerHTML = "<h1>Due Date</h1>" + date_string;
          var deadline_time = document.createElement("div");
          deadline_time.className = "right-content-rate";

          var time_string = data[i].time.split(":");
          var hour = time_string[0];
          var minute = time_string[1];
          var am_pm = "AM";

          var deadline_date = new Date(year, month-1, day, hour, minute);
          if (deadline_date < current_date) {
            deadline_due_date.className = "right-content-past-due-date";
            deadline_time.className = "right-content-past-time";
          }

          if (hour == 00) {
            hour = 12
          } else if (hour > 12) {
            am_pm = "PM";
            hour -= 12;
          }

          deadline_time.innerHTML = "<h1>Time</h1>" + hour + ":" + minute + " " + am_pm;

          var deadline_location = document.createElement("div");
          deadline_location.className = "right-content-user";
          deadline_location.innerHTML = "<h1>Location</h1>" + data[i].location.trim();
          second_bar.appendChild(deadline_due_date);
          second_bar.appendChild(deadline_time);
          second_bar.appendChild(deadline_location);

          var h1 = document.createElement("h1");
          h1.innerHTML = "Deadline Description";

          var deadline_description = document.createElement("div");
          deadline_description.className = "right-content-detail";
          if (data[i].description.trim().length > 0) {
            deadline_description.innerHTML = data[i].description.trim();
          } else {
            deadline_description.innerHTML = "No description.";
          }
          

          right_content.appendChild(top_bar);
          right_content.appendChild(second_bar);
          right_content.appendChild(h1);
          right_content.appendChild(deadline_description);
        }
      }
    }
    $('#add-course-page').hide();
    $('#remove-course-page').hide();
    $('#add-deadline-page').hide();
    $('#rightContent').hide();
    $('#display-deadline-page').filter(function() {
      //location.reload();
      return $(this).css('display') == 'none';
    }).animate({ opacity: 'toggle'}, 1000 );
    if (status == 202) {
      // place holder for refreshing info.
      location.reload();
    }
  });
}

function displayDeadlinesList() {  
  var current_date = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
  var search_result_div = document.getElementById("search-result");
  search_result_div.innerHTML = "";
  var target_url = "/date/list";
  $.ajax({
    type: "GET",
    url: target_url,
  }).done(function (data, status, response) {
    var right_content = document.getElementById("rightContent");
    var h2 = document.getElementById("deadlines-status");
    if (data && data.length > 0) {
      h2.innerHTML = "<br>Click 'View' for any deadline to the left to view the deadline details.<br><br>Click 'Delete' to remove the deadline from your calendar and account.";
      for (var i = 0; i < data.length; i ++) {
        var post = document.createElement("div");
        post.className = "post";
        var post_info = document.createElement("div");
        post_info.className = "post-info";
        var post_title = document.createElement("div");
        post_title.className = "post-title";
        var due_date = document.createElement("div");
        due_date.className = "due-date";
        var post_time = document.createElement("div");
        post_time.className = "post-time";
        var post_location = document.createElement("div");
        post_location.className = "post-location";
        var post_course = document.createElement("div");
        post_course.className = "post-course";
        var button_div = document.createElement("div");
        button_div.id = "deadline-buttons";
        button_div.innerHTML = '<button id="view-button" type="button" onclick="displayDeadline(' + data[i].due_date_id + ');">View</button><button id="delete-button" type="button" onclick="removeDeadline(' + data[i].due_date_id + ');"">Delete</button>';

        post_title.innerHTML = data[i].item_due_name.trim();
        var due_date_string = data[i].date.split("-");
        var year = due_date_string[0];
        var month = due_date_string[1];
        var day = due_date_string[2];

        due_date.innerHTML = "Due: " + months[month-1] + " " + day + ", " + year;
        var time_string = data[i].time.split(":");
        var hour = time_string[0];
        var minute = time_string[1];
        var am_pm = "AM";

        var deadline_date = new Date(year, month-1, day, hour, minute);
        if (deadline_date < current_date) {
          due_date.className = "past-due-date";
          post_time.className = "past-post-time";
        }

        if (hour == 00) {
          hour = 12
        } else if (hour > 12) {
          am_pm = "PM";
          hour -= 12;
        }
        post_time.innerHTML = "Time: " + hour + ":" + minute + " " + am_pm;
        post_location.innerHTML = "Location: " + data[i].location.trim();
        post_course.innerHTML = "Course: " + data[i].course_code.trim();
        
        post_info.appendChild(post_title);
        post_info.appendChild(due_date);
        post_info.appendChild(post_time);
        post_info.appendChild(post_location);
        post_info.appendChild(post_course);
        post_info.appendChild(button_div);

        post.appendChild(post_info);
        search_result_div.appendChild(post);
      }
    } else {
      h2.innerHTML = "<br>You do not have any deadlines!<br><br>Click 'Create Deadline' to add a deadline to your account.";
      var div = document.createElement("div");
      div.innerHTML = '<h1 id="no-deadlines-message">No deadlines to show!</h1>';
      search_result_div.appendChild(div);
    }
  });
}

function removeDeadline(due_date_id) {

  var confirm_remove = window.confirm("Are you sure you want to remove this deadline?");
  if (confirm_remove == true) {
    var target_url = "/date/destroy";
    $.ajax({
      url: target_url,
      type: "POST",
      data: {
        course_section_due_date_id: due_date_id,
      }
    }).done(function (data, status, response) {
      displayDeadlinesList();
      $('#add-course-page').hide();
      $('#remove-course-page').hide();
      $('#add-deadline-page').hide();
      $('#rightContent').hide();
      $('#display-deadline-page').hide();
      $('#rightContent').filter(function() {
        //location.reload();
        return $(this).css('display') == 'none';
      }).animate({ opacity: 'toggle'}, 1000 );
      if (status == 202) {
        // place holder for refreshing info.
        location.reload();
      }
    });
  }
}

function captilalize(event) {
  this.value = this.value.toUpperCase();
}