app.controller('mainController', 'commonService', ['$scope', function($scope, c_service) {
    c_service.getData('ertong', function(res) {
        console.dir(res);
    });
}]);
