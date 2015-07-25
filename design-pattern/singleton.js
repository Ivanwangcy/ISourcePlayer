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
