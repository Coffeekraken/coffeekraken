export default function renderTag(name, value, block) {
  if (this._config.tags[name] && name !== "constructor") {
    return this._config.tags[name](value, block);
  }
  return "";
}
