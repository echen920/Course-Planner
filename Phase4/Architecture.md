# ROSI Architecture

Our system can be divided into two main components; the front end and the back-end. The back-end is primarily responsible for setting up the server and the database for the website, to send or retrieve information. We use Python, PostgreSQL, psycopg2, web.py and many other libraries to set up this python server. On the other hand, the front end is responsible for displaying information and allowing interactions between users and the server. Tools include AngularJS, JQuery, AJAX and Full Calendar. 

On the back end, the database populator retrieves information from the U of T 2014-2015 timetable website, and parses this course data to populate the database used by our application. The server, when run, builds a set of URLs, each responsible for a specific action using SQL to retrieve and push information to the database through GET and POST requests, which are then used by our application to interact with the database. 

On the front end, the application is split into different pages and controllers to handle events and interactions executed by the user in each page. There is a separate page and controller for the ‘Login’, ‘Create An Account’, ‘Forgot Password’, ‘Manage’, ‘Courses’, and ‘Calendar’ views. Each controller displays and updates information, and handles user input and actions (such as button clicks) for its corresponding page. 

# Significant Architecture Decisions
Our most significant architecture decision is the server of our application that handles all interactions with the database. We chose to use web.py and PostgreSQL because there were a few members who have in-depth understanding of and experience in those tools, whereas the rest of the members were still fairly new to web development. 

We think we made the right decision because the server is very easy to use and modify, and the front end members do not need to have much knowledge how the server works to connect the back end to the front end design. Since the server is extensible and adaptable, the front end members were able to modify the server without help from the back-end members, which saved a lot of time for the entire development process.

Another significant decision we made is the use of AngularJS and implementing the MVC design pattern for the front end. The decision was made based on the fact that AngularJS provides a smaller learning curve to our members who were new to web development, since it simplifies both development and testing of our application. 

This is another good decision we made because our initial goal for the front end was to create an intuitive design for the users, and we established that a single page application was the ideal resolution. AngularJS is ideal for creating such an application because it doesn't require the browser to reload the page on every minimal interaction that the user makes. Also, the use of the MVC design pattern allowed us to split work among members of the group by separating our application into different views and controllers. 


