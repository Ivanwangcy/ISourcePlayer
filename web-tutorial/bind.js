/**
 * Created by Ivan on 2015/6/25.
 */
Function.prototype.bind = null;
if(!Function.prototype.bind){
    Function.prototype.bind = function(obj){
        var self = this;//保存调用bind的函数
        //保存调用时的参数 且 需要给self传递的参数, arguments[0] == obj 绑定的新函数
        var selfParams = Array.prototype.slice.call(arguments, 1);

        return function(){
            var newParams = selfParams.concat(Array.prototype.slice.call(arguments));
            self.apply(obj,newParams);
        }
    }
}


// var i = 1;
// while(i != 0){
//   i = randomInteger();
//   console.info(i);
//   }
// Function.prototype.bind = null;
function move(x, y) {
    this.x += x;
    this.y += y;
}
var point = {x:1, y:2};
var pointmove = move.bind(point, 2, 2);
pointmove(); // {x:3, y:4}
console.info(point);
pointmove(20,20); // {x:5, y:6}
console.info(point);

var point2 = {x:1, y:2};
var pointmove2 = move.bind(point2, 2, 2);
pointmove2(); // {x:3, y:4}
console.info(point2);
pointmove2(20,20); // {x:5, y:6}
console.info(point2);