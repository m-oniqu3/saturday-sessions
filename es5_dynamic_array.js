/**creates a static array given the size
 * cannot push/pop
 * */
const getArray = (size) => {
  array = Array.apply(null, Array(size)).map(() => 0);

  array.push = undefined;
  array.pop = undefined;

  return array;
};

//constructor function to create dynamic array as class in es5
function DynamicArray(capacity) {
  this.capacity = capacity;
  this.size = 0;
  this.static_array = getArray(this.capacity);
}

// by using prototype we can add methods to the constructor function and all the objects created from the constructor function will have access to the methods

DynamicArray.prototype.size = function () {
  return this.size;
};

DynamicArray.prototype.get = function () {
  const limit = this.capacity - 1;
  if (index > limit) throw Error("Index out of bounds");

  return this.static_array[index];
};

DynamicArray.prototype.set = function (index, value) {
  const limit = this.capacity - 1;
  if (index > limit) throw Error("Index out of bounds");

  this.static_array[index] = value;
};

DynamicArray.prototype.push = function (value) {
  this.static_array[this.size] = value;
  const old_array = this.static_array;
  this.size++;

  if (this.size === this.capacity) {
    // create a new static arrray and double the capacity
    this.static_array = getArray(this.capacity * 2);
    this.capacity *= 2;

    // copy over the old values
    for (let i = 0; i < this.size; i++) {
      this.static_array[i] = old_array[i];
    }

    return this.static_array;
  }
};

DynamicArray.prototype.pop = function () {
  const lastIndex = this.size - 1;

  const valueAtLastIndex = this.static_array[lastIndex];
  this.static_array[lastIndex] = 0;
  this.size--;

  return valueAtLastIndex;
};

const array1 = new DynamicArray(8);
array1.push(4);
console.log(array1);
console.log(array1.size); // why doesn't array.size() work
