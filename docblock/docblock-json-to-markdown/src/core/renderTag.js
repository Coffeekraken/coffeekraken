export default function renderTag(name, value) {
  if (this._config.tags[name] && name !== "constructor") {
    return this._config.tags[name](value);
  }
  return "";
}
