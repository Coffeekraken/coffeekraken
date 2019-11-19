export default function ret(ret) {
  return `Return **${this._renderTypes(ret.types)}** ${ret.description}\n`;
}
