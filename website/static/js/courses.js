var course_code_to_id = {};

$(document).ready(function(){
  $("#due_date").datepicker({ dateFormat: "yy-mm-dd" });

  displayCourseList();

  // If this is a re-direct from the user clicking on a calendar event, get the id from the URL
  var course_id = window.location.href.split('#')[1];

  if (course_id) {
    displayCourseDetails(course_id);
  }  
  
  /*$('#course-content').load(function(){
    displayCourseList();
  });*/

});

function displayCourseList() {  
  var course_list_div = document.getElementById("course-list");
  course_list_div.innerHTML = "";
  var target_url = "/course/list";
  $.ajax({
    type: "GET",
    url: target_url,
  }).done(function (data, status, response) {
    if (data && data.length > 0) {
      var courses_listed = [];
      for (var i = 0; i < data.length; i ++) {
        if (courses_listed[courses_listed.length-1] != data[i].course_id) {
          courses_listed.push(data[i].course_id);
          var course_post = document.createElement("div");
          course_post.className = "course-post";
          var course_post_info = document.createElement("div");
          course_post_info.className = "course-post-info";
          var course_post_title = document.createElement("div");
          course_post_title.className = "course-post-title";
          course_post_title.innerHTML = '<a href="javascript:displayCourseDetails(' + data[i].course_id + ')">' + data[i].course_code.trim() + '</a>';
        
          course_post_info.appendChild(course_post_title);
          course_post.appendChild(course_post_info);
          course_list_div.appendChild(course_post);
        }
      }
    } else {
      var div = document.createElement("div");
      div.innerHTML = '<h1 id="no-courses-message">No courses to show!</h1>';
      course_list_div.appendChild(div);
      var right_content = document.getElementById("course-rightContent");
      right_content.innerHTML = "";
      var right_div = document.createElement("div");
      right_div.innerHTML = '<h2 id="right-no-courses-message">You do not have any courses!<br><br>Go to \'Manage\' and click on \'Add Course\' to add courses to your account.</h2>';
      right_content.appendChild(right_div);
    }
  });
}

function displayCourseDetails(course_id) {
  var right_content = document.getElementById("course-rightContent");
  right_content.innerHTML = "";
  var target_url = "/course/list";
  $.ajax({
    type: "GET",
    url: target_url,
  }).done(function (data, status, response) {
    if (data && data.length > 0) {
      var course_days = [false, false, false, false, false];
      var weekdays = ['M', 'T', 'W', 'R', 'F'];
      var course_details_displayed = false;
      var next_course = -1;
      var course_time = "";
      for (var i = 0; i < data.length; i++) {
        next_course = i + 1
        if ((String(data[i].course_id) == String(course_id) && next_course == data.length) || (String(data[i].course_id) == String(course_id) && data[next_course].course_id != data[i].course_id)) {
          course_time += data[i].date.trim() + data[i].time;
          var day_index = weekdays.indexOf(data[i].date.trim());
          course_days[day_index] = true;

          var course_time_str = ""
          for (var j = 0; j < 5; j++) {
            if (course_days[j] == true) course_time_str += weekdays[j];
          }
          course_time_str += data[i].time;

          var top_bar = document.createElement("div");
          top_bar.className = "top-bar";
          var course_title = document.createElement("div");
          course_title.className = "right-content-title";
          course_title.innerHTML = data[i].name.trim();
          top_bar.appendChild(course_title);

          var second_bar = document.createElement("div");
          second_bar.className = "second-bar";
          var course_code = document.createElement("div");
          course_code.className = "right-content-due-date";
          course_code.innerHTML = "<h1>Course Code</h1>" + data[i].course_code.trim() + data[i].semester.trim();
          var course_section = document.createElement("div");
          course_section.className = "right-content-rate";
          course_section.innerHTML = "<h1>Section</h1>" + data[i].section.trim();
          var course_date_time = document.createElement("div");
          course_date_time.className = "right-content-rate";
          course_date_time.innerHTML = "<h1>Time</h1>" + course_time_str;
          var course_lecturer = document.createElement("div");
          course_lecturer.className = "right-content-user";
          course_lecturer.innerHTML = "<h1>Lecturer</h1>" + data[i].lecturer.trim();
          var course_location = document.createElement("div");
          course_location.className = "right-content-due-date";
          course_location.innerHTML = "<h1>Location</h1>" + data[i].location.trim();
          second_bar.appendChild(course_code);
          second_bar.appendChild(course_section);
          second_bar.appendChild(course_date_time);
          second_bar.appendChild(course_location);
          second_bar.appendChild(course_lecturer);

          right_content.appendChild(top_bar);
          right_content.appendChild(second_bar);

          course_time = "";
          course_days = [false, false, false, false, false];

          displayCourseDeadlines(String(data[i].course_sec_id));
        } else if (String(data[i].course_id) == String(course_id) && data[next_course].course_id == data[i].course_id) {
          course_time += data[i].date.trim();
          var day_index = weekdays.indexOf(data[i].date.trim());
          course_days[day_index] = true;
        }
      }
    }
  });

  $('#rightContent').hide();
  $('#rightContent').filter(function() {
    //location.reload();
    return $(this).css('display') == 'none';
  }).animate({ opacity: 'toggle'}, 1000 );
  if (status == 202) {
    // place holder for refreshing info.
    location.reload();
  }
}

