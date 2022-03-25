var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var markdownBuilder_config_exports = {};
__export(markdownBuilder_config_exports, {
  default: () => markdownBuilder_config_default
});
module.exports = __toCommonJS(markdownBuilder_config_exports);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
var import_path = __toESM(require("path"), 1);
function markdownBuilder_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    default: {
      glob: "**/+(README|LICENSE|*.md)",
      inDir: "[config.storage.src.rootDir]",
      inPath: null,
      inRaw: null,
      outDir: "[config.storage.dist.rootDir]",
      outPath: null,
      save: true,
      target: "markdown",
      protectedTags: ["template", "code"]
    },
    presets: {},
    transformers: {
      og: {
        match: /^<!-- og:(.*) -->$/gm,
        preprocessor: import_path.default.resolve((0, import_dirname.default)(), "../transformers/og/og"),
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../transformers/og/og.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../transformers/og/og.html")
      },
      code: {
        match: /^```([a-zA-Z0-9]+)\n([\s\S]*?)```$/gm,
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../transformers/code/code.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../transformers/code/code.html")
      }
    },
    helpers: {},
    partials: {
      license: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/license/license.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/license/license.md")
      },
      "license-mit": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseMit/licenseMit.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseMit/licenseMit.md")
      },
      "license-gpl": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseGpl/licenseGpl.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseGpl/licenseGpl.md")
      },
      "license-lgpl": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseLgpl/licenseLgpl.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseLgpl/licenseLgpl.md")
      },
      "license-epl-20": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseEpl20/licenseEpl20.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseEpl20/licenseEpl20.md")
      },
      "license-mpl-20": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseMpl20/licenseMpl20.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseMpl20/licenseMpl20.md")
      },
      "license-cddl-10": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseCddl10/licenseCddl10.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseCddl10/licenseCddl10.md")
      },
      "license-apache-20": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseApache20/licenseApache20.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseApache20/licenseApache20.md")
      },
      "license-bsd-2-clause": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseBsd2Clause/licenseBsd2Clause.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseBsd2Clause/licenseBsd2Clause.md")
      },
      "license-bsd-3-clause": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseBsd3Clause/licenseBsd3Clause.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/licenseBsd3Clause/licenseBsd3Clause.md")
      },
      shields: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/shields/shields.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/shields/shields.md"),
        data: "[config.shieldsio]"
      },
      interface: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/interface/interface.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/interface/interface.html")
      },
      configFiles: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/configFiles/configFiles.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/configFiles/configFiles.md")
      },
      config: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/config/config.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/config/config.html")
      },
      recipesList: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/recipesList/recipesList.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/recipesList/recipesList.md")
      },
      recipe: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/recipe/recipe.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/recipe/recipe.md")
      },
      docMenu: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../partials/docMenu/docMenu.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../partials/docMenu/docMenu.md")
      }
    },
    layouts: {
      doc: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../layouts/doc/docLayout.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../layouts/doc/docLayout.md"),
        data: "[config.doc.layout]"
      },
      readme: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../layouts/readme/readmeLayout.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../layouts/readme/readmeLayout.md"),
        data: "[config.readme.layout]"
      },
      license: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../layouts/license/licenseLayout.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../layouts/license/licenseLayout.md"),
        data: "[config.license.layout]"
      }
    },
    sections: {
      "readme-header": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../sections/readmeHeader/readmeHeaderSection.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../sections/readmeHeader/readmeHeaderSection.md")
      },
      "doc-header": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../sections/docHeader/docHeaderSection.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../sections/docHeader/docHeaderSection.md")
      },
      "doc-menu": {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../sections/docMenu/docMenuSection.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../sections/docMenu/docMenuSection.md")
      },
      description: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../sections/description/descriptionSection.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../sections/description/descriptionSection.md")
      },
      install: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../sections/install/installSection.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../sections/install/installSection.md")
      },
      license: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../sections/license/licenseSection.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../sections/license/licenseSection.md")
      },
      contact: {
        markdown: import_path.default.resolve((0, import_dirname.default)(), "../sections/contact/contactSection.md"),
        html: import_path.default.resolve((0, import_dirname.default)(), "../sections/contact/contactSection.md")
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
