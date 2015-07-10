/**
 * Created by Ivan on 2015/6/4.
 */
function Range(from,to){
    this.from = from;
    this.to = to;
}

Range.prototype = {
    includes: function (x){
        return this.from <= x && x <= this.to;
    },
    foreach: function(f){
        for(var i = this.from; i<=this.to;i++){
            f(i);
        }
    },
    toString: function(){
        return "(" + this.from + "..." + this.to + ")";
    }
};

var r = new Range(1,5);
console.log(r.includes(4));
r.foreach(console.log);
console.log(r.toString());
console.log(r instanceof Range);