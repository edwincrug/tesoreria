registrationModule.controller('controlDepositosController',  function ($scope, $rootScope, $location, localStorageService,alertFactory, $http, $log, $timeout, uiGridConstants) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');
	
	
	$scope.init = function(){
       // $scope.calendario();
		$scope.dato = "0000";
	}

	 // $scope.calendario = function() {
  //       $('#calendar .input-group.date').datepicker({
  //           todayBtn: "linked",
  //           keyboardNavigation: true,
  //           forceParse: false,
  //           calendarWeeks: true,
  //           autoclose: true,
  //           todayHighlight: true,
  //           format: "dd/mm/yyyy"
  //       });
  //   }


     $scope.gridOptions = {
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true
  };

  $scope.gridOptions.columnDefs = [
    { name: 'id' },
    { name: 'name'},
    { name: 'age', displayName: 'Age (not focusable)', allowCellFocus : false },
    { name: 'address.city' }
  ];

  $scope.gridOptions.multiSelect = true;

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      $timeout(function() {
        if($scope.gridApi.selection.selectRow){
          $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
        }
      });
    });
});