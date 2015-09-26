var studentScheduleController = angular.module('studentScheduleController', []);
var day = ["Sunday", "Monday", "Tuesday", "Wedensday", "Thursday", "Friday", "Saturday"];
var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
var date = new Date();
var curYear = date.getFullYear();
var curMonth = date.getMonth();
var curDate = date.getDate();

studentScheduleController.controller('monthCalCtrl', ['$scope',
	function($scope) {
		$scope.calTitle = months[curMonth] + " " + curYear;
		$scope.month = buildMonth();

		$scope.prev = function() {
			curMonth = (curMonth == 0) ? 11 : --curMonth;
			curYear -= (curMonth == 11) ? 1 : 0;
			$scope.calTitle = months[curMonth] + " " + curYear;
			$scope.month = buildMonth();
			date = new Date(curYear, curMonth, curDate);
		}

		$scope.next = function() {
			curMonth = (curMonth == 11) ? 0 : ++curMonth;
			curYear += (curMonth == 0) ? 1 : 0;
			$scope.calTitle = months[curMonth] + " " + curYear;
			$scope.month = buildMonth();
			date = new Date(curYear, curMonth, curDate);
		}
	}
]);

studentScheduleController.controller('weekCalCtrl', ['$scope',
	function($scope) {
		$scope.calTitle = "Oct 1 to Oct 7";
		$scope.week = [1, 2, 3, 4, 5, 6, 7];

		$scope.next = function() {
			$scope.calTitle = "Oct 8 to Oct 14";
			$scope.week = [8, 9, 10, 11, 12, 13, 14];
		}

		$scope.prev = function() {
			$scope.calTitle = "Sept 24 to Sept 30";
			$scope.week = [24, 25, 26, 27, 28, 29, 30];
		}
	}
]);

studentScheduleController.controller('dayCalCtrl', ['$scope',
	function($scope) {
		var maxDay = maxMonthDay(curMonth, curYear);
		$scope.calTitle = months[curMonth] + " " + curYear;
		$scope.day = day[date.getDay()];
		$scope.date = curDate;

		$scope.prev = function() {
			curMonth = (curDate == 1) ? ((curMonth == 0) ? 11 : --curMonth) : curMonth;
			maxDay = maxMonthDay(curMonth, curYear);
			curDate = (curDate == 1) ? maxDay : --curDate;
			curYear -= (curDate == maxDay && curMonth == 11) ? 1 : 0;
			date = new Date(curYear, curMonth, curDate);
			$scope.calTitle = months[curMonth] + " " + curYear;
			$scope.day = day[date.getDay()];
			$scope.date = curDate;
		}

		$scope.next = function() {
			curDate = (curDate == maxDay) ? 1 : ++curDate;
			curMonth = (curDate == 1) ? ((curMonth == 11) ? 0 : ++curMonth) : curMonth;
			curYear += (curDate == 1 && curMonth == 0) ? 1 : 0;
			maxDay = maxMonthDay(curMonth, curYear);
			date = new Date(curYear, curMonth, curDate);
			$scope.calTitle = months[curMonth] + " " + curYear;
			$scope.day = day[date.getDay()];
			$scope.date = curDate;
		}
	}
]);

studentScheduleController.controller('currentCalView', ['$scope', '$location',
	function($scope, $location) {
		$scope.location = $location;
	}
]);

studentScheduleController.controller('currentCourses', ['$scope', '$http',
	function($scope, $http) {
		$scope.courses = []
		$http.get("/course/list").success(function(data, status, headers, configs){
			$scope.courses = data;
		});
	}
]);

studentScheduleController.controller('currentDates', ['$scope', '$http',
	function($scope, $http) {
		$scope.dates = []
		$http.get("/date/list").success(function(data, status, headers, configs){
			$scope.dates = data;
		});
	}
]);

function buildMonth(){
	var date = new Date(curYear, curMonth, 1);
	var i = date.getDay();
	var day = 1;
	var row = -1;
	var month = []
	var maxDay = maxMonthDay(curMonth, curYear);
	while (day <= maxDay) {
		var week = []
		for (var j = 0; j < 7; j ++) {
			week.push((j == i && day == 1) || (day > 1 && day <= maxDay) ? day++ : null);
		}
		month.push(week);
	}
	return month;
}

function maxMonthDay(month, year) {
	if (month == 1 && ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0))
		return 29;

	return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

