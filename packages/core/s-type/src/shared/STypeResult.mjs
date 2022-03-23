import "../../../../chunk-JETN4ZEY.mjs";
import __isNode from "@coffeekraken/sugar/shared/is/node";
import __toString from "@coffeekraken/sugar/shared/string/toString";
import __parseHtml from "@coffeekraken/sugar/shared/console/parseHtml";
class STypeResult {
  get typeString() {
    return this._data.typeString;
  }
  get value() {
    return this._data.value;
  }
  get received() {
    return this._data.received;
  }
  get expected() {
    return this._data.expected;
  }
  get issues() {
    return this._data.issues;
  }
  get settings() {
    return this._data.settings;
  }
  constructor(data) {
    this._data = data;
  }
  hasIssues() {
    if (this._data)
      return true;
    return false;
  }
  toString() {
    if (__isNode()) {
      return this.toConsole();
    } else {
      return `The method "toHtml" has not being integrated for now...`;
    }
  }
  toConsole() {
    const headerArray = [
      `<underline><magenta>${this._data.settings.name}</magenta></underline>`,
      "",
      "<underline>Received value</underline>",
      "",
      `${__toString(this._data.value, {
        beautify: true
      })}`,
      ""
    ];
    const issuesArray = [];
    Object.keys(this._data.issues).forEach((ruleId) => {
      const issueObj = this._data.issues[ruleId];
      const message = [];
      if (issueObj.expected.type) {
        message.push(`- Expected "<yellow>${issueObj.expected.type}</yellow>"`);
      }
      if (issueObj.received.type) {
        message.push(`- Received "<red>${issueObj.received.type}</red>"`);
      }
      if (issueObj.message) {
        message.push(["<underline>Details:</underline>", issueObj.message].join("\n"));
      }
      issuesArray.push(message.join("\n"));
    });
    const settingsArray = [
      "",
      `<underline>Settings</underline>`,
      "",
      `${__toString(this._data.settings, {
        beautify: true
      })}`
    ];
    return __parseHtml(`
${headerArray.join("\n")}
${issuesArray.join("\n")}
${this.settings.verbose ? settingsArray.join("\n") : ""}
    `).trim();
  }
}
const Cls = STypeResult;
var STypeResult_default = STypeResult;
export {
  STypeResult_default as default
};
