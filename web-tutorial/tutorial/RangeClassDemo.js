/**
 * Created by Ivan on 2015/6/4.
 */
//通过原型继承创建一个新对象
function inherit(p){
    if(p == null) throw TypeError(); // p 是一个对象但是不能为 null
    if(Object.create)       //如果Object.create()存在
        return Object.create(p);    //直接使用Object.create() 创建p的新实例对象
    var t = typeof p;   //否则进一步检测
    if(t !== "object" && t !== "function") throw TypeError();
    function f(){}; // 定义一个空构造函数
    f.prototype = p;    // 将其原型设置为p
    return new f(); // 使用 f() 创建 p 的继承实例
}
/*对象深拷贝*/
function clone(object){
    var key, newObject = object, isArray = object instanceof Array;
    if(object && (object instanceof Object || isArray)) {
        newObject = isArray ? [] : {};
        for(key in object){
            if(object.hasOwnProperty(key)){
                newObject[key] = clone(object[key]);
            }
        }
    }
    return newObject;
}

function range(from, to){

    var r = inherit(range.methods);
    r.from = from;
    r.to = to;


    return r;
}

range.methods = {
    includes:function(x){
        return this.from <=x && x <= this.to;
    },
    foreach:function(f){
        for(var x = Math.ceil(this.from); x<= this.to; x++){
            f(x);
        }
    },
    toString: function(){
        return "(" + this.from + "..." + this.to + ")";
    }
};

var r = range(1,3);
console.log(r.includes(2));
r.foreach(console.log);
console.log(r.toString());

//console.log("sss");
