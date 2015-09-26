import web, json, hashlib, datetime

# yellow, orange, pink, light blue, brown, blue, green, light green, purple, dark blue, neon green, dark red, pale yellow
colours = ['FFFF00', 'FF6633', 'FF6699', '99CCFF', '330000', '3333CC', '006600', '66FF00', '660066', '000033', '33FF33', '660000', 'FFFF66']
curColour = 0;
coursesAssignedToColours = {};

# connection to database script
f = open('database.txt')
dbinfo = eval(f.read())
f.close()
render = web.template.render('app')
db = web.database(
    dbn=dbinfo.get('dbn', None),
    user=dbinfo.get('user', None),
    pw=dbinfo.get('pw', None),
    db=dbinfo.get('dbname', None),
    host=dbinfo.get('host', None),
    port=dbinfo.get('port', None),
    )

# possible url to access the server
urls = (
  '/', 'index',
  '/user', 'user',
  '/login', 'login',
  '/logout', 'logout',
  '/forgot', 'forgot',
  '/security', 'security',
  '/course', 'course',  
  '/course/list', 'users_courses',
  '/course/(\d+)/section/list', 'course_sections',
  '/course/add', 'add_course',
  '/course/destroy', 'remove_course',
  '/section/(\d+)/date/create', 'create_important_date',
  '/date/list', 'list_important_dates',
  '/date/destroy', 'remove_important_date',
  '/course/(\d+)/student/list', 'course_emails',
  '/date/suggested/list', 'list_suggested_dates',
  '/courses', 'courses',
  '/add', 'add',
  '/calendar', 'calendar',
  '/calendar/populate_deadlines', 'populate_calendar_deadlines',
  '/calendar/timetable', 'timetable'
)

web.config.debug = False
app = web.application(urls, globals())
session = web.session.Session(app, web.session.DiskStore('sessions'))
#session = web.session.Session(app, web.session.DBStore(db, 'app_sessions'))

# launching the home page of the service if logged in
class index:

    def GET(self):
        if session.get("logged_in", False):
            return render.calendar()
        return render.login(False)

# class used for dealing with the logged in user
class user:

    def GET(self):
        web_input = web.input(error=False)
        return render.createUser(web_input.error)

    def POST(self):
        web_input = web.input(email="", pw="", questions=[], answer="")
        email = web_input.email
        pw = web_input.pw
        question = web_input.questions[0]
        answer = web_input.answer
        if email and pw and answer:
            email = email.lower().strip()
            pw = pw.strip()
            answer = answer.lower().strip()
            if email.endswith("utoronto.ca"):
                hashedPw = hashlib.md5()
                hashedPw.update(pw)
                pw = hashedPw.hexdigest()
                db.insert('app_users', email=email, pw=pw, question=question, answer=answer)
                return render.login(False, output_text="Account created. Please log in with your new account")
        return render.createUser(True)

    def OPTION(self):
        web_input = web.input(cur_pw="", new_pw="")
        cur_pw = web_input.cur_pw
        new_pw = web_input.new_pw
        if cur_pw and new_pw:
            cur_pw = hashlib.md5().update(cur_pw.strip()).hexdigest()
            new_pw = new_pw.strip()
            result = db.query("SELECT * FROM app_users WHERE pw='%s' and id=%d" % (cur_pw, id))
            if len(result) == 1:
                hashedPw = hashlib.md5()
                hashedPw.update(pw)
                pw = hashedPw.hexdigest()
                db.query("UPDATE app_users SET pw='%s' WHERE pw='%s'" % (new_pw, cur_pw))
                return "200 OK"
        return "400 Bad Request"

# class for logining in to the service
class login:

    def GET(self):
        web_input = web.input(email="", pw="", error=False)
        email = web_input.email
        pw = web_input.pw
        error = web_input.error
        if email and pw:
            email = email.lower().strip()
            pw = pw.strip()
            hashedPw = hashlib.md5()
            hashedPw.update(pw)
            pw = hashedPw.hexdigest()
            result = db.query("SELECT id FROM app_users WHERE pw='%s' and email='%s'" % (pw, email))
            if len(result) == 1:
                session.logged_in = True
                session.user_id = result[0]["id"]
                raise web.seeother("/")
            else: 
                web.redirect("/login?error=True")
        return render.login(error)

