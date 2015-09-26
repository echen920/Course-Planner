$(document).ready(function() {

	//getCourses();

	$('#fullCalendar').fullCalendar({
		theme: true,
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		defaultDate: new Date(),
		eventLimit: true, // allow "more" link when too many events
		eventSources: [
	        {
	            url: '/calendar/timetable',
	            // color: 'yellow',   // a non-ajax option
	            textColor: 'black' // a non-ajax option
	        }
    	],
        eventClick: function(calEvent, jsEvent, view) {
        	// for (i in calEvent){
        	// 	console.log(calEvent[i])	
        	// }
        	if (calEvent.due_date_id){
        		window.location.replace("/add#" + calEvent.due_date_id);
        	} else if (calEvent.course_id){
        		window.location.replace("/courses#" + calEvent.course_id);
        	}
        }
	});
	$('#fullCalendar').fullCalendar( 'addEventSource', '/calendar/populate_deadlines').delay(500);
});

