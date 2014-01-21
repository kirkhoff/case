angular.module('case', ['zen.ui.select', 'ui.bootstrap.position', 'angular.stellar'])
    .config(['stellarConfig', function(stellarConfig){
        stellarConfig.horizontalScrolling = false;
        stellarConfig.verticalOffset = 300;
    }])
    .controller('scheduleCtrl', function($scope){
        // Options array for the Best Time select input
        $scope.timeOptions = [
            'Best Time to Reach Me',
            '8AM-10PM',
            '10AM-12PM',
            '12PM-1PM',
            '1PM-3PM',
            '3PM-5PM',
            'Other'];

        // The default choice for the Best Time select input
        $scope.bestTime = $scope.timeOptions[0];
    });