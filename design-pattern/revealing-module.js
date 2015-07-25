//揭示模块模式
var myRevealingModule = function () {
    var privateVar = "Ben Cherry",
        publicVar = "Hey there!";
    function privateFunction() {
      console.log("Name: " + privateVar);
    }

    function publicSetName(strName) {
      privateVar = strName;
    }

    function publicGetName() {
      privateFunction();
    }

    //将暴露的公有指针指向到(需要公开的)私有函数和属性上
    return {
      setName: publicSetName,
      greeting: publicVar,
      getName: publicGetName
    };

}();

myRevealingModule.setName("Paul Kinlan");
myRevealingModule.getName();
