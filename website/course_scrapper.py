import urllib2, json, re, codecs

ERRORS = 0
ERROR_MESSAGES = []
BASE_URL = "http://www.artsandscience.utoronto.ca/ofr/timetable/winter/sponsors.htm"
ROW_PATTERN = re.compile(r'<tr\s?.*?>(.*?)</tr\s?.*?>', re.I|re.M|re.S)
GENERIC_TAG = re.compile(r'</?(\w+).*?>', re.I|re.M)
DEPARTMENT_LINK_PATTERN1 = re.compile(r'<li.*?>\s*<a\s.*?href\s*=\s*[\'"](.*?)[\'"].*?>', re.I|re.M|re.S)
DEPARTMENT_LINK_PATTERN2 = re.compile(r'<li.*?>\s*<a\s.*?href\s*=\s*(.*?)>', re.I|re.M|re.S)
SPLIT_ROW_PATTERN = re.compile(r'<td\s?.*?>(.*?)</td\s?.*?>', re.I|re.M|re.S)
FIND_LECTURE = re.compile(r'\b\w\d{4}\b', re.I)
CANCELLED_CLASS_PATTERN = re.compile(r'\bCancel(led)?\b', re.I|re.M)
HEADER = {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US,en;q=0.5",
            "Cache-Control": "max-age=0",
            "Connection": "keep-alive",
            "Cookie": "_ga=GA1.2.967149482.1410893411",
            "DNT": "1",
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0"}

def clean(input):
    input = re.sub(r'\r\n\s*\(Note:.*?)', '', re.sub(r'&\w+;', '', re.sub(r'</?(\w+).*?>', '', input, flags=re.I), flags=re.I), flags=re.I).strip()
    return "TBA" if input == "Contact Department for Information" else input

def get_html(url):
    output = ""
    response = None
    try:
        response = urllib2.urlopen(urllib2.Request(url, "", HEADER))
        output = response.read().decode("utf-8")
    except Exception as e:
        try:
            response = urllib2.urlopen(urllib2.Request(url, "", HEADER))
            output = response.read()
        except Exception as e:
            output = ""
    if response:
        response.close()
    return output

def gather_info(cells, department_courses):
    global ERRORS
    info = {}
    last_course = {} if len(department_courses) < 1 else department_courses[-1]
    for i in range(0, len(cells)):
        cells[i] = clean(cells[i])
    try:
        info = {"course_code": cells[0] if len(cells[0]) > 0 else last_course.get("course_code", ""),
                "semester": cells[1] if len(cells[1]) > 0 else last_course.get("semester", ""),
                "title": cells[2] if len(cells[2]) > 0 else last_course.get("title", ""),
                "section": cells[3] if len(cells[3]) > 0 else last_course.get("section", ""),
                "datetime": cells[5] if len(cells[5]) > 0 else last_course.get("datetime", ""),
                "location": cells[6] if len(cells[6]) > 0 else last_course.get("location", ""),
                "lecturer": cells[7] if len(cells[7]) > 0 else last_course.get("lecturer", "")}
    except Exception as e:
        ERRORS += 1
        ERROR_MESSAGES.append((e, cells))
        info = {}
    if info:
        department_courses.append(info)

def find_courses(table_rows):
    started = False
    department_courses = []
    i = 0
    for row in table_rows:
        if not CANCELLED_CLASS_PATTERN.search(row):
            cells = SPLIT_ROW_PATTERN.findall(row)
            if not started:
                for cell in cells:
                    if FIND_LECTURE.search(cell):
                        started = True
                        gather_info(cells, department_courses)
                        break
            else:
                gather_info(cells, department_courses)
    return department_courses

def main():
    html = get_html(BASE_URL)
    department_links = DEPARTMENT_LINK_PATTERN1.findall(html)
    for link in DEPARTMENT_LINK_PATTERN2.findall(html):
        if not('"' in link or "'" in link):
            department_links.append(link)
    all_courses = []
    for link in department_links:
        url = BASE_URL[:BASE_URL.rfind("/") + 1] + link
        rows = ROW_PATTERN.findall(get_html(url))
        all_courses += find_courses(rows)
    f = codecs.open("./all_courses.json", "w", "utf-8")
    f.write(json.dumps(all_courses, sort_keys=True, indent=4, separators=(',', ': ')))
    f.close()
    if ERRORS > 0:
        f = codecs.open("./errors.txt", "w", "utf-8")
        f.write(str(ERRORS) + " errors occurred\n")
        for error in ERROR_MESSAGES:
            f.write(str(error[0]) + " for: " + str(error[1]) + "\n")
        f.close()

if __name__ == '__main__':
    main()
