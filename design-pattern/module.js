//让我们通过创建一个自包含得模块来看一下 Module 模式
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

//检查计数器值并重置
//输出: 1
testModule.resetCounter();
