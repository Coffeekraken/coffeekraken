import __ip from "ip";
function ipAddress() {
  return __ip.address();
}
var ipAddress_default = ipAddress;
export {
  ipAddress_default as default
};
