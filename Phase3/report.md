###Phase 3 Report

NOTE: During our team meeting all group members came together to answer the questions required for this phase. Notes were written down and then Lana offered to expand on the notes and make it a proper report.

#####Why are you changing your design (if there are any changes)?

In terms of functionality and the UI design of our application, we have made several changes to our application when implementing phase two. We removed several features form our design which we did not implement in phase two and do not plan on implementing in phase four, and we added additional features which were not in our original design which we have either already implemented or plan on implementing in phase four.

Based on our user stories we created in phase one, we removed the feature from our design that allows students to disagree with a due date on a public timetable for a course if they believe the due date is incorrect, using a button to “down vote” the proposed due date. We removed this feature because we believe it is easier and more efficient to determine the correct due date for a course by the due date the majority of students proposed, and allow students to remove due dates they disagree with from their timetable on their own. We decided the “down vote” button is unnecessary as it adds extra responsibility and work for the user which can be accomplished by the application without user input. 

Although this was not made explicit in our user stories, when a user adds a course to their profile in which they are enrolled, all due dates corresponding to that course on the public timetable for that course are automatically added to the user’s personal timetable. This once again requires less work from the user, allowing for a more seamless experience. 

We completely removed the role of a professor/TA for each course from our design and created our application so that it is intended for students only. Although professors and TAs can also use our application using a valid UTOR email address, their role and the functionality of the application is the same as it is for students. Since professors and TAs are not reliable in providing due dates for courses and cooperating with students, we decided the role of a professor/TA is not necessary and students are now held responsible for determining and adding due dates to the public timetable for each course. We believe this is a valid design as students have more motivation to add due dates and ensure they’re correct as opposed to professors/TAs. 

We also removed the course rating feature from our design as rating a course to notify a professor/TA how students feel about the course is irrelevant if there is no professor/TA role and it is not guaranteed that professors/TAs will use the application. We want to focus more on functionality that allows students to organize themselves with course work instead of providing feedback for courses; we believe this should be done external to our application and does not coincide with our application. 

We removed the feature that notifies students of changes to due dates because we decided there is no suitable way of accomplishing this when the user is not using the application. Initially, we wanted these notifications to be in real-time, but since we are developing a web application as opposed to a phone application, the only possible way of informing students of changes to due dates offline, is through email. However, we do not want to clutter a student’s inbox with such emails, and we believe the student can easily and faster find out about changes to due dates simply by viewing their personal timetable, as these changes occur automatically. 

We removed the feature of allowing students to merge their timetables with other students and other courses to see how their timetables would fit with other timetables, to coordinate and plan meetings and better manage time, because we are limited on time for this project and we want to focus on implementing other features instead of this one. 

We added the feature of allowing students to filter due dates on their personal timetables based on whether the due dates are ones they added to their timetable themselves, or they were automatically added to their timetable when the student added a course they’re enrolled in to their timetable. This will allow students to easier distinguish between due dates they added themselves, and due dates imported from the public timetables for courses.  

We added the feature of recurring due dates or events to allow students to add due dates which are consistent throughout a semester, such as weekly problem sets or quizzes, or to add office hours which occur on a weekly basis. Since these due dates and events occur on the same day and at the same time every week, this saves the user time in adding such events and due dates to their timetables. 

We added the feature of allowing students to view the students enrolled in a course based on who added a course to their personal timetable. This will allow students to find out the email addresses of other students’ in the same course in case they need to contact one or all of them. In addition, we also added the feature that allows students to directly email one or all of these students with the click of a button that would compose and open a new email window with the “To” email address field prepopulated using the user’s preferred email service.  

#####Briefly highlight the problems you have faced and how as a team you managed to solve them. 

One of the problems we faced as a team was learning the APIs, frameworks, libraries, and languages required to implement the application. Few of us were familiar with the frameworks and libraries we used, specifically Less for CSS, Bootstrap, jQuery, and AngularJS, as well as PostgreSQL for managing databases. The only option we had, and how we solved this problem, was learning the frameworks and libraries, familiarizing ourselves with the tools, and asking each other for help whenever we had problems or did not understand a concept. We tried to work as a team to ensure each team member understood and was capable of using these tools and libraries, so that each team member felt confident and comfortable, and could contribute to the project. 

The main problem we had as a team was communication and delegating work among team members. We did not communicate and coordinate with each other enough to determine who is responsible for completing which part of the application, as well as which parts were already completed or needed to be completed throughout phase two. We realized we should have used the Git issue system as opposed to our own methods for keeping track of tasks assigned to each team member and when each task was complete. We also realized that we should have had more team meetings in person as opposed to collaborating solely through Facebook, as this would have forced, or at least greater encouraged, members of our team to attend meetings and communicate with the rest of the team. We solved these problems by having one person assign tasks to each team member, as well as using the Git issue system for work that remains and needs to be completed for phase four. We planned, coordinated, and assigned tasks well ahead of time, and we also decided on scheduling team meetings immediately following class or tutorial to make it more convenient for team members to show up to meetings. 

#####Highlight all design patterns you have used in your project. 

The main design pattern we used in our application is the Model View Controller (MVC) design pattern. First, our application uses the “urllib2” Python library to open the URL that contains University of Toronto’s timetable with all of the course listings, and then it parses this HTML to retrieve the course information for each course listed. It populates a JSON with this information which is then used to populate the database used by our application. All calls and modifications to the database are done directly without the use of an interface, and then our application uses this database to display the relevant information in each HTML page. These views are modified directly depending on the page and information that needs to be displayed. 

We did not use any other design patterns in our application because we felt it was unnecessary and would just require extra work.      

#####Highlight some design patterns in the frameworks you are using. 

The Python web library implicitly uses the Iterator design pattern to access and traverse the contents of the database. It traverses and populates or retrieves data in the database depending on whether it is an app_user, app_session, course, course_section, or any of the other tables listed in our database schema. Using this schema and the properties corresponding to each table, it knows how to populate and retrieve the data from each table. 

The Python web library also implicitly uses the singleton design pattern when it creates an instance of our web application and our application makes a call to its “run” method on this instance, as this is the only instance that is created and used to run our application. 

Nowhere in our application is the Observer design pattern used because whenever there are changes to data, instead of having a class or method notify another class or method of these changes, the database is updated and the relevant data is updated and displayed automatically. 

