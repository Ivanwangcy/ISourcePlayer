// function cumulation(num){
//   var num = num;
//   var sum = new Object();
//   sum.num = num;
//   sum.add = function(subnum){
//     this.num += subnum;
//     // console.info(this.num);
//     return this.add;
//   }
//   sum.toString = function () {
//     return this.num;
//   }
//
//   // return sum.add;
//   return sum;
//
// }
// // Cumulation.prototype.toString = function () {
// //   return this.num;
// // }
//
// // var cumulation = new Cumulation(0);
// console.log(cumulation(0).add(10));
// console.log(cumulation(0).add(10)(10));
// console.log(cumulation(0).add(10)(10)(10));
// console.log(cumulation(0).add(10)(10)(10)(10));

function Add(num){
  this.num = num;
}
Add.prototype.toString = function (){
  return this.num;
}

Add.prototype.add = function (sub) {
  this.num += sub;
  return this.add;
}

var add = new Add(10);
console.info(add);
console.info(add.add(10));
console.info(add.add(10)(10));
