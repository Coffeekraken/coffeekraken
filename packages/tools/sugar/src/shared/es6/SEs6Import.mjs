import "../../../../../chunk-JETN4ZEY.mjs";
import __parseEs6Imports from "parse-es6-imports";
class SEs6Import {
  constructor(statement) {
    this.raw = null;
    this.path = null;
    this.default = null;
    this.star = null;
    this.named = [];
    const parsedStatement = __parseEs6Imports(statement)[0];
    if (parsedStatement) {
      this.raw = statement;
      this.path = parsedStatement.fromModule;
      this.default = parsedStatement.defaultImport;
      this.star = parsedStatement.starImport;
      this.named = parsedStatement.namedImports.map((n) => {
        return {
          name: n.name,
          as: n.value
        };
      });
    }
  }
  static parseCode(code) {
    const reg = /^[\s]{0,999999}import\s[^\r\n;].*/gm;
    let matches = code.match(reg);
    if (!matches) {
      return [];
    }
    matches = matches.map((statement) => {
      return new SEs6Import(statement.trim());
    });
    return matches;
  }
  toString() {
    let string = "import ";
    if (this.star) {
      string += `* as ${this.star} `;
    }
    if (this.default) {
      string += `${this.default}`;
      if (this.named && this.named.length) {
        string += ", ";
      } else {
        string += " ";
      }
    }
    if (this.named && this.named.length) {
      string += "{ ";
      string += this.named.map((n) => {
        if (n.as) {
          return `${n.name} as ${n.as}`;
        } else {
          return n.name;
        }
      }).join(", ");
      string += " } ";
    }
    string += `from "${this.path}";`;
    return string;
  }
}
export {
  SEs6Import as default
};
