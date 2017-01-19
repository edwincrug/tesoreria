registrationModule.controller('controlDepositosController',  function ($scope, $rootScope, $location, localStorageService,alertFactory, $http, $log, $timeout, uiGridConstants) {

	// ****************** Se guarda la información del usuario en variable userData
	$rootScope.userData = localStorageService.get('userData');
	
	
	$scope.init = function(){
        $scope.calendario();
		$scope.dato = "0000";
	}

	 $scope.calendario = function() {
        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true,
            format: "dd/mm/yyyy"
        });
    }


  $scope.gridDepositos = { enableRowSelection: true, enableRowHeaderSelection: false };

  $scope.gridDepositos.columnDefs = [
    { name: 'id' },
    { name: 'name'},
    { name: 'age', displayName: 'Age (not focusable)', allowCellFocus : false },
    { name: 'address.city' }
  ];

  $scope.gridDepositos.multiSelect = false;
  $scope.gridDepositos.modifierKeysToMultiSelect = false;
  $scope.gridDepositos.noUnselect = true;
  $scope.gridDepositos.onRegisterApi = function( gridApi ) {
    $scope.gridApi = gridApi;
  };

  $scope.toggleRowSelection = function() {
    $scope.gridApi.selection.clearSelectedRows();
    $scope.gridDepositos.enableRowSelection = !$scope.gridDepositos.enableRowSelection;
    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridDepositos.data = data;

      // $interval whilst we wait for the grid to digest the data we just gave it
      $interval( function() {$scope.gridApi.selection.selectRow($scope.gridDepositos.data[0]);}, 0, 1);
    });


  $scope.gridDocumentos = {
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    showGridFooter:true
  };

  $scope.gridDocumentos.columnDefs = [
    { name: 'id' },
    { name: 'name'},
    { name: 'age', displayName: 'Age (not focusable)', allowCellFocus : false },
    { name: 'address.city' }
  ];

  $scope.gridDocumentos.multiSelect = true;

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridDocumentos.data = data;
      $timeout(function() {
        if($scope.gridApi.selection.selectRow){
          $scope.gridApi.selection.selectRow($scope.gridDocumentos.data[0]);
        }
      });
    });





});