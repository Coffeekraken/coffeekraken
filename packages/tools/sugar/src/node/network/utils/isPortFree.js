import __tcpPortUsed from "tcp-port-used";
function isPortFree(port) {
  return new Promise((resolve) => {
    __tcpPortUsed.check(port, "127.0.0.1").then(function(inUse) {
      resolve(!inUse);
    }, function() {
      resolve(false);
    });
  });
}
var isPortFree_default = isPortFree;
export {
  isPortFree_default as default
};
