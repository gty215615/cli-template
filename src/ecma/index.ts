

const set = new Set('abcdefg')



console.log(set.keys());
console.log(set.values());
console.log(set.entries());
set.forEach((key, value) => {
    console.log(key, value);
})




export const map = new Map();

map.set('a', 2)

map.set(1, 2)
map.set(true, 1)
map.set(null, 1)
map.set(undefined, 1)
map.set({}, 1)
map.set({ a: 1 }, 1)
map.set(Object, 2)


const weakMap = new WeakMap()

weakMap.set({ 1: 1 }, 1)


console.log(map);
console.log(weakMap);
console.log(weakMap.get({}));
