import "../../../../../chunk-JETN4ZEY.mjs";
function commonDataFileExtensions(withDot = false) {
  return ["csv", "dat", "db", "dbf", "json", "log", "mdb", "sav", "sql", "tar", "xml"].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonDataFileExtensions as default
};
