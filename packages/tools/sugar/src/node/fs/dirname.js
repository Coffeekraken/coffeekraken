import __callsites from "callsites";
import { fileURLToPath } from "url";
function dirname_default() {
  if (process.env.NODE_ENV === "test") {
    return __callsites()[1].getFileName().split("/").slice(0, -1).join("/");
  }
  return fileURLToPath(__callsites()[1].getFileName()).split("/").slice(0, -1).join("/");
}
export {
  dirname_default as default
};
