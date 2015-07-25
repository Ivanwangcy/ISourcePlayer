//让我们通过创建一个自包含得模块来看一下 Module 模式的实现
var testModule = (function () {
  var counter = 0;
  return {
    incrementCounter: function () {
      return ++counter;
    },
    resetCounter: function () {
      console.log("counter value prior to reset: " + counter);
      return counter = 0;
    }
  };
})();

// 用法
//
// 增加计数器
testModule.incrementCounter();
testModule.incrementCounter();
testModule.incrementCounter();
testModule.incrementCounter();

//检查计数器值并重置
//输出: 4
testModule.resetCounter();

//下面是一个包含命名空间, 公有和私有变量的 MOdule 模式:

var myNamespace = (function () {
  var myPrivateProperty = 0;
  var myPrivateMethod = function (name){
    console.log("(myNamespace)" + name + " : " + myPrivateProperty);
  }
  return {
    myPublicMethod: function (name) {
      myPrivateProperty++;
      myPrivateMethod(name);
    }
  }
})();

myNamespace.myPublicMethod("Hello");
