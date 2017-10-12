
function Account (balance) {
this.balance = balance;
}
var myaccount = new Account(100);
Account.prototype.balanceEnquiry = function (callback) {
  return callback();
};
Account.prototype.deposit = function(callback, amount) {
  this.balance = this.balance + amount;
};
Account.prototype.withdraw = function(callback,amount) {
  console.log('withdraw started');
  if(this.balance >= amount) {
    this.balance = this.balance - amount;
  } else {
    console.log('Available Balance ' + this.balance + ' Requested Balance ' + amount);
  }
  callback();
};
 var balanceChecker = function() {
   return myaccount.balanceEnquiry(function callback(){return myaccount.balance;});
};

console.log('before deposit :' + myaccount.balance);

var depositVar = function() {
  myaccount.deposit(
    function(){
     console.log('Deposit' + balanceChecker());
    }, 1000);
};

setTimeout(depositVar, 3000);

// myaccount.deposit(
//   function(){
//    console.log('Deposit' + balanceChecker());
//   }, 1000);
console.log('before withdraw :' + myaccount.balance);
myaccount.withdraw(function(){console.log('Balance' + balanceChecker());}, 1000);

// var sample1 = function(callback, num) {
//   console.log('Inside Sample');
//   callback(num);
// };
// var callbackMethod = function(num){
//   console.log('Inside callback num = ' + num);
// };
// console.log(typeof callbackMethod);
// setTimeout(function() {sample1(callbackMethod, 5)}, 1000);
// var sample2 = function(callback, num) {
//   console.log('Inside Sample2');
//   callback(num);
// };
// sample2(callbackMethod, 1);
