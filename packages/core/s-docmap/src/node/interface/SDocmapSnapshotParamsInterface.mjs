import "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __SInterface from "@coffeekraken/s-interface";
class SDocMapSnapshotParamsInterface extends __SInterface {
  static get _definition() {
    return {
      outDir: {
        description: "Specify the directory path where to store your snapshots",
        type: "String",
        path: {
          absolute: true,
          tokens: true
        },
        default: __SSugarConfig.get("docmap.snapshot.outDir")
      }
    };
  }
}
var SDocmapSnapshotParamsInterface_default = SDocMapSnapshotParamsInterface;
export {
  SDocmapSnapshotParamsInterface_default as default
};