function displayCourseDeadlines(course_sec_id) {
  var current_date = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
  var right_content = document.getElementById("course-rightContent");

  var h1 = document.createElement("h1");
  h1.innerHTML = "Deadlines";
  right_content.appendChild(h1);
  var course_deadlines = document.createElement("div");
  course_deadlines.className = "right-content-detail";

  var target_url = "/date/list";
  $.ajax({
    type: "GET",
    url: target_url,
  }).done(function (data, status, response) {
    if (data && data.length > 0) {
      var num_deadlines = 0;
      for (var i = 0; i < data.length; i ++) {
        if (data[i].course_sec_id.toString() == course_sec_id) {
          num_deadlines += 1;

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
          
          post_info.appendChild(post_title);
          post_info.appendChild(due_date);
          post_info.appendChild(post_time);
          post_info.appendChild(post_location);
          post.appendChild(post_info);
          course_deadlines.appendChild(post);
          right_content.appendChild(course_deadlines);
        }        
      }

      if (num_deadlines == 0) {
        var h2 = document.createElement("h2");
        h2.innerHTML = "No deadlines to show for this course.";
        right_content.appendChild(h2);
      }
    } else {
      var h2 = document.createElement("h2");
      h2.innerHTML = "No deadlines to show for this course.";
      right_content.appendChild(h2);
    }
    displayCourseStudents(course_sec_id);
  });

  $('#rightContent').hide();
  $('#rightContent').filter(function() {
    //location.reload();
    return $(this).css('display') == 'none';
  }).animate({ opacity: 'toggle'}, 1000 );
  if (status == 202) {
    // place holder for refreshing info.
    location.reload();
  }
}

function displayCourseStudents(course_sec_id) {
  var right_content = document.getElementById("course-rightContent");

  var h1 = document.createElement("h1");
  h1.innerHTML = "Students Enrolled";
  right_content.appendChild(h1);
  var course_students = document.createElement("div");
  course_students.className = "right-content-detail";

  var target_url = "/course/" + course_sec_id + "/student/list";
  
  $.ajax({
    type: "GET",
    url: target_url,
  }).done(function (data, status, response) {
    if (data && data.length > 0) {
      var email_prompt = document.createElement("h3");
      email_prompt.id = "email-prompt";
      email_prompt.innerHTML = "Click an icon to email one or all students.";
      var all = document.createElement("div");
      all.className = "course-item";
      var img_all = document.createElement("img");
      img_all.src = "static/imgs/email_all.png";
      var anchor_all = document.createElement("a");
      anchor_all.appendChild(img_all);
      var caption = document.createElement("h1");
      caption.className = "student-email";
      caption.innerHTML = "Email All Students";
      all.appendChild(caption);
      all.appendChild(anchor_all);
      right_content.appendChild(email_prompt);
      right_content.appendChild(all);

      var all_students = "";
      
      for (var i = 0; i < data.length; i ++) {
        all_students += data[i].email.trim();
        if (i < data.length - 1) {
          all_students += "; ";
        }

        var div = document.createElement("div");
        div.className = "course-item";
        var img = document.createElement("img");
        img.src = "static/imgs/email.png";
        var anchor = document.createElement("a");
        anchor.href = "mailto:" + data[i].email.trim();
        anchor.appendChild(img);
        var course_code = document.createElement("h1");
        course_code.className = "student-email";
        course_code.innerHTML = data[i].email.trim();
        div.appendChild(course_code);
        div.appendChild(anchor);
        course_students.appendChild(div);
        right_content.appendChild(course_students);
      }
      anchor_all.href = "mailto:" + all_students;
    } else {
      var h2 = document.createElement("h2");
      h2.innerHTML = "No other students enrolled in this course.";
      right_content.appendChild(h2);
    }
  });

  $('#rightContent').hide();
  $('#rightContent').filter(function() {
    //location.reload();
    return $(this).css('display') == 'none';
  }).animate({ opacity: 'toggle'}, 1000 );
  if (status == 202) {
    // place holder for refreshing info.
    location.reload();
  }
}

function captilalize(event) {
  this.value = this.value.toUpperCase();
}