# class for loging out of the service
class logout:

    def GET(self):
        session.logged_in = False
        session.user_id = None
        return render.login(False)

# class for requesting user security question
class forgot:

    def GET(self):
        web_input = web.input(error=False)
        return render.forgot(web_input.error)

    def POST(self):
        web_input = web.input(email="", error=False)
        email = web_input.email
        error = web_input.error
        if email:
            email = email.lower().strip()
            result = db.query("SELECT id FROM app_users WHERE email='%s'" % (email))
            if len(result) == 1:
                user_id = result[0]["id"]
                raise web.seeother("/security?uid=%s" % (user_id))
            else:
                return render.forgot(True)
        return render.forgot(True)        

# class for answering security question to recieve password in email
class security:
    
    def GET(self):
        web_input = web.input(uid="", errora=False, errorp=False)
        uid = web_input.uid
        result = db.query("SELECT security_questions.question FROM app_users JOIN security_questions ON app_users.question=security_questions.question_name WHERE id='%s'" % (uid))
        question = result[0]["question"]
        return render.security(False, False, uid, question)

    def POST(self):
        web_input = web.input(pw="", repeat_pw="", answer="", uid="", question="", error=False, correct=False)
        answer = web_input.answer
        uid = web_input.uid
        question = web_input.question
        pw = web_input.pw
        repeat_pw = web_input.repeat_pw
        if answer:
            answer = answer.lower().strip()
            result = db.query("SELECT answer FROM app_users WHERE id='%s'" % (uid))
            correctAnswer = result[0]["answer"]
            if (answer == correctAnswer) :
                if (pw != repeat_pw) :
                    return render.security(False, True, uid, question)
                else:
                    hashedPw = hashlib.md5()
                    hashedPw.update(pw)
                    pw = hashedPw.hexdigest()
                    db.query("UPDATE app_users SET pw='%s' WHERE id='%s'" % (pw, uid))
                    return render.login(False, output_text="Your password has been reset.")
        return render.security(True, False, uid, question)

# intital course data call for the front-end course information 
class course:

    def GET(self):
        result = db.query("SELECT course_id, course_code || semester AS course, name FROM courses ORDER BY name DESC")
        web.header('Content-Type', 'application/json')
        result = [r for r in result]
        data = json.dumps(result)
        return data

# returns a list of all the courses sections the student is enrolled in
class users_courses:

    def GET(self):
       result = db.query("SELECT * FROM course_sections cs, courses c, user_course_sections ucs, course_section_lecture_details csld WHERE c.course_id=cs.course_id AND ucs.user_id=%s AND ucs.course_sec_id=cs.course_sec_id AND csld.course_sec_id=cs.course_sec_id" % (session.user_id))
       web.header('Content-Type', 'application/json')
       result = [r for r in result]
       data = json.dumps(result)
       return data

# returns a list of all the course sections assosiated with a course
class course_sections:

    def GET(self, cousrse_id):
        result = db.query("SELECT * FROM course_sections cs, courses c WHERE c.course_id=%s AND c.course_id=cs.course_id" % (cousrse_id))
        web.header('Content-Type', 'application/json')
        result = [r for r in result]
        data = json.dumps(result)
        return data

# given a course_sec_id in the body of the post request adds the specified 
# course to the users given courses
class add_course:

    def POST(self):
        i = web.input()
        db.insert('user_course_sections', user_id=session.user_id,
                  course_sec_id=i.course_sec_id,
                  tutorial_sec=i.tutorial_sec)
        return '200 OK'

# removes a course that the user is signed up for
class remove_course:

    def POST(self):
        i = web.input()
        db.delete('user_course_sections',
                  where='course_sec_id=%s AND user_id=%s'
                  % (i.course_sec_id, session.user_id))
        return '200 OK'

# creates an important date (quiz, test ext..) takes date, time and 
# item_name from the body of the post 
class create_important_date:

    def POST(self, sec_id):
        i = web.input(length_in_min=0, end_date=None, end_time=None)
        if i.end_date and i.end_time and i.date and i.time:
            start_date_time = datetime.datetime.strptime(i.date + " " + i.time, "%Y-%m-%d %H:%M:%S")
            end_date_time = datetime.datetime.strptime(i.end_date + " " + i.end_time, "%Y-%m-%d %H:%M:%S")
            i.length_in_min = (end_date_time - start_date_time).seconds / 60
        dd_id = db.insert('due_date', seqname='due_date_due_date_id_seq'
                          , date=i.date, time=i.time,
                          location=i.location, description=i.description,
                          length_in_min=i.length_in_min)
        db.insert('course_section_due_dates', user_id=session.user_id,
                  course_sec_id=sec_id, item_due_name=i.item_name,
                  due_date_id=dd_id)
        return '200 OK'

