function wait(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
var wait_default = wait;
export {
  wait_default as default
};
