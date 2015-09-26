var studentScheduleApp = angular.module('studentScheduleApp', [
	'ngRoute',
	'studentScheduleController'
]);

studentScheduleApp.config(['$routeProvider',
	function($routeProvider, $location) {
		$routeProvider.when('/month', {
			templateUrl: 'static/partials/month.html',
			controller: 'monthCalCtrl'
		}).when('/week', {
			templateUrl: 'static/partials/week.html',
			controller: 'weekCalCtrl'
		}).when('/day', {
			templateUrl: 'static/partials/day.html',
			controller: 'dayCalCtrl'
		}).when('/dates', {
			templateUrl: 'static/partials/dates.html',
			controller: 'currentDates'
		}).otherwise({
			redirectTo: '/month'
		});
	}
]);