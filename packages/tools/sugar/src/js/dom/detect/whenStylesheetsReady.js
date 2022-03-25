import __linkLoaded from "../load/linkLoaded";
function whenStylesheetsReady(links = null, cb = null) {
  if (!links) {
    links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  }
  const promises = [];
  [].forEach.call(neededStylesheetsStack, ($link) => {
    promises.push(__linkLoaded($link));
  });
  const allPromises = Promise.all(promises);
  allPromises.then(() => {
    cb == null ? void 0 : cb();
  });
  return allPromises;
}
export {
  whenStylesheetsReady as default
};
