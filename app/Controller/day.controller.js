angular.module('app')
        .controller('dayController',dayController)
        .directive("displayDay", function(){
            return{
                restrict: 'EA',
                replace: true,
                link: function(scope){
                    console.log("day->"+scope.day);
                },
                scope: {
                  dayData: "@"  
                },
                template: '<div>{{day}}</div>'
            };
        });

dayController.$inject = ['$scope'];

function dayController($scope){
    var now = new Date();
    var dayNames = ["Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat","Vasárnap"];
    var year = now.getFullYear().toString();
    var month = (now.getMonth()+1).toString();
    var dayNum = now.getDate();
    $scope.day = year+" . "+ month+" . " +dayNum+ " / " + dayNames[now.getDay()-1];
}

