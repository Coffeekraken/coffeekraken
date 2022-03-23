import "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __SInterface from "@coffeekraken/s-interface";
class SDocmapInstallSnapshotParamsInterface extends __SInterface {
  static get _definition() {
    return {
      glob: {
        description: "Specify a glob pattern where to find the snapshots to install",
        type: "String",
        default: __SSugarConfig.get("docmap.installSnapshot.glob")
      }
    };
  }
}
var SDocmapInstallSnapshotParamsInterface_default = SDocmapInstallSnapshotParamsInterface;
export {
  SDocmapInstallSnapshotParamsInterface_default as default
};
