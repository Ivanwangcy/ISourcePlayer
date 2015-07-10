function Circle(radius){
  this.radius = radius;
  if(typeof this.area !== "function"){
    Circle.prototype.area = function(){ // 圆面积
      return Math.PI * Math.pow(this.radius, 2);
    }
    Circle.prototype.circumference = function(){ ///圆周长
      return 2 * Math.PI * this.radius;
    }
  }
}

var circle = new Circle(5);
console.info(circle.area());
console.info(circle.circumference());
circle.radius = 10;
console.info(circle.area());
console.info(circle.circumference());
