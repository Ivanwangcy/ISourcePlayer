/**
 * [hasPrototypeProperty 判断是否为原型属性, 非实例属性]
 * @param  {[object]}  object [description]
 * @param  {[string]}  name   [description]
 * @return {Boolean}        [description]
 */
function hasPrototypeProperty(object, name){
  return !object.hasOwnProperty(name) && (name in object);
}

// 创建对象方法
//
// 构造函数模式
function Person(){
  this.name = "Sunny";
}

function Person(){}
//原型模式
Person.prototype.name = "Abama";
Person.prototype.age = 18;
Person.prototype.job = "Engineer";
Person.prototype.sayName = function(){
  console.info(this.name);
};

var person1 = new Person();
var person2 = new Person();
// console.info(hasPrototypeProperty(person1,"name"));//true
person2.name = "Javascript";
// console.info(hasPrototypeProperty(person2,"name"));//false
// console.info(person1 instanceof Object);//true
// console.info(person1 instanceof Person);//true
// console.info(person1.constructor === Person);//true
// console.info(person1.constructor === Object);//false

var keys = Object.keys(person2);
// console.info(keys);//
var keys = Object.keys(Person.prototype);
// console.info(keys);
var keys = Object.getOwnPropertyNames(Person.prototype);
// console.info(keys);

//
//
//
// 重写原型
//
//
//简化多次调用prototype
Person.prototype = {//重写了原型对象
  constructor : Person, //constructor 重新创建构造函数
  name :"Current",
  age : 20,
  job : "Teacher",
  friends : ["Lucy","Michle","Mircosoft","Oracle"],
  sayName: function(){
    console.info(this.name);
  }
};

person1 = new Person();
person1.friends.push("American");
person2 = new Person();
// console.info(person1.friends);
// console.info(person2.friends);
// console.info(person2.friends === person1.friends); // true



// //////////////////////////////////////////
//组合模式 (构造函数与原型模式组合使用)
// ////////////////////////////////////////
function Person(){
  this.name = "New York";
  this.age = 19;
  this.job = "Programer";
  this.friends = ["Jobs","Nicul","Jackson"];
}

Person.prototype = {
  constructor : Person,
  sayName : function() {
    console.info(this.name);
  }
};
person1 = new Person();
person1.friends.push("Coffee");
person2 = new Person();
console.info(person1.friends);
console.info(person2.friends);
console.info(person2.friends === person1.friends); // true


// //////////////////////////////////////////
// //////////////////////////////////////////
// //////////////////////////////////////////
// 动态原型模式 --- 推荐
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
function PersonDynamic(){
  this.name = "Common";
  this.friends = ["Course","Tutorial","Experience"];
  if(typeof this.sayName !== "function"){
    PersonDynamic.prototype.sayName = function(){
      console.info(this.name);
    }
  }
}
// //////////////////////////////////////////
// //////////////////////////////////////////
// //////////////////////////////////////////
//继承
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
function SuperType(){
  this.property = "Google";
  this.colors = ["red","blue","white","black"];
  if(typeof this.getSuperValue !== "function"){
    SuperType.prototype.getSuperValue = function(){
      return this.property;
    };
  }
}

function SubType(){
  this.subProperty = "Github";
}
// //////////////////////////////////////////
//原型继承
// ////////////////////////////////////////
//这种继承方式的缺点 : 继承后, 属性 SubType.colors 相当于 SubType.prototype.colors; 所有实例共享
SubType.prototype = new SuperType(); //继承SuperType
var instance = new SubType();
SubType.prototype.getSubValue = function(){
  return this.subProperty;
};
// SubType.prototype = {};  //这样做就解除了继承关系, 重写了原型, 原型链被切断

// console.info(instance.constructor);
// console.info(instance.getSuperValue()); // Google
// console.info(instance instanceof Object);
// console.info(instance instanceof SuperType);
// console.info(instance instanceof SubType);
// console.info(Object.prototype.isPrototypeOf(instance));
// console.info(SuperType.prototype.isPrototypeOf(instance));
// console.info(SubType.prototype.isPrototypeOf(instance));



// //////////////////////////////////////////
//借用构造函数继承
//解决了共享实例属性的问题
// ////////////////////////////////////////
function SubType(){
  SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("pink");
var instance2 = new SubType();
instance2.colors.push("yellow");
console.info(instance1.colors);
console.info(instance2.colors);
