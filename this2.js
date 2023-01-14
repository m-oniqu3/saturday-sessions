const myObject2 = {
  name: "Pearl",
  age: 20,
  myData: {
    temp: globalThis,
    name: "Mancy",
    say: () => {
      console.log(`I am ${this.name}`);
    },
  },

  myDataFunction: function () {
    console.log(this); // this will point to the myObject2 object
    return (say = () => {
      console.log(`I am ${this.name}`);
    });
  },
};

myOtherObject = {
  name: "Roger",
};

myObject2.myData.say();
// logs I am undefined

//myObject2.myDataFunction()();
// logs I am Pearl

//myObject2.myDataFunction().call(myOtherObject);
//logs i am pearl because you can only bind a function once and it is already bound to myObject2

function Person(n) {
  this.name = n;
  this.talk = function () {
    console.log(`I am ${this.name}`);
  };

  setTimeout(function () {
    console.log(this);
  }, 1000);
}

const person = new Person("Pearl");
// logs I am undefined because the callback function gets executed in a different context and so the this keyword will point to the global object

//to fix this, we can bind the this keyword to the person object and that will return a new function for the setTimeout method to call and so the this keyword will point to the person object
//setTimeout(function() {console.log(this);}.bind(this), 1000);

// we can also use an arrow function in the callback function because arrow functions do not create their own this keyword but instead they inherit the this keyword from the parent scope and in this case the parent scope is the Person function and so the this keyword will point to the person object
