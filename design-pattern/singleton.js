var mySingleton = (function () {

  // 实例保持了 Singleton 的一个引用
  var instance;
  function init(){
    // Singleton
    // 私有方法和变量
    function privateMethod() {
      cosole.log("I am private");
    }
    var privateVariable = "I'm also private";
    var privateRandomNumber = Math.random();
    return {
        // 公有方法和变量
        publicMethod: function () {
          console.log("The public can see me!");
        },
        publicProperty: "I am also public",
        getRandomNumber: function () {
          return privateRandomNumber;
        }
    };
  };
  return {
    // 获取 Singleton 的实例, 如果存在就返回, 不存在就创建新实例
    getInstance: function () {
      if(!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

//错误的写法
var myBadSingleton = (function () {
  var instance;
  function init() {
      //Singleton
      var privateRandomNumber = Math.random();
      return {
        getRandomNumber: function () {
            return privateRandomNumber;
        }
      };
  };

  //实例
  return {
    //每次都创建新实例
    getInstance: function () {
      instance = init();
      return instance;
    }
  }
})();


var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();

console.log(singleA.getRandomNumber() === singleB.getRandomNumber());

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();

console.log(badSingleA.getRandomNumber() === badSingleB.getRandomNumber());


//实际应用示例, 静态与单例模式使用
var singletonTester = (function(){

  function Singleton(options){
    options = options || {};

    //为Singleton 设置一些属性
    this.name = "SingletonName";
    this.pointX = options.pointX || 6;
    this.pointY = options.pointY || 10;
  }

  //实例持有者
  var instance;

  //静态方法和变量的模拟
  var _static = {
    name: "SingletonStaticName",

    //获取实例的方法, 返回 singleton 对象的 singleton 实例
    getInstance: function (options) {
      if(instance === undefined){
        instance = new Singleton(options);
      }
      return instance;
    }
  };

  return _static;
})();

var singletonTest = singletonTester.getInstance({
  pointX:100
});

//记录 pointX 的输出以便验证
//输出: 100
console.log( singletonTest.pointX );
