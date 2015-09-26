##CRC Cards##

####CRC Scenario 1: As a student, I would like to be able to search for courses and add them to my personal timetable with the lecture sections in which I am enrolled.

<table>
<tr><td colspan="2"><b>Student</b></td></tr>
<tr>
  <td><i>Responsibilities</i>
    <ul>
      <li>id</li>
      <li>name</li>
      <li>all classes</li>
      <li>add class</li>
      <li>remove class</li>
    </ul>
  </td>
  <td style="vertical-align: top"><i>Interacts</i>
    <ul>
      <li>Course</li>
    </ul>
  </td>
</tr>
</table>

<table>
<tr><td colspan="2"><b>Course</b></td></tr>
<tr>
  <td><i>Responsibilities</i>
    <ul>
      <li>name</li>
      <li>type</li>
      <li>section code</li>
      <li>semester</li>
      <li>school year</li>
    </ul>
  </td>
  <td style="vertical-align: top"><i>Interacts</i>
    <ul>
      <li>Course Section</li>
    </ul>
  </td>
</tr>
</table>

<table>
<tr><td colspan="2"><b>Course Section</b></td></tr>
<tr>
  <td><i>Responsibilities</i>
    <ul>
      <li>section code</li>
      <li>start date</li>
      <li>end date</li>
      <li>time</li>
      <li>length of time</li>
      <li>location</li>
      <li>days of week</li>
      <li>professor</li>
    </ul>
  </td>
  <td style="vertical-align: top"><i>Interacts</i>
  </td>
</tr>
</table>

####CRC Scenario 2: As a student, I would like to add due dates for assignments, midterms, problem sets, quizzes, exams, office hours, and other personal tasks for each course to my personal timetable, and classify them accordingly.

<table>
<tr><td colspan="2"><b>Student</b></td></tr>
<tr>
  <td><i>Responsibilities</i>
    <ul>
      <li>id</li>
      <li>name</li>
      <li>CourseEvents</li>
      <li>add CourseEvents</li>
      <li>remove CourseEvents</li>
    </ul>
  </td>
  <td style="vertical-align: top"><i>Interacts</i>
    <ul>
      <li>Course Event</li>
    </ul>
  </td>
</tr>
</table>

<table>
<tr><td colspan="2"><b>Course Event</b></td></tr>
<tr>
  <td><i>Responsibilities</i>
    <ul>
      <li>name / description</li>
      <li>type</li>
      <li>date</li>
      <li>time</li>
      <li>time length</li>
      <li>is personal</li>
      <li>course</li>
      <li>is weekly</li>
      <li>course section</li>
    </ul>
  </td>
  <td style="vertical-align: top"><i>Interacts</i>
    <ul>
      <li>Course</li>
      <li>Course Section</li>
    </ul>
  </td>
</tr>
</table>

####CRC Scenario 3: As a student, I would like view due dates on the public timetable for each course based on what the majority of students have set for their due dates and posted to the public timetable.

<table>
<tr><td colspan="2"><b>Course Event</b></td></tr>
<tr>
  <td><i>Responsibilities</i>
    <ul>
      <li>name / description</li>
      <li>type</li>
      <li>date</li>
      <li>time</li>
      <li>time length</li>
      <li>is personal</li>
      <li>course</li>
      <li>is weekly</li>
      <li>course section</li>
    </ul>
  </td>
  <td style="vertical-align: top"><i>Interacts</i>
    <ul>
      <li>Course</li>
      <li>Course Section</li>
    </ul>
  </td>
</tr>
</table>

<table>
<tr><td colspan="2"><b>Course</b></td></tr>
<tr>
  <td><i>Responsibilities</i>
    <ul>
      <li>name</li>
      <li>type</li>
      <li>section code</li>
      <li>semester</li>
      <li>school year</li>
    </ul>
  </td>
  <td style="vertical-align: top"><i>Interacts</i>
    <ul>
      <li>Course Section</li>
    </ul>
  </td>
</tr>
</table>

<table>
<tr><td colspan="2"><b>Course Section</b></td></tr>
<tr>
  <td><i>Responsibilities</i>
    <ul>
      <li>section code</li>
      <li>start date</li>
      <li>end date</li>
      <li>time</li>
      <li>length of time</li>
      <li>location</li>
      <li>days of week</li>
      <li>professor</li>
    </ul>
  </td>
  <td style="vertical-align: top"><i>Interacts</i>
  </td>
</tr>
</table>
