import "../../../../../chunk-TD77TI6B.mjs";
import { spawnSync } from "child_process";
async function commandExists(command) {
  const isWin = process.platform === "win32";
  const where = isWin ? "where" : "whereis";
  const versionOut = spawnSync(`${command} --version`, ["/?"], {
    encoding: "utf-8",
    shell: true
  });
  if (versionOut.stdout)
    return versionOut.stdout;
  const out = spawnSync(where + " " + command, ["/?"], {
    encoding: "utf8",
    shell: true
  });
  return out.stdout !== "";
}
export {
  commandExists as default
};
