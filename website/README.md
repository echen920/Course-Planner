#Setting up

##Python server

- Install python v2.7.x+
- Install pip, a python package installer, it'll make things easier
- Install postgresql, version 9.3.x http://www.postgresql.org/
- Install webpy v0.37 and psycopg2 with the following command line input while in the 'website' folder:
```
pip install -r req.txt
```
- Note, you may need 'python-dev' and 'libpq-dev' installed, and anything else if you have issues.

##Angular-JS
- This is only needed if you don't care about loading the python server
- Install node.js and npm, to the latest version
- Type in the following command (may need to add 'sudo' in front) into the terminal or shell:
```bash
npm install
```
- To start viewing the site, type: 
```bash
npm start
```
- The page can be found here: http://localhost:8000/app/index.html

##Setting up your db and populating it
- open database.txt, and make changes to the file:
```
user: name of the user for db login
dbn: type of db using, leave it if you use psql
pw: your password for login
dbname: name of your db for this assignment
```
- run the following command:
```
python databasePopulator.py
```
- Now its populated, login is test@utoronto.ca , password is 123456

#About
The page uses the following libarires:

- less.js : http://lesscss.org/
- BootStrap : http://getbootstrap.com/
- JQuery : http://jquery.com/
- AngularJS : https://angularjs.org/

The following section below quickly describes each item for those who are curious.

##less.js
Allows IDs, classes, and other selectors to be organized in easier "inheritance" like structure. Also allows variables, functions and mixins.

##BootStrap
A bunch of predefined css, class, and javascript functions for a modern look and feel. Also contains responsive web designs and what not (try resizing your browser to see the changes)

##JQuery
A bunch of predefined javascript functions that can help speed up production. Usually contains a lot of common things for front end stuff.

##AngularJS
Follows a MVW structure, similar to MVC but W actually stands for Whatever. It allows real time changes made to the web page as things go on, and redirection of pages without loading a new page.
