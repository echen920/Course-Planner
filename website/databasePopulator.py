import psycopg2, json, re, sys, codecs

f = open("database.txt")
dbinfo = eval(f.read())
f.close()
conn = psycopg2.connect(database=dbinfo.get("dbname", None), user=dbinfo.get("user", None), password=dbinfo.get("pw", None), host=dbinfo.get("host", None), port=dbinfo.get("port", None))
cur = conn.cursor()

def populate():

	f = open("modified_all_courses.json")
	courses = json.load(f)
	f.close()

	f = open("security_questions.json")
	questions = json.load(f)
	f.close()

	for question in questions:
		try:
			cur.execute("insert into security_questions (question_name, question) values (%s, %s)", (question["question_name"], question["question"]))
		except Exception as e:
			print cur.query
			print question
			print str(e)
			print "error, dropped all changes"
			sys.exit(1)

	cur.execute("insert into app_users (email, pw, question, answer) values (%s, %s, %s, %s)", ("test@utoronto.ca", "e10adc3949ba59abbe56e057f20f883e", "pet", "spot"))

	for course in courses:

		should_pass = False

		for key in course:
			if "TBA" in course[key]:
				should_pass = True
			course[key] = course[key].strip()
		
		if should_pass:
			continue

		date = re.search(r'[A-Za-z]+', course["datetime"]).group(0)
		matchTime = re.search(r'(\d+)\s*(-\s*(\d+))?', course["datetime"])
		time = int(matchTime.group(1))
		length = 1
		if "-" in matchTime.group(0):
			length = int(matchTime.group(3)) - int(matchTime.group(1))
		time = time + 12 if time < 9 else time

		try:
			cur.execute("select course_id from courses where course_code=%s and semester =%s ", (course["course_code"], course["semester"]))
			if cur.rowcount == 0:
				cur.execute("insert into courses (name, course_code, semester, year) values (%s, %s, %s, %s)", (course["title"], course["course_code"], course["semester"], 2015 if course["semester"] == "S" else 2014))
				cur.execute("select course_id from courses where course_code=%s and semester =%s ", (course["course_code"], course["semester"]))
		except Exception as e:
			print cur.query
			print course
			print str(e)
			print "error, dropped all changes"
			sys.exit(1)
		course_id = cur.fetchone()[0]

		try:
			cur.execute("select course_sec_id from course_sections where course_id=%s and section=%s", (course_id, course["section"]))
			if cur.rowcount == 0:
				cur.execute("insert into course_sections (course_id, section, lecturer) values (%s, %s, %s)", (course_id, course["section"], course["lecturer"]))
				cur.execute("select course_sec_id from course_sections where course_id=%s and section=%s", (course_id, course["section"]))
		except Exception as e:
			print cur.query
			print course
			print str(e)
			print "error, dropped all changes"
			sys.exit(1)
		course_sec_id = cur.fetchone()[0]

		try:
			location = {}
			for loc in course["location"].split("\n"):
				loc = loc.strip()
				match = re.match("([MTWRF]+):\s*(.+)", loc)
				if match:
					dates = match.group(1)
					for i in range(0, len(dates)):
						location[dates[i]] = match.group(2).strip()
				else:
					for i in range(0, len(date)):
						location[str(date[i])] = location.get(str(date[i]), loc).strip()
		except Exception as e:
			print str(e)
			print "error, dropped all changes"
			sys.exit(1)

		try:
			for i in range(0, len(date)):
				cur.execute("select * from course_section_lecture_details where course_sec_id=%s and date=%s and time=%s", (course_sec_id, str(date[i]), time))
				if cur.rowcount == 0:				
					cur.execute("insert into course_section_lecture_details values (%s, %s, %s, %s, %s)", (course_sec_id, time, length, str(date[i]), location[str(date[i])]))
		except Exception as e:
			print course
			print str(e)
			print "error, dropped all changes"
			sys.exit(1)
        conn.commit()

def dropTables():
	try:
		cur.execute("drop table course_section_due_dates;")
	except Exception as e:
		print "error, course_section_due_dates not dropped, may not even exist for drop."
		print str(e)
	try:
		cur.execute("drop table due_date;")
	except Exception as e:
		print "error, due_date not dropped, may not even exist for drop."
		print str(e)
	try:
		cur.execute("drop table course_section_lecture_details;")
	except Exception as e:
		print "error, course_section_lecture_details not dropped, may not even exist for drop."
		print str(e)
	try:
		cur.execute("drop table user_course_sections;")
	except Exception as e:
		print "error, user_course_sections not dropped, may not even exist for drop."
		print str(e)
	try:
		cur.execute("drop table course_sections;")
	except Exception as e:
		print "error, course_sections not dropped, may not even exist for drop."
		print str(e)
	try:
		cur.execute("drop table courses;")
	except Exception as e:
		print "error, courses not dropped, may not even exist for drop."
		print str(e)
	try:
		cur.execute("drop table app_users;")
	except Exception as e:
		print "error, app_users not dropped, may not even exist for drop."
		print str(e)
	try:
		cur.execute("drop table app_sessions;")
	except Exception as e:
		print "error, app_sessions not dropped, may not even exist for drop."
		print str(e)
	try:
		cur.execute("drop table security_questions;")
	except Exception as e:
		print "error, security_questions not dropped, may not even exist for drop."
		print str(e)
	conn.commit()

def createTables():
	f = codecs.open('db.schema.txt', 'r', 'utf-8')
	line = f.readline().strip()
	cmd = ""
	while line:
		cmd += line
		if cmd.endswith(");"):
			cur.execute(cmd)
			cmd = ""
		line = f.readline().strip()

if __name__ == "__main__":
	dropTables()
	createTables()
	populate()  