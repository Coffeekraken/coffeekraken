import {
  __toESM
} from "../../../../../chunk-TD77TI6B.mjs";
async function interfaceTagProxy(data) {
  const int = (await Promise.resolve().then(() => __toESM(require(data.path)))).default;
  return int.toObject();
}
export {
  interfaceTagProxy as default
};
