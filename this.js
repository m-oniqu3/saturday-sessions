// Description: this keyword in javascript and how it works in different situations and how to fix it when it does not work as expected

//var name = "Pamela";
function talk() {
  console.log(this);
  console.log(`I am ${this.name}`);
}

const me = { name: "Jonas" };

//talk();
/**
 * logs I am undefined
 * because of window binding, the this keyword will point to the global object which is the window object in the browser and so it will not find the name property in the window object and so it will return undefined
 * it is not attached to any object and so it will point to the global object and it was called in the global scope and so javascript will try to find the name property in the global scope and it will not find it
 * to fix it, we can bind the this keyword to the me object
 * talk.bind(me)() or talk.call(me) or talk.apply(me)
 * the bind method will return a new function and we can call it immediately, the new function it returns will have the this keyword bound to the me object
 * the call and apply methods will call the function immediately and will pass the this keyword to the me object
 * */

const myObject = {
  name: "Pearl",
  age: 20,
  temp: globalThis, // this will point to the global object in nodejs

  talk: function () {
    console.log(this);
    console.log(`I am ${this.name}`); // I am Pearl
  },

  speak() {
    return () => {
      console.log(this);
      console.log(`I am ${this.name}`); // I am undefined
    };
  },

  say: () => {
    console.log(this);
    console.log(`I am ${this.name}`); // I am undefined
  },

  say2() {
    setTimeout(() => {
      console.log(this);
      console.log(`I am ${this.name}`); // I am Pearl
    }, 1000);
  },

  say3: function () {
    return () => {
      console.log(this);
      console.log(`I am ${this.name}. Hello`); // I am Pearl
    };
  },
};

console.log(myObject.temp);
/**this will point to the global object in nodejs
 * because objects do not create bindings, only functions create bindings
 * so the this keyword will point to the global object
 * inside an object, the this keyword will point to the global object and so to bind it , we call a method on the object
 *  */

myObject.talk(); // I am Pearl
/**
 * logs I am Pearl
 * this is an example of implicit binding, the this keyword will point to the object that is calling the method
 * this will point to the myObject object
 */

myObject.speak()();
/**
 * logs I am Pearl and the myObject object
 * this is because the arrow function does not have its own this keyword, it inherits the this keyword from the parent scope and the parent scope is the speak method and so the this keyword will point to the myObject object
 * the speak method is called on the myObject object which creates an implicit binding and so the this keyword will point to the myObject object
 * */

myObject.say();
/**
 * logs I am undefined
 * this is because the arrow function does not have its own this keyword, it inherits the this keyword from the parent scope and the parent scope is the global scope and so the this keyword will point to the global object and so it will not find the name property in the global object and so it will return undefined
 * */

myObject.say2();
/**
 * logs I am Pearl and the myObject object
 * in the setTimeout function, the arrow function is being used as a callback function, usually this function gets executed in a different execution context and so the this keyword will point to the global object therefore it will not find the name property in the global object and will return undefined
 * however, the setTimeout is wrapped in a regular function and so the this keyword will point to the myObject object
 * the arrow function does not have its own this keyword, it inherits the this keyword from the parent scope, the say2 method, a regular function, and so the this keyword will point to the myObject object
 */

myObject.say3()();
/**
 * logs I am Pearl and the myObject object
 * the say3 method returns an arrow function and so the arrow function does not have its own this keyword
 * the arrow function will inherit the this keyword from the say3 method(enclosing scope) and so the this keyword will point to the myObject object
 * */

const sayHey = function () {
  console.log(this);
  //logs the myObject object because we specified the this keyword to be the myObject object

  myObject.say();

  /**
   * logs I am undefined and the global object
   * even though we call this say method inside a regular function, it will not take the this keyword from the sayHey function,
   * it will take the this keyword from the enclosing scope which is the myObject object -> which will be the global object because thats where the say method is defined
   * so the this keyword will point to the global object and so it will not find the name property in the global object and so it will return undefined
   */

  myObject.say.call(this);
  // this will still log the global object because explicit binding does not work with arrow functions

  //to fix this, we have to wrap the say method in a regular function in the object where it is defined
  // myObject.say2();
  // myObject.say3()();
};

sayHey.call(myObject);
// bind this to the myObject object
