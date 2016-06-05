var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.payment = 5500;
	$scope.davenportRate = 0.1269;
	$scope.americanRate = 0.1175;
	$scope.vanguardRate = 0.0793;
	
	function range(i){return i?range(i-1).concat(i):[]}
	$scope.years = range(40);
	
	// Davenport
	$scope.getDavenportTotal = function(year) {
		var total = 0;
		var totalFee = 0;
		var fee = 0.0075;
		for (var i=1; i<=year; i++) {
			// annual investment
			total = total + $scope.payment;
			
			// annual growth
			total = total * (1 + $scope.davenportRate);
			
			// fees
			totalFee = total * fee;
			
			// net
			total = total - totalFee;
		}
		return total.formatMoney(2);
	};
	
	$scope.getDavenportFee = function(year) {
		var total = 0;
		var totalFee = 0;
		var fee = 0.0075;
		for (var i=1; i<=year; i++) {
			// annual investment
			total = total + $scope.payment;
			
			// annual growth
			total = total * (1 + $scope.davenportRate);
			
			// fees
			totalFee = total * fee;
			
			// net
			total = total - totalFee;
		}
		return totalFee.formatMoney(2);
	};
	
	// American	
	$scope.getAmericanTotal = function(year) {
		var total = 0;
		var totalFee = 0;
		var fee = 0.0575;
		for (var i=1; i<=year; i++) {
			// annual investment
			total = total + $scope.payment;
			
			// annual growth
			total = total * (1 + $scope.americanRate);
			
			// fees
			if (total < 25000) { fee = 0.0575; }
			else if (total < 50000) { fee = 0.05; }
			else if (total < 100000) { fee = 0.045; }
			else if (total < 250000) { fee = 0.035; }
			else if (total < 500000) { fee = 0.025; }
			else if (total < 750000) { fee = 0.02; }
			else if (total < 1000000) { fee = 0.015; }
			else { fee = 0.0; }
			totalFee = ($scope.payment * fee) + 10;
			
			// net
			total = total - totalFee;
		}
		return total.formatMoney(2);
	};
	
	$scope.getAmericanFee = function(year) {
		var total = 0;
		var totalFee = 0;
		var fee = 0.0575;
		for (var i=1; i<=year; i++) {
			// annual investment
			total = total + $scope.payment;
			
			// annual growth
			total = total * (1 + $scope.americanRate);
			
			// fees
			if (total < 25000) { fee = 0.0575; }
			else if (total < 50000) { fee = 0.05; }
			else if (total < 100000) { fee = 0.045; }
			else if (total < 250000) { fee = 0.035; }
			else if (total < 500000) { fee = 0.025; }
			else if (total < 750000) { fee = 0.02; }
			else if (total < 1000000) { fee = 0.015; }
			else { fee = 0.0; }
			totalFee = ($scope.payment * fee) + 10;
			
			// net
			total = total - totalFee;
		}
		return totalFee.formatMoney(2);
	};
	
	// Vanguard
	$scope.getVanguardTotal = function(year) {
		var total = 0;
		var fee = 20;
		for (var i=1; i<=year; i++) {
			// annual investment
			total = total + $scope.payment;
			
			// annual growth
			total = total * (1 + $scope.vanguardRate);
			
			// net after $20 annual fee
			total = total - fee;
		}
		return total.formatMoney(2);
	};
	
	// function to format money
	Number.prototype.formatMoney = function(c, d, t){
		var n = this, 
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };
});