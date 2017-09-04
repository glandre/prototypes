angular.module('MeanApp', []);
angular.module('MeanApp')
  .controller('MainCtrl', ctrlFunc);

function ctrlFunc () {
  this.title = 'Home';
  this.people = clientPeople;
}