# returns a list of important dates that the user has personaly created
class list_important_dates:

    def GET(self):
        result = db.query("SELECT * FROM course_section_due_dates cs, due_date dd, course_sections ccs, courses cc WHERE cs.course_sec_id=ccs.course_sec_id AND ccs.course_id=cc.course_id AND cs.due_date_id=dd.due_date_id AND cs.user_id=%s ORDER BY dd.date, dd.time" % (session.user_id))
        web.header('Content-Type', 'application/json')
        rows = []
        for r in result:
            if not r.get("length_in_min", None):
                r.length_in_min = 0
            start_date_time = datetime.datetime.combine(r.date, r.time)
            end_date_time = start_date_time + datetime.timedelta(minutes=int(r.length_in_min))
            r.end_date = end_date_time.strftime("%Y-%m-%d")
            r.end_time = end_date_time.strftime("%H:%M:%S")
            rows.append(r)
        data = json.dumps(rows, cls=ExtendedEncoder)
        return data

# given a course_section_due_date_id in post body this class removes that
# due date from the users due dates
class remove_important_date:

    def POST(self):
        i = web.input()
        db.delete('course_section_due_dates', where="course_section_due_date_id=%s AND user_id=%s" % (i.course_section_due_date_id, session.user_id))
        return "200 OK"

# returns a list of student emails that are enrolled in the course section
# as passed in through the URL. Ignores the logged in user.
class course_emails:

    def GET(self, sec_id):
        result = db.query("SELECT email from app_users au, user_course_sections cs where cs.course_sec_id = %s and au.id = cs.user_id and not au.id = %s ORDER BY au.email" % (sec_id, session.user_id))
        web.header('Content-Type', 'application/json')
        result = [r for r in result]
        data = json.dumps(result)
        return data

# this class is responsible for returning a list of all suggested due 
# dates for each lecture the user is appart of
class list_suggested_dates:

    def GET(self):

        course_list = []
        users_courses = db.query("SELECT * FROM course_sections cs, courses c, user_course_sections ucs WHERE c.course_id=cs.course_id AND ucs.user_id=%s AND ucs.course_sec_id=cs.course_sec_id" % (session.user_id))
        for course in users_courses:
            course_list.append(course["course_sec_id"])

        counts_courses = db.query("SELECT item_due_name, course_sec_id, date, time, location, COUNT(*) FROM (SELECT dd.date, dd.time, dd.location, cd.course_sec_id, cd.item_due_name FROM due_date dd, course_section_due_dates cd WHERE dd.due_date_id=cd.due_date_id) AS foo GROUP BY item_due_name, course_sec_id, date, time, location ORDER BY count(*) DESC")
        
        counts_courses = [x for x in counts_courses if x["course_sec_id"] in course_list]

        output = []
        for assignment in counts_courses:
            add = True
            for outs in output:
                if assignment["item_due_name"] == outs["item_due_name"]:
                    add = False
            if add:
                output.append(assignment)


        web.header('Content-Type', 'application/json')
        output = [r for r in output]
        data = json.dumps(output, cls=ExtendedEncoder)
        return data

class courses:

    def GET(self):
        if session.get("logged_in", False):
            return render.courses()
        return render.login(False)

class add:

    def GET(self):
        if session.get("logged_in", False):
            return render.add()
        return render.login(False)

class calendar:

    def GET(self):
        if session.get("logged_in", False):
            return render.calendar()
        return render.login(False)

class populate_calendar_deadlines:

    def GET(self):
        a = [];
        result = db.query("SELECT item_due_name as title, date, time, dd.due_date_id as due_date_id, course_sec_id FROM course_section_due_dates cs, due_date dd WHERE cs.due_date_id=dd.due_date_id AND cs.user_id=%s;" % (session.user_id))

        # print "==============================" + str(len(result));
        for r in result:
            course_sec_index = r['course_sec_id'];
            a.append({'title':r['title'], 'date':str(r['date']) + " " + str(r['time']), 'due_date_id':r['due_date_id'], 'color':coursesAssignedToColours[course_sec_index], 'textColor':'black'});

        web.header('Content-Type', 'application/json')
        result = [r for r in a]
        data = json.dumps(result, cls=ExtendedEncoder)
        return data

