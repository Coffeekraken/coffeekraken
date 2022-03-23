import "../../../../chunk-JETN4ZEY.mjs";
import __SClass from "@coffeekraken/s-class";
import __toString from "@coffeekraken/sugar/shared/string/toString";
import __parseHtml from "@coffeekraken/sugar/shared/console/parseHtml";
import __clone from "@coffeekraken/sugar/shared/object/clone";
import __isNode from "@coffeekraken/sugar/shared/is/node";
class SDescriptorResult extends __SClass {
  constructor(descriptor, value, descriptorSettings) {
    super({});
    this._issues = {};
    this._descriptor = descriptor;
    this._descriptorSettings = descriptorSettings;
    try {
      this._originalValue = __clone(value, { deep: true });
    } catch (e) {
      this._originalValue = value;
    }
    this.value = value;
  }
  hasIssues() {
    return Object.keys(this._issues).length >= 1;
  }
  add(ruleResult) {
    if (!ruleResult.__ruleObj.id)
      return;
    this._issues[ruleResult.__ruleObj.id] = ruleResult;
  }
  toString() {
    if (__isNode()) {
      return this.toConsole();
    } else {
      return this.toConsole();
    }
  }
  toConsole() {
    const headerArray = [
      `<underline><magenta>${this._descriptor.metas.name}</magenta></underline>`,
      "",
      `${__toString(this.value, {
        beautify: true
      })}`,
      ""
    ];
    const issuesArray = [];
    Object.keys(this._issues).forEach((ruleId) => {
      const ruleResult = this._issues[ruleId];
      let message = "";
      if (ruleResult.__error && ruleResult.__error instanceof Error) {
        message = ruleResult.__error.message;
      } else if (ruleResult.__ruleObj.message !== void 0 && typeof ruleResult.__ruleObj.message === "function") {
        message = ruleResult.__ruleObj.message(ruleResult);
      } else if (ruleResult.__ruleObj.message !== void 0 && typeof ruleResult.__ruleObj.message === "string") {
        message = ruleResult.__ruleObj.message;
      }
      issuesArray.push(`-${typeof ruleResult.__propName === "string" ? ` [<magenta>${ruleResult.__propName}</magenta>]` : ""} <red>${ruleId}</red>: ${message}`);
    });
    const settingsArray = [
      "",
      `<underline>Settings</underline>`,
      "",
      `${__toString(this._descriptorSettings, {
        beautify: true
      })}`
    ];
    return __parseHtml(`
${headerArray.join("\n")}
${issuesArray.join("\n")}
${settingsArray.join("\n")}
    `).trim();
  }
}
const Cls = SDescriptorResult;
var SDescriptorResult_default = SDescriptorResult;
export {
  SDescriptorResult_default as default
};
