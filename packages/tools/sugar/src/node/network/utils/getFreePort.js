import __isPortFree from "./isPortFree";
function getFreePort(port = null) {
  return new Promise(async (resolve) => {
    if (!port)
      port = Math.round(Math.random() * 65535);
    let isFree = await __isPortFree(port);
    do {
      port = Math.round(Math.random() * 65535);
      isFree = await __isPortFree(port);
    } while (!isFree);
    resolve(port);
  });
}
var getFreePort_default = getFreePort;
export {
  getFreePort_default as default
};
