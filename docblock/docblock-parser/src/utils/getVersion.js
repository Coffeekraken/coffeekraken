import __fs from "fs";
/**
 * Return the version specified in config or try to get the version from the package.json file
 * @return 		{String} 		The version found
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function getVersion() {
  // if specified, return it
  if (this._config.version) {
    return this._config.version;
  }
  // try to get it from the package.json
  if (__fs.existsSync(process.env.PWD + "/package.json")) {
    const packageJson = JSON.parse(
      __fs.readFileSync(process.env.PWD + "/package.json", "utf8")
    );
    if (packageJson.version) {
      return packageJson.version;
    }
  }
  // we don't have any version found
  return "";
}
