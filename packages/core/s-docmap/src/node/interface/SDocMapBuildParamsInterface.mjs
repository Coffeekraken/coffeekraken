import "../../../../../chunk-TD77TI6B.mjs";
import __SugarConfig from "@coffeekraken/s-sugar-config";
import __SInterface from "@coffeekraken/s-interface";
class SDocmapBuildParamsInterface extends __SInterface {
  static get _definition() {
    return {
      globs: {
        type: "Array<String>",
        description: "Specify some globs to use to search docblocks to use in docmap generation",
        default: __SugarConfig.get("docmap.build.globs")
      },
      exclude: {
        type: "Array<String>",
        description: "Specify some regexp used to exclude files from resulting docMap",
        default: __SugarConfig.get("docmap.build.exclude"),
        level: 1
      },
      tags: {
        type: "Array<String>",
        description: "Specify which docblock tags you want in your final docmap.json file",
        alias: "f",
        default: __SugarConfig.get("docmap.build.tags")
      },
      filters: {
        type: "Object<RegExp>",
        description: "Specify some properties and regex to use to filter docblocks",
        default: __SugarConfig.get("docmap.build.filters")
      },
      noExtends: {
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        description: "Specify if you want to avoid searching for docmap.json files in the dependency packages",
        default: __SugarConfig.get("docmap.build.noExtends")
      },
      save: {
        type: "Boolean",
        alias: "s",
        description: "Specify if you want to save the generated file under the ```outPath``` path",
        default: __SugarConfig.get("docmap.build.save")
      },
      outPath: {
        type: "String",
        alias: "o",
        description: "Specify where you want to save the builded file. Usually saved in package root with the name docmap.json",
        default: __SugarConfig.get("docmap.build.outPath")
      }
    };
  }
}
var SDocMapBuildParamsInterface_default = SDocmapBuildParamsInterface;
export {
  SDocMapBuildParamsInterface_default as default
};
