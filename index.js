class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  set(key, value) {
    //if key already exists delete the key and then add it back
    if (this.map.has(key)) {
      this.map.delete(key);
    }

    // check if size === capacity
    if (this.map.size === this.capacity) {
      this.leastRecentlyUsed = this.map.entries().next().value;
      this.map.delete(this.leastRecentlyUsed[0]); // gets the key
    }

    //set k, v
    this.map.set(key, value);
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    else {
      //get the val, delete the key,add back the key value
      this.value = this.map.get(key);
      //   this.map.delete(key);
      this.set(key, this.value);
      //  this.leastRecentlyUsed = this.map.entries().next().value;
      return this.value;
    }
  }
}

//["LRUCache","get","put","get","put","put","get","get"]
//[[2],        [2],[ 2,6],[1],  [1,5], [1,2],[1],  [2]]

const cache = new LRUCache(2);
console.log(cache.get("2")); //-1
cache.set("2", "6"); // 2 = 6
console.log(cache);
console.log("get 1", cache.get("1")); // -1
cache.set("1", "5"); // 2 = 6 , 1 = 5
console.log(cache);
cache.set("1", "2"); // 2 = 6, 1 = 2
console.log(cache);
console.log("get 1", cache.get("1")); // 2
console.log("get 2", cache.get("2")); // 6
