async function asyncForEach(array, asyncFn) {
  return new Promise(async ({ resolve, reject }) => {
    for (let index = 0; index < array.length; index++) {
      await asyncFn(array[index], index, array);
    }
    resolve();
  });
}
export {
  asyncForEach as default
};
