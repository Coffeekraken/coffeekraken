function extension(path) {
  const lastPart = path.split("/").pop();
  if (!lastPart.includes("."))
    return "";
  return path.split(".").pop();
}
var extension_default = extension;
export {
  extension_default as default
};
