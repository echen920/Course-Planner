##Release and Iteration Plan##

By the end of phase 2, we hope to have implemented the following :<br>
 - We want to be able to scrape information pertaining to classes, their schedules, their instructors and their locations from the web and make this information available to students when they're working with their schedule. <br>
 - We want students to be able to create accounts to store their personal schedule information. We would also like to be able to validate these accounts using the @mail.utoronto.ca email addresses. <br>
 - We want student accounts to be able to add and remove courses from a searchable list. We also want students to be able to add and remove assignments and due dates from their schedule. <br>
 - We want to be able to classify due dates a student adds to their schedule as private or public (only public due dates are used in comparisons to find the likeliest due dates) and as a certain type (assignment, reading, etc.).<br> 
 - We want to be able to compare information from various students to find out what the most likely due date for a given assignment is and return that information back to the students to help them in their planning. <br>
 - We want students to be able to disagree with a given due date if they believe it to be incorrect and we want to take the number of disagrees a certain date has received into account when calculating a most likely due date.

We've chosen to exclude a lot of the functionality relating to professors in the first release. For example, the ability for professors to create and enroll students (or allow students to enroll themselves) is not something we plan to include from the onset, or the ability to post a professors office hours and location; this is because we want to focus first on student usability and making sure the program works as a scheduler for those students before we worry about professors who may or may not be interested or cooperative. The ability for students to rate their courses is also something we are not planning to implement in phase 2 as it is more of an enhancement, rather than something crucial, to the functionality of the program. Finally we will not include the ability to add extracurricular to your schedule because we want the program to be focused on school and course work for now, with the ability to expand it to a general scheduler later. 

The features we want to complete by the end of the very first iteration are those relating to being able to create an account and add classes to just your own schedule, but without any of the scraping for information from the web, and without any of the inter account comparisons to find the most likely due date. Therefore the following user story requirements should be met: <br>
- As a student, I would like to be able to create an account using a valid UTOR email address. <br>
- As a student, I would like to be able to search for courses and add them to my personal timetable with the lecture sections in which I am enrolled. <br>
- As a student, I would like to be able to remove courses from my personal timetable in the case that I dropped a course or changed meeting sections. <br>
- As a student, I would like to add due dates for assignments, midterms, problem sets, quizzes, exams, office hours, and other personal tasks for each course to my personal timetable, and classify them accordingly.


