#Sprint Meetings
#####Planning Meeting For First Sprint
- Date : October 22nd, Location : BA320
- Decided on length of sprints (1 week each) to finish on each of the Wednesdays of the two weeks of phase 2 (finish on the 29th and 5th)
- Decided that we would be dividing the team into two 3 man groups with Vincent acting as a connector of sorts
	- This allowed for each individual to focus on a group of smaller and more connected tasks instead of having to jump around
- Decided that Ben, Paul and Thomas would work on the back end while Eric Lana and Tyler worked on the front end
	- This was based of personal preference and areas of knowledge
- Decided on a list of user stories that we would try to implement across the two sprints
	- Decided to use the first sprint to set up necessary infrastructure to begin to be able to
	  complete user stories (Focus on setting up the server, the basics of the UI and the course scraper)
	  While this means that our velocity for the first sprint will be quite low it will allow
	  for a much higher velocity in sprint 2.
- Decided the frameworks we would be using for the rest of the sprint to implement the features.

#####Review Meeting for First Sprint
- Date: October 29th, Location : BA320
- Completed course scraper and beginnings of UI. A lot of work done in terms of the server but not entirely functional yet.
	- Quite a few bugs in both front and back end, but that was expected.
	- Focused on minor details for the front end first, fonts, colours, general look etc.
	- Some work also begun on the database that will store user information, some integration of database into server.
- Completed about 90% of expected work
- No user stories yet met, but this was expected. Havn't integrated the front end and back end together yet.
	- Strictly speaking our velocity is 0, but that's ok.
- Back end turned out to be slightly more difficult than expected, so Vincent (our "floating" member) worked mostly on back end.

#####Planning Meeting for Second Sprint
- Date: October 29th, Location : BA320
- Have to complete all user stories for the MVP in this sprint, but should be easy thanks to set up during the first sprint
- Two 3 man teams worked well for the first sprint so we decided to keep it during this one.
	- Vincent going to work closer with the front end group this time though, since they have a lot more work during this sprint
- Large focus during this sprint on connecting new front end elements to corresponding back end modules.
	- So in general a lot more communication between the two groups in this sprint than in the first
- Considered trying to work in teacher related functionality since a lot of it would be similar to 
  the student functionality we need for our MVP, ultimately decided to leave that for phase 3 of the project.
	- General reminder during the meeting to keep in mind extendibility to eventually be able to include teachers
- Expected velocity for this sprint: 12

#####Review Meeting for Second Sprint:
- Date: November 4th, Location : Video Chat through Facebook and Facebook Chat
- Didn't quite complete all desired functionality from our release plan
	- Desired Velocity: 12, actual Velocity: 7
	- Completed User Stories: 
	- As a student, I would like to be able to create an account using a valid UTOR email address. (High/2)
	- As a student, I would like to be able to search for courses and add them to my personal timetable with the lecture sections in which I am enrolled. (High/3)
	- As a student, I would like to add due dates for assignments, midterms, problem sets, quizzes, exams, office hours, and other personal tasks for each course to my personal timetable, and classify them accordingly. (High/1)
	- As a student, I would like to be able to log out of my account from the web application. (High/1)
	- User Stories not completed:
	- As a student, I would like to be able to remove courses from my personal timetable in the case that I dropped a course or changed meeting sections. (High/1)
	- As a student, I would like to know the course code, name, date and time, location (building and room), professor/TA, and meeting section of my lectures and tutorials. (High/2)
	- As a student, I would like to be able to edit or remove due dates from my personal time table in the case that a due date has been postponed or cancelled. (High/1)
	- As a student, I would like to be able to change my password for my account. (High/1)
- Found a number of bugs in the course scraper and fixed them, as well as a few in the database.
- Much of the UI completed
- Some difficulties in communication leading to some pieces of code being written twice, and a few miscommunications between front end and back end lead to some 
  things not working correctly for longer than they necessarily should have.
  
  
#"Daily" Scrum Meetings

###During First Sprint

#####Scrum 1:
- Date: October 24th, Location : BA320
	- Paul Floussov: Organized database schema with Thomas
	- Vincent Le: Got course scraper set up and working.
	- Thomas Robinson: *see Paul
	- Tyler Haugen-Stanley: Busy with mutliple midterms
	- Eric Chen: Began basic website desgin
	- Lana Borodina: Busy with mutliple midterms
	- Benjamin Feder: Busy with mutliple midterms
	

#####Scrum 2:
- Date: October 28th, Location : BA320
	- Paul Floussov: Integrated running database into server.
	- Vincent Le: Set up server with skeleton post/option requests. Set up database populator with course scraper.
	- Thomas Robinson: Got database up and running.
	- Tyler Haugen-Stanley: Worked with Lana to figure out how to integrate front end design to backend
	- Eric Chen: Began locally programming frontend visuals
	- Lana Borodina: *see Tyler
	- Benjamin Feder: Helped connect database and server.


###During Second Sprint

#####Scrum 1:
- Date: October 31st, Location : BA320
	- Paul Floussov: Got course search working.
	- Vincent Le: Began tying front end into backend.
	- Thomas Robinson: Started bugtesting on working functionality.
	- Tyler Haugen-Stanley: Helped Eric with main page frontend layout
	- Eric Chen: Finished main page design.
	- Lana Borodina: Collected fonts and images for frontend
	- Benjamin Feder: Started GET and POST structure


#####Scrum 2:
- Date: November 2th, Location : Video Chat through Facebook
	- Paul Floussov: Finished basic GET and POST functionality with the help of Thomas.
	- Vincent Le: Implemented adding, finalized front end and backend connection.
	- Thomas Robinson: Helped Paul implement using the web.py structure.
	- Tyler Haugen-Stanley: Helped finish website design
	- Eric Chen: Finished website design. Pushed front end to repository.
	- Lana Borodina: Helped finish website design
	- Benjamin Feder: Helped figure out login system implementation.




##GitHub Issue Management Use
We felt as though there was no need to utilize the github issue management system for phase 2 and opted to make a point of discussing what was done and what will be done next during each scrum. This proved to be less effective than originally anticipated and we will be switching to the issue management system GitHub has provided for phase 3.


##Other Major Decisions
One of the more interesting decisions we made in this project was to divide our group into two 
three man subgroups and a connecting member. This allowed each of us to focus on a smaller 
particular portion of the project and eased communication by reducing the relevant group size 
from 7 to 3. It worked relatively well, though communication was still an issue. Vincent
did an excellent job of connecting the two portions of the program. Also by explicitly separating
front end from back end it forced us to write modules with better cohesion, since the front end
had to be able to rely on the modules in the back end doing the one thing they explicitly state
they're going to and nothing else, and vice versa.




