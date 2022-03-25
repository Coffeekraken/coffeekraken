import __fkill from "fkill";
async function kill(portOrId) {
  return __fkill(portOrId);
}
export {
  kill as default
};
