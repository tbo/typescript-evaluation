///<reference path='scene.ts'/>
class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
};
var greeter = new Scene("test!");
var str = greeter.greet();
document.body.innerHTML = str;