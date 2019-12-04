import processJson from './processJson';
export default function jsonToMarkdown(json) {
  // reset title level between files processing
  // (this title level management has to be rewriten when possible)
  this._titleLevel(-100);

  // process the json first
  json = processJson(json);

  // template
  const template =
    this._config.templates[this._config.language] ||
    this._config.templates.default;
  const tpl = template(json);
  // return markdown
  return tpl.trim();
}
