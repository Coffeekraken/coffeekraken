import __fs from "fs";
const _cache = {};
function readJsonSync(path) {
  if (_cache[path])
    return _cache[path];
  if (!__fs.existsSync(path)) {
    throw new Error(`<red>[readJsonSync]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`);
  }
  const jsonStr = __fs.readFileSync(path, "utf8").toString();
  const json = JSON.parse(jsonStr);
  _cache[path] = json;
  return json;
}
export {
  readJsonSync as default
};
