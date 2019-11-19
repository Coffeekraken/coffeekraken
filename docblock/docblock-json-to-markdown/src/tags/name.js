export default function name(name) {
  return `\n${Array(this._titleLevel() + 1).join("#")} ${name}\n`;
}
