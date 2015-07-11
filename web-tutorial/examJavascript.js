/**
*输出指定对象类型并, 输出到控制台
*/
function myType(param) {
  // body...
  return console.info("I am an " +
         Object.prototype.toString.call(param).slice(8,-1)
         + "!");
}

//测试代码
myType({});
myType ([]);
myType (function(){});
myType (new Date());




function search(arr,dst){
  if(dst < arr[0] || dst > arr[arr.length - 1])return -1;
  var idx = -1,
      left = 0,
      right = arr.length;
  while (left <= right) {
    var center = Math.floor((left + right) / 2);
    console.log(arr[center] + ":" + center);
    if(dst == arr[center]){
      idx = center;
      break;
    }
    dst < arr[center] ? right = center - 1 : left = center + 1;
  }
  return idx;
}
var arr = [1, 2, 4, 6, 7, 9, 19,20, 30, 40, 45, 47 , 50, 55, 60, 70];
var idx = search(arr, 100);

function add(x) {
    var sum = x;
    var tmp = function (y) {
        sum = sum + y;
        console.log(sum);  //6
        return tmp;
    };


    tmp.prototype = {
      toString : function(){
        return sum;
      }
    }
    // var obj = new tmp(0);
    // Object.prototype.toString = function(){
    //   return sum;
    // }

    // tmp.prototype.toString = function () {
    //     return sum;
    // };
    return tmp;
}
console.log(add(1));  //6
console.log(add(1)(2)(3));  //6
console.log(add(1)(2)(3)(4));   //10
console.log(add(1)(2)(3)(4)(5));   //15
