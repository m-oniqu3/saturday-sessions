/**creates a static array given the size
 * cannot push/pop
 * */
const getArray = (size) => {
  array = Array.apply(null, Array(size)).map(() => 0);

  array.push = undefined;
  array.pop = undefined;

  return array;
};

/**class to create dynamic array
 * dynamic arrays are built on top of static arrays */
class DynamicArray {
  // initialize class, create capacity, size and create new array based on the capacity
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.static_array = getArray(this.capacity);
  }

  // size
  size() {
    return this.size;
  }

  // get - get element at index and return it
  get(index) {
    const limit = this.capacity - 1;
    if (index > limit) throw Error("Index out of bounds");

    return this.static_array[index];
  }

  // set - set value at the index
  set(index, value) {
    const limit = this.capacity - 1;
    if (index > limit) throw Error("Index out of bounds");

    this.static_array[index] = value;
  }

  // push
  push(value) {
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
  }

  // pop - remove the last element, reduce size
  pop() {
    const lastIndex = this.size - 1;

    const valueAtLastIndex = this.static_array[lastIndex];
    this.static_array[lastIndex] = 0;
    this.size--;

    return valueAtLastIndex;
  }
}
