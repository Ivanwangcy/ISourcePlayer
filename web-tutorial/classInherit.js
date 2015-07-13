function Person(name,age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function(){
  console.info(this.name);
}

function Teacher(name,age){
  Person.call(this,name,age);
  this.students = [];
}


Teacher.prototype = new Person();
Teacher.prototype.constructor = Teacher;
Teacher.prototype.tutorial = function(){
  console.info("Teacher " + this.name + " has tutorial.");
}

var teacher = new Teacher("Jobs", 30);
teacher.students.push("Lucy");
console.info(teacher.sayName());
console.info(teacher.tutorial());
console.info(teacher.students);

Object.create = null;
if(!Object.create || typeof Object.create !== "function"){
  Object.create = function(obj){
    // console.info(obj);
    if(!obj) return {};
    if(typeof obj !== "object"){
      throw new TypeError("Object prototype may only be an Object or null: " + obj);
    }
    function Fn(){}
    Fn.prototype = obj;
    return new Fn();
  }
}
  var a = Object.create({x: 1, y: 2});
    alert(a.x);
