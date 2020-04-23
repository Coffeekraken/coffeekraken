global.Sugar = require('./node');

console.log(Sugar.node.array.keysLast(['hello', 'world', 'coco'], ['hello']));

setTimeout(() => {

  console.log(Sugar.node.color.SColor);
}, 3000);

setTimeout(() => {

  console.log(Sugar.node.color.SColor);
}, 6000);