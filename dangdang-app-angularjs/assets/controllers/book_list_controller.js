app.controller('bookListController',['$scope','$routeParams','commonService',function($scope,$routeParams,c_service){
  $scope.data = [];
    c_s.getData($routeParams.id,function(res){
      // console.dir(res);
      $scope.data = res.data;
    });
}]);