class timetable:

    def GET(self):
        # print "======================================================================================"
        a = [];
        now = datetime.datetime(2014, 9, 8, 0, 0)
        weekday = 0
        result = db.query("SELECT course_code as title, date, time, length, semester, courses.course_id as course_id, course_sections.course_sec_id FROM user_course_sections, course_sections, courses, course_section_lecture_details WHERE user_course_sections.course_sec_id=course_sections.course_sec_id AND courses.course_id=course_sections.course_id AND user_course_sections.course_sec_id=course_section_lecture_details.course_sec_id AND user_course_sections.user_id=%s;" % (session.user_id))
        for r in result:
            global coursesAssignedToColours
            global curColour
            course_sec_index = r['course_sec_id'];
            if course_sec_index not in coursesAssignedToColours:
                coursesAssignedToColours[course_sec_index] = colours[curColour];
                curColour += 1;

            if r['date'] == 'M':
                now = datetime.datetime(2014, 9, 8)
                weekday = 0
            elif r['date'] == 'T':
                now = datetime.datetime(2014, 9, 9)
                weekday = 1
            elif r['date'] == 'W':
                now = datetime.datetime(2014, 9, 10)
                weekday = 2
            elif r['date'] == 'R':
                now = datetime.datetime(2014, 9, 11)
                weekday = 3
            elif r['date'] == 'F':
                now = datetime.datetime(2014, 9, 12)
                weekday = 4
            if r['title'][6] == 'H' and r['semester'] == 'F':
                end = datetime.datetime(2014, 12, 6, 0, 0)
            elif r['title'][6] == 'H' and r['semester'] == 'S':
                now = datetime.datetime(2015, 1, 5, 0, 0)
                end = datetime.datetime(2015, 4, 2, 0, 0)
            elif r['title'][6] == 'Y':
                end = datetime.datetime(2014, 12, 6, 0, 0)
                while now < end:
                    if now.weekday() == weekday:
                        startClass = now + datetime.timedelta(hours = r['time'])
                        endClass = now + datetime.timedelta(hours = r['time']) + datetime.timedelta(hours = r['length'])
                        a.append({'title':r['title'], 'date':now, 'start':str(startClass), 'end':str(endClass), 'course_id':r['course_id'], 'color':coursesAssignedToColours[course_sec_index]})
                    now += datetime.timedelta(1)
                now = datetime.datetime(2015, 1, 5, 0, 0)
                end = datetime.datetime(2015, 4, 2, 0, 0)
            while now < end:
                if now.weekday() == weekday:
                    startClass = now + datetime.timedelta(hours = r['time'])
                    endClass = now + datetime.timedelta(hours = r['time']) + datetime.timedelta(hours = r['length'])
                    a.append({'title':r['title'], 'date':now, 'start':str(startClass), 'end':str(endClass), 'course_id':r['course_id'], 'color':coursesAssignedToColours[course_sec_index]})
                now += datetime.timedelta(1)
        for i in a:
            for j in a:
                if (i['start'] <= j['start']) and (i['end'] >= j['start']) :
                    if i['date'] == j['date']:
                        if i['title'] != j['title']:
                            i['color'] = 'FF0000'
                            j['color'] = 'FF0000'
                            i['title'] += ' (CONFLICT)'

        web.header('Content-Type', 'application/json')
        result = [r for r in a]
        data = json.dumps(result, cls=ExtendedEncoder)
        return data

# encoder used to serialize date type information

class ExtendedEncoder(json.JSONEncoder):

    def default(self, o):
        if isinstance(o, datetime.date):             
            # If it's a date, convert to a string.
            # Format will be such that YYYY-MM-DD
            return o.strftime("%Y-%m-%d")
        if isinstance(o, datetime.time):             
            # If it's a date, convert to a string.
            # Format will be such that HH-MM-SS
            return o.strftime("%H:%M:%S") 

        # Defer to the superclass method
        return json.JSONEncoder(self, o)


if __name__ == "__main__":
    app.run()
